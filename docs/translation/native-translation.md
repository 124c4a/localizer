# Native translation support <Badge type="info" text="@localizer/translate" /><Badge type="warning" text="experimental" />

<script setup>
  import {getLocalizer, translate, translation, dictionary, loc} from '@localizer/all';
  import { plural } from '@localizer/all';
  import { one, two, few, many, other } from '@localizer/all';
  import { decimal } from '@localizer/all';

  const enUS = getLocalizer('en-US');
  const ruRU = getLocalizer('ru-RU');
  const fiFI = getLocalizer('fi-FI');
  const svFI = getLocalizer('sv-FI');
  const frFR = getLocalizer('fr-FR');

  const yes = translate({
    en: 'Yes',
    ru: 'Да'
  });

  const status = {
    status_en: 'Paid',
    status_fi: 'Maksettu',
    status_sv: 'Betald',
  };

  const dataSimple = {
    status: {
      en: 'Paid',
      fi: 'Maksettu',
      sv: 'Betald',
    },
  };

  const dataFormatter = translate((it) => ({
    en: it.status_en,
    fi: it.status_fi,
    sv: it.status_sv
  }));

  const translations = dictionary({
  yes: {
    en: 'Yes',
    fr: 'Oui',
    es: 'Sí',
    de: 'Ja',
  },
  no: {
    en: 'No',
    fr: 'Non',
    es: 'No',
    de: 'Nein',
  },
});

const filesTranslations = dictionary({
  files: (count) => ({
    en: loc`${decimal(count)} files`,
    fi: loc`${decimal(count)} tiedostoa`,
    sv: loc`${decimal(count)} filer`,
  }),
});

  const pluralTranslations = dictionary({
    files: (count) => ({
      en: plural(count, {
        0: 'No files',
        [one]: loc`${decimal(count)} file`,
        [two]: loc`${decimal(count)} files`,
        [other]: loc`${decimal(count)} files`,
      }),
      fi: plural(count, {
        0: 'Ei tiedostoja',
        [one]: loc`${decimal(count)} tiedosto`,
        [two]: loc`${decimal(count)} tiedostoa`,
        [other]: loc`${decimal(count)} tiedostoa`,
      }),
      sv: plural(count, {
        0: 'Inga filer',
        [two]: loc`${decimal(count)} fil`,
        [other]: loc`${decimal(count)} filer`,
        [other]: loc`${decimal(count)} filer`,
      }),
    }),
  });


</script>

The TypeScript-native translation support provides two primary primitives: `translate()` for specifying individual translatable values, and `dictionary()` for organizing comprehensive sets of translations. Additionally, the `plural()` processor enables the creation of nuanced and context-aware pluralization rules, making complex translations more intuitive and manageable.

## Individual translations

To define standalone individual translations, use the [`translate()`](../api/_localizer/translate/translate/index.md) function. This function operates in two modes:

- Static mode: Ideal for predefined translations that do not depend on runtime data.
- Dynamic mode: Suitable for translations derived from runtime data, such as backend responses.

### Static translations

```typescript
import { getLocalizer } from '@localizer/core';
import { translate } from '@localizer/translate'; // [!code focus]

const enUS = getLocalizer('en-US');
const ruRU = getLocalizer('ru-RU');

// [!code focus:4]
const yes = translate({
  en: 'Yes',
  ru: 'Да',
});

console.log(enUS(yes));
console.log(ruRU(yes));
```

```console-vue
{{ enUS(yes) }}
{{ ruRU(yes) }}
```

