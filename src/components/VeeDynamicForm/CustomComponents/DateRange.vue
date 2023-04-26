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
      mask="####-##-##, ####-##-##"
      placeholder="YYYY-AA-GG, YYYY-AA-GG"
      type="text"
      clearable
      clear-icon="clear"
      :bg-color="highlight ? 'primary' : undefined"
    >
      <template #prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateRange" bordered mask="YYYY-MM-DD" range>
              <div class="row items-center justify-end">
                <div class="row q-pt-md justify-center q-gutter-sm">
                  <q-btn
                    flat
                    :label="$t('date.today')"
                    no-caps
                    @click="selectLast({})"
                  />
                  <q-btn
                    flat
                    :label="$t('date.thisweek')"
                    no-caps
                    @click="selectLast({ weeks: 1 })"
                  />
                  <q-btn
                    flat
                    :label="$t('date.thismonth')"
                    no-caps
                    @click="selectLast({ months: 1 })"
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
      <q-btn
        :color="highlight ? 'primary' : undefined"
        :flat="!highlight"
        :label="$t('date.today')"
        no-caps
        @click="selectLast({})"
      />
      <q-btn
        :color="highlight ? 'primary' : undefined"
        :flat="!highlight"
        :label="$t('date.thisweek')"
        no-caps
        @click="selectLast({ weeks: 1 })"
      />
      <q-btn
        :color="highlight ? 'primary' : undefined"
        :flat="!highlight"
        :label="$t('date.thismonth')"
        no-caps
        @click="selectLast({ months: 1 })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { QInput } from 'quasar';
import { useField } from 'vee-validate';
import { ref, watch, toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    standout?: string | boolean;
    outlined?: boolean;
    highlight?: boolean;
  }>(),
  {
    standout: true,
  }
);

const { value } = useField<string | undefined>(toRef(props, 'name'));

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

const dateRange = ref({
  from: '',
  to: '',
});

watch(
  () => dateRange,
  (newRange) => {
    if (newRange.value?.from && newRange.value?.to) {
      value.value = `${dateRange.value.from}, ${dateRange.value.to}`;
    } else {
      value.value = undefined;
    }
  },
  { deep: true }
);

watch(
  () => value.value,
  (newVal) => {
    const parsedDate = parseDateRange(newVal || '');
    if (parsedDate) {
      dateRange.value = { from: parsedDate.from, to: parsedDate.to };
    } else if (!value.value) {
      dateRange.value = {
        from: '',
        to: '',
      };
    }
  }
);

const parseDateRange = (val: string) => {
  const re = /(?<from>\d{4}-\d{2}-\d{2}), *(?<to>\d{4}-\d{2}-\d{2})/gm;
  const match = re.exec(val);
  if (match) {
    const from = match.groups?.from;
    const to = match.groups?.to;
    if (from && to && Date.parse(from) && Date.parse(to)) {
      return { from, to };
    }
  }
  return null;
};

const dateRangeRule = (val: string): boolean => {
  if (val) {
    return parseDateRange(val) !== null;
  } else {
    return true;
  }
};

const selectLast = (
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
  dateRange.value.from = dayjs()
    .subtract(dayjs.duration(duration))
    .format('YYYY-MM-DD');
  dateRange.value.to = dayjs().format('YYYY-MM-DD');
};
</script>

<style scoped></style>
