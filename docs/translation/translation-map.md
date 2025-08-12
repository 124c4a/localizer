---
entity:
  type: other
  pkg: translate
  name: translationMap
  summary: Formatter for complex values containing translations.
  example: loc`Translation map`
  configurable: true
  maturity: alpha
  related:
    - lookupFormatter
---

# Translation map <Package name="translate"/> <Experimental/>

<script setup>
import { translationMap } from '@localizer/translate';

const yes = translationMap({
  en: 'Yes',
  fr: 'Oui',
  es: 'Sí',
  de: 'Ja',
});

const status = {
  en: 'Paid',
  fi: 'Maksettu',
  sv: 'Betald',
}
</script>

A translation map defines a single [`Localizable`](../introduction/localizable.md) value by mapping locale codes to their corresponding translations. This allows you to represent a localized string or value in multiple languages within one object.

```typescript twoslash
import { getLocalizer } from '@localizer/core';
import { translationMap } from '@localizer/translate';

const yes = translationMap({
  en: 'Yes',
  fr: 'Oui',
  es: 'Sí',
  de: 'Ja',
});

const localizer = getLocalizer('en-US');

console.log(localizer(yes));
```

```console-vue
{{ yes.localize('en-US') }}
```

Translation map values can be plain strings or any other [`Localizable`](../introduction/localizable.md) objects, allowing for flexible and composable localization.

::: warning

Translation maps do not support value placeholders or variable interpolation. If you need to include dynamic or formatted values within your translations, use the [`dictionary`](./dictionary.md) instead, which is based on a complete [Unicode MessageFormat 2.0](https://messageformat.unicode.org/docs/quick-start/) implementation.

:::

## Basic value formatting

You can also use `translationMap` as a formatter for values that represent translations, which is especially useful when translations are dynamically provided by a backend or external source.

```typescript twoslash
import { getLocalizer } from '@localizer/core';
import { translationMap } from '@localizer/translate';

const invoiceStatus = {
  en: 'Paid',
  fi: 'Maksettu',
  sv: 'Betald',
}; // As received from backend

const localizer = getLocalizer('en-US');

console.log(localizer(translationMap(invoiceStatus)));
```

```console-vue
{{ translationMap(status).localize('en-US') }}
```

## Advanced value formatting

If the value received from the backend does not directly match the `Record<LocaleCode, string>` shape, you can provide a mapping function to transform the data into the expected format:

```typescript twoslash
import { getLocalizer } from '@localizer/core';
import { translationMap } from '@localizer/translate';

const invoice = {
  status_en: 'Paid',
  status_fi: 'Maksettu',
  status_sv: 'Betald',
}; // As received from backend

const invoiceStatus = translationMap((value: typeof invoice) => ({
  en: value.status_en,
  fi: value.status_fi,
  sv: value.status_sv,
}));

const localizer = getLocalizer('en-US');

console.log(localizer(invoiceStatus(invoice)));
```

```console-vue
{{ translationMap(status).localize('en-US') }}
```

## See also

<Entities />
