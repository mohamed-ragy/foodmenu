require('./options/sort.js') //done
require('./options/create.js') //done
require('./options/delete.js') //done
require('./options/edit.js')//

///
require('./options/selections.js')
///

// $('html,body').on('click','.productOptionContainerExpandIcon',function(e){
//     e.stopImmediatePropagation();
//     if($(this).closest('.productOptionContainer').hasClass('productOptionContainer_expand')){
//         $(this).closest('.productOptionContainer').removeClass('productOptionContainer_expand')
//         $(this).closest('.productOptionContainer').find('.ico-up').removeClass('ico-up').addClass('ico-down')
//     }else{
//         $('.productOptionContainer').removeClass('productOptionContainer_expand')
//         $('.productOptionContainer').find('.ico-up').removeClass('ico-up').addClass('ico-down')

//         $(this).closest('.productOptionContainer').addClass('productOptionContainer_expand')
//         $(this).closest('.productOptionContainer').find('.ico-down').removeClass('ico-down').addClass('ico-up')
//     }
// })
// setEditProductOptions = function(productName){
//     $('#editProductOptionsWindowContainer').removeClass('none');
//     $('#editProductOptionsWindowNotFound').addClass('none');
//     let product = website.products.find(item=> item.name == productName);
//     if(typeof(product) === 'undefined'){
//         // popupPageClose(false);
//         $('#editProductOptionsWindowContainer').addClass('none');
//         $('#editProductOptionsWindowNotFound').removeClass('none');
//         return;
//     }
//     for(const key in website.products){
//         if(website.products[key].name == productName){
//             website.products[key].product_options.sort((a,b)=>{
//                 return parseInt(a.sort - b.sort);
//             })
//             product = website.products[key];
//         }
//     }
//     // console.log(product);
//     $('#editOption-container').addClass('none');
//     $('#editProductOptions-productImg').attr('src',product.imgUrl_thumbnail);
//     $('#editProductOptions-productName').text(product.name);
//     $('#editProductOptions-editProductBtn').attr('product',product.name)
//     $('#editProductOptions-createNewOption').attr('productId',product.id)
//     $('#editProductOptions-optionsContainer').text('');
//     for(const key in product.product_options){
//         let option = product.product_options[key];
//         $('#editProductOptions-optionsContainer').append(
//             $('<div/>',{
//                 class:'productOptionCardContainer',
//                 optionId:option.id,
//                 productId:product.id,
//             }).append(
//                 $('<div/>',{class:'row alnC jstfyC'}).append(
//                     $('<div/>',{class:'ico-move fs102 productOptionCardMoveIcon mX3',optionId:option.id,tooltip:texts.cpanel.public.swap}),
//                     $('<div/>',{class:'loading_s mX2 productOptionMoveLoading none'}),
//                     $('<div/>',{text:option.name,class:'fs102 mX5'})
//                 ),
//                 $('<div/>',{class:'productOptionCardIconsContainer'}).append(
//                     $('<div/>',{class:'productOptionCardIcon productOptionCardIconManage ico-settings',tooltip:texts.cpanel.public.manage}),
//                     $('<div/>',{class:'productOptionCardIcon productOptionCardIconDelete ico-delete',tooltip:texts.cpanel.public.delete}),
//                 )
//             )
//         )
//     }
// }
