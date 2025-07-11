---
order: 6
---

# Transformations <Package name="transform"/>

<script setup>
import { useLocalizer } from '@localizer/x-vue';
import { date, countryName } from '@localizer/format';
import { transform, upperCase, usePrimaryLocale } from '@localizer/transform';

const { localize } = useLocalizer();
</script>

Sometimes, you may need to perform additional processing on the results of formatting or translation. Common use cases include altering the character case. Since character case transformations can depend on locale-specific rules, the library offers a suite of transformation utilities that seamlessly integrate with its core functionality.

The primary method for applying transformations is the [`transform()`](../../api/_localizer/transform/transform/index.md) function. This utility allows you to modify the output of a `Localizable` object by applying a sequence of transformations. Each transformation is applied in the order specified, enabling flexible and powerful customization of localized content.

```typescript
import { getLocalizer } from '@localizer/core';
import { countryName } from '@localizer/format';
import { transform } from '@localizer/transform'; // [!code highlight]

const localizer = getLocalizer('en-US');
const someLocalizable = countryName('FI');

const transformed = transform(someLocalizable, [upperCase]); // [!code highlight]
console.log(localizer(transformed));
```

```console-vue
{{localize(transform(countryName('FI'), [upperCase]))}}
```

You can also apply `transform()` directly to a value formatter. This creates a new value formatter that automatically applies the specified transformations to its output:

```typescript
import { getLocalizer } from '@localizer/core';
import { countryName } from '@localizer/format';
import { transform } from '@localizer/transform'; // [!code highlight]

const localizer = getLocalizer('en-US');
const transformedValueFormatter = transform(countryName, [upperCase]); // [!code highlight]

console.log(localizer(transformedValueFormatter('FI')));
```

```console-vue
{{localize(transform(countryName, [upperCase])('FI'))}}
```

The second argument of `transform()` method is an array of [transformers](../../api/_localizer/transform/Transformer/index.md). These transformers are applied sequentially to modify the result, offering a flexible way to customize localized content.

## String transformations

<Entities type="transformer" />

## Locale Transformations

Unlike [string transformations](#string-transformations), locale transformations enable you to override the locale used during the localization process. These transformations are particularly useful when you need to ensure consistent formatting or behavior across different locales, regardless of the user's selected language or region.

### Using primary locale <Preview/>

This transformer enables the use of the [primary language for a country](../../introduction/helpers.md#getting-primary-locale) instead of the provided locale. This can be particularly useful in scenarios where consistent data formatting is preferred, regardless of the selected spoken language.

```typescript
const fiFI = getLocalizer('fi-FI');
const svFI = getLocalizer('sv-FI');

const localizedDate = date(new Date());

console.log(fiFI(localizedDate));
console.log(svFI(localizedDate));
```

```console-vue
{{ date(new Date()).localize('fi-FI') }}
{{ date(new Date()).localize('sv-FI') }}
```

In Finland, the standard localization for the Swedish language may lead to unexpected results for some users. The [`usePrimaryLocale`](../../api/_localizer/transform/usePrimaryLocale/index.md) transformer helps ensure consistency by applying the primary locale for the region, making the localized output more intuitive and contextually appropriate.

```typescript
const fiFI = getLocalizer('fi-FI');
const svFI = getLocalizer('sv-FI');

const fixedDate = transform(date, [usePrimaryLocale]); // [!code ++]

const localizedDate = date(new Date()); // [!code --]
const localizedDate = fixedDate(new Date()); // [!code ++]

console.log(fiFI(localizedDate));
console.log(svFI(localizedDate));
```

```console-vue
{{ transform(date, [usePrimaryLocale])(new Date()).localize('fi-FI') }}
{{ transform(date, [usePrimaryLocale])(new Date()).localize('sv-FI') }}
```
