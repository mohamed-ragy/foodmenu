$('#productReviews-reviewsContainer').on('click','.deleteReview',function(e){
    e.stopImmediatePropagation();
    let reviewId = $(this).attr('reviewId');
    // let reviewCard = ;
    let tempReviewCard;
    $('#delete-popup').find('.popupBody').text('').append(
        $('<div/>',{}).append(
            $('<div/>',{class:'fs105 m10',text:texts.products.confirmDeleteReview}),
            tempReviewCard = $('<div/>',{class:'productReviewContainer',html:$(this).closest('.productReviewContainer').html()}),
            $('<div/>',{
                class:'btnContainer',
            }).append(
                $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cpanel.public.cancel}),
                $('<button/>',{id:'deleteReview-confirmBtn',reviewId:reviewId,class:'btn btn-delete'}).append(
                    $('<span/>',{class:'btnTxt',text:texts.cpanel.public.delete}),
                    $('<span/>',{class:'btnLoading'})
                )
            )
        )
    )
    tempReviewCard.find('.deleteReview').addClass('none');
    showPopup($('#delete-popup'))
})
$('html,body').on('click','#deleteReview-confirmBtn',function(){
    showBtnLoading($('#deleteReview-confirmBtn'));
    let reviewId = $(this).attr('reviewId');
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
                $('.productReviewContainer[reviewId="'+reviewId+'"').remove();
                closePopup();
                // need to remove Notification of this review here
            }else{
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
