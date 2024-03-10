<?php

namespace App\Http\Controllers;

use App\Models\help_en_articles;
use App\Models\help_en_sections;
use App\Models\help_en_text;
use App\Models\help_en_tut;
use App\Models\website;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class helpController extends Controller
{
    protected $lang;
    protected $categories = ['getting-started','basics','products-and-categories','ordering-system','statistics-and-analytics','website-users','website-design','system-and-settings','security','my-staff','billing-center'];
    public function __construct(Request $request)
    {

        $this->middleware(function ($request, $next) {
            if(
                $request->FoodMenuLang === 'en'
                // || $request->FoodMenuLang === 'fr'
            ){
                Cookie::queue(Cookie::make('FoodMenuLang',$request->FoodMenuLang,9999999));
                App::setLocale($request->FoodMenuLang);
                $this->lang = $request->FoodMenuLang;
            }else{
                Cookie::queue(Cookie::make('FoodMenuLang','en',9999999));
                App::setLocale('en');
                return redirect()->route('help.home' , ['FoodMenuLang' => 'en']);
            }
            return $next($request);

        })->except(['api']);

        $this->middleware(function ($request, $next) {
            $this->lang = Cookie::get('FoodMenuLang') ?? 'en';
            return $next($request);

        })->only(['api']);
    }

    public function home(Request $request){
        return view('help.help',[
            'lang' => $this->lang,
            'title' => Lang::get('help/help.title'),
            'description' => Lang::get('help/help.description'),
            'page' => 'home',
        ]);
    }

    public function category(Request $request){
        if(!in_array($request->category,$this->categories)){
            return abort(404);
        }
        return view('help.help',[
            'title' => Lang::get(str_replace('-','','help/help.cats.'.$request->category)),
            'description' => Lang::get(str_replace('-','','help/help.cats.'.$request->category.'_des')),
            'lang' => $this->lang,
            'category' => $request->category,
            'page' => 'category',
            'texts' => collect(Lang::get('help/help')),
        ]);
    }

    public function article(Request $request){
        if(!in_array($request->category,$this->categories)){
            return abort(404);
        }
        if($request->lang == 'en'){
            $article = help_en_articles::where(['title_id'=>$request->article,'category'=>$request->category])->with('sections')->first();

        }else{
            $article = help_en_articles::where(['title_id'=>$request->article,'category'=>$request->category])->with('sections')->first();
        }

        if($article == null){
            return abort(404);
        }
        return view('help.help',[
            'lang' => $this->lang,
            'title' => $article->title,
            'description' => $article->description,
            'page' => 'article',
            'article' => $article,
        ]);
    }

    public function section(Request $request){
        if(!in_array($request->category,$this->categories)){
            return abort(404);
        }
        if($request->lang == 'en'){
            $article = help_en_articles::where(['title_id'=>$request->article,'category'=>$request->category])->with('sections')->first();

        }else{
            $article = help_en_articles::where(['title_id'=>$request->article,'category'=>$request->category])->with('sections')->first();
        }

        if($article == null){
            return abort(404);
        }

        return view('help.help',[
            'lang' => $this->lang,
            'title' => $article->title,
            'description' => $article->description,
            'page' => 'section',
            'article' => $article,
            'section' => $request->section,
        ]);
    }

    public function api(Request $request){

        if($request->has('getData')){
            if($this->lang == 'en'){
                $articles = help_en_articles::select(['id','sort','title_id','title','description','icon','category','keyWords','rating'])->orderBy('category','asc')->orderBy('sort','asc')->get();
            }else{
                $articles = help_en_articles::select(['id','sort','title_id','title','description','icon','category','keyWords','rating'])->orderBy('category','asc')->orderBy('sort','asc')->get();
            }
            return response([
                'lang' => $this->lang,
                'categories' => $this->categories,
                'articles' => $articles,
                'texts' => collect(Lang::get('help/help')),
            ]);
        }else if($request->has('getArticle')){

            if(!in_array($request->category,$this->categories)){
                return abort(404);
            }
            if($this->lang == 'en'){
                $article = help_en_articles::where(['title_id'=>$request->article,'category'=>$request->category])->with('sections')->first();
            }else{
                $article = help_en_articles::where(['title_id'=>$request->article,'category'=>$request->category])->with('sections')->first();
            }
            return response(['article' => $article]);
        }
        else if($request->has('rateArticle')){
            if($request->rate == 'up'){
                help_en_articles::where('title_id',$request->rateArticle)->increment('rating');
            }else if($request->rate == 'down'){
                help_en_articles::where('title_id',$request->rateArticle)->decrement('rating');
            }
        }
        else if($request->has('search')){
            $results = help_en_sections::WhereFullText('keyWords',$request->search)->orWhereFullText('title',$request->search)->orderBy('priority','desc')->get();
            return response(['results'=>$results]);
        }
    }
}
