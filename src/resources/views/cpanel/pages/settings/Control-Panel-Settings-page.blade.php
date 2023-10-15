<div class="pageWrapper" id="control_panel_settings-page">
    <input type="hidden" id="control_panel_settings-title" value="{{ trans('cpanel/cpanel.menu.control_panel_settings') }}" icon="cpanelSettings">

    <div class="w100p row alnSH jstfyS wrap">
        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.viewSettings') }}" helpId="38" noSaveId="cpanelSettings-viewSettingsNoSave"  windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p" >
                <label class="checkboxlabel_100p" autoHelp="34">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.showBigIcons') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.viewIconsHotKey') }}</span></span>
                    <input id="cpanelSettings-bigSideMenu" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="35">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.showStatusBar') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.viewStatusHotKey') }}</span></span>
                    <input id="cpanelSettings-statusBar" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="36">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.showHotkeysShortcuts') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.hotKeysHotKey') }}</span></span>
                    <input id="cpanelSettings-hotKeys" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="37">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.enableDarkMode') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.darkModeHotKey') }}</span></span>
                    <input id="cpanelSettings-darkMode" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-viewSettingsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-viewSettingsSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>

        </x-content-window>

        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.controlSettings') }}" helpId="42" noSaveId="cpanelSettings-controlSettingsNoSave"  windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p" >
                <label class="checkboxlabel_100p" autoHelp="39">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.tooltip') }}</span>
                    <input id="cpanelSettings-tooltip" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="40">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.oneAlert') }}</span>
                    <input id="cpanelSettings-oneAlert" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="41">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.dClickConfirm') }}</span>
                    <input id="cpanelSettings-dClickConfirm" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p authority_1" autoHelp="244">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.shareReminder') }}</span>
                    <input id="cpanelSettings-shareReminder" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p authority_5" autoHelp="217">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.chatPopup') }}</span>
                    <input id="cpanelSettings-chatPopup" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-controlSettingsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-controlSettingsSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>

        </x-content-window>

    </div>

    <div class="w100p row alnSH jstfyS wrap">
        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.guideMode') }}" helpId="33" noSaveId="cpanelSettings-guideModeNoSave"  windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p" >
                <label class="checkboxlabel_100p" autoHelp="29">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.enableGuideMode') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.guideModeHotKey') }}</span></span>
                    <input id="cpanelSettings-GuideMode" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="30">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.enableAutohelp') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.autoHelpHotKey') }}</span></span>
                    <input id="cpanelSettings-autoHelp" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="31">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.showHelpIcons') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.helpIconsHotKey') }}</span></span>
                    <input id="cpanelSettings-helpIcons" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p" autoHelp="32">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.enableGuideHints') }}<span class="hotKeys">{{ trans('cpanel/cpanel.hotKeys.guideHintsHotKey') }}</span></span>
                    <input id="cpanelSettings-guideHints" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-GuideModeCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-GuideModeSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
        </x-content-window>

        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.alertNotifications') }}" helpId="55" noSaveId="cpanelSettings-alertNotificationsNoSave"  windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p" >
                <label class="checkboxlabel_100p authority_0" autoHelp="48">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.NewOrderAlerts') }}</span></span>
                    <input id="cpanelSettings-NewOrderAlerts" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p authority_0" autoHelp="49">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.DeliveredOrderAlerts') }}</span></span>
                    <input id="cpanelSettings-DeliveredOrderAlerts" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p authority_2" autoHelp="50">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.NewUserAlerts') }}</span></span>
                    <input id="cpanelSettings-NewUserAlerts" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p authority_1" autoHelp="51">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.NewReviewAlerts') }}</span></span>
                    <input id="cpanelSettings-NewReviewAlerts" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p authority_0" autoHelp="52">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.CanceledOrderAlerts') }}</span></span>
                    <input id="cpanelSettings-CanceledOrderAlerts" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>
                <label class="checkboxlabel_100p authority_2" autoHelp="53">
                    <span class="mX5">{{ trans('cpanel/settings/cpanelSettings.onlineUserAlert') }}</span></span>
                    <input id="cpanelSettings-onlineUserAlert" type="checkbox" class="checkbox" name="checkbox">
                    <span class="mX5"></span>
                </label>

                <div class="btnContainer mTA">
                    <button id="cpanelSettings-alertNotificationsCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-alertNotificationsSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
            </div>

        </x-content-window>

    </div>

    <div class="w100p row alnSH jstfyS wrap">
        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.infoAlertTone') }}" helpId="43" noSaveId="cpanelSettings-infoToneNotSaved" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
                <div class="alertSelectToneContainerTones" id="alertSelectToneContainerTones-info"></div>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-infoAlerrtToneCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-infoAlerrtToneSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
        </x-content-window>

        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.errorAlertTone') }}" helpId="44" noSaveId="cpanelSettings-errorToneNotSaved" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
                <div class="alertSelectToneContainerTones " id="alertSelectToneContainerTones-error"></div>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-errorAlerrtToneCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-errorAlerrtToneSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
        </x-content-window>
    </div>

    <div class="w100p row alnSH jstfyS wrap">
        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.sucessAlertTone') }}" helpId="45" noSaveId="cpanelSettings-successToneNotSaved" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
                <div class="alertSelectToneContainerTones " id="alertSelectToneContainerTones-success"></div>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-successAlerrtToneCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-successAlerrtToneSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
        </x-content-window>

        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.warningAlertTone') }}" helpId="46"  noSaveId="cpanelSettings-warningToneNotSaved" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
                <div class="alertSelectToneContainerTones " id="alertSelectToneContainerTones-warning"></div>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-warningAlerrtToneCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-warningAlerrtToneSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
        </x-content-window>
    </div>

    <div class="w100p row alnSH jstfyS wrap">
        <x-content-window title="{{ trans('cpanel/settings/cpanelSettings.newMsgAlertTone') }}" helpId="47"  noSaveId="cpanelSettings-newMsgAlertToneNotSaved" windowClass="contentWindow_50p" contentClass="column alnC jstfyC h100p">
                <div class="alertSelectToneContainerTones " id="alertSelectToneContainerTones-chat"></div>
                <div class="btnContainer mTA">
                    <button id="cpanelSettings-newMsgAlertToneCancelBtn" class="btn btn-cancel">{{ trans('cpanel/cpanel.public.cancel') }}</button>
                    <button id="cpanelSettings-newMsgAlertToneSaveBtn" class="btn">
                        <div class="btnTxt">{{ trans('cpanel/cpanel.public.save') }}</div>
                        <div class="btnLoading"></div>
                    </button>
                </div>
        </x-content-window>
    </div>



</div>
