<?php

namespace App\Http\Controllers\cpanel;

use App\Events\cpanelNotification;
use App\Http\Controllers\Controller;
use App\Models\activityLog;
use Illuminate\Http\Request;
use App\Models\website;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\cpanelSettings;
use App\Models\categories;
use App\Models\foodmenuFunctions;
use App\Models\plan;
use Illuminate\Support\Facades\Validator;
use stdClass;

class categoriesController extends Controller
{
    protected $website_id;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {

            $this->website_id = Auth::guard('account')->user()->website_id;
            App::setlocale(Auth::guard('account')->user()->language);
            return $next($request);

        })->except(['dologin','login']);
        // Carbon::setLocale('en');

    }
    public function categories(Request $request)
    {
        if($request->has(['createNewCategory'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $validate = Validator::make($request->all(),[
                'categoryName' => 'required|regex:/^[a-z0-9_-]+$/',
            ],[
                'categoryName.required'=>Lang::get('cpanel/categories/createNewCategory.categoryNameRequired'),
                'categoryName.regex'=>Lang::get('cpanel/categories/createNewCategory.categoryNameRegex'),
            ]);

            if($validate->fails()){
                return response(['createNewCategoryStatus' => 2,'error'=> $validate->errors() ]);
            }else{
                $categoryUniqueCheck = categories::where([
                    'website_id'=>$this->website_id,
                    'name'=>$request->categoryName,
                    ])->count();

                if($categoryUniqueCheck > 0){
                    return response(['createNewCategoryStatus' => 4,'msg'=> Lang::get('cpanel/categories/createNewCategory.categoryNameUnique')]);
                }else{
                    if(strtolower($request->categoryName) == 'privacypolicy' ||
                        strtolower($request->categoryName) == 'home' ||
                        strtolower($request->categoryName) == 'aboutus' ||
                        strtolower($request->categoryName) == 'profile' ||
                        strtolower($request->categoryName) == 'allproducts'
                     ){
                        return response(['createNewCategoryStatus' => 5,'msg'=> Lang::get('cpanel/categories/createNewCategory.categoryNameNotAllowed')]);
                    }else{
                        $categoriesCount = categories::where('website_id',$this->website_id)->count();
                        $planCategoriesLimit = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['categories'];

                        if($planCategoriesLimit <= $categoriesCount){
                            return response(['createNewCategoryStatus' => 3,'msg'=> Lang::get('cpanel/categories/createNewCategory.createFailPlanLimit')]);
                        }else{
                            $newCatSort = categories::where('website_id', $this->website_id)->max('sort');
                            $createNewCategory = categories::create([
                                'website_id'=>$this->website_id,
                                'img_id'=>$request->categoryImg,
                                'sort'=>$newCatSort + 1,
                                'name'=>strip_tags($request->categoryName),
                                'name_en'=>strip_tags($request->categoryName_en),
                                'name_ar'=>strip_tags($request->categoryName_ar),
                                'name_eg'=>strip_tags($request->categoryName_eg),
                                'name_fr'=>strip_tags($request->categoryName_fr),
                                'name_de'=>strip_tags($request->categoryName_de),
                                'name_it'=>strip_tags($request->categoryName_it),
                                'name_es'=>strip_tags($request->categoryName_es),
                                'name_ru'=>strip_tags($request->categoryName_ru),
                                'name_ua'=>strip_tags($request->categoryName_ua),
                                'description_en' => strip_tags($request->categoryDescription_en),
                                'description_ar' => strip_tags($request->categoryDescription_ar),
                                'description_eg' => strip_tags($request->categoryDescription_eg),
                                'description_fr' => strip_tags($request->categoryDescription_fr),
                                'description_de' => strip_tags($request->categoryDescription_de),
                                'description_it' => strip_tags($request->categoryDescription_it),
                                'description_es' => strip_tags($request->categoryDescription_es),
                                'description_ru' => strip_tags($request->categoryDescription_ru),
                                'description_ua' => strip_tags($request->categoryDescription_ua),
                            ]);
                            if($createNewCategory){
                                $notification = new stdClass();
                                $notification->code = 14.1;
                                $notification->website_id = $this->website_id;
                                $notification->category = $createNewCategory;
                                $notification->activity = activityLog::create([
                                    'website_id' => $this->website_id,
                                    'code' => 9,
                                    'account_id' => Auth::guard('account')->user()->id,
                                    'account_name' => Auth::guard('account')->user()->name,
                                    'category_id' => $createNewCategory->id,
                                    'category_name' => $createNewCategory->name,
                                ]);
                                broadcast(new cpanelNotification($notification))->toOthers();
                                return response(['createNewCategoryStatus' => 1,'msg'=> Lang::get('cpanel/categories/createNewCategory.createSaved'),'category' => $createNewCategory]);
                            }else{
                                return response(['createNewCategoryStatus' => 0,'msg'=> Lang::get('cpanel/categories/createNewCategory.createSaveFail')]);
                            }
                        }
                    }
                }
            }
        }
        else if($request->has(['sortCategories'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }

            $sortCat1 = categories::where(['website_id'=>$this->website_id, 'id' => $request->fromId])->update(['sort'=>$request->fromSort]);
            $sortCat2 = categories::where(['website_id'=>$this->website_id, 'id' => $request->toId])->update(['sort'=>$request->toSort]);

            if($sortCat1 && $sortCat2){

                $notification = new stdClass();
                $notification->code = 14.2;
                $notification->fromId = $request->fromId;
                $notification->fromSort = $request->fromSort;
                $notification->toId = $request->toId;
                $notification->toSort = $request->toSort;
                $notification->website_id = $this->website_id;
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['sortCategoriesStatus' => 1]);
            }else{
                return response(['sortCategoriesStatus' => 0,'msg' => Lang::get('cpanel/categories/categoriesList.categoriesSortSavedError')]);

            }

        }
        else if($request->has(['deleteCategory'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $deleteCategory = categories::where(['id'=>$request->categoryId,'website_id'=>$this->website_id])->delete();
            if($deleteCategory){
                $notification = new stdClass();
                $notification->code = 14.3;
                $notification->website_id = $this->website_id;
                $notification->category_id = $request->categoryId;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 10,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'category_name' => $request->categoryName,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['deleteCategoryStatus' => 1, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryDeleted')]);
            }else{
                return response(['deleteCategoryStatus' => 0, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryDeleteFail') ]);
            }
        }
        else if($request->has(['editCategory'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $editCategory = categories::where(['name'=>$request->categoryName , 'website_id'=>$this->website_id])->update([
                'img_id'=>$request->categoryImg,
                'name_en'=>strip_tags($request->categoryName_en),
                'name_ar'=>strip_tags($request->categoryName_ar),
                'name_eg'=>strip_tags($request->categoryName_eg),
                'name_de'=>strip_tags($request->categoryName_de),
                'name_it'=>strip_tags($request->categoryName_it),
                'name_es'=>strip_tags($request->categoryName_es),
                'name_fr'=>strip_tags($request->categoryName_fr),
                'name_ru'=>strip_tags($request->categoryName_ru),
                'name_ua'=>strip_tags($request->categoryName_ua),
                'description_en' => strip_tags($request->categoryDescription_en),
                'description_ar' => strip_tags($request->categoryDescription_ar),
                'description_eg' => strip_tags($request->categoryDescription_eg),
                'description_fr' => strip_tags($request->categoryDescription_fr),
                'description_de' => strip_tags($request->categoryDescription_de),
                'description_it' => strip_tags($request->categoryDescription_it),
                'description_es' => strip_tags($request->categoryDescription_es),
                'description_ru' => strip_tags($request->categoryDescription_ru),
                'description_ua' => strip_tags($request->categoryDescription_ua),
            ]);
            if($editCategory){
                $category = categories::where(['name'=>$request->categoryName , 'website_id'=>$this->website_id])->first();
                $notification = new stdClass();
                $notification->code = 14.4;
                $notification->website_id = $this->website_id;
                $notification->category = $category;
                $notification->activity = activityLog::create([
                    'website_id' => $this->website_id,
                    'code' => 11,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'category_id' => $request->editCategory,
                    'category_name' => $request->categoryName,
                ]);
                broadcast(new cpanelNotification($notification))->toOthers();
                return response(['editCategoryStatus' => 1, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryEdited'), 'category' => $category ]);
            }else{
                return response(['editCategoryStatus' => 0, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryEditeFail') ]);
            }

        }
    }
}
