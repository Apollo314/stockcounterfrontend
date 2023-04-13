import { MaybeRef } from '@vueuse/core';
import {
  BooleanCameraCapability,
  RangeCameraCapability,
} from 'html5-qrcode/esm/camera/core';
import {
  Html5QrcodeResult,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from 'html5-qrcode/esm/core';
import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeFullConfig,
} from 'html5-qrcode/esm/html5-qrcode';
import { v4 as uuidv4 } from 'uuid';
import { computed, onDeactivated, onUnmounted, ref, unref, watch } from 'vue';

import { beep } from './beep';

type Zoom = {
  value: number;
  isSupported: boolean;
  min: number;
  max: number;
  step: number;
};

export type Config = Html5QrcodeFullConfig &
  Html5QrcodeCameraScanConfig & {
    defaultZoomValueIfSupported?: number;
    /**
     * Time in ms for rescanning "same code" if it is detected
     * 0: immediately
     * positive number like 2500: after 2.5 seconds
     * else(including negative numbers and undefined): never
     */
    reScanInterval?: number;
  };

export const useQRScanner = (
  element: MaybeRef<HTMLElement | undefined>,
  config?: MaybeRef<Config>,
  scanCallback?: (scan: string, scanner: Html5Qrcode) => void
) => {
  const lastScannedCode = ref<string>();
  const lastScannedResult = ref<Html5QrcodeResult>();
  const lastError = ref<string>();
  const zoom = ref<Zoom>();
  const zoomFeature = ref<RangeCameraCapability>();
  const torchFeature = ref<BooleanCameraCapability>();
  let lastScannedTime = Date.now();

  const selectedCamera = ref<string>();
  let elid = '';

  const scanner = ref<Html5Qrcode>();

  const unrefedconfig = computed(() => {
    return unref(config);
  });

  const applyZoom = (zoomLevel: number) => {
    zoomFeature.value?.apply(zoomLevel).then(() => {
      zoom.value = {
        max: zoomFeature.value?.max() || 1,
        min: zoomFeature.value?.min() || 1,
        step: zoomFeature.value?.step() || 1,
        isSupported: zoomFeature.value?.isSupported() || false,
        value: zoomFeature.value?.value() || 1,
      };
    });
  };

  const onScanSuccess: QrcodeSuccessCallback = (decodedText, decodedResult) => {
    const rescanInterval = unref(config)?.reScanInterval;
    if (
      rescanInterval === 0 ||
      (rescanInterval &&
        rescanInterval > 0 &&
        Date.now() - lastScannedTime > rescanInterval) ||
      decodedText !== lastScannedCode.value
    ) {
      lastScannedTime = Date.now();
      beep();
      scanCallback?.(decodedText, scanner.value as Html5Qrcode);
    }
    lastScannedCode.value = decodedText;
    lastScannedResult.value = decodedResult;
  };

  const onScanFailure: QrcodeErrorCallback = (error) => {
    lastError.value = error;
  };

  async function start() {
    if (selectedCamera.value === undefined) {
      const facingConstraint: MediaTrackConstraints = {
        facingMode: 'environment',
      };

      const unrefedconfig = unref(config);
      await scanner.value?.start(
        facingConstraint,
        {
          fps: unrefedconfig?.fps,
          disableFlip: unrefedconfig?.disableFlip,
          qrbox:
            unrefedconfig?.qrbox ||
            ((a, b) => {
              return {
                width: (Math.min(a, b) * 2) / 3,
                height: (Math.min(a, b) * 2) / 3,
              };
            }),
          aspectRatio: unrefedconfig?.aspectRatio,
          videoConstraints: unrefedconfig?.videoConstraints,
        },
        onScanSuccess,
        onScanFailure
      );
      const cameraCapabilities =
        scanner.value?.getRunningTrackCameraCapabilities();
      zoomFeature.value = cameraCapabilities?.zoomFeature();
      torchFeature.value = cameraCapabilities?.torchFeature();
      applyZoom(unrefedconfig?.defaultZoomValueIfSupported || 1);
      // await zoomFeature.value?.apply(
      //   unrefedconfig?.defaultZoomValueIfSupported || 1
      // );
    }
  }

  function createScanner() {
    if (elid) {
      scanner.value = new Html5Qrcode(elid, unrefedconfig.value);
      start();
    }
  }

  watch(
    () => unref(element),
    (el) => {
      if (el) {
        elid = uuidv4();
        el.id = elid;
        createScanner();
      } else {
        scanner.value?.stop();
      }
    }
  );

  onUnmounted(() => {
    scanner.value?.stop();
  });
  onDeactivated(() => {
    scanner.value?.stop();
  });

  return {
    scanner,
    lastScannedCode,
    lastScannedResult,
    lastError,
    start,
    getCameras: Html5Qrcode.getCameras,
    selectedCamera,
    torchFeature,
    zoom,
    applyZoom,
  };
};
