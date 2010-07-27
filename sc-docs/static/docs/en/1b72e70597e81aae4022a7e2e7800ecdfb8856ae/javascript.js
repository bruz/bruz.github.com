(function(){var a="sproutcore/standard_theme";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/sc-docs/static/sproutcore/standard_theme/en/a68d27a7819fc85da1c1f9d663f25581cd4f4400/stylesheet-packed.css","/sc-docs/static/sproutcore/standard_theme/en/a68d27a7819fc85da1c1f9d663f25581cd4f4400/stylesheet.css"],scripts:["/sc-docs/static/sproutcore/standard_theme/en/a68d27a7819fc85da1c1f9d663f25581cd4f4400/javascript-packed.js"]}
})();Docs=SC.Application.create({NAMESPACE:"Docs",VERSION:"0.1.0",store:SC.Store.create().from("Docs.DataSource"),docBase:"/sc-docs/docs/sproutcore"});
Docs.classesController=SC.ArrayController.create({statusDidChange:function(){Docs.sendAction("targetsDidChange")
}.observes("status")});Docs.detailController=SC.ObjectController.create({contentBinding:SC.Binding.single("Docs.searchController.selection"),previousContent:null,documentScene:"noDocumentView",uncachedUrl:function(){var c,b;
var a=this.get("url");if(a){c=Docs.get("docBase")+"/symbols/"+a;return[c,Date.now()].join("?")
}else{if(this.get("content")!=null){var d=this.get("memberOf");if(d&&d.get("status")&SC.Record.READY){a=d.get("url");
b=this.get("anchor");c=[Docs.get("docBase")+"/symbols/",a,"?",Date.now(),"#",b].join("");
return c}else{Docs.sendAction("loadingFailed");return"about:blank"}}}}.property("memberOf","url"),_contentDidChange:function(){if(this.previousContent===this.get("content")){return
}this.set("previousContent",this.get("content"));Docs.sendAction("documentSelected");
var a=this.get("title");newTitle="SproutCore Docs: %@".fmt(a);if(a){if(document.title!==newTitle){document.title=newTitle
}}else{document.title="SproutCore Docs"}}.observes("content")});Docs.methodsController=SC.ArrayController.create({statusDidChange:function(){Docs.sendAction("targetsDidChange")
}.observes("status")});Docs.propertiesController=SC.ArrayController.create({statusDidChange:function(){Docs.sendAction("targetsDidChange")
}.observes("status")});Docs.searchController=SC.ArrayController.create({search:null,currentType:"Docs.Class",orderBy:"title",_searchChangeCounter:0,_searchDidChange:function(){this._searchChangeCounter+=1;
this.invokeLater(this._updateResults,150)}.observes("search","currentType"),_updateResults:function(){var a=this._searchChangeCounter;
a-=1;if(a<0){a=0}if(a==0){var b=Docs.store.find(SC.Query.local(this.get("currentType"),"lowercaseName CONTAINS {q}",{q:this.get("search").toLowerCase()}));
this.set("content",b)}this._searchChangeCounter=a}});Docs.DataSource=SC.DataSource.extend({fetch:function(a,c){var b=NO;
switch(c.get("recordType")){case Docs.Class:b=this.fetchClasses(a,c);break;case Docs.Method:b=this.fetchMethods(a,c);
break;case Docs.Property:b=this.fetchProperties(a,c);break}return b},fetchClasses:function(a,b){if(!b.get("isRemote")){return NO
}SC.Request.getUrl(Docs.get("docBase")+"/classes.json").set("isJSON",YES).notify(this,"fetchClassesDidComplete",{query:b,store:a}).send();
return YES},fetchClassesDidComplete:function(e,d){var b=e.get("response"),f=d.query,a=d.store,c;
if(!SC.$ok(b)){console.error("TODO: Add handler when fetching targets fails")}else{c=a.loadRecords(Docs.Class,b);
a.loadQueryResults(f,c)}},fetchMethods:function(a,b){if(!b.get("isRemote")){return NO
}SC.Request.getUrl(Docs.get("docBase")+"/methods.json").set("isJSON",YES).notify(this,"fetchMethodsDidComplete",{query:b,store:a}).send();
return YES},fetchMethodsDidComplete:function(e,d){var b=e.get("response"),f=d.query,a=d.store,c;
if(!SC.$ok(b)){console.error("TODO: Add handler when fetching targets fails")}else{c=a.loadRecords(Docs.Method,b);
a.loadQueryResults(f,c)}},fetchProperties:function(a,b){if(!b.get("isRemote")){return NO
}SC.Request.getUrl(Docs.get("docBase")+"/properties.json").set("isJSON",YES).notify(this,"fetchPropertiesDidComplete",{query:b,store:a}).send();
return YES},fetchPropertiesDidComplete:function(e,d){var b=e.get("response"),f=d.query,a=d.store,c;
if(!SC.$ok(b)){console.error("TODO: Add handler when fetching targets fails")}else{c=a.loadRecords(Docs.Property,b);
a.loadQueryResults(f,c)}},});Docs.Class=SC.Record.extend({methods:SC.Record.toMany("Docs.Method",{inverse:"memberOf",isMaster:YES}),properties:SC.Record.toMany("Docs.Property",{inverse:"memberOf",isMaster:YES}),lowercaseName:function(){return this.get("name")&&this.get("name").toLowerCase()
}.property("name").cacheable(),});Docs.Method=SC.Record.extend({memberOf:SC.Record.toOne("Docs.Class",{inverse:"methods",isMaster:NO}),lowercaseName:function(){return this.get("name")&&this.get("name").toLowerCase()
}.property("name").cacheable(),});Docs.Property=SC.Record.extend({memberOf:SC.Record.toOne("Docs.Class",{inverse:"properties",isMaster:NO}),lowercaseName:function(){return this.get("name")&&this.get("name").toLowerCase()
}.property("name").cacheable(),});SC.stringsFor("English",{_Docs:"Docs",});Docs.READY=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){},willLoseFirstResponder:function(){},documentSelected:function(){Docs.detailController.set("documentScene","documentView");
Docs.makeFirstResponder(Docs.DOCUMENT_LOADED)},});sc_require("states/ready");Docs.DOCUMENT_FAILED=SC.Responder.create({nextResponder:Docs.READY,didBecomeFirstResponder:function(){Docs.detailController.set("documentScene","documentFailed")
},willLoseFirstResponder:function(){},});sc_require("states/ready");Docs.DOCUMENT_LOADED=SC.Responder.create({nextResponder:Docs.READY,didBecomeFirstResponder:function(){},willLoseFirstResponder:function(){},loadingFailed:function(){Docs.makeFirstResponder(Docs.DOCUMENT_FAILED)
}});sc_require("states/ready");Docs.TARGETS_FAILED=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){Docs.set("currentScene","targetsFailed")
},willLoseFirstResponder:function(){},});sc_require("states/ready");Docs.TARGETS_LOADED=SC.Responder.create({nextResponder:Docs.READY,didBecomeFirstResponder:function(){Docs.set("currentScene","targetsLoaded")
},willLoseFirstResponder:function(){},});sc_require("states/ready");Docs.TARGETS_LOADING=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){Docs.set("currentScene","targetsLoading");
var c=Docs.store.find(SC.Query.remote(Docs.Class));var a=Docs.store.find(SC.Query.remote(Docs.Method));
var b=Docs.store.find(SC.Query.remote(Docs.Property));Docs.classesController.set("content",c);
Docs.methodsController.set("content",a);Docs.propertiesController.set("content",b)
},willLoseFirstResponder:function(){},targetsDidChange:function(){if(Docs.getPath("classesController.status")!==SC.Record.READY_CLEAN||Docs.getPath("methodsController.status")!==SC.Record.READY_CLEAN||Docs.getPath("propertiesController.status")!==SC.Record.READY_CLEAN){return NO
}Docs.searchController.set("search","");Docs.makeFirstResponder(Docs.TARGETS_LOADED);
return YES}});Docs.mainPage=SC.Page.design({mainPane:SC.MainPane.design({defaultResponder:"Docs",childViews:"sceneView".w(),sceneView:SC.SceneView.design({scenes:"targetsLoading targetsFailed targetsLoaded".w(),nowShowingBinding:"Docs.currentScene"}),}),targetsLoading:SC.View.design({childViews:"loadingLabel".w(),loadingLabel:SC.LabelView.design({layout:{centerX:0,centerY:0,height:24,width:400},value:"Loading documentation indexes",controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,textAlign:SC.ALIGN_CENTER,}),}),targetsFailed:SC.View.design({childViews:"failedLabel".w(),failedLabel:SC.LabelView.design({layout:{centerX:0,centerY:0,height:24,width:400},value:"Failed to load documentation index",controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,textAlign:SC.ALIGN_CENTER,}),}),targetsLoaded:SC.View.design({childViews:"splitView toolbarView".w(),splitView:SC.SplitView.design({layout:{left:0,top:0,right:0,bottom:32},defaultThickness:300,topLeftView:SC.View.design({childViews:"searchTypeView containerView".w(),searchTypeView:SC.SegmentedView.design({layout:{top:4},items:[{name:"Classes",type:"Docs.Class"},{name:"Methods",type:"Docs.Method"},{name:"Properties",type:"Docs.Property"},],itemTitleKey:"name",itemValueKey:"type",valueBinding:"Docs.searchController.currentType"}),containerView:SC.View.design({layout:{top:32,left:4,right:4,bottom:0},backgroundColor:"#DDD",childViews:"searchQueryView scrollView".w(),searchQueryView:SC.TextFieldView.design({layout:{top:4,height:24,left:4,right:4},valueBinding:"Docs.searchController.search",}),scrollView:SC.ScrollView.design({layout:{top:32,left:4,right:4,bottom:5},hasHorizontalScroller:NO,contentView:SC.ListView.design({contentBinding:"Docs.searchController.arrangedObjects",selectionBinding:"Docs.searchController.selection",contentValueKey:"title",}),}),}),}),bottomRightView:SC.SceneView.design({scenes:"noDocumentView documentView documentFailed".w(),nowShowingBinding:"Docs.detailController.documentScene"})}),toolbarView:SC.ToolbarView.design({anchorLocation:SC.ANCHOR_BOTTOM,childViews:"logo".w(),classNames:"bottom-toolbar",logo:SC.View.design({layout:{left:0,top:0,bottom:0,width:200},classNames:"app-title",tagName:"h1",render:function(a,c){var b="/sc-docs/static/sproutcore/foundation/en/d17bab1db089d5ceb3061610674fa47a536f471c/images/sproutcore-logo.png";
a.push('<img src="%@" />'.fmt(b));a.push("<span>","_Docs".loc(),"</span>")}}),})}),noDocumentView:SC.View.design({childViews:"noDocumentLabel".w(),noDocumentLabel:SC.LabelView.design({layout:{centerX:0,centerY:0,height:24,width:400},value:"Select a document on the left",controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,textAlign:SC.ALIGN_CENTER,}),}),documentFailed:SC.View.design({childViews:"failedLabel".w(),failedLabel:SC.LabelView.design({layout:{centerX:0,centerY:0,height:48,width:400},value:"Documentation is unavailable for the selected item",controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,textAlign:SC.ALIGN_CENTER,}),}),documentView:SC.WebView.design({layout:{top:33,left:2,right:0,bottom:0},valueBinding:SC.Binding.oneWay("Docs.detailController.uncachedUrl")}),});
Docs.main=function main(){Docs.getPath("mainPage.mainPane").append();Docs.makeFirstResponder(Docs.TARGETS_LOADING)
};function main(){Docs.main()};