Unlike a basic localization function that relies on a `switch(locale) { ... }` construct, this approach leverages [locale resolution](../introduction/localizer.md#locale-resolution). This ensures that translations are dynamically resolved based on the most appropriate locale, providing greater flexibility and accuracy in multilingual applications.

::: tip

The values in the [`TranslationMap`](../api/_localizer/translate/TranslationMap/index.md) can be either strings or `Localizable` values

:::

### Dynamic translations

Dynamic translation support is particularly useful when dealing with backend responses that include embedded translations. For example:

```json
{
  "status_en": "Paid",
  "status_fi": "Maksettu",
  "status_sv": "Betald"
}
```

To process such data, the dynamic variant of the `translate()` function can be utilized:

```typescript
// ...

const data = {
  status_en: 'Paid',
  status_fi: 'Maksettu',
  status_sv: 'Betald',
};

const dataFormatter = translate<typeof data>((it) => ({
  en: it.status_en,
  fi: it.status_fi,
  sv: it.status_sv,
}));

const enUS = getLocalizer('en-US');
const fiFI = getLocalizer('fi-FI');

console.log(enUS(dataFormatter(data)));
console.log(fiFI(dataFormatter(data)));
```

```console-vue
{{ enUS(dataFormatter(status)) }}
{{ fiFI(dataFormatter(status)) }}
```

For simpler cases where the data structure directly aligns with the [`TranslationMap`](../api/_localizer/translate/TranslationMap/index.md), the library offers the [`translation`](../api/_localizer/translate/translation/index.md) value formatter. This is particularly useful for straightforward mappings without additional processing:

```typescript
// ...

const dataSimple = {
  status: {
    en: 'Paid',
    fi: 'Maksettu',
    sv: 'Betald',
  },
};

const enUS = getLocalizer('en-US');
const fiFI = getLocalizer('fi-FI');

console.log(enUS(translation(dataSimple.status))); // Outputs: "Paid"
console.log(fiFI(translation(dataSimple.status))); // Outputs: "Maksettu"
```

```console-vue
{{ enUS(translation(dataSimple.status)) }}
{{ fiFI(translation(dataSimple.status)) }}
```

This approach simplifies the translation process when the data structure is already in a format compatible with the library's expectations.

## Dictionaries

Several individual translations can be combined to form a dictionary using [`dictionary()`](../api/_localizer/translate/dictionary/index.md) function:

```typescript
import { getLocalizer } from '@localizer/core';
import { translate } from '@localizer/translate'; // [!code focus]

const enUS = getLocalizer('en-US');
const frFR = getLocalizer('fr-FR');

// [!code focus:14]
const translations = dictionary({
  yes: {
    en: 'Yes',
    fr: 'Oui',
    es: 'Sí',
    de: 'Ja',
  },
  no: {
    en: 'No',
    fr: 'Non',
    es: 'No',
    de: 'Nein',
  },
});

console.log(enUS(translations.yes));
console.log(frFR(translations.yes));
```

```console-vue
{{enUS(translations.yes)}}
{{frFR(translations.yes)}}
```

Similar to `translate()`, the values in a dictionary can either be a [`TranslationMap`](../api/_localizer/translate/TranslationMap/index.md) or functions that generate a `TranslationMap`. Using functions allows for more complex translations that accept arguments, enabling dynamic and context-sensitive localization:

```typescript
import { getLocalizer } from '@localizer/core';
import { decimal } from '@localizer/format';
import { dictionary } from '@localizer/translate'; // [!code focus]

const enUS = getLocalizer('en-US');
const fiFI = getLocalizer('fi-FI');
const svFI = getLocalizer('sv-FI');

// [!code focus:7]
const translations = dictionary({
  files: (count: number) => ({
    en: loc`${decimal(count)} files`,
    fi: loc`${decimal(count)} tiedostoa`,
    sv: loc`${decimal(count)} filer`,
  }),
});

console.log(enUS(translations.files(0)));
console.log(fiFI(translations.files(1)));
console.log(svFI(translations.files(101)));
```

```console-vue
{{enUS(filesTranslations.files(0))}}
{{fiFI(filesTranslations.files(1))}}
{{svFI(filesTranslations.files(101))}}
```

::: warning Be cautious with translation maps

When defining translation maps, avoid using native string interpolation directly, as it can lead to inconsistencies. Instead, use the library's value formatting utilities to ensure proper localization:

```typescript
const translations = dictionary({
  files: (count: number) => ({
    en: `${count} files`, // ❌ Avoid native string interpolation
    fi: `${count} tiedostoa`,
    sv: `${count} filer`,
  }),
});
```

While this approach might work in simple cases, it bypasses the library's formatting capabilities, such as handling locale-specific number formatting. A better solution is to use the `loc` and `decimal` utilities:

```typescript
const translations = dictionary({
  files: (count: number) => ({
    en: loc`${decimal(count)} files`, // ✅ Use value formatting for consistency
    fi: loc`${decimal(count)} tiedostoa`,
    sv: loc`${decimal(count)} filer`,
  }),
});
```

This ensures that translations are consistent and adhere to locale-specific formatting rules.

:::

## Pluralization

The example with file counts demonstrates the use of the [`plural()`](../api/_localizer/translate/plural/index.md) function to handle pluralization rules for different languages. This function enables precise and locale-specific pluralization, ensuring that translations are grammatically correct and contextually appropriate.

Here is how the `plural()` function can be used to define translations for file counts:

```typescript
import { getLocalizer } from '@localizer/core';
import { decimal } from '@localizer/format';
import { dictionary, plural } from '@localizer/translate'; // [!code focus]
import { one, two, few, many, other } from '@localizer/translate'; // [!code focus]

const enUS = getLocalizer('en-US');
const fiFI = getLocalizer('fi-FI');
const svFI = getLocalizer('sv-FI');

// [!code focus:19]
const translations = dictionary({
  files: (count: number) => ({
    en: plural(count, {
      0: 'No files',
      [one]: loc`${decimal(count)} file`,
      [other]: loc`${decimal(count)} files`,
    }),
    fi: plural(count, {
      0: 'Ei tiedostoja',
      [one]: loc`${decimal(count)} tiedosto`,
      [other]: loc`${decimal(count)} tiedostoa`,
    }),
    sv: plural(count, {
      0: 'Inga filer',
      [one]: loc`${decimal(count)} fil`,
      [other]: loc`${decimal(count)} filer`,
    }),
  }),
});

console.log(enUS(translations.files(0)));
console.log(fiFI(translations.files(1)));
console.log(svFI(translations.files(101)));
```

```console-vue
{{enUS(pluralTranslations.files(0))}}
{{fiFI(pluralTranslations.files(1))}}
{{svFI(pluralTranslations.files(101))}}
```

By leveraging the `plural()` function, you can define flexible and accurate pluralization rules for each language, ensuring that your application provides a seamless multilingual experience.
