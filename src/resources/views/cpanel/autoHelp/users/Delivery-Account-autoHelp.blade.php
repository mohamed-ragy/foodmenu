<x-auto-help helpNumber="103" title="{!! trans('cpanel/users/autoHelp.deliveryName') !!}">
    <p>{!! trans('cpanel/users/autoHelp.deliveryName-1') !!}</p>
    <p>{!! trans('cpanel/users/autoHelp.deliveryName-2') !!}{{ $website->domainName }}</b>.</p>
</x-auto-help>

<x-auto-help helpNumber="104" title="{!! trans('cpanel/users/autoHelp.deliveryPassword') !!}">
    <p>{!! trans('cpanel/users/autoHelp.deliveryPassword-1') !!}</p>
</x-auto-help>

<x-auto-help helpNumber="105" title="{!! trans('cpanel/users/autoHelp.deliveryCreateBtn') !!}">
    <p>{!! trans('cpanel/users/autoHelp.deliveryCreateBtn-1') !!}</p>
</x-auto-help>

<x-auto-help helpNumber="106" title="{!! trans('cpanel/users/autoHelp.deleteDeliverytAccountBtn') !!}">
    <p>{!! trans('cpanel/users/autoHelp.deleteDeliverytAccountBtn-1') !!}</p>
</x-auto-help>

<x-auto-help helpNumber="107" title="{!! trans('cpanel/users/autoHelp.EditDeliverytAccountBtn') !!}">
    <p>{!! trans('cpanel/users/autoHelp.EditDeliverytAccountBtn-1') !!}</p>
</x-auto-help>

<x-auto-help helpNumber="108" title="{!! trans('cpanel/users/autoHelp.editDeliveryAccount') !!}">
    <p>{!! trans('cpanel/users/autoHelp.editDeliveryAccount-1') !!}</p>
    <p>{!! trans('cpanel/users/autoHelp.editDeliveryAccount-2') !!}</p>
</x-auto-help>

<x-auto-help helpNumber="109" title="{!! trans('cpanel/users/autoHelp.editDeliveryName') !!}">
    <p>{!! trans('cpanel/users/autoHelp.editDeliveryName-1') !!}</p>
</x-auto-help>

<x-auto-help helpNumber="110" title="{!! trans('cpanel/users/autoHelp.editDeliveryPassword') !!}">
    <p>{!! trans('cpanel/users/autoHelp.editDeliveryPassword-1') !!}</p>
</x-auto-help>

<x-auto-help helpNumber="111" title="{!! trans('cpanel/users/autoHelp.deliveryAccounts') !!}">
    <p>{!! trans('cpanel/users/autoHelp.deliveryAccounts-1') !!}</p>
    <p>{!! trans('cpanel/users/autoHelp.deliveryAccounts-2') !!}</p>
    <p>{!! trans('cpanel/users/autoHelp.deliveryAccounts-3') !!}</p>
    <p class="mB7">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-1') !!}</p>
    <ol class="mT0">
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-2') !!}<span clickMenu="Pending-Orders" class="clickable">{{ trans('cpanel/orders.orders.pending') }}</span>.</li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-3') !!}<span clickMenu="Accepted-Orders" class="clickable">{{ trans('cpanel/orders.orders.accepted') }}</span>.</li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-4-1') !!}<b>'{{ trans('cpanel/orders/orders.giveToDelivery') }}'</b>{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-4-2') !!} </li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-5-1') !!}{{ $website->domainName }}{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-5-2') !!}{{ trans('cpanel/orders/orders.giveOrderTo') }}{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-5-3') !!} </li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-6') !!}</li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-7') !!}</li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-8-1') !!}<b>{{ trans('deliveryAccount/deliveryAccount.delivered') }}</b>{!! trans('cpanel/users/autoHelp.deliveryAccounts-4-8-2') !!}</li>
    </ol>
    <p class="mB7">{!! trans('cpanel/users/autoHelp.deliveryAccounts-5-1') !!}</p>
    <ul class="mT0">
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-5-2') !!}</li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-5-3') !!}</li>
        <li class="mY3">{!! trans('cpanel/users/autoHelp.deliveryAccounts-5-4') !!}</li>
    </ul>

</x-auto-help>
