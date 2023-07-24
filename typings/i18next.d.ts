/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next'

import type common from '@/public/locales/en/common.json'
import type terms from '@/public/locales/en/terms.json'
import type privacy from '@/public/locales/en/privacy.json'

interface I18nNamespaces {
  common: typeof common;
  terms: typeof terms;
  privacy: typeof privacy;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: I18nNamespaces;
  }
}
