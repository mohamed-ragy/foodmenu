<div class="page none" id="product">


    <section class="productPageHead">

        <img class="productPageImg"  src="" alt="">
        <div class="productPageTxt">
            <div class="productPageTitle"></div>
            <div class="productPageRating fs-2"></div>
            <div class="productPageIcons"></div>
            <div class="productPageDes taS"></div>
            <div class="productPageBtnContainer">
                <div class="productPagePrice fs-2"></div>
                <button showText="orders.addToCart" class="productPageAddToCart addToCart mB-10"></button>
            </div>
        </div>
    </section>



    <div showText="reviews.reviews" class="productPageReviewsTitle m-a taC fs-205  mT-30 mB-20 font2"></div>
    <div class="productPageNoReviews taC alnsC none" showText="reviews.noReviews"></div>
    <section class="productPageReviews">

        <div class="postNewReviewContainer">
            <div class="loading postNewReviewLoading none"></div>
            <div showText="reviews.postNewReview" class="alnsC fs-102 mB-10 font2"></div>
            <div class="postNewReviewResponse cE alnsC fs-08 vH" ></div>
            <div class="postReviewStars row alnC jstfyC m-5 pointer">
                <div class="postReviewStar1 postReviewStar postReviewStar_noHover cR ic-star0"></div>
                <div class="postReviewStar2 postReviewStar postReviewStar_noHover cR ic-star0"></div>
                <div class="postReviewStar3 postReviewStar postReviewStar_noHover cR ic-star0"></div>
                <div class="postReviewStar4 postReviewStar postReviewStar_noHover cR ic-star0"></div>
                <div class="postReviewStar5 postReviewStar postReviewStar_noHover cR ic-star0"></div>
            </div>
            <textarea  showPlaceholder="reviews.enterYourReview" id="" rows="5" class="postNewReviewInput mY-5 w-100-20 postNewReviewReview"></textarea>
            <button productId="" showText="reviews.postReview" class="postNewReviewBtn alnsE mT-20"></button>
        </div>

        <div id="productPageReviewsContainer"></div>
    </section>
    <div class="loadingOrderHistory none" id="productReviewsLoading"></div>
    <section class="productPageMoreProducts mY-60 w-100p column alnC jstfyC">

    </section>
</div>
