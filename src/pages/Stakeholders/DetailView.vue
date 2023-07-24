<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-lg-6">
        <AutoCrud
          ref="autoCrudRef"
          create-path="/stakeholder/stakeholders/"
          update-retrieve-destroy-path="/stakeholder/stakeholders/{id}/"
          :query="id ? { id } : undefined"
          :create-redirect="{
            name:
              $route.meta.role === 'customer'
                ? 'customer-list'
                : 'supplier-list',
          }"
          :delete-redirect="{
            name:
              $route.meta.role === 'customer'
                ? 'customer-list'
                : 'supplier-list',
          }"
        >
        </AutoCrud>
      </div>
      <div
        v-if="id"
        class="col-xs-12 col-lg-6"
        :class="{ 'q-pl-md': $q.screen.gt.md }"
      >
        <AdaptiveCard class="fit">
          <div>
            <div class="text-h6 text-center q-pt-lg">
              {{ $t('menu.payment-account', 2) }}
            </div>
            <div class="q-pa-md">
              <q-item
                v-for="payment_account, index in (autoCrudRef?.initialValues as Stakeholder)?.paymentaccount_set"
                :key="index"
                clickable
                style="border-radius: 10px"
                :to="{
                  name: 'payment-account-update',
                  params: { id: payment_account.id },
                }"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="account_balance_wallet" />
                </q-item-section>
                <q-item-section>{{ payment_account.name }}</q-item-section>
                <q-item-section side>{{
                  payment_account.bank.name
                }}</q-item-section>
                <q-tooltip
                  v-if="payment_account.iban || payment_account.account_number"
                  class="bg-blue-10 text-bold"
                >
                  <q-item v-if="payment_account.iban">
                    <q-item-section>
                      <q-item-label>{{
                        $t('payment_account.iban')
                      }}</q-item-label>
                      <q-item-label caption lines="2">{{
                        payment_account.iban
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="payment_account.account_number">
                    <q-item-section>
                      <q-item-label>{{
                        $t('payment_account.account_number')
                      }}</q-item-label>
                      <q-item-label caption lines="2">{{
                        payment_account.account_number
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-tooltip>
              </q-item>
              <q-btn
                class="q-ma-md"
                color="primary"
                icon="add"
                outline
                no-caps
                :label="$t('commons.add_new')"
                :to="{
                  name: 'payment-accounts-create',
                  params: { stakeholderId: id },
                }"
              />
            </div>
          </div>
          <q-separator spaced inset dark />
          <div>
            <div class="text-h6 text-center q-pt-lg">
              {{ $t('menu.employee', 2) }}
            </div>
            <div class="q-pa-md">
              <q-item
                v-for="employee, index in (autoCrudRef?.initialValues as Stakeholder)?.employees"
                :key="index"
                clickable
                style="border-radius: 10px"
                :to="{
                  name: 'payment-account-update',
                  params: { id: employee.name },
                }"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="account_balance_wallet" />
                </q-item-section>
                <q-item-section>{{ employee.name }}</q-item-section>
                <q-item-section side>{{ employee.position }}</q-item-section>
                <q-tooltip
                  v-if="employee.phone || employee.email"
                  class="bg-blue-10 text-bold"
                >
                  <q-item v-if="employee.phone">
                    <q-item-section>
                      <q-item-label>{{ $t('commons.phone') }}</q-item-label>
                      <q-item-label caption lines="2">{{
                        employee.phone
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="employee.email">
                    <q-item-section>
                      <q-item-label>{{ $t('commons.email') }}</q-item-label>
                      <q-item-label caption lines="2">{{
                        employee.email
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-tooltip>
              </q-item>
              <!-- TODO: actually implement employees -->
              <q-btn
                class="q-ma-md"
                color="primary"
                icon="add"
                outline
                no-caps
                :label="$t('commons.add_new')"
                :to="{
                  name: 'payment-accounts-create',
                  params: { stakeholderId: id },
                }"
              />
            </div>
          </div>
        </AdaptiveCard>
      </div>
    </div>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import FullHeightPage from 'components/Page/FullHeightPage.vue';
import AutoCrud from 'components/VeeDynamicForm/AutoCrud/AutoCrud.vue';

import { Stakeholder } from '../../client';
import AdaptiveCard from '../../components/Card/AdaptiveCard.vue';

defineProps<{
  id?: string;
}>();

const autoCrudRef = ref<InstanceType<typeof AutoCrud>>();
</script>

<style scoped></style>
