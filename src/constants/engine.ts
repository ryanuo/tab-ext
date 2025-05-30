import metasoIcon from '~/assets/icon/metaso.svg?url'

export const initEngineData: Engines[] = [
  {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    icon: 'i-jam-bing',
    translateUrl: 'https://www.bing.com/translator?fromLang=zh-Hans&toLang=en&text=',
  },
  {
    name: 'Baidu',
    url: 'https://www.baidu.com/s?wd=',
    icon: 'i-ri-baidu-fill',
    translateUrl: 'https://fanyi.baidu.com/mtpe-individual/multimodal?query=',
  },
  {
    name: 'Yandex',
    url: 'https://yandex.com/search/?text=',
    icon: 'i-tabler-brand-yandex',
    translateUrl: 'https://translate.yandex.com/?lang=auto-en&text=',
  },
  {
    name: 'Google',
    url: 'https://www.google.com.hk/search?q=',
    icon: 'i-mingcute-google-fill',
    translateUrl: 'https://translate.google.com?op=translate&tl=en&text=',
  },
  {
    name: 'Github',
    url: 'https://github.com/search?q=',
    icon: 'i-fa6-brands-github',
  },
  {
    name: 'Bilibili',
    url: 'https://search.bilibili.com/all?keyword=',
    icon: 'i-ri-bilibili-fill',
  },
  {
    name: 'StackOverflow',
    url: 'https://stackoverflow.com/search?q=',
    icon: 'i-fa6-brands-stack-overflow',
  },
  {
    name: 'v2ex',
    url: 'https://www.sov2ex.com/?q=',
    icon: 'i-simple-icons-v2ex',
  },
  {
    name: 'Metaso',
    url: 'https://metaso.cn/?q=',
    iconUrl: metasoIcon,
  },
]
