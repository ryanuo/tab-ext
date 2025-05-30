// src/composables/useDateTime.ts
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { dayjs } from '@ryanuo/utils'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import localeEn from 'dayjs/locale/en'
import localeZh from 'dayjs/locale/zh-cn'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useSettingsStore } from '~/store/option/settings'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(weekday)
dayjs.extend(advancedFormat)

export function useDateTime() {
  const currentDateTime = ref('')
  let timer: number | null = null
  const settings = useSettingsStore()

  const currentDateWeek = computed(() => {
    const isEn = settings.language === 'en-US'
    return dayjs().locale(isEn ? localeEn : localeZh).format(
      isEn ? 'MMMM Do, ddd' : 'M 月 D 日 ddd',
    )
  })

  const getTimeFormat = () => {
    if (settings.showSeconds) {
      return settings.is24Hour ? 'HH:mm:ss' : 'h:mm:ss A'
    }

    return settings.is24Hour ? 'HH:mm' : 'h:mm A'
  }

  const updateDateTime = () => {
    const now = settings.timezone
      ? dayjs.tz(new Date(), settings.timezone)
      : dayjs.tz(new Date())
    currentDateTime.value = now.format(getTimeFormat())
  }

  onMounted(() => {
    updateDateTime()
    timer = setInterval(updateDateTime, 1000) as unknown as number
  })

  // 使用 watch 监听 settings.timezone 变化
  watch(
    () => settings.timezone,
    (newTimeZone) => {
      if (newTimeZone) {
        dayjs.tz.setDefault(newTimeZone)
      }
    },
    { immediate: true },
  )

  // 当 is24Hour 变化时重新更新时间格式
  watch(
    [
      () => settings.is24Hour,
      () => settings.showSeconds,
    ],
    () => {
      updateDateTime()
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (timer)
      clearInterval(timer)
  })

  return {
    currentDateTime,
    currentDateWeek,
    getTimeFormat,
    updateDateTime,
  }
}
