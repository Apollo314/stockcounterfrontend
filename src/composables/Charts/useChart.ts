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
    rightPriceScale: {
      borderVisible: false,
    },
    grid: {
      vertLines: { visible: false },
      horzLines: { color: '#888' },
    },
    timeScale: {
      lockVisibleTimeRangeOnResize: true,
      fixLeftEdge: true,
      fixRightEdge: true,
    },
  };
});

export function useAddChart(
  container: MaybeRef<HTMLElement | undefined>,
  chartOptions: MaybeRef<DeepPartial<ChartOptions>> = defaultChartOptions,
  autosize = true,
  watchChartOptions = true
) {
  let chart: IChartApi | undefined = undefined;

  const { width, height } = useElementSize(container);

  if (autosize) {
    watch(
      () => [width.value, height.value],
      () => {
        if (!chart) return;
        chart.resize(width.value, height.value);
      }
    );
  }

  onMounted(() => {
    const chartContainer = unref(container);
    if (!chartContainer) return;
    chart = createChart(chartContainer, unref(chartOptions));
  });

  onUnmounted(() => {
    if (chart) {
      chart.remove();
      chart = undefined;
    }
  });

  function getChart() {
    return chart;
  }

  if (watchChartOptions) {
    watch(
      () => unref(chartOptions),
      (newOptions) => {
        if (!chart) return;
        if (!newOptions) {
          chart.applyOptions({});
        } else {
          chart.applyOptions(newOptions);
        }
      },
      {
        deep: true,
      }
    );
  }
  return { getChart };
}

export function useAddSeries<
  sType extends SeriesType,
  SeriesApi extends ISeriesApi<sType>,
  SeriesConstructor extends `add${sType}Series`
>(
  getChart: () => IChartApi | undefined,
  type: sType,
  data: MaybeRef<(WhitespaceData | HistogramData)[]>,
  seriesOptions?: MaybeRef<SeriesPartialOptionsMap[sType]>,
  watchOptions = true,
  watchData = true
) {
  const series = ref<SeriesApi>();
  const retryCount = 0;
  const maxRetry = 10;

  function draw() {
    const chart = getChart();
    const seriesConstructorName = `add${type}Series` as SeriesConstructor;
    if (!chart) {
      if (retryCount < maxRetry) {
        setTimeout(() => {
          draw();
        }, 20);
      }
      return;
    }
    series.value = chart[seriesConstructorName](
      unref(seriesOptions)
    ) as SeriesApi;
    const seriesdata = unref(data);
    if (seriesdata && seriesdata.length) {
      series.value.setData(unref(data));
    }
  }

  onMounted(() => {
    draw();
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
        getChart()?.timeScale().fitContent();
      }
    );
  }
  return { series };
}
