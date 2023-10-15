<div class="pageWrapper" id="product_reviews-page" >
<input type="hidden" id="product_reviews-title" value="{{ trans('cpanel/cpanel.menu.product_reviews') }}" icon="ratings">

    <x-content-window title="{{ trans('cpanel/products/productReviews.title') }}" helpId="148" windowClass="contentWindow_100p" >
        <div class="area" autoHelp="146">
            <span class="areaTitle">{{ trans('cpanel/products/productReviews.findReviews') }}</span>

            <div class="mX10 mB5 pT10  fs101">{{ trans('cpanel/products/productReviews.reviewsFor') }}</div>
            <x-input-list id="productReviews-selectProduct"  containerClass="zx10" listId="productReviews-selectProductList" icon="ico-products" placeholder="{{ trans('cpanel/products/productReviews.findProduct') }}" />

            <div class="reviewsMoreFiltersContainer">
                <div class="mX10 mB5 pT10 mT20 fs101 brdrT1">{{ trans('cpanel/products/productReviews.reviewsBy') }}</div>
                <div class="row wrap alnC jstfyS w100p-20 mB10 mX10">
                    <div class="row alnC jstfyC mX20 mY5 pointer reviewsFilterCheck" filter="users">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/cpanel.public.users') }}</div>
                    </div>
                    <div class="row alnC jstfyC mX20 mY5 pointer reviewsFilterCheck" filter="guests">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/cpanel.public.guests') }}</div>
                    </div>
                </div>
                <x-input-list id="productReviews-selectUser" listId="productReviews-selectUserList" class="findUser" listClass="findUserList" listLoading="no" icon="ico-users" placeholder="{{ trans('cpanel/cpanel.public.findUser') }}" />

                <div class="mX10 mB5 pT10 mT20 fs101 brdrT1">{{ trans('cpanel/products/productReviews.reviewsWith') }}</div>
                <div class="row wrap alnC jstfyS w100p-20 mB20 mX10">
                    <div class="row alnC jstfyC mX20 mY5 pointer reviewsFilterCheck" filter="1star">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/products/productReviews.1StarReviews') }}</div>
                    </div>
                    <div class="row alnC jstfyC mX20 mY5 pointer reviewsFilterCheck" filter="2star">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/products/productReviews.2StarReviews') }}</div>
                    </div>
                    <div class="row alnC jstfyC mX20 mY5 pointer reviewsFilterCheck" filter="3star">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/products/productReviews.3StarReviews') }}</div>
                    </div>
                    <div class="row alnC jstfyC mX20 mY5 pointer reviewsFilterCheck" filter="4star">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/products/productReviews.4StarReviews') }}</div>
                    </div>
                    <div class="row alnC jstfyC mX20 mY5 pointer reviewsFilterCheck" filter="5star">
                        <div class="ico-check1 mX5"></div>
                        <div>{{ trans('cpanel/products/productReviews.5StarReviews') }}</div>
                    </div>
                </div>
            </div>


            <div class="btnContainer">
                <button class="btn btn-cancel" id="reviewsMoreFilters">{{ trans('cpanel/products/productReviews.moreFilters') }}</button>
                <button class="btn" id="productReviews-findReviewsBtn">
                    <div class="btnLoading"></div>
                    <div class="btnTxt">{{ trans('cpanel/cpanel.public.find') }}</div>
                </button>
            </div>
        </div>



        <div class="" id="productReviews-reviewsContainer"></div>

        <div class="none productReviews-reviewsContainer_loading">
            <div class="productReviewContainer_loading">
                <div class="row alnC jstfyC mB10">
                    <div class="cardLoading w20 h20 br50p"></div>
                    <div class="cardLoading w150 h10 br10 mX5"></div>
                </div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
            </div>
            <div class="productReviewContainer_loading">
                <div class="row alnC jstfyC mB10">
                    <div class="cardLoading w20 h20 br50p"></div>
                    <div class="cardLoading w150 h10 br10 mX5"></div>
                </div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
            </div>
            <div class="productReviewContainer_loading">
                <div class="row alnC jstfyC mB10">
                    <div class="cardLoading w20 h20 br50p"></div>
                    <div class="cardLoading w150 h10 br10 mX5"></div>
                </div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
            </div>
            <div class="productReviewContainer_loading">
                <div class="row alnC jstfyC mB10">
                    <div class="cardLoading w20 h20 br50p"></div>
                    <div class="cardLoading w150 h10 br10 mX5"></div>
                </div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w300 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
                <div class="cardLoading mxw100p w400 h8 br10 mY5"></div>
            </div>
        </div>

    </x-content-window>
</div>
