---
order: 5
---

# Currency <Badge type="info" text="@localizer/format-number" />

> **[currencyFormatter](../../../api/_localizer/format-number/currencyFormatter/index.md)**<`T`> ( `options?` ): [UnitValueFormatter](../../index.md#unitvalueformattert-u)<`T`, [CurrencyCode](../../../api/_localizer/format-number/CurrencyCode/index.md)>
>
> - `T` _extends number | bigint_ - The type of value to format.
> - `options` - Optional [configuration of the formatter](../options/index.md).

Use this formatter to represent monetary values in different currencies.

::: tip

If you prefer to use default settings, consider using a [preconfigured currency formatter](../../preconfigured-formatters/numbers/currency.md). It simplifies the process by providing a ready-to-use configuration for common use cases.

:::

::: tip

If the currency is predetermined, you might find the [fixed currency formatter](fixed-currency.md) more suitable. It is optimized for scenarios where the currency does not change, offering improved performance and simplicity.

:::
