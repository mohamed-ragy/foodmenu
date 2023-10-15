<div class="pageWrapper mxw800" id="submit_a_help_ticket-page" pageTitle="{{ trans('cpanel/cpanel.menu.submit_a_help_ticket') }}" icon="ticket">
    <div class="pageSection pT10">
        <div class="pageSectionTitle">
            <span>{{ trans('cpanel/support/submitTicket.submitTicket') }}</span>
            <span class="ico-help help-icon" helpId="7"></span>
        </div>
        {{-- <x-input-text title="{{ trans('cpanel/support/submitTicket.ticketTitle') }}" id="support-submitTicket-ticketTitle" icon="ico-ticket" placeholder="{{ trans('cpanel/support/submitTicket.ticketTitle') }}"  autoHelp="1" /> --}}
        {{-- <x-input-list title="{{ trans('cpanel/support/submitTicket.ticketCode') }}" id="support-submitTicket-ticketCode" listId="support-submitTicket-ticketCodeList" icon="ico-categories" placeholder="{{ trans('cpanel/support/submitTicket.selectTicketCode') }}" autoHelp="2" /> --}}
        {{-- <x-textarea id="support_submitTicket_ticketDescription" icon="ico-description" maxLength="1000" title="{{ trans('cpanel/support/submitTicket.ticketDescription') }}"  autoHelp="4" /> --}}
        <div id="support-submitTicket-attachImgsContainer" class="area" autoHelp="5" >
            <div id="support-submitTicket-attachedImgsTitle" class="areaTitle">{{ trans('cpanel/support/submitTicket.attachedImgs') }}</div>
            <div id="support-submitTicket-attachedImgs"></div>
            <span id="support-submitTicket-attachAnImg"><span class=" fs08 ico-attachment"></span>{{ trans('cpanel/support/submitTicket.attachAnImg') }}</span>
            <div class="loading" id="supprt-submitTicket-attachImgLoading"></div>
        </div>
        <div class="btnContainer mT10">
            <button class="btn" id="support-submitTicket-submitTicketBtn" autoHelp="6">{{ trans('cpanel/support/submitTicket.submitTicketBtn') }}</button>
        </div>
        <form id="support-submitTicket-attachImgForm" enctype="multipart/form-data">
            @csrf
            <input type="file" name="ticketUploadImg"  id="support-submitTicket-attachImgInputFile" accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" hidden>
        </form>
    </div>
</div>
