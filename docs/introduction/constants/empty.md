---
title: empty
entity:
  type: constant
  pkg: core
  name: Empty
  summary: Empty string
  example: Empty
  fn: () => Empty
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# Empty <Package name="core"/>

This constant renders empty string.

## Usage

```typescript twoslash
import { Empty } from '@localizer/core';

const result = Empty;
```

## Demo

<EntityDemo :args="[]" />

## See also

<Entities />
