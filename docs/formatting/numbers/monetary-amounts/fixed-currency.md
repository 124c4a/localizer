---
order: 7
---

# Fixed currency <Package name="format-number"/>

> **[fixedCurrencyFormatter](../../../api/_localizer/format-number/fixedCurrencyFormatter/index.md)**<`T`> ( `currency` , `options?` ): [ValueFormatter](../../index.md#valueformatter-t)<`T`>
>
> - `T` _extends number | bigint_ - The type of value to format.
> - `currency` - The [currency](../../../api/_localizer/format-number/CurrencyCode/index.md) to use for value formatting.
> - `options` - Optional [configuration of the formatter](../options/index.md).

This formatter ensures consistent presentation of monetary values when the currency is fixed.

::: tip

If the currency is not predetermined, consider using the [currency formatter](currency.md) instead. It dynamically adapts to various currencies, making it a versatile choice for scenarios where the currency type may vary.

:::
