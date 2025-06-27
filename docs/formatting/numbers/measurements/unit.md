---
order: 9
---

# Unit <Badge type="info" text="@localizer/format-number" />

> **[unitFormatter](../../../api/_localizer/format-number/unitFormatter/index.md)**<`T`> ( `options?` ): [UnitValueFormatter](../../index.md#unitvalueformattert-u)<`T`, [Unit](../../../api/_localizer/format-number/Unit/index.md)>
>
> - `T` _extends number | bigint_ - The type of value to format.
> - `options` - Optional [configuration of the formatter](../options/index.md).

Use this formatter to represent measurements in different units.

::: tip

If you prefer to use default settings, consider using a [preconfigured unit formatter](../../preconfigured-formatters/numbers/unit.md). It simplifies the process by providing a ready-to-use configuration for common use cases.

:::

::: tip

If the unit is predetermined, you might find the [fixed unit formatter](fixed-unit.md) more suitable. It is optimized for scenarios where the unit does not change, offering improved performance and simplicity.

:::
