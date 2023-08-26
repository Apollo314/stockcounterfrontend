import { useElementSize } from '@vueuse/core';
import {
  IChartApi,
  createChart,
  ChartOptions,
  SeriesType,
  WhitespaceData,
  HistogramData,
  DeepPartial,
  SeriesPartialOptionsMap,
  ISeriesApi,
} from 'lightweight-charts';
import { Dark } from 'quasar';
import {
  MaybeRef,
  Ref,
  computed,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
} from 'vue';

export const defaultChartOptions = computed<DeepPartial<ChartOptions>>(() => {
  return {
    layout: {
      background: { color: 'transparent' },
      textColor: Dark.isActive ? 'white' : 'black',
    },
    grid: {
      vertLines: { visible: false },
      horzLines: { color: '#999' },
    },
    timeScale: { fixLeftEdge: true, fixRightEdge: true },
  };
});

export function useAddChart(
  container: MaybeRef<HTMLElement | undefined>,
  chartOptions: MaybeRef<DeepPartial<ChartOptions>> = defaultChartOptions,
  autosize = true,
  watchChartOptions = true
) {
  const chart = ref<IChartApi>();

  const { width, height } = useElementSize(container);

  if (autosize) {
    watch(
      () => [width.value, height.value],
      () => {
        if (!chart.value) return;
        chart.value.resize(width.value, height.value);
      }
    );
  }

  onMounted(() => {
    const chartContainer = unref(container);
    if (!chartContainer) return;
    chart.value = createChart(chartContainer, unref(chartOptions));
  });

  onUnmounted(() => {
    if (chart.value) {
      chart.value.remove();
      chart.value = undefined;
    }
  });

  if (watchChartOptions) {
    watch(
      () => unref(chartOptions),
      (newOptions) => {
        if (!chart.value) return;
        if (!newOptions) {
          chart.value.applyOptions({});
        } else {
          chart.value.applyOptions(newOptions);
        }
      },
      {
        deep: true,
      }
    );
  }
  return { chart };
}

export function useAddSeries<
  sType extends SeriesType,
  SeriesApi extends ISeriesApi<sType>,
  SeriesConstructor extends `add${sType}Series`
>(
  chart: Ref<IChartApi | undefined>,
  type: sType,
  data: MaybeRef<(WhitespaceData | HistogramData)[]>,
  seriesOptions?: MaybeRef<SeriesPartialOptionsMap[sType]>,
  watchOptions = true,
  watchData = true
) {
  const series = ref<SeriesApi>();
  onMounted(() => {
    if (!chart.value) {
      return;
    }
    const seriesConstructorName = `add${type}Series` as SeriesConstructor;
    series.value = chart.value[seriesConstructorName](
      unref(seriesOptions)
    ) as SeriesApi;
    series.value.setData(unref(data));
  });

  if (watchOptions) {
    watch(
      () => unref(seriesOptions),
      (newOptions) => {
        if (!series.value) return;
        if (!newOptions) {
          series.value.applyOptions({});
        } else {
          series.value.applyOptions(newOptions);
        }
      },
      {
        deep: true,
      }
    );
  }
  if (watchData) {
    watch(
      () => unref(data),
      (newData) => {
        series.value?.setData(newData);
      },
      { deep: true }
    );
  }
  return { series };
}
