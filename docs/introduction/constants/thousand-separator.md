---
title: thousand separator
entity:
  type: constant
  pkg: format
  name: ThousandSeparator
  summary: Thousand separator
  example: ThousandSeparator
  fn: () => ThousandSeparator
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# ThousandSeparator <Package name="format"/>

This constant renders thousand separator for numeric values.

## Usage

```typescript twoslash
import { ThousandSeparator } from '@localizer/format';

const result = ThousandSeparator;
```

## Demo

<EntityDemo :args="[]" />

## See also

<Entities />
