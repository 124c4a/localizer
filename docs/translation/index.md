---
order: 2
---

# Translation

Translation support is a cornerstone of any effective localization library, and **@localizer** excels in this area. The library provides two primitives for dealing with translations:

- [Translation maps](./translation-map.md), that provide a straightforward way of representing single `Localizable` values.
- [Dictionaries](#), enabling usage of complete dictionaries with built-in support for lazy loading of translations.

## `translationMap`

Translation map represents a single [`Localizable`](../introduction/localizable.md), defined by a map of locale codes to translations.

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

```console
{{ yes.localize('en-US') }}
```

The values in the translation maps could be either strings or other `Localizable` values.

The library provides [translation support for TypeScript](./native-translation.md). This functionality is built upon [localizable types](../introduction/localizable.md), [value formatting](../formatting/index.md) and follows [Unicode MessageFormat 2.0](https://unicode.org/reports/tr35/tr35-messageFormat.html) standard, ensuring smooth and efficient integration with TypeScript-based projects.
