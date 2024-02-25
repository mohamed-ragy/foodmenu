<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="{{ $lang }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>@yield('title')</title>
    <style>
        :root {
            --bg:rgb(234, 239, 239);
            --txt:rgb(40, 40, 40);
            --white:rgb(255, 255, 255);
            --green:rgb(16, 144, 146);
            --shdw-5:rgba(0, 0, 0, 0.05);
            --shdw-10:rgba(0, 0, 0, 0.1);
            --card-shdw:0 0 20px var(--shdw-5), 0 0 1px 0px var(--shdw-10);
        }
        body{
            margin:0;
            background-color:var(--bg);
            font-family: sans-serif;
        }
        table{
            border-spacing: 0;
        }
        td{
            padding:0;
            vertical-align: middle;
        }
        img{
            border:0;
        }
        .wrapper{
            width:100%;
            table-layout: fixed;
            background-color:var(--bg);
            padding-bottom: 100px;
            padding-top:50px;
        }
        .main{
            background-color: var(--white);
            margin:0 auto;
            width:100%;
            max-width: 600px;
            border-spacing: 0;
            color:var(--txt);
            font-family: sans-serif;
            border-radius: 0 0 5px 5px;
            border-top:4px solid var(--green);
        }
        .footer{
            background-color:var(--bg);
            margin:0 auto;
            margin-top:20px;
            width:100%;
            max-width: 600px;
            border-spacing: 0;
            font-family: sans-serif;
            font-size:.8em;
            color:var(--green);
        }
        a{
            cursor: pointer;
            text-decoration: underline;
            color:var(--green);
        }
        a:hover{
            color:rgb(42, 140, 142) !important;
        }
    </style>
</head>
<body>
    <center class="wrapper">
        {{-- <img src="{{ env('APP_URL') }}/storage/logo/logo.png" style="width:60px;height:auto;margin-bottom:20px;border-radius:50%;box-shadow:var(--card-shdw)" alt=""> --}}
        <div style="color:#109092;font-size:1.7em;margin-bottom:10px;font-weight:bold;">Foodmenu</div>

        <table class="main" width="100%" cellpadding="0" border="0" cellspacing="0">
            <tr>
                <td>
                    @yield('content')
                </td>

            </tr>
        </table>


        <table class="footer" width="100%" cellpadding="0" border="0" cellspacing="0">


            <tr>
                <td align="center" style="padding-bottom:10px;">
                    <a style="color:#2b6f70;" target="_blank" href="{{ env('APP_URL') }}/{{ $lang }}/terms-of-service">{{ trans('mails/foodmenu/layout.footer.termsofservice') }}</a>
                    <span style="color:#2b6f70;margin-right:5px;margin-left:5px;">|</span>
                    <a style="color:#2b6f70;" target="_blank" href="{{ env('APP_URL') }}/{{ $lang }}/privacy-policy">{{ trans('mails/foodmenu/layout.footer.privacypolicy') }}</a>
                    <span style="color:#2b6f70;margin-right:5px;margin-left:5px;">|</span>
                    <a style="color:#2b6f70;" target="_blank" href="{{ env('HELP_CENTER_URL') }}/{{ $lang }}">{{ trans('mails/foodmenu/layout.footer.helpCenter') }}</a>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-bottom:10px;">{{ trans('mails/foodmenu/layout.footer.copyRights') }}</td>
            </tr>

            <tr>
                <td align="center" style="padding-top:15px;border-top:1px solid #dad9d9">{{ trans('mails/foodmenu/layout.footer.thisMsg1').' ['.$account->email.'] '.trans('mails/foodmenu/layout.footer.thisMsg2') }}</td>
            </tr>

        </table>
    </center>
</body>
</html>
