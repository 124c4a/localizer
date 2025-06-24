---
order: 3
---

# Localizable <Badge type="info" text="@localizer/core" />

Localizable is the core primitive of the `@localizer` library. It encapsulates values that can adapt their output based on the locale. Examples include translations, formatted data, locale-aware comparators, and other objects or values that depend on regional settings.

## String constants

Constant localizable values are useful for wrapping fixed, locale-independent values such as empty strings, special characters, or other static content. These constants can be defined using the `loc` template literal:

```typescript
import { loc } from '@localizer/core';

const minusSign = loc`-`;
```

## String templates

Being a template literal, `loc` enables advanced interpolation capabilities. This allows you to seamlessly combine multiple `Localizable` values or embed locale-aware data directly within the string:

```typescript
import { loc, Localizable } from '@localizer/core';
import { currency } from '@localizer/format';

export function productPrice(name: Localizable, price: number): Localizable {
  return loc`${name}: ${currency(price, 'EUR')}`;
}
```

This approach ensures that all interpolated values are properly localized, maintaining consistency across different locales.

Only `Localizable` values are allowed as arguments in a template string. This restriction ensures that all interpolated content is properly localized, preventing unintended generic stringification when locale-specific formatting is required.

## Generic values

In more advanced scenarios, where the type of the localizable value is not a `string`, you can use the generic `loc()` function. This allows you to define custom logic for generating locale-specific values of any type:

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

This flexibility makes it possible to create complex, locale-aware objects or values while maintaining the same consistent localization principles.

::: warning
When implementing custom functions for `Localizable`, ensure they gracefully handle scenarios where the `locale` argument is `null`. This behavior is essential for compatibility with the [`IdentityLocalizer`](./localizer.md#identitylocalizer), which relies on a `null` locale to generate stable, locale-independent identifiers.
:::
