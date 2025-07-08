---
entity:
  type: constant
  pkg: format
  name: RangeSeparator
  summary: Represents generic range separator.
  example: RangeSeparator
  fn: () => RangeSeparator
  configurable: false
  maturity: public
  related:
    - DecimalSeparator
    - ThousandSeparator
---

# RangeSeparator <Package name="format"/>

Represents generic range separator.

## Usage

```typescript twoslash
import { RangeSeparator } from '@localizer/format';

const result = RangeSeparator;
```

## Demo

<EntityDemo :args="[]" />

## See also

<Entities />
