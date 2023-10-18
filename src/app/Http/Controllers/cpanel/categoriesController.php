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
use Carbon\Carbon;
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
                'categoryName.required'=>Lang::get('cpanel/products/responses.categoryNameRequired'),
                'categoryName.regex'=>Lang::get('cpanel/products/responses.categoryNameRegex'),
            ]);

            if($validate->fails()){
                return response(['createNewCategoryStatus' => 2,'error'=> $validate->errors() ]);
            }else{
                $categoryUniqueCheck = categories::where([
                    'website_id'=>$this->website_id,
                    'name'=>$request->categoryName,
                    ])->count();

                if($categoryUniqueCheck > 0){
                    return response(['createNewCategoryStatus' => 4,'msg'=> Lang::get('cpanel/products/responses.categoryNameUnique')]);
                }else{
                    if(strtolower($request->categoryName) == 'privacypolicy' ||
                        strtolower($request->categoryName) == 'home' ||
                        strtolower($request->categoryName) == 'aboutus' ||
                        strtolower($request->categoryName) == 'profile' ||
                        strtolower($request->categoryName) == 'allproducts'

                     ){
                        return response(['createNewCategoryStatus' => 5,'msg'=> Lang::get('cpanel/products/responses.categoryNameNotAllowed')]);
                    }else{
                        $categoriesCount = categories::where('website_id',$this->website_id)->count();
                        $planCategoriesLimit = foodmenuFunctions::plans()[website::where('id',$this->website_id)->pluck('plan')->first()]['categories'];

                        if($planCategoriesLimit <= $categoriesCount){
                            return response(['createNewCategoryStatus' => 3,'msg'=> Lang::get('cpanel/products/responses.createFailPlanLimit')]);
                        }else{
                            $newCatSort = categories::where('website_id', $this->website_id)->max('sort');
                            $names = [];
                            $descriptions = [];
                            foreach($request->categoryNames as $lang => $name){
                                $names[$lang] = strip_tags($name);
                            }
                            foreach($request->categoryDescriptions as $lang => $description){
                                $descriptions[$lang] = strip_tags($description);
                            }
                            $createNewCategory = categories::create([
                                'website_id'=>$this->website_id,
                                'img_id'=>$request->categoryImg,
                                'sort'=>$newCatSort + 1,
                                'name'=>strip_tags($request->categoryName),
                                'names' => $names,
                                'descriptions' => $descriptions,
                            ]);
                            if($createNewCategory){
                                foodmenuFunctions::notification('category.create',[
                                    'website_id' => $this->website_id,
                                    'code' => 9,
                                    'account_id' => Auth::guard('account')->user()->id,
                                    'account_name' => Auth::guard('account')->user()->name,
                                    'category_id' => $createNewCategory->id,
                                    'category_name' => $createNewCategory->name,
                                ],[
                                    'category' => $createNewCategory
                                ]);
                                return response(['createNewCategoryStatus' => 1,'msg'=> Lang::get('cpanel/products/responses.createSaved'),'category' => $createNewCategory]);
                            }else{
                                return response(['createNewCategoryStatus' => 0,'msg'=> Lang::get('cpanel/products/responses.createSaveFail')]);
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
                foodmenuFunctions::notification('category.sort',null,[
                    'fromId' => $request->fromId,
                    'fromSort' => $request->fromSort,
                    'toId' => $request->toId,
                    'toSort' => $request->toSort,
                ]);
                return response(['sortCategoriesStatus' => 1]);
            }else{
                return response(['sortCategoriesStatus' => 0,'msg' => Lang::get('cpanel/products/responses.categoriesSortSavedError')]);

            }
        }
        else if($request->has(['deleteCategory'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $deleteCategory = categories::where(['id'=>$request->categoryId,'website_id'=>$this->website_id])->delete();
            if($deleteCategory){
                foodmenuFunctions::notification('category.delete',[
                    'website_id' => $this->website_id,
                    'code' => 10,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'category_name' => $request->categoryName,
                ],[
                    'category_id' => $request->categoryId,
                ]);
                return response(['deleteCategoryStatus' => 1, 'msg'=>Lang::get('cpanel/products/responses.categoryDeleted')]);
            }else{
                return response(['deleteCategoryStatus' => 0, 'msg'=>Lang::get('cpanel/products/responses.categoryDeleteFail') ]);
            }
        }
        else if($request->has(['editCategory'])){
            if(str_split(Auth::guard('account')->user()->authorities)[1] == false){
                return;
            }
            $names = [];
            $descriptions = [];
            foreach($request->categoryNames as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            foreach($request->categoryDescriptions as $lang => $description){
                $descriptions[$lang] = strip_tags($description);
            }
            $editCategory = categories::where(['id'=>$request->editCategory , 'website_id'=>$this->website_id])->update([
                'img_id'=>$request->categoryImg,
                'names' => $names,
                'descriptions' => $descriptions,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($editCategory){
                $category = categories::where(['name'=>$request->categoryName , 'website_id'=>$this->website_id])->first();
                foodmenuFunctions::notification('category.update',[
                    'website_id' => $this->website_id,
                    'code' => 11,
                    'account_id' => Auth::guard('account')->user()->id,
                    'account_name' => Auth::guard('account')->user()->name,
                    'category_id' => $request->editCategory,
                    'category_name' => $request->categoryName,
                ],[
                    'category' => $category,

                ]);

                // $notification = new stdClass();
                // $notification->code = 14.4;
                // $notification->website_id = $this->website_id;
                // $notification->category = $category;
                // $notification->activity = activityLog::create([
                //     'website_id' => $this->website_id,
                //     'code' => 11,
                //     'account_id' => Auth::guard('account')->user()->id,
                //     'account_name' => Auth::guard('account')->user()->name,
                //     'category_id' => $request->editCategory,
                //     'category_name' => $request->categoryName,
                // ]);
                // broadcast(new cpanelNotification($notification))->toOthers();
                return response(['editCategoryStatus' => 1, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryEdited'), 'category' => $category ]);
            }else{
                return response(['editCategoryStatus' => 0, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryEditeFail') ]);
            }

        }
    }
}
