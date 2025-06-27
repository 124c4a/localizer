---
order: 6
title: Custom data types
---

# Lookup <Badge type="tip" text="preview" /><Badge type="info" text="@localizer/format-lookup" />

> **[lookupFormatter](../../api/_localizer/format-lookup/lookupFormatter/index.md)**<`T`> ( `lut` ): [ValueFormatter](../index.md#valueformatter-t)<`T`>
>
> - `T` - The type of value to format.
>   This formatter ensures type safety and simplifies handling of unconventional value types.

## Look-up table

The formatter uses a look-up table (`lut`) to map keys to values. Keys can be strings, numbers, or special symbols for `null`, `undefined`, or both. Values can be [Localizable](../../introduction/localizable.md) items or [value formatters](../index.md#what-are-formatters).

This formatter works like a JavaScript `switch` statement but with a cleaner, more compact syntax.

| `lut` Key            | `lut` Value                                                  | Condition                                                     |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| _number_ or _string_ | A localizable value or a formatter used to format the value. | When the formatter argument matches the key.                  |
| `[UndefinedValue]`   | A localizable value.                                         | When `undefined` is passed to the formatter.                  |
| `[NullValue]`        | A localizable value.                                         | When `null` is passed to the formatter.                       |
| `[NoValue]`          | A localizable value.                                         | When either `undefined` or `null` is passed to the formatter. |
| `[DefaultValue]`     | A localizable value or a formatter used to format the value. | When none of the other conditions are met.                    |

## Typical use

This formatter is ideal for formatting enum-like values, mapping predefined keys to localized strings or custom formatting logic.

```typescript
import { lookupFormatter } from '@localizer/format-lookup';
import { translations } from './translations.js';

const lookupTable = {
  UPLOAD: translations.upload,
  DOWNLOAD: translations.download,
} as const;

export type Direction = keyof typeof lookupTable;

export const directionFormatter = lookupFormatter<Direction>(lookupTable);
```
