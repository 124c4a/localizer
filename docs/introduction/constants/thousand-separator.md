---
entity:
  type: constant
  pkg: format
  name: ThousandSeparator
  summary: Represents thousand separator for numeric values.
  example: ThousandSeparator
  fn: () => ThousandSeparator
  configurable: false
  maturity: public
  related:
    - decimalFormatter
---

# ThousandSeparator <Package name="format"/>

Represents thousand separator for numeric values.

## Usage

```typescript twoslash
import { ThousandSeparator } from '@localizer/format';

const result = ThousandSeparator;
```

## Demo

<EntityDemo :args="[]" />

## See also

<Entities />
