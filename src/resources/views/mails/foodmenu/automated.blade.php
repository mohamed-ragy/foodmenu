<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="{{ $data['lang'] }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $data['content']['subject'] }}</title>
    <style>
        *{
            --bg:rgb(234, 239, 239);
            --txt:rgb(80, 80, 80);
            --white:rgb(255, 255, 255);
            --green:rgb(16, 144, 146);
        }
        .bc_bg{background-color:rgb(234, 239, 239);}
        .bc_white{background-color:rgb(255, 255, 255);}
        .bc_green{background-color:rgb(16, 144, 146);}


        .c_txt{color:rgb(80, 80, 80);}
        .c_txt2{color:rgb(255, 255, 255);}
        .c_green{color:rgb(16, 144, 146);}

        body{
            margin:0;
            font-family: 'Calibri';
        }
        table{
            border-spacing: 0;
            max-width: 600px;
            width:calc(100% - 20px);
            margin: 0 10px;
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
            padding-bottom: 100px;
            padding-top:50px;
        }
        .main{
            margin:0 auto;
            border-spacing: 0;
        }
        .footer{
            margin-top:20px;
            margin-bottom:0px;
            border-spacing: 0;
            font-size:.9em;
        }
        a{
            cursor: pointer;
            text-decoration: underline;
            color:rgb(16, 144, 146)  !important;
        }
        a:hover{
            color:rgb(10, 112, 113) !important;
        }
        .mX10{margin-right:10px;margin-left:10px}
        .p10{padding:10px}
        .p20{padding:20px}
        .taC{text-align: center}
        .bold{font-weight: bold}
        .btn{
            text-decoration:none;
            padding:15px 20px;
            background-color:rgb(16, 144, 146) !important;
            border-radius:5px;
            color:rgb(250, 250,250) !important;
            cursor:pointer;
            font-size:1.2em;
        }
        .btn:hover{
            text-decoration:none;
            background-color:rgba(16, 144, 146, 0.8) !important;
            color:rgb(250, 250, 250) !important;
        }
    </style>
</head>
<body class="bc_bg c_txt">
    <center class="wrapper bc_bg c_txt">

        <div class="mX10" style="color:#109092;font-size:2em;margin-bottom:10px;font-weight:bold;text-align:start;max-width:600px;text-align:center;">Foodmenu</div>
        <table class="main bc_green c_txt2" cellpadding="0" border="0" cellspacing="0">
            <tr>
                <td class="p20 taC">
                    {!! $data['content']['header'] !!}
                </td>

            </tr>
        </table>

        <table class="main bc_white c_txt" cellpadding="0" border="0" cellspacing="0">
            <tr>
                <td class="p10" style="border-bottom: 4px solid rgb(16, 144, 146)">
                    <div style="font-size:2.3em;margin:20px;" class=" c_txt">{!!  str_replace(':name:',explode(' ',$data['account_name'])[0],trans('mails/automated.hi')) !!}</div>
                    <div style="margin:10px 20px;font-size:1.2em;">
                        {!! $data['content']['body'] !!}
                    </div>
                </td>

            </tr>
        </table>

        <table class="footer bc_bg c_green" cellpadding="0" border="0" cellspacing="0">

            <tr>
                <td align="center" style="padding-bottom:10px;">
                    <a style="" target="_blank" href="{{ env('APP_URL') }}/{{ $data['lang'] }}/terms-of-service">{{ trans('mails/automated.footer.termsofservice') }}</a>
                    <span style="margin-right:5px;margin-left:5px;">|</span>
                    <a style="" target="_blank" href="{{ env('APP_URL') }}/{{ $data['lang'] }}/privacy-policy">{{ trans('mails/automated.footer.privacypolicy') }}</a>
                    <span style="margin-right:5px;margin-left:5px;">|</span>
                    <a style="" target="_blank" href="{{ env('HELP_CENTER_URL') }}/{{ $data['lang']}}">{{ trans('mails/automated.footer.helpCenter') }}</a>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-bottom:10px;">{{ trans('mails/automated.footer.copyRights') }}</td>
            </tr>

            <tr>
                <td align="center" style="padding-top:15px;border-top:1px solid #dad9d9">{{ trans('mails/automated.footer.thisMsg1').' ['.$data['account_email'].'] '.trans('mails/automated.footer.thisMsg2') }}</td>
            </tr>

        </table>
    </center>
</body>
</html>
