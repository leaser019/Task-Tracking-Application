import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import translationEN from '../locales/en/en'
import translationVI from '../locales/vi/vi'

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
