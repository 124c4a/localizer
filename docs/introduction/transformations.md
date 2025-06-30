---
order: 6
---

# Transformations <Badge type="info" text="@localizer/transform" />

<script setup>
import { getLocalizer, transform, loc, date, apply, countryName, upperCase, lowerCase, capitalize, apply as applyFn, usePrimaryLocale } from '@localizer/all';

const localizer = getLocalizer('en-US');
</script>

Sometime you need to apply some post-processing to the results of formatting or translation. Typical examples are changing the character case. Since character case change rules are also locale-dependent, the library provides a set of transformation utilities, that naturally integrates with the rest.

The main way to apply transformation is to use [`transform()`](../api/_localizer/transform/transform/index.md) method:

```typescript
import { getLocalizer } from '@localizer/core';
import { countryName } from '@localizer/format';
import { transform } from '@localizer/transform'; // [!code focus]

const localizer = getLocalizer('en-US');
const someLocalizable = countryName('FI');

const transformed = transform(someLocalizable, [upperCase]); // [!code focus]
console.log(localizer(transformed));
```

```console-vue
{{localizer(transform(countryName('FI'), [upperCase]))}}
```

The second argument of `transform()` method is an array of [transformers](../api/_localizer/transform/Transformer/index.md) to apply to the result sequentially.

::: tip

Most of configurable [value formatters](../formatting/index.md) allow to specify transformers in the formatter options.

:::

## String transformations

### Converting to lower case

To convert `Localizable` to lower case, use [`lowerCase`](../api/_localizer/transform/lowerCase/index.md). This transformers changes each character to corresponding lower-case version in a locale-aware manner.

```typescript
const transformed = transform(loc`strING`, [lowerCase]);
console.log(localizer(transformer));
```

```console-vue
{{localizer(transform(loc`strING`, [lowerCase]))}}
```

### Converting to upper case

To convert `Localizable` to upper case, use [`upperCase`](../api/_localizer/transform/upperCase/index.md). This transformers changes each character to corresponding upper-case version in a locale-aware manner.

```typescript
const transformed = transform(loc`strING`, [upperCase]);
console.log(localizer(transformer));
```

```console-vue
{{localizer(transform(loc`strING`, [upperCase]))}}
```

### Converting to title case

To convert `Localizable` to title case (capitalize), use [`capitalize`](../api/_localizer/transform/capitalize/index.md). This transformers changes the first character to corresponding upper-case version in a locale-aware manner.

```typescript
const transformed = transform(loc`strING`, [capitalize]);
console.log(localizer(transformer));
```

```console-vue
{{localizer(transform(loc`strING`, [capitalize]))}}
```

### Applying custom transformation

It is possible to apply custom string transformations using [`apply`](../api/_localizer/transform/apply/index.md) transformer factory.

```typescript
const bold = apply((text) => `**${text}**`);
const transformed = transform(loc`strING`, [bold]);
console.log(localizer(transformer));
```

```console-vue
{{localizer(transform(loc`strING`, [applyFn((text) => `**${text}**`)]))}}
```

::: info NOTE

Such transformations are locale-agnostic. If you need a locale-aware transformation, you can create a custom transformer by implementing [`Transformer`](../api/_localizer/transform/Transformer/index.md) type:

```typescript
const bold = (localizable) => loc`**${localizable}**`;
const transformed = transform(loc`strING`, [bold]);
console.log(localizer(transformer));
```

:::

## Locale transformations

In contrast to [string transformations](#string-transformations), these transformers allow to override the locale that is used for localization.

### Using primary locale <Badge type="tip" text="preview" />

This transformer allows to use [primary language for country](../introduction/helpers.md#getting-primary-locale) istead of supplied locale. This might come useful for example in the scenarios where it is desirable to have unified data formatting regardless of selected spoken language:

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

In this case, localization follows standard for swedish language, which might be confusing for people living in Finland. [`usePrimaryLocale`](../api/_localizer/transform/usePrimaryLocale/index.md) transformer allows to make this more consistent:

```typescript
const fiFI = getLocalizer('fi-FI');
const svFI = getLocalizer('sv-FI');

const localizedDate = date(new Date()); // [!code --]
const localizedDate = transform(date(new Date()), [usePrimaryLocale]); // [!code ++]

console.log(fiFI(localizedDate));
console.log(svFI(localizedDate));
```

```console-vue
{{ transform(date(new Date()), [usePrimaryLocale]).localize('fi-FI') }}
{{ transform(date(new Date()), [usePrimaryLocale]).localize('sv-FI') }}
```
