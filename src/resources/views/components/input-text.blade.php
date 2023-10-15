<div class="inputTextContainer {{ $containerClass ?? '' }}" style="{{ $containerStyle ?? '' }}" >

    <div class="inputTextIcon {{ $iconClass ?? '' }}" autoHelp="{{ $autoHelp ?? '' }}" tooltip="{!! $placeholder ?? $tooltip ?? '' !!}">
        <span class=" {{ $icon ?? '' }}" style="{{ $iconStyle ?? '' }}"></span>
        @isset($iconFlag)

        @if ( $iconFlag == 'CLF')
        <img alt="" src=""  class="inputTextIconFlag customLangFlag" />
        @else
        <img alt="" src="./storage/imgs/flags/{{ $iconFlag ?? '' }}.png"  class="inputTextIconFlag" />
        @endif
        @endisset

    </div>
    <input autoHelp="{{ $autoHelp ?? '' }}" class="inputText {{ $class ?? '' }}" type="{{ $type ?? 'text' }}" placeholderTxt="{{ $placeholderTxt ?? '' }}" placeholder="{!! $placeholder ?? '' !!}" id="{{ $id ?? '' }}" name="{{ $name ?? '' }}" value="{{ $value ?? '' }}" maxlength="{{ $maxlength ?? '' }} " style="{{ $style ?? '' }}"  autocomplete="new-password" {{ $attr ?? '' }} >
    @if ($closeIcon ?? '' ==  'no')
    <span class="inputText-copyVal ico-copy"></span>
    @else
    <span class="inputText-clearVal ico-close"></span>
    @endif
    {{ $slot ?? '' }}
</div>


