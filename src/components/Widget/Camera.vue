<script setup lang="ts">
import { useDevicesList, useUserMedia } from '@vueuse/core'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const currentCamera = shallowRef<string>()
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})

const video = ref<HTMLVideoElement | null>(null)
const { stream, enabled } = useUserMedia({
  constraints: reactive({ video: { deviceId: currentCamera } }),
})

watchEffect(() => {
  if (video.value)
    video.value.srcObject = stream.value!
})

defineExpose({
  currentCamera,
  enabled,
})
</script>

<template>
  <div class="mx-auto max-w-md w-full flex flex-col items-center gap-6 text-center">
    <div class="w-full flex justify-center overflow-hidden border border-gray-200 rounded-lg bg-black/80 shadow-lg dark:border-gray-700">
      <video ref="video" autoplay controls muted class="h-a w-200 bg-black" />
    </div>
    <div class="mt-2 flex flex-wrap justify-center gap-2">
      <button
        v-for="camera in cameras"
        :key="camera.deviceId"
        class="border border-gray-300 rounded bg-gray-100 px-4 py-2 text-gray-700 transition-all duration-150 dark:border-gray-600 dark:bg-gray-800 hover:bg-blue-100 dark:text-gray-200 hover:text-blue-700 dark:hover:bg-blue-900/40 dark:hover:text-blue-200"
        :class="{ 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200': currentCamera === camera.deviceId }"
        @click="currentCamera = camera.deviceId"
      >
        {{ camera.label || `Camera` }}
      </button>
    </div>
    <button
      class="rounded bg-blue-600 px-6 py-2 text-white font-medium shadow transition hover:bg-blue-700"
      @click="enabled = !enabled"
    >
      {{ enabled ? 'Stop' : 'Start' }}
    </button>
  </div>
</template>
