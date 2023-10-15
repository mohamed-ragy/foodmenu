<div class="pageWrapper" id="images-page" >

    <input type="hidden" id="images-title" value="{{ trans('cpanel/cpanel.menu.images') }}" icon="images">

    <x-content-window title="{{ trans('cpanel/design/imgs.images') }}" helpId="214" windowClass="contentWindow_100p">

        <div>
            <div class="mX5 mB3">
                <span>{{ trans('cpanel/design/imgs.storageSize') }}</span>
                <span>
                    (<span class="imgs-storageBar-currentStorage"></span><span>{{ trans('cpanel/design/imgs.mb') }}</span> / <span class="imgs-storageBar-planStorage"></span><span>{{ trans('cpanel/design/imgs.mb') }}</span>)
                </span>

            </div>
                <div class="storageBar">
                <div class="storageBarinside"></div>
            </div>
            <form id="imgs-uploadImgForm" enctype="multipart/form-data">
                @csrf
                <input type="file" name="designUploadImg" id="imgs-uploadImg" accept="image/png, image/jpeg, image/gif, image/bmp, image/webp" hidden>
            </form>
            <div class="btnContainer">
                <button class="imgs-uploadImgBtn btn">
                    <span class="btnTxt">{{ trans('cpanel/design/imgs.uploadNew') }}</span>
                    <span class="btnLoading"></span>
                </button>
            </div>
        </div>
        <div class="w100p row wrap alnS jstfyC mT20" id="imgs-imgsContainer"></div>

    </x-content-window>

</div>
