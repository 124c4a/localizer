---
order: 6
title: Custom data types
---

# Lookup <Badge type="tip" text="preview" /><Badge type="info" text="@localizer/format-lookup" />

> **[lookupFormatter](../../api/_localizer/format-lookup/lookupFormatter/index.md)**<`T`> ( `lut` ): [ValueFormatter](../index.md#valueformatter-t)<`T`>
>
> - `T` - The type of value to format.

This formatter ensures type safety while handling complex or unconventional value types.

## Look-up table

The behavior of the formatter is governed by the look-up table (`lut`). This table is an object where the keys represent possible values (if `T` is a string or number) or special symbols for null-ish, undefined, and null values. The values in the object can either be [Localizable](../../introduction/localizable.md) values or [value formatters](../index.md#what-are-formatters).

This formatter behaves similarly to a JavaScript `switch` statement but offers a more concise syntax.

| `lut` Key            | `lut` Value                                                  | Condition                                                     |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| _number_ or _string_ | A localizable value or a formatter used to format the value. | When the formatter argument matches the key.                  |
| `[UndefinedValue]`   | A localizable value.                                         | When `undefined` is passed to the formatter.                  |
| `[NullValue]`        | A localizable value.                                         | When `null` is passed to the formatter.                       |
| `[NoValue]`          | A localizable value.                                         | When either `undefined` or `null` is passed to the formatter. |
| `[DefaultValue]`     | A localizable value or a formatter used to format the value. | When none of the other conditions are met.                    |

## Typical use

This formatter is particularly well-suited for formatting enum-like value types, where a predefined set of possible values is mapped to specific localized strings or formatting logic:

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
