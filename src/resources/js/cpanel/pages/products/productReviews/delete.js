$('html,body').on('click','.deleteProductReview',function(e){
    e.stopImmediatePropagation();
    let reviewId = $(this).closest('.productReviewContainer').attr('review');
    let reviewHTML;
    showPopup('delete-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:'msgBox_orange'}).append(
                $('<span/>',{class:'ico-warning fs2 mB10'}),
                $('<span/>',{class:'taC',text:texts.products.confirmDeleteReview}),
                reviewHTML = $('<div/>',{class:'productReviewContainer',html:$(`.productReviewContainer[review="${reviewId}"]`).html()})
            ),
            $('<div/>',{
                class:'btnContainer mT40',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose mie-5',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteReview-confirmBtn',review:reviewId,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
        reviewHTML.find('.deleteProductReview').remove();

    });

})
$('html,body').on('click','#deleteReview-confirmBtn',function(){
    showBtnLoading($('#deleteReview-confirmBtn'));
    let reviewId = $(this).attr('review');
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteReview:true,
            reviewId:reviewId,
        },success:function(r){
            hideBtnLoading($('#deleteReview-confirmBtn'))
            if(r.deleteReviewStatus == 1){
                showAlert('success',r.msg,4000,true);
                for(const key in window.product_reviews){
                    if(window.product_reviews[key].id == reviewId){
                        window.product_reviews.splice(key,1)
                    }
                }
                $('.productReviewContainer[review="'+reviewId+'"').remove();
                closePopup();
                checkUseenNotifications([4],'product_review_id',reviewId)
            }else{
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
