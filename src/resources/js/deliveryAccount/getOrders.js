for(i=0;i<3;i++){
    $('#ordersContainer_loading').append(
        $('<div/>',{class:'orderContainer'}).append(
            $('<div/>',{class:'cardLoading h15 w80p mY10 br5'}),
            $('<div/>',{class:'cardLoading h15 w100p mY10 br5'}),
            $('<div/>',{class:'cardLoading h15 w100p mY10 br5'}),
            $('<div/>',{class:'cardLoading h15 w100p mY10 br5'}),

        )
    )
}
getOrders = function(callback=()=>{}){
    $('#ordersContainer').addClass('none');
    $('#ordersContainer_loading').removeClass('none');
    $.ajax({
        url:'/orders',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            getOrders:true,
        },success:function(r){
            $('#ordersContainer_loading').addClass('none');
            $('#ordersContainer').text('').removeClass('none');
            if(r.orders.length == 0){
                $('#ordersContainer').append(
                    $('<div/>',{class:' mY20',text:texts.noOrders})
                )
            }
            for(const key in r.orders){
                drawOrder(r.orders[key]);
            }
            callback();
        }
    })
}

let refreshTimer = 0;
let refreshInterval = setInterval(() => {
    if(refreshTimer > 1 ){
        refreshTimer = refreshTimer - 1;
        $('#refresh').text(`${texts.refresh}...${refreshTimer}`).prop('disabled',true);
    }else{
        $('#refresh').text(`${texts.refresh}`).prop('disabled',false);
    }
}, 1000);


$('html,body').on('click','#refresh',function(){
    showBtnLoading($('#refresh'))
    getOrders(function(){
        hideBtnLoading($('#refresh'))
        refreshTimer = 10;
        $('#refresh').text(`${texts.refresh}...${refreshTimer}`).prop('disabled',true);
    });
})
