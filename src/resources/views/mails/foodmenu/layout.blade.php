<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="{{ $lang }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>@yield('title')</title>
    <style>
        body{
            margin:0;
            background-color:#e0e6e6;
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
            background-color:#e0e6e6;
            padding-bottom: 100px;
            padding-top:50px;
        }
        .main{
            background-color: #ffffff;
            margin:0 auto;
            width:100%;
            max-width: 600px;
            border-spacing: 0;
            color:#565b5b;
            font-family: sans-serif;
            border-radius: 5px;
        }
        a{
            cursor: pointer;
            text-decoration: underline;
            color:#2b6f70;
        }
        a:hover{
            color:#163d3d;
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main" width="100%" cellpadding="0" border="0" cellspacing="0">
            <tr>
                <td align="start" style="padding:20px;">
                    <div style="color:#2b6f70;font-size:1.5em;font-weight:bold;">Foodmenu</div>
                </td>
                <td align="end" style="padding:20px;">
                    <img src="{{ env('APP_URL') }}/storage/logo/logo.png" style="width:30px;height:auto;" alt="">
                </td>
            </tr>
            <tr>
                <td>
                    @yield('content')
                </td>

            </tr>
        </table>


        <table style="background-color:#e0e6e6;margin-top:20px;font-size:.8em;color:#2b6f70;" class="main" width="100%" cellpadding="0" border="0" cellspacing="0">


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
