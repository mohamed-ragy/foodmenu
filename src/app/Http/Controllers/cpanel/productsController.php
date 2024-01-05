<?php

namespace App\Http\Controllers\cpanel;

use App\Events\globalChannel;
use App\Http\Controllers\Controller;
use App\Models\categories;
use Illuminate\Http\Request;
use App\Models\foodmenuFunctions;
use App\Models\img;
use App\Models\product;
use App\Models\product_option;
use App\Models\product_option_selection;
use App\Models\product_review;
use App\Models\website;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use stdClass;
use Illuminate\Support\Facades\Validator;

class productsController extends Controller
{
    protected $website_id;
    protected $account;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->account = Auth::guard('account')->user();
            $this->website_id = $this->account->website_id;
            App::setlocale($this->account->language);
            return $next($request);
        })->except(['dologin','login']);

    }
    public function products(Request $request){
        if($request->has(['createNewProduct'])){
            if(str_split($this->account->authorities)[1] == false){return;}
            if($request->productName == ''){
                return response(['createNewProductStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.productNameRequired') ]);
            }

            $validate = Validator::make(['productName' => $request->productName],[
                'productName' => 'regex:/^[a-z0-9_-]+$/',
            ]);
            if($validate->fails()){
                return response(['createNewProductStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.productNameRegex') ]);
            }

            $checkProductName = product::where(['website_id'=> $this->website_id,'name'=> $request->productName,])->count();
            if($checkProductName > 0){
                return response(['createNewProductStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.productNameUnique') ]);
            }

            $productsCount = product::where('website_id',$this->website_id)->count();
            $planProductsLimit = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['products'];
            if($planProductsLimit <= $productsCount){
                return response(['createNewProductStatus' => 3,'msg'=> Lang::get('cpanel/products/responses.createFailPlanLimit')]);
            }

            $newProdSort = product::where(['website_id' => $this->website_id,'category_id' => $request->categoryId])->max('sort');
            $names = [];
            $descriptions = [];
            foreach($request->productNames as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            foreach($request->productDescriptions as $lang => $description){
                $descriptions[$lang] = strip_tags($description);
            }

            if($request->productImgId == '' || $request->productImgId == null){
                $img_url = '/storage/imgs/cpanel/noimg.png';
                $thumbnail_url = '/storage/imgs/cpanel/noimg.png';
            }else{
                $img = img::where(['website_id'=>$this->website_id,'id'=>$request->productImgId])->first();
                if($img != null){
                    $img_url = $img->url;
                    $thumbnail_url = $img->thumbnailUrl;
                }
            }

            $createNewProduct = product::create([
                'website_id'=>$this->website_id,
                'sort'=> $newProdSort + 1,
                'name'=> strip_tags($request->productName),
                'price' => strip_tags($request->price),
                'category_id' => $request->categoryId,
                'img_id'=>$request->productImgId,
                'img' => $img_url,
                'thumbnail' => $thumbnail_url,
                'names' => $names,
                'descriptions' => $descriptions,
                'rating' => null,
                'ratings_sum' => 0,
                'ordered_sum' =>0,
                'availability' => true,
            ]);

            if($createNewProduct){
                $createNewProduct->product_options = [];
                foodmenuFunctions::notification('product.create',[
                    'website_id' => $this->website_id,
                    'code' => 'product.created',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $createNewProduct->id,
                    'product_name' => $createNewProduct->name,
                ],[
                    'product' => $createNewProduct
                ]);
                return response(['createNewProductStatus' => 1,'msg'=> Lang::get('cpanel/products/responses.producctCreateSaved'),'product'=>$createNewProduct ]);
            }else{
                return response(['createNewProductStatus' => 2,'msg'=> Lang::get('cpanel/products/responses.producctCreateSaveFail') ]);
            }
        }
        else if($request->has(['deleteProduct'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $deleteProduct = product::where(['id'=>$request->productId ,'website_id' => $this->website_id])->delete();
            if($deleteProduct){
                foodmenuFunctions::notification('product.deleted',[
                    'website_id' => $this->website_id,
                    'code' => 'product.deleted',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $request->productId,
                    'product_name' => $request->productName,
                ],[
                    'product_id' => $request->productId,
                ]);
                $notification = new stdClass();
                $notification->code = 'product.delete';
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->productId;
                broadcast(new globalChannel($notification))->toOthers();
                return response(['deleteProductStatus' => 1,'msg'=> Lang::get('cpanel/products/responses.deleteProductDeleted'),'productId' => $request->productId ]);
            }else{
                return response(['deleteProductStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.deleteProductFaild') ]);
            }
        }
        else if($request->has(['changeProductAvailabilty'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $editProductAvailability = product::where(['id'=>$request->changeProductAvailabilty,'website_id'=>$this->website_id])->update(['availability'=>$request->productAvailability]);
            if($editProductAvailability){
                foodmenuFunctions::notification('product.availability',[
                    'website_id' => $this->website_id,
                    'code' => 'product.availability',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $request->changeProductAvailabilty,
                    'product_name' => $request->productName,
                    'availability'=>$request->productAvailability
                ],[
                    'product_id' => $request->changeProductAvailabilty,
                    'availability' => $request->productAvailability,
                ]);
                $notification = new stdClass();
                $notification->code = 'product.availability';
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->changeProductAvailabilty;
                $notification->availability = $request->productAvailability;
                broadcast(new globalChannel($notification))->toOthers();
                return response(['changeProductAvailabiltyStatus'=>1,'msg'=>Lang::get('cpanel/products/responses.productAvailabilitySaved')]);
            }else{
                return response(['changeProductAvailabiltyStatus'=>0,'msg'=>Lang::get('cpanel/products/responses.productAvailabilityFaild')]);
            }
        }
        else if($request->has(['sortProducts'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $sortProductFrom = product::where(['website_id'=>$this->website_id,'id'=>$request->fromId])->update(['sort'=>$request->fromSort]);
            $sortProductTo = product::where(['website_id'=>$this->website_id,'id'=>$request->toId])->update(['sort'=>$request->toSort]);
            if($sortProductFrom && $sortProductTo){
                foodmenuFunctions::notification('product.sort',null,[
                    'fromId' => $request->fromId,
                    'fromSort' => $request->fromSort,
                    'toId' => $request->toId,
                    'toSort' => $request->toSort,
                ]);
                return response(['sortProductsStatus' => 1]);
            }else{
                return response(['sortProductsStatus' => 0,'msg' => Lang::get('cpanel/products/responses.productsSortFail')]);
            }

        }
        else if($request->has(['editProduct'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $product = product::where(['id'=> $request->id,'website_id'=>$this->website_id])->first();

            $old_names = $product->names;
            $old_descriptions = $product->descriptions;
            $old_price = $product->price;
            $old_availability = $product->availability;
            $old_img = $product->thumbnail;
            $old_category = $product->category_id == null ? '0' : categories::where(['website_id'=>$this->website_id,'id'=>$product->category_id])->pluck('name')->first();
            $new_category = $request->category_id == null ? '0' : categories::where(['website_id'=>$this->website_id,'id'=>$request->category_id])->pluck('name')->first();

            $sort = $product->sort;
            if($product->category_id != $request->category_id && $request->category_id != null){
                $sort = product::where(['website_id'=>$this->website_id,'category_id'=>$request->category_id])->max('sort') + 1;
            }
            $names = [];
            $descriptions = [];
            foreach($request->names as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            foreach($request->descriptions as $lang => $description){
                $descriptions[$lang] = strip_tags($description);
            }

            if($request->img_id == '' || $request->img_id == null){
                $img_url = '/storage/imgs/cpanel/noimg.png';
                $thumbnail_url = '/storage/imgs/cpanel/noimg.png';
            }else{
                $img = img::where(['website_id'=>$this->website_id,'id'=>$request->img_id])->first();
                if($img != null){
                    $img_url = $img->url;
                    $thumbnail_url = $img->thumbnailUrl;
                }
            }

            if($product->update([
                'sort' => $sort,
                'price' => $request->price,
                'availability'=> $request->availability,
                'category_id' => $request->category_id,
                'img_id'=>$request->img_id,
                'img' => $img_url,
                'thumbnail' => $thumbnail_url,
                'names' => $names,
                'descriptions' => $descriptions,
                'updated_at' => Carbon::now()->timestamp
            ])){
                $activity = null;
                if(
                    $old_category != $new_category ||
                    $old_img != $thumbnail_url ||
                    $old_names != $names ||
                    $old_descriptions != $descriptions ||
                    (double)$old_price != (double)$request->price ||
                    $old_availability != $request->availability
                ){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'product.edited',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'old_category' => $old_category,
                        'new_category'=> $new_category,
                        'old_img' => $old_img,
                        'new_img' => $thumbnail_url,
                        'old_names' => $old_names,
                        'new_names' => $names,
                        'old_descriptions' => $old_descriptions,
                        'new_descriptions' => $descriptions,
                        'old_price' => $old_price,
                        'new_price' => $request->price,
                        'old_availability' => $old_availability,
                        'new_availability' => $request->availability,
                    ];
                }
                foodmenuFunctions::notification('product.edit',$activity,[
                    'product' => $product
                ]);
                $notification = new stdClass();
                $notification->code = 'product.edit';
                $notification->website_id = $this->website_id;
                $notification->product = $product;
                broadcast(new globalChannel($notification))->toOthers();
                return response(['editProductStatus' => 1,'msg'=> Lang::get('cpanel/products/responses.productUpdateSaved'),'product'=>$product]);
            }else{
                return response(['editProductStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.productUpdateSaveFaild') ]);

            }
        }
        else if($request->has(['sortProductOptions'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $optionSortFrom = product_option::where(['website_id'=>$this->website_id,'id'=>$request->fromId])->update(['sort'=>$request->fromSort]);
            $optionSortTo = product_option::where(['website_id'=>$this->website_id,'id'=>$request->toId])->update(['sort'=>$request->toSort]);
            if($optionSortFrom && $optionSortTo){
                foodmenuFunctions::notification('option.sort',null,[
                    'fromId' => $request->fromId,
                    'fromSort' => $request->fromSort,
                    'toId' => $request->toId,
                    'toSort' => $request->toSort,
                    'product_name' => $request->product_name,
                ]);
                return response(['sortOptionsStatus' => 1]);
            }else{
                return response(['sortOptionsStatus' => 0,'msg' => Lang::get('cpanel/products/responses.optionsSortFail')]);
            }
        }
        else if($request->has(['createProductOption'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            if($request->option_identifier == ''){
                return response(['createProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.optionNameRequired') ]);
            }
            $validate = Validator::make(['option_identifier' => $request->option_identifier],[
                'option_identifier' => 'regex:/^[a-z0-9_-]+$/',
            ]);
            if($validate->fails()){
                return response(['createProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.optionNameRegex') ]);
            }
            $checkOptionName = product_option::where(['website_id'=>$this->website_id,'product_id' => $request->product_id,'name'=>$request->option_identifier])->count();
            if($checkOptionName > 0){
                return response(['createProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.optionNameUnique') ]);
            }
            $optionsCount = product_option::where(['website_id'=>$this->website_id,'product_id'=>$request->product_id])->count();
            $planOptionsLimit = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['productOptions'];
            if($planOptionsLimit <= $optionsCount){
                return response(['createProductOptionStatus' => 3,'msg'=> Lang::get('cpanel/products/responses.planProductOptionsLimitError')]);
            }
            $newOptionSort = product_option::where(['website_id'=>$this->website_id,'product_id'=>$request->product_id])->max('sort');
            $names = [];
            foreach($request->option_names as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            $createProductOption = product_option::create([
                'website_id' => $this->website_id,
                'product_id'=>$request->product_id,
                'sort' => $newOptionSort + 1,
                'name' => strip_tags($request->option_identifier),
                'names' => $names,
            ]);
            if($createProductOption){
                $createProductOption->product_option_selections = [];
                foodmenuFunctions::notification('option.create',[
                    'website_id' => $this->website_id,
                    'code' => 'product.option.created',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $createProductOption->id,
                    'option_name' => $createProductOption->name,
                ],[
                    'product_name' => $request->product_name,
                    'product_id' => $request->product_id,
                    'option' => $createProductOption
                ]);
                return response(['createProductOptionStatus' => 1,'msg'=> Lang::get('cpanel/products/responses.createProductOptionCreated'),'option' => $createProductOption]);
            }else{
                return response(['createProductOptionStatus' => 2,'msg'=> Lang::get('cpanel/products/responses.createProductOptionFailed')]);
            }
        }
        else if($request->has(['deleteProductOption'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $deleteProductOption = product_option::where([
                'website_id' => $this->website_id,
                'id' => $request->option_id,
            ])->delete();
            if($deleteProductOption){
                foodmenuFunctions::notification('option.delete',[
                    'website_id' => $this->website_id,
                    'code' => 'product.option.deleted',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                ],[
                    'option_id' => $request->option_id,
                    'product_name' => $request->product_name,
                    'product_id' => $request->product_id,
                ]);
                $notification = new stdClass();
                $notification->code = 'option.delete';
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->product_id;
                $notification->option_id = $request->option_id;
                broadcast(new globalChannel($notification))->toOthers();
                return response(['deleteProductOptionStatus' => 1,'msg'=> Lang::get('cpanel/products/responses.deleteProductOptionDeleted')]);
            }else{
                return response(['deleteProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.deleteProductOptionFaild') ]);
            }
        }
        else if($request->has('editProductOption')){
            if(str_split($this->account->authorities)[1] == false){return;}

            $names = [];
            foreach($request->names as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            $option = product_option::where(['website_id' => $this->website_id,'id' => $request->option_id])->first();
            $old_names = $option->names;
            $editOption = $option->update([
                    'names' => $names,
                    'updated_at' => Carbon::now()->timestamp
                ]);
                if($editOption){
                    $activity = null;
                    if($old_names != $names){
                        $activity = [
                            'website_id' => $this->website_id,
                            'code' => 'product.option.edited',
                            'account_id' => $this->account->id,
                            'account_name' => $this->account->name,
                            'product_id' => $request->product_id,
                            'product_name' => $request->product_name,
                            'option_id' => $request->option_id,
                            'option_name' => $request->option_name,
                            'old_names' => $old_names,
                            'new_names' => $names,
                        ];
                    }
                    foodmenuFunctions::notification('option.edit',$activity,[
                        'product_name' => $request->product_name,
                        'option_id' => $request->option_id,
                        'product_id' => $request->product_id,
                        'names' => $names,
                    ]);
                    return response(['editProductOptionStat' => 1, 'msg' => Lang::get('cpanel/products/responses.createProductOptionCreated')]);
                }else{
                    return response(['editProductOptionStat' => 0, 'msg' => Lang::get('cpanel/products/responses.createProductOptionFailed')]);
                }
        }
        else if($request->has('setDefaultSelection')){
            if(str_split($this->account->authorities)[1] == false){return;}

            $removeDefault = product_option_selection::where(['website_id' => $this->website_id,'product_option_id' => $request->option_id])->update(['isDefault'=>false]);
            $setDefault = product_option_selection::where(['website_id' => $this->website_id,'id' => $request->selection_id])->update(['isDefault' => true]);
            if($removeDefault && $setDefault){
                foodmenuFunctions::notification('selection.set_default',[
                    'website_id' => $this->website_id,
                    'code' => 'product.selection.set_default',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                    'selection_id' => $request->selection_id,
                    'selection_name' => $request->selection_name,
                ],[
                    'product_id' => $request->productId,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'selection_id' => $request->selection_id,
                ]);
                return response(['setDefaultSelectionStat'=>1,'msg'=> Lang::get('cpanel/products/responses.setDefaultSelectionSaved')]);
            }else{
                return response(['setDefaultSelectionStat'=>0,'msg'=> Lang::get('cpanel/products/responses.setDefaultSelectionFailed')]);
            }
        }
        else if($request->has(['sortProductSelections'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $selectionSortFrom = product_option_selection::where(['website_id'=>$this->website_id,'id'=>$request->fromId])->update(['sort'=>$request->fromSort]);
            $selectionSortTo = product_option_selection::where(['website_id'=>$this->website_id,'id'=>$request->toId])->update(['sort'=>$request->toSort]);
            if($selectionSortFrom && $selectionSortTo){
                foodmenuFunctions::notification('selection.sort',null,[
                    'fromId' => $request->fromId,
                    'fromSort' => $request->fromSort,
                    'toId' => $request->toId,
                    'toSort' => $request->toSort,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id
                ]);
                return response(['sortSelectionsStatus' => 1]);
            }else{
                return response(['sortSelectionsStatus' => 0,'msg' => Lang::get('cpanel/products/responses.selectionsSortFail')]);
            }
        }
        else if($request->has('createProductSelection')){
            if(str_split($this->account->authorities)[1] == false){return;}

            if($request->selection_name == ''){
                return response(['createProductSelectionStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.selectionNameRequired') ]);
            }
            $validate = Validator::make(['selection_name' => $request->selection_name],[
                'selection_name' => 'regex:/^[a-z0-9_-]+$/',
            ]);
            if($validate->fails()){
                return response(['createProductSelectionStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.selectionNameRegex') ]);
            }
            $checkSelectionName = product_option_selection::where(['website_id' => $this->website_id,'product_option_id' => $request->option_id,'name' => $request->selection_name])->count();
            if($checkSelectionName > 0){
                return response(['createProductSelectionStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.selectionNameUnique') ]);
            }
            $newSelectionSort = product_option_selection::where(['website_id'=>$this->website_id,'product_option_id'=>$request->option_id])->max('sort');
            $names = [];
            foreach($request->selection_names as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            $isDefault = false;
            if(product_option_selection::where(['website_id'=>$this->website_id,'product_option_id'=>$request->option_id])->count() == 0){
                $isDefault = true;
            }
            $createNewSelection = product_option_selection::create([
                'website_id' => $this->website_id,
                'product_option_id' => $request->option_id,
                'name' => strip_tags($request->selection_name),
                'sort' => $newSelectionSort + 1,
                'isDefault' => $isDefault,
                'price' => $request->price,
                'names' => $names
            ]);
            if($createNewSelection){
                foodmenuFunctions::notification('selection.create',[
                    'website_id' => $this->website_id,
                    'code' => 'product.selection.create',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                    'selection_id' => $createNewSelection->id,
                    'selection_name' => $createNewSelection->name,
                ],[
                    'product_name' => $request->product_name,
                    'product_id' => $request->product_id,
                    'option_id' => $request->option_id,
                    'selection' => $createNewSelection,
                ]);
                return response(['createProductSelectionStatus' => 1,'msg'=> Lang::get('cpanel/products/responses.createProductSelectionSaved') , 'selection' => $createNewSelection]);
            }else{
                return response(['createProductSelectionStatus' => 2,'msg'=> Lang::get('cpanel/products/responses.createProductSelectionFailed') ]);
            }
        }
        else if($request->has('deleteProductSelection')){
            if(str_split($this->account->authorities)[1] == false){return;}

            $selection = product_option_selection::where([
                'website_id' => $this->website_id,
                'id' => $request->selection_id,
            ])->first();
            if($selection->isDefault == 1){
                return response(['delteProductSelectionStat' => 0,'msg'=>Lang::get('cpanel/products/responses.cantdeleteDefaultSelection')]);
            }
            if($selection->delete()){
                foodmenuFunctions::notification('selection.delete',[
                    'website_id' => $this->website_id,
                    'code' => 'product.selection.deleted',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                    'selection_id' => $request->selection_id,
                    'selection_name' => $request->selection_name,
                ],[
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'selection_id' => $request->selection_id,
                ]);
                $notification = new stdClass();
                $notification->code = 'selection.delete';
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->product_id;
                $notification->option_id = $request->option_id;
                $notification->selection_id = $request->selection_id;
                broadcast(new globalChannel($notification))->toOthers();
                return response(['delteProductSelectionStat' => 1,'msg'=>Lang::get('cpanel/products/responses.deleteProductSelectionDeleted')]);
            }else{
                return response(['delteProductSelectionStat' => 0,'msg'=>Lang::get('cpanel/products/responses.deleteProductSelectionFaild')]);
            }
        }
        else if($request->has('editProductSelection')){
            if(str_split($this->account->authorities)[1] == false){return;}

            $names = [];
            foreach($request->selection_names as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            $selection = product_option_selection::where(['website_id' => $this->website_id,'id' => $request->selection_id,])->first();
            $old_names = $selection->names;
            $old_price = $selection->price;
            $editSelection = $selection->update([
                'price' => $request->price,
                'names' => $names,
                'updated_at' => Carbon::now()->timestamp
            ]);
            if($editSelection){
                $activity = null;
                if($old_names != $names || (double)$old_price != (double)$request->price){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'product.selection.edited',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'product_id' => $request->product_id,
                        'product_name' => $request->product_name,
                        'option_id' => $request->option_id,
                        'option_name' => $request->option_name,
                        'selection_id' => $request->selection_id,
                        'selection_name' => $request->selection_name,
                        'old_names' => $old_names,
                        'new_names' => $names,
                        'old_price' => $old_price,
                        'new_price' => $request->price,
                    ];
                }
                foodmenuFunctions::notification('selection.edit',$activity,[
                    'product_name' => $request->product_name,
                    'product_id' => $request->product_id,
                    'option_id' => $request->option_id,
                    'selection_id' => $request->selection_id,
                    'price' => $request->price,
                    'names' => $names,
                ]);
                $notification = new stdClass();
                $notification->code = 'selection.edit';
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->product_id;
                $notification->option_id = $request->option_id;
                $notification->selection_id = $request->selection_id;
                $notification->price = $request->price;
                $notification->names = $names;
                broadcast(new globalChannel($notification))->toOthers();
                return response(['editProductSelectionStatus' => 1,'msg'=>Lang::get('cpanel/products/responses.createProductSelectionSaved')]);
            }else{
                return response(['editProductSelectionStatus' => 0,'msg'=>Lang::get('cpanel/products/responses.createProductSelectionFailed')]);
            }
        }

        else if($request->has('findReviews')){
            if(str_split($this->account->authorities)[1] == false){return;}

            $findReview = product_review::where('website_id',$this->website_id);
            if($request->findReviewsAfter != '' || $request->findReviewsAfter != null){
                $findReview = $findReview->where('posted_at','<',$request->findReviewsAfter);
            }
            if($request->byProduct != 'allproducts'){
                $findReview = $findReview->where('product_name',$request->byProduct);
            }
            if($request->byUser == '' || $request->byUser == null){
                if($request->byUsers == 1 && $request->byGuests == 0){
                    $findReview = $findReview->where('user_id','!=',null);
                }
                if($request->byGuests == 1 && $request->byUsers == 0){
                    $findReview = $findReview->where('user_id',null);
                }
            }else{
                $findReview = $findReview->where('user_id',$request->byUser);
            }

            $findReview =  $findReview->whereIn('rate',$request->byRating);
            // $count = $findReview->count();
            $reviews = $findReview->skip($request->skip)->limit(10)->orderBy('posted_at','DESC')->get();
            return response(['reviews' => $reviews]);
        }
        else if($request->has(['deleteReview'])){
            if(str_split($this->account->authorities)[1] == false){return;}

            $review = product_review::where(['id'=>$request->reviewId,'website_id'=>$this->website_id])->first();
            $deleteReview = product_review::where(['id'=>$request->reviewId,'website_id' => $this->website_id])->delete();
            if($deleteReview){
                foodmenuFunctions::notification('review.delete',[
                    'website_id' => $this->website_id,
                    'code' => 'review.deleted',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'product_id' => $review->product_id,
                    'product_name' => $review->product_name,
                ],[
                    'review_id' => $request->reviewId,
                ]);
                $notification = new stdClass();
                $notification->code = 'review.delete';
                $notification->website_id = $this->website_id;
                $notification->review_id = $request->reviewId;
                broadcast(new globalChannel($notification))->toOthers();
                return response(['deleteReviewStatus' => 1,'msg'=>Lang::get('cpanel/products/responses.deleteReviewDeleted')]);
            }else{
                return response(['deleteReviewStatus' => 0,'msg'=>Lang::get('cpanel/products/responses.deleteReviewFaild')]);
            }
        }
        else if($request->has('getReview')){

            $review = product_review::where(['website_id' => $this->website_id,'id'=>$request->getReview])->first();
            return response(['review' => $review]);
        }
    }
}
