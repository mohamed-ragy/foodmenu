<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{-- <meta name="google-signin-client_id" content="981388132497-efrbh69ok15ade20iro064fhkp57qq65.apps.googleusercontent.com"> --}}

    <meta https-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="/storage//favicon.ico">
    <meta name="description" content="{{ trans('home/home.homeDescription') }}">
    <link rel="stylesheet" href="/css/home/translate.css">
    <title>Food Menu</title>

</head>
<body>
    <div id="inputs">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px;align-self:center;">
            <input type="text" value="" id="DomainName" placeholder="Domain Name">
            <input type="text" value="" id="websiteName" placeholder="Website Name">
            <input type="text" value="" id="intro" placeholder="Website Intro" style="width:400px;">
        </div>
        <div  id="catsContainer">
            <div class="catsHead">
                <button id="addCat">+</button>
            </div>
            <div class="cats">

            </div>
        </div>

        <button id="engez" style="font-size:1.2em;">Engzny</button>

    </div>
    <div id="output" contenteditable="true"></div>
    <button id="copy">Copy</button>
</body>
    <script src="/js/home/translate.js"></script>
</html>
