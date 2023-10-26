require('./manageProducts/delete.js') //done
require('./manageProducts/productAvailabilty.js') //done
require('./manageProducts/sort.js') //done
require('./manageProducts/edit.js') //done
require('./manageProducts/editOptions.js') //

// drawProductsInputLists = function(){
//     resetInputList($('#homePageSections-slideShowProductsList'));
//     resetInputList($('#productReviews-selectProductList'));
//     resetInputList($('#addOrderItem-productsListInput'));
//     if(website.products.length == 0){
//         $('#homePageSections-slideShowProductsList, #productReviews-selectProductList, #addOrderItem-productsList').text('').append(
//             $('<div/>',{
//                 class:'m10',
//             }).append(
//                 $('<span/>',{text:texts.products.noProducts}),
//                 $('<a/>',{class:'mX2 cpPage',cpPage:'Create-New-Product',text:texts.products.createNewProduct}),
//             )
//         )
//     }else{
//         addToInputList($('#productReviews-selectProductList'),texts.products.allproducts,'allproducts')
//         for(const key in website.products){
//             let product = website.products[key];
//             addToInputList($('#homePageSections-slideShowProductsList'),product.name,product.id)
//             addToInputList($('#productReviews-selectProductList'),product.name,product.id)
//             addToInputList($('#addOrderItem-productsList'),product.name,product.id)
//         }
//     }

// }
// drawProductsInputLists();
$('html,body').on('click','#manageProducts-selectCategoryList .inputListElement',function(){
    drawManageProductCards($(this).attr('key'));
    window.page.category = $(this).attr('key');
    pushHistory(false);
})

