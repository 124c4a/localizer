---
order: 3
---

# Localizable <Package name="core"/>

Localizable is a core concept in **@localizer**, representing values that adapt their output based on the locale. Examples include translations, formatted data, and other locale-dependent values.

## String constants

Constant localizable values are used for fixed, locale-independent content like empty strings or special characters. Define them with the [`loc`](../api/_localizer/core/loc/index.md) template literal:

```typescript
import { loc } from '@localizer/core';

const minusSign = loc`-`;
```

## String templates

`loc` allows combining multiple [`Localizable`](../api/_localizer/core/Localizable/index.md) values or embedding locale-aware data directly within a string:

```typescript
import { loc, Localizable } from '@localizer/core';
import { currency } from '@localizer/format';

export function productPrice(name: Localizable, price: number): Localizable {
  return loc`${name}: ${currency(price, 'EUR')}`;
}
```

Ensure all interpolated values are localized for consistency across locales. Only [`Localizable`](../api/_localizer/core/Localizable/index.md) values can be used in template strings, preventing unintended stringification and ensuring proper locale-specific formatting.

## Generic values

In advanced scenarios, use the generic [`loc()`](../api/_localizer/core/loc/index.md) function to define custom logic for generating locale-specific values of any type.

```typescript
import { loc } from '@localizer/core';

// --- String Example ---

const currentLocaleCode: Localizable = loc((locale) => locale);

// --- Object Example ---

type GenericObject = {
  locale?: LocaleCode;
};

const genericObject: Localizable<GenericObject> = loc((locale) => {
  return locale ? { locale } : {};
});
```

This flexibility enables creating complex, locale-aware objects or values while adhering to consistent localization principles.

::: warning

When creating custom [`Localizable`](../api/_localizer/core/Localizable/index.md) functions, ensure they handle `null` locales gracefully. This ensures compatibility with the [`TestLocalizer`](./localizer.md#testlocalizer), which uses `null` to produce locale-independent values.

:::
