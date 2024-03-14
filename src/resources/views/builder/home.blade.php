
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ trans('builder.description') }}">
    <link rel="icon" type="image/x-icon" href="/storage/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/cpanel/colors.css?v=1') }}">
    <link rel="stylesheet" href="/css/builder/builder.css">
    <title>{{ trans('builder.title') }}</title>
</head>
@include('page_loading')
<body>
    <div class="popupContainer none"></div>
    <header class="none"></header>
    <div id="website"></div>

    <div class="editor_popup none"></div>
    <div id="tooltipDiv" class="none"></div>
    <div id="alertsContainer"></div>

</body>
<script>
    window.template_id = "{{ $template_id }}";
</script>
<script src="/js/builder/builder.js"></script>

</html>
