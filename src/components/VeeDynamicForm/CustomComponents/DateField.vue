<template>
  <div>
    <q-input
      ref="inputRef"
      v-model="value"
      :outlined="outlined"
      :standout="standout"
      :label="label"
      class="label-top"
      :rules="[dateRangeRule]"
      hide-bottom-space
      mask="####-##-##"
      placeholder="YYYY-AA-GG"
      type="text"
      clearable
      clear-icon="clear"
      :bg-color="highlight ? 'primary' : undefined"
    >
      <template #prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" bordered mask="YYYY-MM-DD">
              <div class="row items-center justify-end">
                <div class="row q-pt-md justify-center q-gutter-sm">
                  <q-btn
                    flat
                    :label="$t('date.today')"
                    no-caps
                    @click="selectDate({})"
                  />
                  <q-btn
                    flat
                    :label="$t('date.nextweek')"
                    no-caps
                    @click="selectDate({ weeks: 1 })"
                  />
                  <q-btn
                    flat
                    :label="$t('date.nextmonth')"
                    no-caps
                    @click="selectDate({ months: 1 })"
                  />
                  <q-btn
                    flat
                    :label="$t('date.inthreemonths')"
                    no-caps
                    @click="selectDate({ months: 3 })"
                  />
                </div>
                <q-btn v-close-popup label="kapat" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div class="row q-pt-md justify-center q-gutter-sm">
      <q-btn flat :label="$t('date.today')" no-caps @click="selectDate({})" />
      <q-btn
        flat
        :label="$t('date.nextweek')"
        no-caps
        @click="selectDate({ weeks: 1 })"
      />
      <q-btn
        flat
        :label="$t('date.nextmonth')"
        no-caps
        @click="selectDate({ months: 1 })"
      />
      <q-btn
        flat
        :label="$t('date.inthreemonths')"
        no-caps
        @click="selectDate({ months: 3 })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { QInput } from 'quasar';
import { useField } from 'vee-validate';
import { ref, toRef, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    standout?: string | boolean;
    outlined?: boolean;
    highlight?: boolean;
  }>(),
  {
    standout: true,
  }
);

const { value } = useField<string | undefined>(toRef(props, 'name'));

const date = ref('');
const inputRef = ref<InstanceType<typeof QInput>>();

watch(
  () => props.highlight,
  () => {
    if (props.highlight) {
      setTimeout(() => {
        inputRef.value?.focus();
      }, 50);
    }
  }
);

watch(
  () => date,
  (newDate) => {
    if (newDate.value) {
      value.value = `${date.value}`;
    } else {
      value.value = undefined;
    }
  },
  { deep: true }
);

watch(
  () => value.value,
  (newVal) => {
    const parsedDate = parseDate(newVal || '');
    if (parsedDate) {
      date.value = parsedDate;
    } else if (!value.value) {
      date.value = '';
    }
  }
);

const parseDate = (val: string) => {
  const re = /(?<date>\d{4}-\d{2}-\d{2})/gm;
  const match = re.exec(val);
  if (match) {
    const matched_date = match.groups?.date;
    if (matched_date && Date.parse(matched_date)) {
      return matched_date;
    }
  }
  return null;
};

const dateRangeRule = (val: string): boolean => {
  if (val) {
    return parseDate(val) !== null;
  } else {
    return true;
  }
};

const selectDate = (
  duration: Partial<{
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
    weeks: number;
  }>
) => {
  date.value = DateTime.now().plus(duration).toFormat('yyyy-LL-dd');
};
</script>

<style scoped></style>
