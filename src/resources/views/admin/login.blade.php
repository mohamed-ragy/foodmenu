<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('fonts/website/english/Rubik.css') }}" rel="stylesheet">
    <title>Food Menu - Technical Support</title>
    <style>
        *{
            --btn-bg:#52a4bdff;
            --btn-border:rgba(50, 64, 78, 0.748);
            --btn-shadow:rgba(50, 64, 78, 0.748);
            --btn-text:rgb(50, 64, 78);
            --btn-hover-text:rgb(50, 64, 78);
            --btn-active-bg:rgb(50, 64, 78);
            --btn-active-text:#eaf0f6ff;
            --btn-disabled-bg:#ffffffff;
            --btn-disabled-text:rgb(158, 158, 158);

            --fm-bg-2:#eaf0f6ff;
            --fm-text-dark:rgb(50, 64, 78);
            --fm-text-dark:#52a4bdff;
            --input-text-shadow:#52a4bdff;
            --input-text-placeholder:rgb(158, 161, 164);
            --input-text-hover-bg:#ffffffff;
            --fm-text-dark:rgb(50, 64, 78);
            --fm-color-3:#52a4bdff;
            --fm-text-light:rgb(50, 64, 78);
            --input-text-icon-border:#52a4bdff;
            --fm-color-2:rgba(50, 64, 78, 0.748);
        }
        body {background-color: #eaf0f6ff;font-family: 'Rubik', sans-serif; display:flex;flex-direction: column;justify-content: center;align-items: center;height: 80vh; margin: 0em;padding:0em;}
        .formContainer {background-color: var(#eaf0f6ff);border-radius:0 0 .3em .3em;box-shadow: .05em .05em .2em .02em rgb(50, 64, 78);color:rgb(50, 64, 78);display:flex;flex-direction: column;justify-content: center;align-items: center;width: fit-content;padding: 1em 3em 1em 3em}
        .formContainerHead{margin:0;padding:.4em;background-color:rgb(50, 64, 78);color:#eaf0f6ff;text-align: center;border-radius:.3em .3em 0 0;box-shadow: .05em .05em .2em .02em rgb(50, 64, 78);}
        .btn {position: relative; padding: .3em 2.5em .3em 2.5em;background-color: var(--btn-bg);border: .1em  solid var( --btn-border); border-radius: .2em; box-shadow:  0em 0 .2em .1em  var(--btn-shadow); color: var(--btn-text); font-family: 'Open Sans', 'Tajawal', sans-serif;font-size: 1em; font-weight: 600; cursor: pointer;-webkit-tap-highlight-color: rgba(0, 0, 0, 0); display: flex; justify-content: center; align-items: center; margin: .5em; transition: .2s; -webkit-user-select: none;}
        .btn:hover {color: var(--btn-hover-text);transition: .2s;}
        .btn:active {background-color: var(--btn-active-bg);color: var(--btn-active-text);transition: .2s;}
        .inputText{ text-align:center;height:1.7rem;width: 80%;background-color: var(--fm-bg-2);color: var(--fm-text-dark);border:.15em solid var(--fm-text-dark);border-radius:.4em;padding:.1em;margin:1em;user-select: auto;transition-duration: .5s;font-family: 'Rubik','Tajawal', sans-serif;}
        .inputText:focus { outline:none;transition-duration:.4s;width:90%;transition-duration: .5s;}

    </style>
</head>
<body>

    <form method="post" action="{{ route('admin.dologin') }}">
        @method('post')
        @csrf
        <div class="formContainerHead">Technical Support Team Login</div>
        <div  class="formContainer">
            @isset($_GET['error'])
            @if($_GET['error']== 1)
                <div style="color: rgb(165, 5, 5)">Wrong admin name or password</div>
            @endif
            @endisset
            <input class="inputText" type="text" name="adminName" placeholder="Admin Name">
            <input class="inputText" type="password" name="password" placeholder="Password">
            <input class="btn" type="submit" value="Login">

        </div>
    </form>

</body>
</html>

