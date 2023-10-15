<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use App\Models\activityLog;
use App\Models\categories;
use Illuminate\Http\Request;
use App\Models\cpanelSettings;
use App\Models\foodmenuFunctions;
use App\Models\notification;
use App\Models\plan;
use App\Models\product;
use App\Models\product_option;
use App\Models\product_option_selection;
use App\Models\product_review;
use App\Models\User;
use App\Models\website;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use stdClass;
use Illuminate\Support\Facades\Validator;

class productsController extends Controller
{
    protected $website_id;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {

            $this->website_id = Auth::guard('account')->user()->website_id;
            App::setlocale(Auth::guard('account')->user()->language);
            return $next($request);

        })->except(['dologin','login']);

    }
    public function products(Request $request){



        if($request->has(['createNewProduct'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            if($request->productName == ''){
                return response(['createNewProductStatus' => 0,'msg'=> Lang::get('cpanel/products/products.productNameRequired') ]);
            }

            $validate = Validator::make(['productName' => $request->productName],[
                'productName' => 'regex:/^[a-z0-9_-]+$/',
            ]);
            if($validate->fails()){
                return response(['createNewProductStatus' => 0,'msg'=> Lang::get('cpanel/products/products.productNameRegex') ]);
            }

            $checkProductName = product::where(['website_id'=> $this->website_id,'name'=> $request->productName,])->count();
            if($checkProductName > 0){
                return response(['createNewProductStatus' => 0,'msg'=> Lang::get('cpanel/products/products.productNameUnique') ]);
            }

            $productsCount = product::where('website_id',$this->website_id)->count();
            $planProductsLimit = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['products'];
            if($planProductsLimit <= $productsCount){
                return response(['createNewProductStatus' => 3,'msg'=> Lang::get('cpanel/products/products.createFailPlanLimit')]);
            }

            $newProdSort = product::where(['website_id' => $this->website_id,'category_id' => $request->categoryId])->max('sort');
            $createNewProduct = product::create([
                'website_id'=>$this->website_id,
                'sort'=> $newProdSort + 1,
                'name'=> strip_tags($request->productName),
                'price' => $request->price,
                'category_id' => $request->categoryId,
                'img_id'=>$request->productImgId,
                'name_en' =>strip_tags($request->productName_en),
                'name_ar' =>strip_tags($request->productName_ar),
                'name_eg' =>strip_tags($request->productName_eg),
                'name_fr' =>strip_tags($request->productName_fr),
                'name_it' =>strip_tags($request->productName_it),
                'name_de' =>strip_tags($request->productName_de),
                'name_es' =>strip_tags($request->productName_es),
                'name_ru' =>strip_tags($request->productName_ru),
                'name_ua' =>strip_tags($request->productName_ua),

                'description_en' =>strip_tags($request->productDescription_en),
                'description_ar' =>strip_tags($request->productDescription_ar),
                'description_eg' =>strip_tags($request->productDescription_eg),
                'description_fr' =>strip_tags($request->productDescription_fr),
                'description_it' =>strip_tags($request->productDescription_it),
                'description_de' =>strip_tags($request->productDescription_de),
                'description_es' =>strip_tags($request->productDescription_es),
                'description_ru' =>strip_tags($request->productDescription_ru),
                'description_ua' =>strip_tags($request->productDescription_ua),
                'rating' => null,
                'ratings_sum' => 0,
                'ordered_sum' =>0,
                'availability' => true,


            ]);

            if($createNewProduct){
                $createNewProduct->product_options = [];

                $notification = new stdClass();
                $notification->code = 18.1;
                $notification->website_id = $this->website_id;
                $notification->product = $createNewProduct;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 12,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $createNewProduct->id,
                    'product_name' => $createNewProduct->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['createNewProductStatus' => 1,'msg'=> Lang::get('cpanel/products/products.producctCreateSaved'),'product'=>$createNewProduct ]);
            }else{
                return response(['createNewProductStatus' => 2,'msg'=> Lang::get('cpanel/products/products.producctCreateSaveFail') ]);
            }
        }
        else if($request->has(['sortProducts'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $sortProductFrom = product::where(['website_id'=>$this->website_id,'id'=>$request->fromId])->update(['sort'=>$request->fromSort]);
            $sortProductTo = product::where(['website_id'=>$this->website_id,'id'=>$request->toId])->update(['sort'=>$request->toSort]);
            if($sortProductFrom && $sortProductTo){
                $notification = new stdClass();
                $notification->code = 16;
                $notification->fromId = $request->fromId;
                $notification->fromSort = $request->fromSort;
                $notification->toId = $request->toId;
                $notification->toSort = $request->toSort;
                $notification->website_id = $this->website_id;
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['sortProductsStatus' => 1]);
            }else{
                return response(['sortProductsStatus' => 0,'msg' => Lang::get('cpanel/products/products.productsSortFail')]);
            }

        }
        else if($request->has(['changeProductAvailabilty'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $editProductAvailability = product::where(['id'=>$request->changeProductAvailabilty,'website_id'=>$this->website_id])->update(['availability'=>$request->productAvailability]);
            if($editProductAvailability){
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 12;
                $user->productId = $request->changeProductAvailabilty;
                $user->productAvailability = $request->productAvailability;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                $notification = new stdClass();
                $notification->code = 24;
                $notification->website_id = $this->website_id;
                $notification->productId = $request->changeProductAvailabilty;
                $notification->productAvailability = $request->productAvailability;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 13,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->changeProductAvailabilty,
                    'product_name' => $request->productName,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['changeProductAvailabiltyStatus'=>1,'msg'=>Lang::get('cpanel/products/products.productAvailabilitySaved')]);
            }else{
                return response(['changeProductAvailabiltyStatus'=>0,'msg'=>Lang::get('cpanel/products/products.productAvailabilityFaild')]);
            }
        }
        else if($request->has(['deleteProduct'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $deleteProduct = product::where(['id'=>$request->productId ,'website_id' => $this->website_id])->delete();
            if($deleteProduct){
                $notification = new stdClass();
                $notification->code = 18.2;
                $notification->website_id = $this->website_id;
                $notification->productId = $request->productId;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 14,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->productId,
                    'product_name' => $request->productName,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 13;
                $user->productId = $request->productId;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                return response(['deleteProductStatus' => 1,'msg'=> Lang::get('cpanel/products/products.deleteProductDeleted'),'productId' => $request->productId ]);
            }else{
                return response(['deleteProductStatus' => 0,'msg'=> Lang::get('cpanel/products/products.deleteProductFaild') ]);
            }
        }
        else if($request->has(['editProduct'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $editProduct = product::where(['name'=>$request->productName,'website_id'=>$this->website_id])->update([
                'sort' => $request->sort,
                'price' => $request->price,
                'availability'=> $request->availability,
                'category_id' => $request->category_id,
                'img_id'=>$request->img_id,
                'name_en' =>strip_tags($request->name_en),
                'name_ar' =>strip_tags($request->name_ar),
                'name_eg' =>strip_tags($request->name_eg),
                'name_fr' =>strip_tags($request->name_fr),
                'name_it' =>strip_tags($request->name_it),
                'name_de' =>strip_tags($request->name_de),
                'name_es' =>strip_tags($request->name_es),
                'name_ru' =>strip_tags($request->name_ru),
                'name_ua' =>strip_tags($request->name_ua),

                'description_en' =>strip_tags($request->description_en),
                'description_ar' =>strip_tags($request->description_ar),
                'description_eg' =>strip_tags($request->description_eg),
                'description_fr' =>strip_tags($request->description_fr),
                'description_it' =>strip_tags($request->description_it),
                'description_de' =>strip_tags($request->description_de),
                'description_es' =>strip_tags($request->description_es),
                'description_ru' =>strip_tags($request->description_ru),
                'description_ua' =>strip_tags($request->description_ua),


            ]);
            if($editProduct){
                $editedProduct = product::where('name',$request->productName)
                ->with(['product_options'=>function($q){
                    $q->orderBy('sort','asc')->with('product_option_selections');
                }])->first();
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 11;
                $user->productId = $editedProduct->id;
                $user->productPrice = $editedProduct->price;
                $user->productAvailability = $editedProduct->availability;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                $notification = new stdClass();
                $notification->code = 17;
                $notification->website_id = $this->website_id;
                $notification->product = $editedProduct;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 13,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $editedProduct->id,
                    'product_name' => $editedProduct->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['editProductStatus' => 1,'msg'=> Lang::get('cpanel/products/products.productUpdateSaved'),'product'=>$editedProduct]);
            }else{
                return response(['editProductStatus' => 0,'msg'=> Lang::get('cpanel/products/products.productUpdateSaveFaild') ]);

            }



        }
        else if($request->has(['createProductOption'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            if($request->optionName == ''){
                return response(['createProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/products.optionNameRequired') ]);
            }
            $validate = Validator::make(['optionName' => $request->optionName],[
                'optionName' => 'regex:/^[a-z0-9_-]+$/',
            ]);
            if($validate->fails()){
                return response(['createProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/products.optionNameRegex') ]);
            }
            $checkOptionName = product_option::where(['website_id'=>$this->website_id,'product_id' => $request->productId,'name'=>$request->optionName])->count();
            if($checkOptionName > 0){
                return response(['createProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/products.optionNameUnique') ]);
            }
            $optionsCount = product_option::where(['website_id'=>$this->website_id,'product_id'=>$request->productId])->count();
            $planOptionsLimit = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['productOptions'];
            if($planOptionsLimit <= $optionsCount){
                return response(['createProductOptionStatus' => 3,'msg'=> Lang::get('cpanel/products/products.planProductOptionsLimitError')]);
            }
            $newOptionSort = product_option::where(['website_id'=>$this->website_id,'product_id'=>$request->productId])->max('sort');
            $createProductOption = product_option::create([
                'website_id' => $this->website_id,
                'product_id'=>$request->productId,
                'sort' => $newOptionSort + 1,
                'name' => strip_tags($request->optionName),
                'name_en' => strip_tags($request->enName),
                'name_ar' => strip_tags($request->arName),
                'name_eg' => strip_tags($request->egName),
                'name_fr' => strip_tags($request->frName),
                'name_it' => strip_tags($request->itName),
                'name_de' => strip_tags($request->deName),
                'name_es' => strip_tags($request->esName),
                'name_ru' => strip_tags($request->ruName),
                'name_ua' => strip_tags($request->uaName),
            ]);
            if($createProductOption){
                $createdOption = product_option::where([
                    'website_id'=>$this->website_id,
                    'name' => $request->optionName,
                    'product_id'=>$request->productId,
                ])->with('product_option_selections')->first();
                $notification = new stdClass();
                $notification->code = 25;
                $notification->website_id = $this->website_id;
                $notification->option = $createdOption;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 15,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->productId,
                    'product_name' => $request->productName,
                    'option_id' => $createdOption->id,
                    'option_name' => $createdOption->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['createProductOptionStatus' => 1,'msg'=> Lang::get('cpanel/products/products.createProductOptionCreated'),'option' => $createdOption]);
            }else{
                return response(['createProductOptionStatus' => 2,'msg'=> Lang::get('cpanel/products/products.createProductOptionFailed')]);
            }
        }
        else if($request->has(['deleteProductOption'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $deleteProductOption = product_option::where([
                'website_id' => $this->website_id,
                'id' => $request->option_id,
            ])->delete();
            if($deleteProductOption){
                $notification = new stdClass();
                $notification->code = 26;
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->product_id;
                $notification->option_id = $request->option_id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 15.1,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 14;
                $user->product_id = $request->product_id;
                $user->option_id = $request->option_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                return response(['deleteProductOptionStatus' => 1,'msg'=> Lang::get('cpanel/products/products.deleteProductOptionDeleted')]);
            }else{
                return response(['deleteProductOptionStatus' => 0,'msg'=> Lang::get('cpanel/products/products.deleteProductOptionFaild') ]);
            }
        }
        else if($request->has(['sortProductOptions'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $optionSortFrom = product_option::where(['website_id'=>$this->website_id,'id'=>$request->fromId])->update(['sort'=>$request->fromSort]);
            $optionSortTo = product_option::where(['website_id'=>$this->website_id,'id'=>$request->toId])->update(['sort'=>$request->toSort]);
            if($optionSortFrom && $optionSortTo){
                $notification = new stdClass();
                $notification->code = 27;
                $notification->fromId = $request->fromId;
                $notification->fromSort = $request->fromSort;
                $notification->toId = $request->toId;
                $notification->toSort = $request->toSort;
                $notification->website_id = $this->website_id;
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['sortOptionsStatus' => 1]);
            }else{
                return response(['sortOptionsStatus' => 0,'msg' => Lang::get('cpanel/products/products.optionsSortFail')]);
            }
        }
        else if($request->has('editProductOption')){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $editOption = product_option::where(['website_id' => $this->website_id,'id' => $request->option_id])
                ->update([
                    'name_en' => strip_tags($request->name_en),
                    'name_fr' => strip_tags($request->name_fr),
                    'name_de' => strip_tags($request->name_de),
                    'name_it' => strip_tags($request->name_it),
                    'name_es' => strip_tags($request->name_es),
                    'name_ar' => strip_tags($request->name_ar),
                    'name_ru' => strip_tags($request->name_ru),
                    'name_ua' => strip_tags($request->name_ua),
                    'name_eg' => strip_tags($request->name_eg),
                ]);
                if($editOption){
                    $notification = new stdClass();
                    $notification->code = 28;
                    $notification->website_id = $this->website_id;
                    $notification->product_id = $request->product_id;
                    $notification->option_name = $request->option_name;
                    $notification->option_id = $request->option_id;
                    $notification->name_en = $request->name_en;
                    $notification->name_fr = $request->name_fr;
                    $notification->name_de = $request->name_de;
                    $notification->name_it = $request->name_it;
                    $notification->name_es = $request->name_es;
                    $notification->name_ar = $request->name_ar;
                    $notification->name_ru = $request->name_ru;
                    $notification->name_ua = $request->name_ua;
                    $notification->name_eg = $request->name_eg;
                    $notification->activity = activityLog::create([
                        'website_id' => $this->website_id,
                        'code' => 15.2,
                        'account_id' => Auth::guard('account')->user()->id,
                        'account_name' => Auth::guard('account')->user()->name,
                        'product_id' => $request->product_id,
                        'product_name' => $request->product_name,
                        'option_id' => $request->option_id,
                        'option_name' => $request->option_name,
                    ]);
                    broadcast(new cpanelNotification($notification))->toOthers();
                    return response(['editProductOptionStat' => 1, 'msg' => Lang::get('cpanel/products/products.createProductOptionCreated')]);
                }else{
                    return response(['editProductOptionStat' => 0, 'msg' => Lang::get('cpanel/products/products.createProductOptionFailed')]);
                }
        }
        else if($request->has('createProductSelection')){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            if($request->selection_name == ''){
                return response(['createProductSelectionStatus' => 0,'msg'=> Lang::get('cpanel/products/products.selectionNameRequired') ]);
            }
            $validate = Validator::make(['selection_name' => $request->selection_name],[
                'selection_name' => 'regex:/^[a-z0-9_-]+$/',
            ]);
            if($validate->fails()){
                return response(['createProductSelectionStatus' => 0,'msg'=> Lang::get('cpanel/products/products.selectionNameRegex') ]);
            }
            $checkSelectionName = product_option_selection::where(['website_id' => $this->website_id,'product_option_id' => $request->option_id,'name' => $request->selection_name])->count();
            if($checkSelectionName > 0){
                return response(['createProductSelectionStatus' => 0,'msg'=> Lang::get('cpanel/products/products.selectionNameUnique') ]);
            }
            $createNewSelection = product_option_selection::create([
                'website_id' => $this->website_id,
                'product_option_id' => $request->option_id,
                'sort' => $request->sort,
                'isDefault' => false,
                'price' => strip_tags($request->price),
                'name' => strip_tags($request->selection_name),
                'name_en' => strip_tags($request->name_en),
                'name_fr' => strip_tags($request->name_fr),
                'name_de' => strip_tags($request->name_de),
                'name_it' => strip_tags($request->name_it),
                'name_es' => strip_tags($request->name_es),
                'name_ar' => strip_tags($request->name_ar),
                'name_ru' => strip_tags($request->name_ru),
                'name_ua' => strip_tags($request->name_ua),
                'name_eg' => strip_tags($request->name_eg),
            ]);
            if($createNewSelection){
                $createdSelection = product_option_selection::where(['website_id' => $this->website_id,'name' => $request->selection_name])->first();
                $notification = new stdClass();
                $notification->code = 31;
                $notification->website_id = $this->website_id;
                $notification->selection = $createNewSelection;
                $notification->product_id = $request->product_id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 15.3,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                    'selection_id' => $createdSelection->id,
                    'selection_name' => $createdSelection->name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['createProductSelectionStatus' => 1,'msg'=> Lang::get('cpanel/products/products.createProductSelectionSaved') , 'selection' => $createdSelection]);
            }else{
                return response(['createProductSelectionStatus' => 2,'msg'=> Lang::get('cpanel/products/products.createProductSelectionFailed') ]);
            }
        }
        else if($request->has('setDefaultSelection')){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            if($request->isDefault == 1){
                $removeDefault = product_option_selection::where(['website_id' => $this->website_id,'product_option_id' => $request->option_id])->update(['isDefault'=>false]);
                $setDefault = product_option_selection::where(['website_id' => $this->website_id,'id' => $request->selection_id])->update(['isDefault' => true]);
            }else{
                $removeDefault = product_option_selection::where(['website_id' => $this->website_id,'product_option_id' => $request->option_id])->update(['isDefault'=>false]);
                $setDefault = true;
            }
            if($removeDefault && $setDefault){
                $notification = new stdClass();
                $notification->code = 32;
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->product_id;
                $notification->option_id = $request->option_id;
                $notification->selection_id = $request->selection_id;
                $notification->isDefault = $request->isDefault;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 15.4,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                    'selection_id' => $request->selection_id,
                    'selection_name' => $request->selection_name,
                ]);
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 21;
                $user->product_id = $request->product_id;
                $user->option_id = $request->option_id;
                $user->selection_id = $request->selection_id;
                $user->isDefault = $request->isDefault;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['setDefaultSelectionStat'=>1,'msg'=> Lang::get('cpanel/products/products.setDefaultSelectionSaved')]);
            }else{
                return response(['setDefaultSelectionStat'=>0,'msg'=> Lang::get('cpanel/products/products.setDefaultSelectionFailed')]);
            }
        }
        else if($request->has('deleteProductSelection')){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $deleteSelection = product_option_selection::where([
                'website_id' => $this->website_id,
                'product_option_id' => $request->option_id,
                'id' => $request->selection_id,
            ])->delete();
            if($deleteSelection){
                $notification = new stdClass();
                $notification->code = 33;
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->product_id;
                $notification->option_id = $request->option_id;
                $notification->selection_id = $request->selection_id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 15.5,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                    'selection_id' => $request->selection_id,
                    'selection_name' => $request->selection_name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 20;
                $user->product_id = $request->product_id;
                $user->option_id = $request->option_id;
                $user->selection_id = $request->selection_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                return response(['delteProductSelectionStat' => 1,'msg'=>Lang::get('cpanel/products/products.deleteProductSelectionDeleted')]);
            }else{
                return response(['delteProductSelectionStat' => 0,'msg'=>Lang::get('cpanel/products/products.deleteProductSelectionFaild')]);
            }
        }
        else if($request->has(['sortProductSelections'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $selectionSortFrom = product_option_selection::where(['website_id'=>$this->website_id,'id'=>$request->fromId])->update(['sort'=>$request->fromSort]);
            $selectionSortTo = product_option_selection::where(['website_id'=>$this->website_id,'id'=>$request->toId])->update(['sort'=>$request->toSort]);
            if($selectionSortFrom && $selectionSortTo){
                $notification = new stdClass();
                $notification->code = 34;
                $notification->fromId = $request->fromId;
                $notification->fromSort = $request->fromSort;
                $notification->toId = $request->toId;
                $notification->toSort = $request->toSort;
                $notification->website_id = $this->website_id;
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['sortSelectionsStatus' => 1]);
            }else{
                return response(['sortSelectionsStatus' => 0,'msg' => Lang::get('cpanel/products/products.selectionsSortFail')]);
            }
        }
        else if($request->has('editProductSelection')){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $editSelection = product_option_selection::where([
                'website_id' => $this->website_id,
                'product_option_id' => $request->option_id,
                'name' => $request->selection_name,
            ])->update([
                'price' => strip_tags($request->price),
                'name_en' => strip_tags($request->name_en),
                'name_fr' => strip_tags($request->name_fr),
                'name_de' => strip_tags($request->name_de),
                'name_it' => strip_tags($request->name_it),
                'name_es' => strip_tags($request->name_es),
                'name_ar' => strip_tags($request->name_ar),
                'name_ru' => strip_tags($request->name_ru),
                'name_ua' => strip_tags($request->name_ua),
                'name_eg' => strip_tags($request->name_eg),
            ]);
            if($editSelection){
                $notification = new stdClass();
                $notification->code = 35;
                $notification->website_id = $this->website_id;
                $notification->product_id = $request->product_id;
                $notification->option_id = $request->option_id;
                $notification->selection_name = $request->selection_name;
                $notification->price = $request->price;
                $notification->name_en = $request->name_en;
                $notification->name_fr = $request->name_fr;
                $notification->name_de = $request->name_de;
                $notification->name_it = $request->name_it;
                $notification->name_es = $request->name_es;
                $notification->name_ar = $request->name_ar;
                $notification->name_ru = $request->name_ru;
                $notification->name_ua = $request->name_ua;
                $notification->name_eg = $request->name_eg;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 15.6,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $request->product_id,
                    'product_name' => $request->product_name,
                    'option_id' => $request->option_id,
                    'option_name' => $request->option_name,
                    'selection_id' => $request->selection_id,
                    'selection_name' => $request->selection_name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 15;
                $user->product_id = $request->product_id;
                $user->option_id = $request->option_id;
                $user->selection_name = $request->selection_name;
                $user->price = $request->price;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                return response(['editProductSelectionStatus' => 1,'msg'=>Lang::get('cpanel/products/products.createProductSelectionSaved')]);
            }else{
                return response(['editProductSelectionStatus' => 0,'msg'=>Lang::get('cpanel/products/products.createProductSelectionFailed')]);
            }
        }
        else if($request->has('findReview')){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
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

            $findReview = $findReview->whereIn('rate',$request->byRating)->with('users:id,name')->limit(10)->orderBy('posted_at','DESC')->get();
            return response(['reviews' => $findReview]);
        }
        else if($request->has(['deleteReview'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $review = product_review::where(['id'=>$request->reviewId,'website_id'=>$this->website_id])->first();
            $deleteReview = product_review::where(['id'=>$request->reviewId,'website_id' => $this->website_id])->delete();
            if($deleteReview){
                notification::where('product_review_id',$request->reviewId)->delete();
                $notification = new stdClass();
                $notification->code = 15;
                $notification->reviewId = $request->reviewId;
                $notification->website_id = $this->website_id;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 16,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'product_id' => $review->product_id,
                    'product_name' => $review->product_name,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                $user = new stdClass();
                $user->id = 0;
                $user->website_id = $this->website_id;
                $user->code = 22;
                $user->reviewId = $request->reviewId;
                $user->product_id = $review->product_id;
                $user->userType = 'user';
                broadcast(new usersStatus($user));
                return response(['deleteReviewStatus' => 1,'msg'=>Lang::get('cpanel/products/productReviews.deleteReviewDeleted')]);
            }else{
                return response(['deleteReviewStatus' => 0,'msg'=>Lang::get('cpanel/products/productReviews.deleteReviewFaild')]);
            }
        }
        else if($request->has('getReview')){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $review = product_review::where(['website_id' => $this->website_id,'id'=>$request->getReview])->with('users:id,name')->first();
            return response(['review' => $review]);
        }
    }
}
