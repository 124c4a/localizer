---
title: decimal separator
entity:
  type: constant
  pkg: format
  name: DecimalSeparator
  summary: Decimal separator
  example: DecimalSeparator
  fn: () => DecimalSeparator
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# DecimalSeparator <Package name="format"/>

This constant renders decimal separator for numeric values.

## Usage

```typescript twoslash
import { DecimalSeparator } from '@localizer/format';

const result = DecimalSeparator;
```

## Demo

<EntityDemo :args="[]" />

## See also

<Entities />
