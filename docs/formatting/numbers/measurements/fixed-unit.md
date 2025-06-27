---
order: 10
---

# Fixed unit <Badge type="info" text="@localizer/format-number" />

> **[fixedUnitFormatter](../../../api/_localizer/format-number/fixedUnitFormatter/index.md)**<`T`> ( `unit` , `options?` ): [ValueFormatter](../../index.md#valueformatter-t)<`T`>
>
> - `T` _extends number | bigint_ - The type of value to format.
> - `unit` - The [measurement unit](../../../api/_localizer/format-number/Unit/index.md) to use for value formatting.
> - `options` - Optional [configuration of the formatter](../options/index.md).

This formatter is ideal for displaying measurements with a fixed, predefined unit.

::: tip

If the unit is not predetermined, consider using the [unit formatter](unit.md) instead. It dynamically adapts to various units, making it a versatile choice for scenarios where the unit type may vary.

:::
