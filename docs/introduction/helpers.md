---
order: 5
---

# Helpers <Package name="core"/>

## Testing if value is `Localizable`

When developing a custom library that integrates with **@localizer**, you may need to determine whether a given value is [`Localizable`](../api/_localizer/core/Localizable/index.md). This can be achieved using the [`isLocalizable()`](../api/_localizer/core/isLocalizable/index.md) function:

```typescript
import { isLocalizable, Localizable, getLocalizer } from '@localizer/core';

const localizer = getLocalizer('en-GB');

export function maybeLocalize(value: string | Localizable): string {
  if (isLocalizable(value)) {
    return localizer(value);
  } else {
    return value;
  }
}
```

## Localizing object properties

When working with complex objects, you may need to localize all [`Localizable`](../api/_localizer/core/Localizable/index.md) values while leaving other properties unchanged. This can be accomplished using the [`localizeObject()`](../api/_localizer/core/localizeObject/index.md) function:

```typescript
import { localizeObject, Localizable } from '@localizer/core';
import { translations } from './translations.js';

type Action = {
  id: string;
  caption: Localizable;
  handler: () => undefined;
};

const submitAction: Action = {
  id: 'submit',
  caption: translations.submit,
  handler: () => console.log('Submitted'),
};
const localizedSubmitAction = localizeObject(submitAction, 'ru-RU');
// {
//   id: 'submit',
//   caption: 'Отправить',
//   handler: () => console.log('Submitted')
// }
```

## Localizing array items

Similar to [localizing object properties](#localizing-object-properties), you can localize relevant entries in an array using the [`localizeArray()`](../api/_localizer/core/localizeArray/index.md) function. This function processes each item in the array, localizing only the values that are [`Localizable`](../api/_localizer/core/Localizable/index.md) while leaving other items unchanged.

```typescript
import { localizeArray, Localizable } from '@localizer/core';
import { translations } from './translations.js';

const actionTuple = ['submit', translations.submit];
const localizedActionTuple = localizeArray(actionTuple, 'ru-RU');
// ['submit', 'Отправить']
```

## Parsing locale code

Locale codes in the **@localizer** library follow the IETF BCP 47 standard, representing either a standalone language tag or a combination of a language tag and an ISO 3166-1 alpha-2 country code. The [`parseLocaleCode()`](../api/_localizer/core/parseLocaleCode/index.md) function splits a locale code into its components, returning a tuple with the language tag and, if present, the country code.

```typescript
import { parseLocaleCode } from '@localizer/core';

const enLocale = parseLocaleCode('en');
// ['en', undefined]

const enUsLocale = parseLocaleCode('en-US');
// ['en', 'US']
```

## Getting primary locale <Previeww/>

In some scenarios, you may need to determine the _primary_ locale associated with a given locale code. The [`getPrimaryLocale()`](../api/_localizer/core/getPrimaryLocale/index.md) function provides this capability:

```typescript
import { getPrimaryLocale } from '@localizer/core';

const primaryLocaleFinnishFinnish = getPrimaryLocale('fi-FI');
// 'fi-FI'

const primaryLocaleFinnishSwedish = getPrimaryLocale('sv-FI');
// 'fi-FI'
```

The primary locale is determined using [Nominatim](https://nominatim.org/) data, which identifies the predominant language spoken in the specified country.
