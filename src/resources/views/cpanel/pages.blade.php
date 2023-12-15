
{{-- dashboard --}}
@include('cpanel.pages.dashboard.Home-page')

@if (Auth::guard('account')->user()->is_master == true)
    @include('cpanel.pages.dashboard.Activity-Log-page')
    @include('cpanel.pages.dashboard.Statistics-page')
    {{-- @include('cpanel.pages.dashboard.restaurant-Expenses-page') --}}
    {{-- @include('cpanel.pages.dashboard.Financial-Reports-page') --}}
@endif

@if (Auth::guard('account')->user()->is_master == true)
    {{-- Security --}}
    {{-- @include('cpanel.pages.security.Email-Address-page') --}}
    {{-- @include('cpanel.pages.security.password-page') --}}
    {{-- @include('cpanel.pages.security.Phone-Number-page') --}}
    {{-- @include('cpanel.pages.security.Sub-Accounts-page') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[0] == true)
    {{-- Orders --}}
    {{-- @include('cpanel.pages.orders.Incomplete-Orders-page') --}}
    {{-- @include('cpanel.pages.orders.Order-History-page') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[1] == true)
    {{-- products --}}
    {{-- @include('cpanel.pages.products.Manage-Products-page') --}}
    {{-- @include('cpanel.pages.products.Product-Reviews-page') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[2] == true)
    {{-- users --}}
    {{-- @include('cpanel.pages.users.Delivery-Accounts-page') --}}
    {{-- @include('cpanel.pages.users.Online-Users-page') --}}
    {{-- @include('cpanel.pages.users.Manage-Users-page') --}}
    {{-- @include('cpanel.pages.users.Create-New-User-page') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[1] == true)
    {{-- categories --}}
    {{-- @include('cpanel.pages.categories.categories-list-page') --}}
@endif

@if (str_split(Auth::guard('account')->user()->authorities)[3] == true)
    {{-- design --}}
    @include('cpanel.pages.design.Templates-page')
    @include('cpanel.pages.design.Website-Colors-page')
    @include('cpanel.pages.design.Home-Page-Sections-page')
    {{-- @include('cpanel.pages.design.Images-page') --}}
@endif

{{-- settings --}}
{{-- @if (str_split(Auth::guard('account')->user()->authorities)[4] == true) --}}
    {{-- @include('cpanel.pages.settings.System-page') --}}
    {{-- @include('cpanel.pages.settings.Restaurant-Information-page') --}}
    {{-- @include('cpanel.pages.settings.Home-Delivery-page') --}}
    {{-- @include('cpanel.pages.settings.Order-Pickup-page') --}}
    {{-- @include('cpanel.pages.settings.Dine-In-page') --}}
    {{-- @include('cpanel.pages.settings.Promocodes-page') --}}
{{-- @endif --}}

{{-- @include('cpanel.pages.settings.Language-page') --}}
{{-- @include('cpanel.pages.settings.Control-Panel-Settings-page') --}}

{{-- @if (Auth::guard('account')->user()->is_master == true) --}}
    {{-- support --}}
    {{-- @include('cpanel.pages.support.Submit-A-Ticket-page') --}}
    {{-- @include('cpanel.pages.support.Tickets-Histoey-page') --}}
{{-- @endif --}}
