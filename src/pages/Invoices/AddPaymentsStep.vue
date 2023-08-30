<template>
  <section>
    <q-linear-progress
      :value="paymentProgress.toNumber()"
      rounded
      color="green"
      track-color="grey-8"
      class="q-my-sm q-py-md"
    >
      <div class="absolute-full flex flex-center">
        <q-badge
          color="white"
          text-color="accent"
          :label="`${$t('invoice_labels.payments.progress')}: ${$n(
            paymentProgress.toNumber(),
            { style: 'percent', useGrouping: false }
          )} (${$n(totalPayments.toNumber())}/${$n(
            parseFloat(invoice.total_with_tax || '0')
          )})`"
        />
      </div>
    </q-linear-progress>
    <q-list
      separator
      bordered
      class="full-width rounded-borders"
      style="overflow: hidden"
    >
      <q-item>
        <q-item-section>
          {{ $t('invoice_labels.payments.amount') }}
        </q-item-section>
        <q-item-section align="center">
          {{ $t('invoice_labels.payments.type') }}
        </q-item-section>
        <q-item-section align="center">
          {{ $t('dashboard.due-date') }}
        </q-item-section>
        <q-item-section align="right" class="col-shrink">
          {{ $t('commons.actions') }}
        </q-item-section>
      </q-item>
      <q-item
        v-for="invoice_payment in invoicePayments"
        :key="invoice_payment.id"
      >
        <q-item-section>
          {{
            $n(parseFloat(invoice_payment.payment.amount), {
              style: 'currency',
              currency: invoice_payment.payment.currency,
            })
          }}
        </q-item-section>
        <q-item-section align="center">
          {{
            $t(
              `invoice_labels.payments.${invoice_payment.payment.payment_type}`
            )
          }}
        </q-item-section>
        <q-item-section align="center">
          {{
            DateTime.fromISO(
              invoice_payment.payment.due_date || ''
            ).toRelative()
          }}
        </q-item-section>
        <q-item-section align="center" class="col-shrink">
          <div>
            <q-btn
              v-if="invoice_payment.payment.payment_done"
              color="yellow-10"
              dense
              icon="account_balance_wallet"
              @click="togglePaymentDone(invoice_payment)"
            >
              <q-tooltip>
                {{ $t('invoice_labels.payments.is_concluded') }}
              </q-tooltip>
            </q-btn>
            <q-btn
              v-else
              color="red-10"
              dense
              icon="remove"
              @click="togglePaymentDone(invoice_payment)"
            >
              <q-tooltip>
                {{ $t('invoice_labels.payments.isnot_concluded') }}
              </q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-sm"
              color="red-10"
              dense
              icon="delete"
              @click="deletePayment(invoice_payment)"
            />
          </div>
        </q-item-section>
      </q-item>
      <q-item v-if="!invoicePayments?.length">
        {{ $t('invoice_labels.no-payment-yet') }}
      </q-item>
    </q-list>
    <q-btn
      class="q-mt-md"
      push
      color="positive"
      icon="add"
      no-caps
      :label="$t('invoice_labels.new_payment')"
      @click="addPayment"
    />
    <q-dialog v-model="showAddPaymentDialog" persistent>
      <q-card class="q-pa-md">
        <AddPayments
          v-model:popup="showAddPaymentDialog"
          :invoice="invoice"
          :currently-paid="totalPayments"
          @new-payment="atNewPayment"
        ></AddPayments>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup lang="ts">
import { Decimal } from 'decimal.js';
import { DateTime } from 'luxon';
import { QLinearProgress, useQuasar } from 'quasar';
import { computed, onActivated, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { api } from 'src/boot/axios';
import { InvoiceDetailOut, InvoicePayment } from 'src/client';
import RepeatTextConfirmation from 'src/components/Dialogs/RepeatTextConfirmation.vue';

import AddPayments from './AddPayments.vue';

const props = defineProps<{ invoice: InvoiceDetailOut }>();
const invoicePayments = ref<InvoicePayment[]>();
const showAddPaymentDialog = ref(false);

const { t: $t, n: $n } = useI18n();
const $q = useQuasar();

const totalPayments = computed(() => {
  let total = new Decimal(0);
  if (!invoicePayments.value) return total;
  for (let index = 0; index < invoicePayments.value.length; index++) {
    const invoice_payment = invoicePayments.value[index];
    total = total.plus(new Decimal(invoice_payment.payment.amount));
  }
  return total;
});

const paymentProgress = computed(() => {
  return totalPayments.value.div(
    new Decimal(props.invoice.total_with_tax || 1)
  );
});

const atNewPayment = (newPayment: InvoicePayment) => {
  invoicePayments.value?.push(newPayment);
};

onActivated(() => {
  api.payments
    .paymentsInvoicePaymentsList({
      invoice: props.invoice.id.toString(),
      limit: 1000,
    })
    .then((result) => {
      invoicePayments.value = result.results;
    });
});

const addPayment = () => {
  showAddPaymentDialog.value = true;
};

const togglePaymentDone = (invoice_payment: InvoicePayment) => {
  const clonedPayment = { ...invoice_payment.payment };
  clonedPayment.payment_done = !invoice_payment.payment.payment_done;
  const clonedInvoicePayment = {
    invoice: invoice_payment.invoice,
    id: invoice_payment.id,
    payment: clonedPayment,
  };
  api.payments
    .paymentsInvoicePaymentsUpdate({
      id: invoice_payment.id,
      requestBody: clonedInvoicePayment,
    })
    .then((value) => {
      invoice_payment.payment.payment_done = value.payment.payment_done;
    });
};

const deletePayment = (invoice_payment: InvoicePayment) => {
  $q.dialog({
    component: RepeatTextConfirmation,
    componentProps: {
      explanation: $t('commons.are-you-sure-you-want-to-delete'),
      icon: 'delete',
      color: 'negative',
    },
  }).onOk(() => {
    api.payments
      .paymentsInvoicePaymentsDestroy({ id: invoice_payment.id })
      .then(() => {
        invoicePayments.value = invoicePayments.value?.filter(
          (ip) => invoice_payment.id !== ip.id
        );
      });
  });
};
</script>

<style scoped></style>
