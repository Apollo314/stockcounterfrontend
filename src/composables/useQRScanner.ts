import { MaybeRef } from '@vueuse/core';
import {
  RangeCameraCapability,
  BooleanCameraCapability,
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

export type Config = Html5QrcodeFullConfig &
  Html5QrcodeCameraScanConfig & {
    defaultZoomValueIfSupported?: number;
  };

export const useQRScanner = (
  element: MaybeRef<HTMLElement | undefined>,
  config?: MaybeRef<Config>,
  newUniqueScanCallback?: (scan: string, scanner: Html5Qrcode) => void
) => {
  const lastScannedCode = ref<string>();
  const lastScannedResult = ref<Html5QrcodeResult>();
  const lastError = ref<string>();
  const zoomFeature = ref<RangeCameraCapability>();
  const torchFeature = ref<BooleanCameraCapability>();

  const selectedCamera = ref<string>();
  let elid = '';

  const scanner = ref<Html5Qrcode>();

  const unrefedconfig = computed(() => {
    return unref(config);
  });

  const onScanSuccess: QrcodeSuccessCallback = (decodedText, decodedResult) => {
    if (decodedText !== lastScannedCode.value) {
      lastScannedCode.value = decodedText;
      beep();
      newUniqueScanCallback?.(decodedText, scanner.value as Html5Qrcode);
    }

    lastScannedCode.value = decodedText;
    lastScannedResult.value = decodedResult;
  };

  const onScanFailure: QrcodeErrorCallback = (error) => {
    lastError.value = error;
  };

  function start() {
    if (selectedCamera.value === undefined) {
      const facingConstraint: MediaTrackConstraints = {
        facingMode: 'environment',
      };

      const unrefedconfig = unref(config);

      scanner.value
        ?.start(
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
        )
        .then(() => {
          const cameraCapabilities =
            scanner.value?.getRunningTrackCameraCapabilities();
          zoomFeature.value = cameraCapabilities?.zoomFeature();
          torchFeature.value = cameraCapabilities?.torchFeature();
          zoomFeature.value?.apply(
            unrefedconfig?.defaultZoomValueIfSupported || 1
          );
        });
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
    zoomFeature,
    torchFeature,
  };
};
