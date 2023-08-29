<template>
  <q-item
    v-ripple
    clickable
    :to="{
      name: paymentIsCashIn ? 'customer-update' : 'supplier-update',
      params: { id: otherSide?.stakeholder?.id },
    }"
  >
    <q-item-section>
      <span
        style="width: max-content"
        :style="{
          borderBottom: `3px solid ${paymentIsCashIn ? '#22ff00' : '#ee2222'}`,
        }"
      >
        {{
          $n(parseFloat(payment.amount), {
            style: 'currency',
            currency: payment.currency,
          })
        }}
      </span>
    </q-item-section>
    <q-item-section align="center">
      {{ otherSide?.stakeholder?.name }}
    </q-item-section>
    <q-item-section align="right">
      <span v-if="payment.due_date">
        {{ DateTime.fromISO(payment.due_date).toRelative() }}
      </span>
    </q-item-section>
    <q-tooltip v-if="payment.additional_info">
      {{ payment.additional_info }}
    </q-tooltip>
  </q-item>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { PaymentOut } from 'src/client';

const props = defineProps<{
  payment: PaymentOut;
}>();

const { t: $t, n: $n } = useI18n();

const paymentIsCashIn = computed(() => {
  return !props.payment.receiver.stakeholder?.id;
});

const otherSide = computed(() => {
  if (props.payment.payer.stakeholder?.id) {
    return props.payment.payer;
  } else if (props.payment.receiver.stakeholder?.id) {
    return props.payment.receiver;
  }
  return null;
});
</script>

<style scoped></style>
