<?php

namespace Database\Seeders\help_en_tuts\basics;

use App\Models\help_en_text;
use App\Models\help_en_tut;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tut27 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $upRates;
    protected $downRates;


    public function run()
    {
        $helpTut = help_en_tut::where('id',27)->select(['upRates','downRates'])->first();

        if($helpTut == null){
            $this->upRates = 0;
            $this->downRates = 0;

        }else{
            $this->upRates = $helpTut->upRates;
            $this->downRates = $helpTut->downRates;
        }
        help_en_text::where('help_en_tut_id',27)->delete();
        help_en_tut::where('id',27)->delete();
        $tutsTexts = [];
        help_en_tut::create([
            'id'=>27,
            'sort' => 3,
            'title_id' => 'Your-Websites-Privacy-Policy',
            'title' => 'Your Website’s Privacy Policy',
            'description' => 'A privacy policy is necessary for safeguarding your customers’ rights and increasing your company’s transparency. This article will guide you through creating a privacy policy for your website.',
            'icon' => 'ico-report',
            'helpCat' => 'basics',
            'keyWords' => 'website',
            'upRates' => $this->upRates,
            'downRates' => $this->downRates,
        ]);

        array_push($tutsTexts,[
            'sort'=> 1,
            'help_en_tut_id' => 27,
            'title' => 'What is a privacy policy?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">A privacy policy is a statement or legal document created by a party (for example, a company) that explains what information is collected, used, and shared. In many areas of the world, having a privacy policy in place is a legal requirement to protect customers' rights and inform them about the data collected about them. Including a privacy policy is not only a legal necessity but also provides transparency and trust to your customers.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 2,
            'help_en_tut_id' => 27,
            'title' => 'What information should you gather?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">The information your website collects depends mainly on the type of business you run, but there is some personal information that commonly gets collected, including first and last name, email address, address, and phone number.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 3,
            'help_en_tut_id' => 27,
            'title' => 'How to add a privacy policy to your website?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">To add a privacy policy to your restaurant's website, go to <b>Settings</b> in the Side menu, then <a href=\"https://cpanel.food-menu.net/?tab=System\" target=\"_blank\">System</a>, which will open a page with many windows.</div>
                <div class=\"sectionP\">When you scroll down this page, you'll be provided with a <b>Website Privacy Policy</b> window which includes input boxes to add your privacy policy.</div>
                <img alt=\"\" src=\"/storage/imgs/help/en/basics/39.PNG\" class=\"sectionImg-40\"/>
                <div class=\"sectionP\">You'll be provided with an input box for each language you have selected for your website, with a maximum length of 20,000 characters. To make it easier to customize the structure of your privacy policy, we allow you to insert some HTML tags so you’ll be able to divide your statement into paragraphs and style them.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 4,
            'help_en_tut_id' => 27,
            'title' => 'What are the HTML tags allowed and how to use them?',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">HTML tags enable you to classify your text into blocks or paragraphs, and style your text based on the structure you prefer for your privacy policy statement.</div>
                <div class=\"sectionP\">The HTML tags allowed are:</div>
                <ul style=\"width:100%;\">
                    <li style=\"margin-bottom:.5em;\"><b>&lt;br&gt;</b>: This tag allows you to begin a new line within a paragraph.</li>
                    <div class=\"htmlPreviewContainer\">
                        <div contenteditable=\"true\" class=\"htmlPreviewCode\">please start&lt;br&gt;a new line</div>
                        <div class=\"htmlPreviewPreview\"><div>please start<br>a new line</div></div>
                    </div>

                    <li style=\"margin-bottom:.5em;\"><b>&lt;p&gt;</b>: This tag allows you to create a paragraph by using &lt;p&gt; to indicate the beginning of a paragraph and &lt;/p&gt; to indicate the end, meaning that all text within these two tags is contained within one paragraph.</li>
                    <div class=\"htmlPreviewContainer\">
                        <div contenteditable=\"true\" class=\"htmlPreviewCode\">&lt;p&gt;Hello World!&lt;/p&gt;</div>
                        <div class=\"htmlPreviewPreview\"><div><p>Hello World!</p></div></div>
                    </div>

                    <li style=\"margin-bottom:.5em;\"><b>&lt;span&gt;</b>: This tag allows you to mark a specific text in order to style it in a certain way.</li>
                    <div class=\"htmlPreviewContainer\">
                        <div contenteditable=\"true\" class=\"htmlPreviewCode\">Create your restaurant's website&lt;br&gt;Create your &lt;span style=\"color:green\"&gt;restaurant's website&lt;/span&gt;&lt;br&gt;Create your &lt;span style=\"color:red\"&gt;restaurant's website&lt;/span&gt;</div>
                        <div class=\"htmlPreviewPreview\"><div>Create your restaurant's website<br>Create your <span style=\"color:green\">restaurant's website</span><br>Create your <span style=\"color:red\">restaurant's website</span></div></div>
                    </div>

                    <li style=\"margin-bottom:.5em;\"><b>&lt;div&gt;</b>: This tag performs the same function as the &lt;span&gt; tag but it separates the text contained within it into a new section within a selected paragraph.</li>
                    <div class=\"htmlPreviewContainer\">
                        <div contenteditable=\"true\" class=\"htmlPreviewCode\">Foodmenu&lt;div&gt;offers you a comprehensive,&lt;/div&gt; regularly updated statistics and analytics tool that provides insight into all aspects of your restaurant's activities.</div>
                        <div class=\"htmlPreviewPreview\"><div>Foodmenu<div>offers you a comprehensive,</div> regularly updated statistics and analytics tool that provides insight into all aspects of your restaurant's activities.</div></div>
                    </div>

                    <li style=\"margin-bottom:.5em;\"><b>&lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;</b>: These tags are used for headings. What distinguishes each tag from the other is the size of text contained within the tags, with the &lt;h1&gt; &lt;/h1&gt; tag for the most important heading or subject, the &lt;h2&gt; &lt;/h2&gt; tag for main titles, and the &lt;h3&gt; &lt;/h3&gt; for subsections.</li>
                    <div class=\"htmlPreviewContainer\">
                        <div contenteditable=\"true\" class=\"htmlPreviewCode\">&lt;h1&gt;heading1&lt;/h1&gt;&lt;h2&gt;heading2&lt;/h2&gt;&lt;h3&gt;heading3&lt;/h3&gt;</div>
                        <div class=\"htmlPreviewPreview\"><div><h1>heading1</h1><h2>heading2</h2><h3>heading3</h3></div></div>
                    </div>

                    <li style=\"margin-bottom:.5em;\"><b>&lt;b&gt;, &lt;i&gt;, &lt;u&gt;</b>: These tags are used for typographical emphasis, with the &lt;b&gt; tag being used to mark a specific text as bold to point out that this text is of high importance, the &lt;i&gt; tag to mark a specific text as italic, and the &lt;u&gt; tag is used to underline a text.</li>
                    <div class=\"htmlPreviewContainer\">
                        <div contenteditable=\"true\" class=\"htmlPreviewCode\">&lt;p&gt;&lt;b&gt;bold&lt;/b&gt; &lt;u&gt;underline&lt;/u&gt; &lt;i&gt;italic&lt;/i&gt;&lt;/p&gt;</div>
                        <div class=\"htmlPreviewPreview\"><div><p><b>bold</b> <u>underline</u> <i>italic</i></p></div></div>
                    </div>

                    <li style=\"margin-bottom:.5em;\"><b>&lt;ol&gt;, &lt;ul&gt;, &lt;li&gt;</b>: These tags enable you to classify pieces of text, with the &lt;ol&gt; tag being used to classify a text into a numerical or ordered list, the &lt;ul&gt; tag being used to sort pieces of text into bullet points, and the &lt;li&gt; tag being used to define each item included in the numerical or bulleted list.</li>
                    <div class=\"htmlPreviewContainer\">
                        <div contenteditable=\"true\" class=\"htmlPreviewCode\">&lt;div&gt;My List&lt;/div&gt;&lt;ol&gt;&lt;li&gt;item1&lt;/li&gt;&lt;li&gt;item2&lt;/li&gt;&lt;li&gt;item2&lt;/li&gt;&lt;/ol&gt;&lt;/p&gt;&lt;p&gt;&lt;div&gt;My List&lt;/div&gt;&lt;ul&gt;&lt;li&gt;item1&lt;/li&gt;&lt;li&gt;item2&lt;/li&gt;&lt;li&gt;item2&lt;/li&gt;&lt;/ul&gt;</div>
                        <div class=\"htmlPreviewPreview\"><div><div>My List</div><ol><li>item1</li><li>item2</li><li>item2</li></ol></p><p><div>My List</div><ul><li>item1</li><li>item2</li><li>item2</li></ul></div></div>
                    </div>
                </ul>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 5,
            'help_en_tut_id' => 27,
            'title' => 'Where is the privacy policy located',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">When a new user registers on your website, your privacy policy appears in a window where they must agree to it first before continuing to sign up. The privacy policy displayed is determined by the user's browser language. If a user is browsing in a language for which you have not included a privacy policy, the user will be able to register without agreeing to your privacy policy.</div>
                <div class=\"sectionP\">The privacy policy also appears as a link in your website’s footer.</div>
            </div>
            ",
        ]);
        array_push($tutsTexts,[
            'sort'=> 6,
            'help_en_tut_id' => 27,
            'title' => 'Saving Changes',
            'html' => "<div class=\"SectionContainer\">
                <div class=\"sectionP\">After you add or modify your privacy policy in the <b>Website Privacy Policy</b> window, click on <b>Save</b> to apply the changes to your website, or click on <b>Cancel</b> to restore the last saved changes.</div>
                <div class=\"tipContainer\">
                    <div class=\"ico-lamp tutTipIcon\"></div>
                    <div class=\"tutTipText\">Only the main account is authorized to add or change the privacy policy.</div>
                </div>
            </div>
            ",
        ]);
        help_en_text::insert($tutsTexts);
    }
}
