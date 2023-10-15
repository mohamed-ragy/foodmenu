<div class="textareaContainer {{ $containerClass ?? '' }}" autoHelp="{{ $autoHelp ?? '' }}" >
    <div class="textareaHead">
        @isset($icon)
        <span class="textareaIcon {{ $icon ?? '' }}" style="{{ $iconStyle ?? '' }}"></span>
        @endisset

        @isset($iconFlag)

        @if ( $iconFlag == 'CLF')
        <img alt="" src=""  class="textareaIconFlag customLangFlag" />
        @else
        <img alt="" src="./storage/imgs/flags/{{ $iconFlag ?? '' }}.png"  class="textareaIconFlag" />
        @endif

        @endisset
        <span class="textareaTitle mX5">{!! $title ?? '' !!}</span>
    </div>
    <textarea class="textarea" id="{{ $id ?? '' }}" maxlength="{{ $maxLength ?? '' }}" >{{ $slot }}</textarea>
    <span class="textareaCounter"><span class="textAreaInputLength"></span>/{{ $maxLength ?? '' }}</span>
</div>
