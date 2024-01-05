<?php

namespace App\Http\Controllers\cpanel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\website;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\categories;
use App\Models\foodmenuFunctions;
use App\Models\img;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class categoriesController extends Controller
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
    public function categories(Request $request)
    {
        if($request->has(['createNewCategory'])){
            if(str_split($this->account->authorities)[1] == false){return;}

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
                            return response(['createNewCategoryStatus' => 3,'msg'=> Lang::get('cpanel/products/responses.createFailPlanLimit_cat')]);
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
                            if($request->categoryImg == '' || $request->categoryImg == null){
                                $img_url = '/storage/imgs/cpanel/noimg.png';
                                $thumbnail_url = '/storage/imgs/cpanel/noimg.png';
                            }else{
                                $img = img::where(['website_id'=>$this->website_id,'id'=>$request->categoryImg])->first();
                                if($img != null){
                                    $img_url = $img->url;
                                    $thumbnail_url = $img->thumbnailUrl;
                                }
                            }
                            $createNewCategory = categories::create([
                                'website_id'=>$this->website_id,
                                'img_id'=>$request->categoryImg,
                                'img' => $img_url,
                                'thumbnail' => $thumbnail_url,
                                'sort'=>$newCatSort + 1,
                                'name'=>strip_tags($request->categoryName),
                                'names' => $names,
                                'descriptions' => $descriptions,
                            ]);
                            if($createNewCategory){
                                foodmenuFunctions::notification('category.create',[
                                    'website_id' => $this->website_id,
                                    'code' => 'category.created',
                                    'account_id' => $this->account->id,
                                    'account_name' => $this->account->name,
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
            if(str_split($this->account->authorities)[1] == false){return;}

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
            if(str_split($this->account->authorities)[1] == false){return;}
            $deleteCategory = categories::where(['id'=>$request->categoryId,'website_id'=>$this->website_id])->delete();
            if($deleteCategory){
                foodmenuFunctions::notification('category.delete',[
                    'website_id' => $this->website_id,
                    'code' => 'category.deleted',
                    'account_id' => $this->account->id,
                    'account_name' => $this->account->name,
                    'category_name' => $request->categoryName,
                    'category_id'=>$request->categoryId
                ],[
                    'category_id' => $request->categoryId,
                ]);
                return response(['deleteCategoryStatus' => 1, 'msg'=>Lang::get('cpanel/products/responses.categoryDeleted')]);
            }else{
                return response(['deleteCategoryStatus' => 0, 'msg'=>Lang::get('cpanel/products/responses.categoryDeleteFail') ]);
            }
        }
        else if($request->has(['editCategory'])){
            if(str_split($this->account->authorities)[1] == false){return;}
            $category = categories::where(['name'=>$request->categoryName , 'website_id'=>$this->website_id])->first();
            $old_names = $category->names;
            $old_descriptions = $category->descriptions;
            $old_img_id = $category->img_id;
            $old_img = $category->img;
            $old_thumbnail = $category->thumbnail;

            $names = [];
            $descriptions = [];
            foreach($request->categoryNames as $lang => $name){
                $names[$lang] = strip_tags($name);
            }
            foreach($request->categoryDescriptions as $lang => $description){
                $descriptions[$lang] = strip_tags($description);
            }
            if($request->categoryImg == '' || $request->categoryImg == null){
                $img_url = '/storage/imgs/cpanel/noimg.png';
                $thumbnail_url = '/storage/imgs/cpanel/noimg.png';
            }else{
                $img = img::where(['website_id'=>$this->website_id,'id'=>$request->categoryImg])->first();
                if($img != null){
                    $img_url = $img->url;
                    $thumbnail_url = $img->thumbnailUrl;
                }
            }
            $editCategory = categories::where(['id'=>$request->editCategory , 'website_id'=>$this->website_id])->update([
                'img_id'=>$request->categoryImg,
                'img' => $img_url,
                'thumbnail' => $thumbnail_url,
                'names' => $names,
                'descriptions' => $descriptions,
                'updated_at' => Carbon::now()->timestamp,
            ]);
            if($editCategory){
                $activity = null;
                if($names != $old_names || $descriptions != $old_descriptions || $thumbnail_url != $old_thumbnail){
                    $activity = [
                        'website_id' => $this->website_id,
                        'code' => 'category.edited',
                        'account_id' => $this->account->id,
                        'account_name' => $this->account->name,
                        'category_id' => $request->editCategory,
                        'category_name' => $request->categoryName,
                        'new_names' => $names,
                        'old_names' => $old_names,
                        'new_descriptions' => $descriptions,
                        'old_descriptions' => $old_descriptions,
                        'new_img' => $thumbnail_url,
                        'old_img' => $old_thumbnail,
                    ];
                }
                foodmenuFunctions::notification('category.edit',$activity,[
                    'category_id' => $request->editCategory,
                    'img_id'=>$request->categoryImg,
                    'img' => $img_url,
                    'thumbnail' => $thumbnail_url,
                    'names' => $names,
                    'descriptions' => $descriptions,
                ]);
                return response(['editCategoryStatus' => 1, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryEdited'),'thumbnail'=>$thumbnail_url,'img' => $img_url ]);
            }else{
                return response(['editCategoryStatus' => 0, 'msg'=>Lang::get('cpanel/categories/categoriesList.categoryEditeFail') ]);
            }

        }
    }
}
