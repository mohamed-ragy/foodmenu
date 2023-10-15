<div class="pageWrapper" id="website_colors-page">
    <input type="hidden" id="website_colors-title" value="{{ trans('cpanel/cpanel.menu.website_colors') }}" icon="colors">

    <x-content-window title="{{ trans('cpanel/design/websiteStyle.websiteColors') }}" helpId="208" noSaveId="websiteColors-websiteColorsNosave" windowClass="contentWindow_100p">
        <div class="w100p row alnC jstfyS">
            <div id="colorsPreviewcontainer"  autoHelp="209">
                <div class="colorPreview" colorName="color1" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.color1') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="color2" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.color2') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="color3" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.color3') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="color4" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.color4') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="color5" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.color5') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="colorError" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.colorError') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="colorSuccess" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.colorSuccess') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="colorWarning" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.colorWarning') }}"><span class="colorPreviewTxt"></span></div>
                <div class="colorPreview" colorName="colorStar" colorCode="" toolTip="{{ trans('cpanel/design/websiteStyle.colorStar') }}"><span class="colorPreviewTxt"></span></div>
                <span class="mT20 m10 taC none-420">{{ trans('cpanel/design/websiteStyle.clickToCopyColor') }}</span>

            </div>
            <div id="colorCardsContainer">
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
                <div class="colorCardLoading cardLoading w150"></div>
            </div>
        </div>
        <div class="btnContainer">
            <button id="websiteColors-colorCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="websiteColors-colorSaveBtn" class="btn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
            </button>
        </div>
    </x-content-window>

    <x-content-window title="{{ trans('cpanel/design/websiteStyle.customColors') }}"  helpId="210" noSaveId="websiteColors-customColorsNoSave"  windowClass="contentWindow_100p">
        <label class="checkboxlabel">
            <span class="mX5">{{ trans('cpanel/design/websiteStyle.useCustomColors') }}</span>
            <input id="websiteColors-useCustomColors" type="checkbox" class="checkbox" name="checkbox">
            <span class="mX5"></span>
        </label>

        <div id="customColorsCard" class="mT10">
            <div class="customColorContainer" colorName="color1">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.color1') }}" >
                    <input type="color" class="customColorPicker">
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.color1') }}">
            </div>
            <div class="customColorContainer" colorName="color2">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.color2') }}" >
                    <input type="color" class="customColorPicker">
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.color2') }}">
            </div>
            <div class="customColorContainer" colorName="color3">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.color3') }}" >
                    <input type="color" class="customColorPicker">
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.color3') }}">
            </div>
            <div class="customColorContainer" colorName="color4">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.color4') }}" >
                    <input type="color" class="customColorPicker"  >
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.color4') }}">
            </div>
            <div class="customColorContainer" colorName="color5">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.color5') }}" >
                    <input type="color" class="customColorPicker"  >
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.color5') }}">
            </div>
            <div class="customColorContainer" colorName="colorError">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.colorError') }}" >
                    <input type="color" class="customColorPicker"  >
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.colorError') }}">
            </div>
            <div class="customColorContainer" colorName="colorSuccess">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.colorSuccess') }}" >
                    <input type="color" class="customColorPicker"  >
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.colorSuccess') }}">
            </div>
            <div class="customColorContainer" colorName="colorWarning">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.colorWarning') }}" >
                    <input type="color" class="customColorPicker"  >
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.colorWarning') }}">
            </div>
            <div class="customColorContainer" colorName="colorStar">
                <div class="customColor" tooltip="{{ trans('cpanel/design/websiteStyle.colorStar') }}" >
                    <input type="color" class="customColorPicker"  >
                </div>
                <input type="text" class="customColorHex" placeholder="{{ trans('cpanel/design/websiteStyle.colorStar') }}">
            </div>
        </div>
        <div class="btnContainer">
            <button id="websiteColors-customColorCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
            <button id="websiteColors-customColorSaveBtn" class="btn">
                <div class="btnLoading"></div>
                <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
            </button>
        </div>
    </x-content-window>
</div>
