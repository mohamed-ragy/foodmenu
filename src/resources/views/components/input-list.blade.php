
    <div class="inputListContainer {{ $containerClass ?? '' }}">
        <div class="inputListIcon {{ $iconClass ?? '' }}" autoHelp="{{ $autoHelp ?? '' }}" tooltip="{{ $title ?? $placeholder ?? ''  }}">
            <span class=" {{ $icon ?? '' }}" style="{{ $iconStyle ?? '' }}"></span>
            @isset($iconFlag)
                <img alt="" src="./storage/imgs/flags/{{ $iconFlag ?? '' }}.png"  class="inputTextIconFlag {{ $iconFlag ?? '' }}" />
            @endisset
        </div>
        <input key="" autoHelp="{{ $autoHelp ?? '' }}" class="inputList {{ $class ?? '' }}" type="{{ $type ?? 'text' }}" placeholder="{{ $placeholder ?? '' }}" id="{{ $id ?? '' }}" name="{{ $name ?? '' }}" value="{{ $value ?? '' }}" maxlength="{{ $maxlength ?? '' }} " style="{{ $style ?? '' }}"  autocomplete="new-password" {{ $attr ?? '' }} >

        <span class="inputListDownIcon ico-down" ></span>
        {{ $slot ?? '' }}
        <div class="listContainer {{ $listClass ?? '' }}" id="{{ $listId ?? '' }}">
            @if (!isset($listLoading))
            <div class="inputListElementLoading1"></div>
            <div class="inputListElementLoading2"></div>
            <div class="inputListElementLoading1"></div>
            <div class="inputListElementLoading2"></div>
            <div class="inputListElementLoading1"></div>
            <div class="inputListElementLoading2"></div>
            <div class="inputListElementLoading1"></div>
            <div class="inputListElementLoading2"></div>
            @endif
        </div>

    </div>
