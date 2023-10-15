<?php

namespace App\Http\Controllers;

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
    public function __construct(Request $request)
    {

        $this->middleware(function ($request, $next) {
            if(
                $request->FoodMenuLang === 'en'
                // || $request->FoodMenuLang === 'ar'
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
    }

    public function home(Request $request){
        $website = null;

        if(Auth::guard('account')->check()){
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['domainName'])->first();
        }
        if($this->lang == 'en'){
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }else{
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }
        return view('help.help',[
            'title' => Lang::get('help/help.title'),
            'description' => Lang::get('help/help.description'),
            'lang' => $this->lang,
            'website' => $website,
            'tuts' => $tuts,
            'cat' => null,
            'article' => null,
            'section' => null,
            'texts' => collect(Lang::get('help/help')),
        ]);
    }

    public function cat(Request $request){
        $cats_names = ['getting-started','basics','security','ordering-system','statistics-and-analytics','billing-and-subscription','products-and-categories','website-users','website-design','system-and-settings'];
        if(!in_array($request->cat,$cats_names)){
            return abort(404);
        }
        $website = null;

        if(Auth::guard('account')->check()){
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['domainName'])->first();
        }
        if($this->lang == 'en'){
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }else{
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }
        return view('help.help',[
            'title' => Lang::get(str_replace('-','','help/help.cats.'.$request->cat)),
            'description' => Lang::get(str_replace('-','','help/help.cats.'.$request->cat.'_des')),
            'lang' => $this->lang,
            'website' => $website,
            'tuts' => $tuts,
            'cat' => $request->cat,
            'article' => null,
            'section' => null,
            'texts' => collect(Lang::get('help/help')),
        ]);
    }
    public function article(Request $request){
        $cats_names = ['getting-started','basics','security','ordering-system','statistics-and-analytics','billing-and-subscription','products-and-categories','website-users','website-design','system-and-settings'];
        if(!in_array($request->cat,$cats_names)){
            return abort(404);
        }
        $article = help_en_tut::where(['title_id'=>$request->article,'helpCat'=>$request->cat])->first();
        if($article == null){
            return abort(404);
        }
        $website = null;
        if(Auth::guard('account')->check()){
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['domainName'])->first();
        }
        if($request->lang == 'en'){
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }else{
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }
        return view('help.help',[
            'title' => $article->title,
            'description' => $article->description,
            'lang' => $this->lang,
            'website' => $website,
            'tuts' => $tuts,
            'cat' => $request->cat,
            'article' => $request->article,
            'section' => null,
            'texts' => collect(Lang::get('help/help')),
        ]);
    }

    public function section(Request $request){
        $cats_names = ['getting-started','basics','security','ordering-system','statistics-and-analytics','billing-and-subscription','products-and-categories','website-users','website-design','system-and-settings'];
        if(!in_array($request->cat,$cats_names)){
            return abort(404);
        }
        $article = help_en_tut::where(['title_id'=>$request->article,'helpCat'=>$request->cat])->first();
        if($article == null){
            return abort(404);
        }
        $website = null;
        if(Auth::guard('account')->check()){
            $website = website::where('id',Auth::guard('account')->user()->website_id)->select(['domainName'])->first();
        }
        if($request->lang == 'en'){
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }else{
            $tuts = help_en_tut::select(['id','title_id','sort','title','description','icon','helpCat','keyWords','upRates','downRates'])->orderBy('helpCat','asc')->orderBy('sort','asc')->get();
        }
        return view('help.help',[
            'title' => $article->title,
            'description' => $article->description,
            'lang' => $this->lang,
            'website' => $website,
            'tuts' => $tuts,
            'cat' => $request->cat,
            'article' => $request->article,
            'section' => $request->section,
            'texts' => collect(Lang::get('help/help')),
        ]);
    }

    public function api(Request $request){

        if($request->has('getArticle')){

            $cats_names = ['getting-started','basics','security','ordering-system','statistics-and-analytics','billing-and-subscription','products-and-categories','website-users','website-design','system-and-settings'];
            if(!in_array($request->cat,$cats_names)){
                return abort(404);
            }
            if($this->lang == 'en'){
                $article = help_en_tut::where(['title_id'=>$request->article,'helpCat'=>$request->cat])->with('help_sections')->first();
            }else{
                $article = help_en_tut::where(['title_id'=>$request->article,'helpCat'=>$request->cat])->with('help_sections')->first();
            }
            return response(['article' => $article]);
        }
        else if($request->has('rateArticle')){
            if($request->oldRate == 'up'){
                help_en_tut::where('title_id',$request->rateArticle)->decrement('upRates');
            }else if($request->oldRate == 'down'){
                help_en_tut::where('title_id',$request->rateArticle)->decrement('downRates');
            }
            if($request->rate == 'up'){
                help_en_tut::where('title_id',$request->rateArticle)->increment('upRates');
            }else if($request->rate == 'down'){
                help_en_tut::where('title_id',$request->rateArticle)->increment('downRates');
            }
        }
        else if($request->has('search')){
            // $results = help_en_text::WhereFullText('keyWords',$request->search)->orderBy('priority','desc')->get();
            $results = help_en_text::WhereFullText('keyWords',$request->search)->orWhereFullText('title',$request->search)->orderBy('priority','desc')->get();
            return response(['results'=>$results]);
        }
    }
}
