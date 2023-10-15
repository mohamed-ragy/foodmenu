<div class="contentWindow {{ $windowClass ?? '' }}" style="{{ $windowStyle ?? '' }}" id="{{ $windowId ?? '' }}">
    @isset($title)
    <div class="contentHead" style="{{ $headStyle ?? '' }}">
        <div class="row alnBL jstfyS">
            @isset($noSaveId)
            <div class="unsaved none" id="{{ $noSaveId ?? '' }}" tooltip="{{ trans('cpanel/cpanel.public.unsaved') }}"><span class="ico-warning mX5"></span></div>
            @endisset
            <span class="contentTitle {{ $titleClass ?? '' }}" id="{{ $titleId ?? '' }}" style="{{ $titleStyle ?? '' }}">{{ $title ?? '' }}</span>
        </div>

        @isset($helpId)
        <span class="ico-help help-icon" helpId="{{ $helpId ?? ''}}"></span>
        @endisset
    </div>
    @endisset

    {{-- @isset($noSaveId)
    <div class="unsaved none" id="{{ $noSaveId ?? '' }}"><span class="ico-warning mX5"></span><span>{{ trans('cpanel/cpanel.public.unsaved') }}</span></div>
    @endisset --}}
    <div class="content {{ $contentClass ?? '' }}"  style="{{ $contentStyle ?? '' }}">
        {{ $slot ?? '' }}
    </div>
</div>
