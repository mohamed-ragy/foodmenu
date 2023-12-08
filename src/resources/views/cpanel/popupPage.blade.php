
{{-- dashboard --}}

{{-- Security --}}
@if (Auth::guard('account')->user()->is_master == true)
    {{-- @include('cpanel.popupPage.security.Sub-Accounts') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[0] == true)
    {{-- Orders --}}
    {{-- @include('cpanel.popupPage.orders.New-Order') --}}
    {{-- @include('cpanel.popupPage.orders.Order') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[1] == true)
    {{-- categories --}}
    {{-- @include('cpanel.popupPage.categories.categories-list') --}}
    {{-- @include('cpanel.popupPage.categories.create-new-category') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[1] == true)
    {{-- products --}}
    {{-- @include('cpanel.popupPage.products.Create-New-Product') --}}
    {{-- @include('cpanel.popupPage.products.Manage-Products') --}}
    {{-- @include('cpanel.popupPage.products.Product-Reviews') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[2] == true)
    {{-- users --}}
    {{-- @include('cpanel.popupPage.users.Delivery-Account') --}}
    {{-- @include('cpanel.popupPage.users.Manage-Users') --}}
@endif



@if (str_split(Auth::guard('account')->user()->authorities)[3] == true)
    {{-- design --}}
    @include('cpanel.popupPage.design.home-Page-Sections')
@endif

{{-- @if (str_split(Auth::guard('account')->user()->authorities)[4] == true) --}}
    {{-- settings --}}
    {{-- @include('cpanel.popupPage.settings.Restaurant-Information') --}}
    {{-- @include('cpanel.popupPage.settings.Home-Delivery') --}}
    {{-- @include('cpanel.popupPage.settings.Order-Pickup') --}}
    {{-- @include('cpanel.popupPage.settings.Dine-In') --}}
    {{-- @include('cpanel.popupPage.settings.Promocode') --}}
{{-- @endif --}}

{{-- @include('cpanel.popupPage.settings.Language') --}}


{{-- @if (Auth::guard('account')->user()->is_master == true) --}}
    {{-- support --}}
    {{-- @include('cpanel.popupPage.support.Tickets-History') --}}
{{-- @endif --}}
