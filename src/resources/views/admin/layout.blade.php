<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{!! csrf_token() !!}">
    <link href="{{ asset('fonts/website/english/Rubik.css?k=a') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/admin/layout.css?s=e') }}">
    <script src="{{ asset('js/admin/layout.js') }}"></script>
    <script>
        let newTickets = {!! $newTickets !!};
        let openTickets = {!! $openTickets !!};
        let pendingTickets = {!! $pendingTickets !!};
        let solvedTickets = {!! $solvedTickets !!};
        let closedTickets = {!! $closedTickets !!};
        let bugs = {!! $bugs !!};

    </script>
    <title>Food Menu - Technical Support</title>
</head>
<body>
    <div id="headContainer">
        <div id="head">
            <div style="display:flex;flex-direction:row;align-items:center;justify-content:center;">
                <img src="{{ asset('storage/imgs/logo.png') }}" id="logo">
               <span style="font-size: 1.5em">Welcome {{ Auth()->guard('admin')->user()->adminName }}</span>
            </div>

        </div>
        <div id="menu" isOpen="false">
            <span class="menuItem">Account</span>
            <span class="menuItem">Billing & Subscription</span>
            <span class="menuItem">Products & Categories</span>
            <span class="menuItem">Orders</span>
            <span class="menuItem">Users & Delivery Accounts</span>
            <span class="menuItem">Website System</span>
            <span class="menuItem">Design</span>
            <span class="menuItem">Control Panel</span>
            <span class="menuItem" id="articleMaker">Article Maker</span>
            <form action="{{ route('admin.logout') }}" method="post" >
                @csrf
                @method('post')
                    <input type="submit" value="logout" class="menuItem" >
            </form>
            <div id="menuTitle">Menu</div>
        </div>

    </div>
    <div id="bodyContainer">
        <div id="body">
            @include('admin.tickets')
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>

        </div>
        <div id="info">
            <div class="card">
                <div style="width:100%;text-align:center">Online Now</div>
                <div style="margin-top:.5em;">Admins: <span class="onlineAdminsNumber">0</span></div>
                <div style="margin-top:.5em;">Cpanels: <span class="onlineCpanelsNumber">0</span></div>
                <div style="margin-top:.5em;">Deliveries: <span class="onlineDeliveriesNumber">0</span></div>
                <div style="margin-top:.5em;">Users: <span class="onlineUsersNumber">0</span></div>
                <div style="margin-top:.5em;">Guests: <span class="onlineGuestsNumber">0</span></div>

            </div>
            <div class="card" id="tickets">
                <div style="width:100%;text-align:center">Open tickets</div>
                <div style="margin-top:1em;">New: <span class="newTicketsNumber"></span></div>
                <div style="margin-top:1em;">Open: <span class="openTicketsNumber"></span></div>
                <div style="margin-top:1em;">Pending: <span class="pendingTicketsNumber"></span></div>
                {{-- <div style="margin-top:.5em;">Solved: <span class="solvedTicketsNumber">0</span></div> --}}
                {{-- <div style="margin-top:.5em;">Closed: <span class="closedTicketsNumber">0</span></div> --}}


            </div>
        </div>
    </div>


    <audio id="sound">
        <source id="adminNotification" src="{{ asset('storage/adminNotification.mp3') }}" type="audio/mpeg" />
    </audio>
</body>
</html>
