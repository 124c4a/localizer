---
entity:
  type: other
  pkg: format-lookup
  name: lookupFormatter
  summary: Configurable formatter based on look-up tables.
  example: loc`Lookup formatter`
  configurable: true
  maturity: beta
---

# lookupFormatter <Preview /> <Package name="format-lookup"/>

The formatter uses a look-up table (`lut`) to map keys to values. Keys can be strings, numbers, or special symbols for `null`, `undefined`, or both. Values can be [Localizable](../../introduction/localizable.md) items or [value formatters](../introduction.md).

This formatter works like a JavaScript `switch` statement but with a cleaner, more compact syntax.

| `lut` Key            | `lut` Value                                                  | Condition                                                     |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| _number_ or _string_ | A localizable value or a formatter used to format the value. | When the formatter argument matches the key.                  |
| `[UndefinedValue]`   | A localizable value.                                         | When `undefined` is passed to the formatter.                  |
| `[NullValue]`        | A localizable value.                                         | When `null` is passed to the formatter.                       |
| `[NoValue]`          | A localizable value.                                         | When either `undefined` or `null` is passed to the formatter. |
| `[DefaultValue]`     | A localizable value or a formatter used to format the value. | When none of the other conditions are met.                    |

## Usage

```typescript twoslash
import { loc } from '@localizer/core';
import { lookupFormatter, NoValue, DefaultValue } from '@localizer/format-lookup';

const lookupTable = {
  0: loc`No`,
  [NoValue]: loc`No`,
  [DefaultValue]: loc`Yes`,
};

const formatter = lookupFormatter<number | null | undefined>(lookupTable);

const result = formatter(1);
```
