"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1031],{1031:(L,k,a)=>{a.r(k),a.d(k,{ScheduleModule:()=>f});var h=a(866),e=a(1571),C=a(6895),i=a(433),g=a(7151),v=a(8468);const I=[{path:"",component:a(8657).X}];let c=(()=>{class s{}return s.\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.\u0275\u0275defineNgModule({type:s}),s.\u0275inj=e.\u0275\u0275defineInjector({imports:[v.Bz.forChild(I),v.Bz]}),s})();var u=a(1846);let f=(()=>{class s{}return s.\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.\u0275\u0275defineNgModule({type:s}),s.\u0275inj=e.\u0275\u0275defineInjector({providers:[{provide:e.LOCALE_ID,useValue:"fr-FR"},u.sn],imports:[C.CommonModule,i.FormsModule,g.IonicModule,i.ReactiveFormsModule,g.IonicModule,c,h.CalendarModule.forRoot({closeIcon:!0})]}),s})()},8657:(L,k,a)=>{a.d(k,{X:()=>z});var h=a(5861),e=a(1571),C=a(9616),i=a(7151),g=a(6895),v=a(433);function x(l,m){if(1&l){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-button",8),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const o=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(o.dismiss())}),e.\u0275\u0275text(1,"Cancel"),e.\u0275\u0275elementEnd()}}function I(l,m){if(1&l){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-button",8),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const o=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(o.selectAll(!1))}),e.\u0275\u0275text(1,"Reset"),e.\u0275\u0275elementEnd()}}function c(l,m){if(1&l&&e.\u0275\u0275element(0,"ion-icon",11),2&l){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275property("name",t.icon)}}function u(l,m){if(1&l){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-item"),e.\u0275\u0275pipe(1,"lowercase"),e.\u0275\u0275template(2,c,1,1,"ion-icon",9),e.\u0275\u0275elementStart(3,"ion-checkbox",10),e.\u0275\u0275listener("ngModelChange",function(o){const S=e.\u0275\u0275restoreView(t).$implicit;return e.\u0275\u0275resetView(S.isChecked=o)}),e.\u0275\u0275text(4),e.\u0275\u0275elementEnd()()}if(2&l){const t=m.$implicit,n=e.\u0275\u0275nextContext();e.\u0275\u0275attribute("track",e.\u0275\u0275pipeBind1(1,5,t.name)),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",n.ios),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngModel",t.isChecked),e.\u0275\u0275attribute("aria-label",t.name),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",t.name," ")}}function f(l,m){if(1&l){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-footer",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",8),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const o=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(o.selectAll(!1))}),e.\u0275\u0275text(4,"Deselect All"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(5,"ion-buttons",3)(6,"ion-button",8),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const o=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(o.selectAll(!0))}),e.\u0275\u0275text(7,"Select All"),e.\u0275\u0275elementEnd()()()()}}let s=(()=>{class l{constructor(t,n,o,d){this.confData=t,this.config=n,this.modalCtrl=o,this.navParams=d,this.tracks=[]}ionViewWillEnter(){this.ios="ios"===this.config.get("mode");const t=this.navParams.get("excludedTracks");this.confData.getTracks().subscribe(n=>{n.forEach(o=>{this.tracks.push({name:o.name,icon:o.icon,isChecked:-1===t.indexOf(o.name)})})})}selectAll(t){this.tracks.forEach(n=>{n.isChecked=t})}applyFilters(){const t=this.tracks.filter(n=>!n.isChecked).map(n=>n.name);this.dismiss(t)}dismiss(t){this.modalCtrl.dismiss(t)}}return l.\u0275fac=function(t){return new(t||l)(e.\u0275\u0275directiveInject(C.L),e.\u0275\u0275directiveInject(i.Config),e.\u0275\u0275directiveInject(i.ModalController),e.\u0275\u0275directiveInject(i.NavParams))},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["page-schedule-filter"]],decls:16,vars:5,consts:[["translucent","true"],["slot","start"],[3,"click",4,"ngIf"],["slot","end"],["strong","",3,"click"],[3,"lines"],[4,"ngFor","ngForOf"],["translucent","true",4,"ngIf"],[3,"click"],["slot","start","color","medium",3,"name",4,"ngIf"],[3,"ngModel","ngModelChange"],["slot","start","color","medium",3,"name"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e.\u0275\u0275template(3,x,2,0,"ion-button",2),e.\u0275\u0275template(4,I,2,0,"ion-button",2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"ion-title"),e.\u0275\u0275text(6," Filter Sessions "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"ion-buttons",3)(8,"ion-button",4),e.\u0275\u0275listener("click",function(){return n.applyFilters()}),e.\u0275\u0275text(9,"Done"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(10,"ion-content")(11,"ion-list",5)(12,"ion-list-header"),e.\u0275\u0275text(13,"Tracks"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(14,u,5,7,"ion-item",6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(15,f,8,0,"ion-footer",7)),2&t&&(e.\u0275\u0275advance(3),e.\u0275\u0275property("ngIf",n.ios),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",!n.ios),e.\u0275\u0275advance(7),e.\u0275\u0275property("lines",n.ios?"inset":"full"),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngForOf",n.tracks),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.ios))},dependencies:[g.NgForOf,g.NgIf,v.NgControlStatus,v.NgModel,i.IonButton,i.IonButtons,i.IonCheckbox,i.IonContent,i.IonFooter,i.IonHeader,i.IonIcon,i.IonItem,i.IonList,i.IonListHeader,i.IonTitle,i.IonToolbar,i.BooleanValueAccessor,g.LowerCasePipe],styles:[".md[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{letter-spacing:0;text-transform:capitalize}.md[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%]{--checkbox-background-checked: transparent;--border-color: transparent;--border-color-checked: transparent;--checkmark-color: var(--ion-color-primary)}.md[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]{background:inherit}.ios[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]{margin-top:10px}.ios[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%]{color:var(--ion-color-primary)}"]}),l})();var p=a(866);const r=void 0,b=["fr",[["AM","PM"],r,r],r,[["D","L","M","M","J","V","S"],["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],["di","lu","ma","me","je","ve","sa"]],r,[["J","F","M","A","M","J","J","A","S","O","N","D"],["janv.","f\xe9vr.","mars","avr.","mai","juin","juil.","ao\xfbt","sept.","oct.","nov.","d\xe9c."],["janvier","f\xe9vrier","mars","avril","mai","juin","juillet","ao\xfbt","septembre","octobre","novembre","d\xe9cembre"]],r,[["av. J.-C.","ap. J.-C."],r,["avant J\xe9sus-Christ","apr\xe8s J\xe9sus-Christ"]],1,[6,0],["dd/MM/y","d MMM y","d MMMM y","EEEE d MMMM y"],["HH:mm","HH:mm:ss","HH:mm:ss z","HH:mm:ss zzzz"],["{1} {0}","{1}, {0}","{1} '\xe0' {0}",r],[",","\u202f",";","%","+","-","E","\xd7","\u2030","\u221e","NaN",":"],["#,##0.###","#,##0\xa0%","#,##0.00\xa0\xa4","#E0"],"EUR","\u20ac","euro",{ARS:["$AR","$"],AUD:["$AU","$"],BEF:["FB"],BMD:["$BM","$"],BND:["$BN","$"],BYN:[r,"\u0440."],BZD:["$BZ","$"],CAD:["$CA","$"],CLP:["$CL","$"],CNY:[r,"\xa5"],COP:["$CO","$"],CYP:["\xa3CY"],EGP:[r,"\xa3E"],FJD:["$FJ","$"],FKP:["\xa3FK","\xa3"],FRF:["F"],GBP:["\xa3GB","\xa3"],GIP:["\xa3GI","\xa3"],HKD:[r,"$"],IEP:["\xa3IE"],ILP:["\xa3IL"],ITL:["\u20a4IT"],JPY:[r,"\xa5"],KMF:[r,"FC"],LBP:["\xa3LB","\xa3L"],MTP:["\xa3MT"],MXN:["$MX","$"],NAD:["$NA","$"],NIO:[r,"$C"],NZD:["$NZ","$"],PHP:[r,"\u20b1"],RHD:["$RH"],RON:[r,"L"],RWF:[r,"FR"],SBD:["$SB","$"],SGD:["$SG","$"],SRD:["$SR","$"],TOP:[r,"$T"],TTD:["$TT","$"],TWD:[r,"NT$"],USD:["$US","$"],UYU:["$UY","$"],WST:["$WS"],XCD:[r,"$"],XPF:["FCFP"],ZMW:[r,"Kw"]},"ltr",function y(l){const t=Math.floor(Math.abs(l)),n=l.toString().replace(/^[^.]*\.?/,"").length,o=parseInt(l.toString().replace(/^[^e]*(e([-+]?\d+))?/,"$2"))||0;return 0===t||1===t?1:0===o&&0!==t&&t%1e6==0&&0===n||!(o>=0&&o<=5)?4:5}];var _=a(2829),R=a(8468),j=a(6401);const A=["scheduleList"];(0,g.registerLocaleData)(b);let z=(()=>{class l{constructor(t,n,o,d,S,O,E,P,F,w,D){this.alertCtrl=t,this.confData=n,this.loadingCtrl=o,this.modalCtrl=d,this.router=S,this.routerOutlet=O,this.toastCtrl=E,this.user=P,this.config=F,this.renderer=w,this.menu=D,this.optionsRange={pickMode:"range"},this.isWeekday=$=>{const M=new Date($).getUTCDay();return 0!==M&&6!==M},this.dayIndex=0,this.queryText="",this.segment="all",this.excludeTracks=[],this.shownSessions=[],this.groups=[],this.dateRangeString="ddd"}ngAfterViewChecked(){var t=document.querySelector(".buttons-last-slot");document.querySelector(".new-element")&&t&&(document.querySelector(".new-element").appendChild(t),this.renderer.listen(t,"click",()=>{}))}openCalendar(){var t=this;return(0,h.Z)(function*(){t.myCalendar=yield t.modalCtrl.create({component:p.CalendarModal,componentProps:{options:{pickMode:"range",title:"S\xe9lectionnez Dates",id:"cal",doneLabel:"appliquer"}},id:"calender"}),t.myCalendar.present();const o=document.createElement("div");o.className="new-element",o.innerHTML='<div id="range-container"><ion-label>Ramasser</ion-label><ion-range value="6" pin="true" snaps="true" min="1" max="12" id="my-range1" class="my-range"></ion-range><ion-label id="depart">06:00 AM</ion-label></div><div id="range-container"><ion-label>D\xe9poser</ion-label><ion-range id="my-range2" value="6" pin="true" snaps="true" min="1" max="12" class="my-range"></ion-range><ion-label id="retour">06:00 AM</ion-label></div><div class="button-container text-center"></div>',document.getElementById("calender").appendChild(o);var d=document.getElementById("my-range1"),S=document.getElementById("my-range2");t.renderer.listen(d,"ionChange",T=>{t.from=parseInt(T.target.value,10),document.getElementById("depart").innerHTML=t.from.toLocaleString("fr-FR",{minimumIntegerDigits:2,useGrouping:!1})+":00 AM"}),t.renderer.listen(S,"ionChange",T=>{t.to=parseInt(T.target.value,10),document.getElementById("retour").innerHTML=t.to.toLocaleString("fr-FR",{minimumIntegerDigits:2,useGrouping:!1})+":00 AM"});const E=(yield t.myCalendar.onDidDismiss()).data;t.dateOriginal=E;const P="dd MMM yyyy",w="fr-FR",D=(0,g.formatDate)(E.from.string,P,w),$=(0,g.formatDate)(E.to.string,P,w);t.date=D+" - "+$})()}ngOnInit(){this.updateSchedule(),this.ios="ios"===this.config.get("mode")}updateSchedule(){this.scheduleList&&this.scheduleList.closeSlidingItems(),this.confData.getTimeline(this.dayIndex,this.queryText,this.excludeTracks,this.segment).subscribe(t=>{this.shownSessions=t.shownSessions,this.groups=t.groups})}presentFilter(){var t=this;return(0,h.Z)(function*(){const n=yield t.modalCtrl.create({component:s,presentingElement:t.routerOutlet.nativeEl,componentProps:{excludedTracks:t.excludeTracks}});yield n.present();const{data:o}=yield n.onWillDismiss();o&&(t.excludeTracks=o,t.updateSchedule())})()}addFavorite(t,n){var o=this;return(0,h.Z)(function*(){o.user.hasFavorite(n.name)?o.removeFavorite(t,n,"Favorite already added"):(o.user.addFavorite(n.name),t.close(),yield(yield o.toastCtrl.create({header:`${n.name} was successfully added as a favorite.`,duration:3e3,buttons:[{text:"Close",role:"cancel"}]})).present())})()}removeFavorite(t,n,o){var d=this;return(0,h.Z)(function*(){yield(yield d.alertCtrl.create({header:o,message:"Would you like to remove this session from your favorites?",buttons:[{text:"Cancel",handler:()=>{t.close()}},{text:"Remove",handler:()=>{d.user.removeFavorite(n.name),d.updateSchedule(),t.close()}}]})).present()})()}openSocial(t,n){var o=this;return(0,h.Z)(function*(){const d=yield o.loadingCtrl.create({message:`Posting to ${t}`,duration:1e3*Math.random()+500});yield d.present(),yield d.onWillDismiss(),n.close()})()}doneLabel(){return"eee"}onEventSelected(t){return(0,h.Z)(function*(){alert()})()}onWillDismiss(t){console.log(t),alert()}setValue(t){alert(parseInt(t.target.value,10))}loadVehicles(){var t=this;return(0,h.Z)(function*(){(yield t.modalCtrl.create({component:_.f,componentProps:{title:t.lieu,label:t.date,dateOriginal:t.dateOriginal}})).present()})()}ionViewWillEnter(){this.router.navigateByUrl("/apps/tabs/schedule",{replaceUrl:!0}),this.menu.enable(!1)}ionViewDidLeave(){this.menu.enable(!0)}}return l.\u0275fac=function(t){return new(t||l)(e.\u0275\u0275directiveInject(i.AlertController),e.\u0275\u0275directiveInject(C.L),e.\u0275\u0275directiveInject(i.LoadingController),e.\u0275\u0275directiveInject(i.ModalController),e.\u0275\u0275directiveInject(R.F0),e.\u0275\u0275directiveInject(i.IonRouterOutlet),e.\u0275\u0275directiveInject(i.ToastController),e.\u0275\u0275directiveInject(j.m),e.\u0275\u0275directiveInject(i.Config),e.\u0275\u0275directiveInject(e.Renderer2),e.\u0275\u0275directiveInject(i.MenuController))},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["page-schedule"]],viewQuery:function(t,n){if(1&t&&e.\u0275\u0275viewQuery(A,7),2&t){let o;e.\u0275\u0275queryRefresh(o=e.\u0275\u0275loadQuery())&&(n.scheduleList=o.first)}},features:[e.\u0275\u0275ProvidersFeature([{provide:e.LOCALE_ID,useValue:"fr-FR"}])],decls:53,vars:3,consts:[["scroll","true"],[1,"container","c2"],[1,"start-t"],["name","car","item-right","",1,"icon"],["okText","Choisir","cancelText","Annuler","placeholder","Le lieu",3,"ngModel","ngModelChange"],["value","casablanca"],["value","marrakech"],["value","rabat"],["value","tanger"],["name","calendar","item-right","",1,"icon"],["placeholder","La dur\xe9e","required","","readonly","",3,"ngModel","value","ngModelChange","click"],[1,"ion-bttom-appl2",3,"click"],[1,"container"],[1,"ion-text-center"],["size","2",1,"fcol"],["name","plane",1,"fa","fa-plane"],["size","10"],[1,"title"],[1,"description"],["name","hourglass",1,"fa","fa-hourglass"],["name","tachometer",1,"fa","fa-tachometer"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"ion-content",0)(1,"div",1)(2,"h2",2),e.\u0275\u0275text(3,"Trouvez un Auto"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ion-item"),e.\u0275\u0275element(5,"ion-icon",3),e.\u0275\u0275elementStart(6,"ion-select",4),e.\u0275\u0275listener("ngModelChange",function(d){return n.lieu=d}),e.\u0275\u0275elementStart(7,"ion-select-option",5),e.\u0275\u0275text(8,"Casablanca"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(9,"ion-select-option",6),e.\u0275\u0275text(10,"Marrakech"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(11,"ion-select-option",7),e.\u0275\u0275text(12,"Rabat"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(13,"ion-select-option",8),e.\u0275\u0275text(14,"Tanger"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(15,"ion-item"),e.\u0275\u0275element(16,"ion-icon",9),e.\u0275\u0275elementStart(17,"ion-input",10),e.\u0275\u0275listener("ngModelChange",function(d){return n.date=d})("click",function(){return n.openCalendar()}),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(18,"ion-button",11),e.\u0275\u0275listener("click",function(){return n.loadVehicles()}),e.\u0275\u0275text(19,"Rechercher des voitures"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(20,"div",12)(21,"ion-grid",13)(22,"ion-row")(23,"ion-col",14),e.\u0275\u0275element(24,"ion-icon",15),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(25,"ion-col",16)(26,"ion-text",17),e.\u0275\u0275text(27,"Livraison partout au Maroc"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(28,"br"),e.\u0275\u0275elementStart(29,"ion-text",18),e.\u0275\u0275text(30,"Livraison partout au maroc, \xe0 n'importe quels moments"),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(31,"div",12)(32,"ion-grid",13)(33,"ion-row")(34,"ion-col",14),e.\u0275\u0275element(35,"ion-icon",19),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(36,"ion-col",16)(37,"ion-text",17),e.\u0275\u0275text(38," Service 24H/24 , 7J/7"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(39,"br"),e.\u0275\u0275elementStart(40,"ion-text",18),e.\u0275\u0275text(41,"Du lundi au Dimanche 24H/24"),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(42,"div",12)(43,"ion-grid",13)(44,"ion-row")(45,"ion-col",14),e.\u0275\u0275element(46,"ion-icon",20),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(47,"ion-col",16)(48,"ion-text",17),e.\u0275\u0275text(49,"Livraison partout au Maroc"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(50,"br"),e.\u0275\u0275elementStart(51,"ion-text",18),e.\u0275\u0275text(52,"Livraison partout au maroc, \xe0 n'importe quels moments"),e.\u0275\u0275elementEnd()()()()()()),2&t&&(e.\u0275\u0275advance(6),e.\u0275\u0275property("ngModel",n.lieu),e.\u0275\u0275advance(11),e.\u0275\u0275property("ngModel",n.date)("value",n.date))},dependencies:[v.NgControlStatus,v.RequiredValidator,v.NgModel,i.IonButton,i.IonCol,i.IonContent,i.IonGrid,i.IonIcon,i.IonInput,i.IonItem,i.IonRow,i.IonSelect,i.IonSelectOption,i.IonText,i.SelectValueAccessor,i.TextValueAccessor],styles:["ion-fab-button{--background: var(--ion-color-step-150, #ffffff);--background-hover: var(--ion-color-step-200, #f2f2f2);--background-focused: var(--ion-color-step-250, #d9d9d9);--color: var(--ion-color-primary, #3880ff)}.ios ion-fab-button{--background-activated: var(--ion-color-step-250, #d9d9d9)}audio,canvas,progress,video{vertical-align:baseline}audio:not([controls]){display:none;height:0}b,strong{font-weight:700}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{height:1px;border-width:0;box-sizing:content-box}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}label,input,select,textarea{font-family:inherit;line-height:normal}textarea{overflow:auto;height:auto;font:inherit;color:inherit}textarea::placeholder{padding-left:2px}form,input,optgroup,select{margin:0;font:inherit;color:inherit}html input[type=button],input[type=reset],input[type=submit]{cursor:pointer;-webkit-appearance:button}a,a div,a span,a ion-icon,a ion-label,button,button div,button span,button ion-icon,button ion-label,.ion-tappable,[tappable],[tappable] div,[tappable] span,[tappable] ion-icon,[tappable] ion-label,input,textarea{touch-action:manipulation}a ion-label,button ion-label{pointer-events:none}button{border:0;border-radius:0;font-family:inherit;font-style:inherit;font-variant:inherit;line-height:1;text-transform:none;cursor:pointer;-webkit-appearance:button}[tappable]{cursor:pointer}a[disabled],button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}input[type=checkbox],input[type=radio]{padding:0;box-sizing:border-box}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}.today{background:#e54e00!important}.today p{color:#fff!important}#range-container{position:relative;background-color:#002d54;padding:10px;display:flex;align-items:center;height:25px}#range-container ion-label{margin-right:10px;color:#fff;font-size:10px;margin-top:8px}.new-element{position:fixed;bottom:0;left:0;width:100%;background-color:#002d54;z-index:999999;display:block;height:180px}ion-header{display:block;position:static!important}.date-range-picker-container{display:flex;flex-direction:column;overflow-x:auto;-webkit-overflow-scrolling:touch;height:100%}.range-slider{width:90%!important}.range-bar,.range-bar-active{background:rgb(144,163,196)!important}ion-range{--bar-background: #7f7f7f9e;--bar-background-active: #7f7f7f9e;--knob-background: #e44e00;--pin-background: #e44e00;--pin-color: #fff;--knob-size: 30px;position:relative;bottom:9px}ion-range::part(tick){display:none}.week-title li{display:block!important;padding:5px;width:25px!important;background:#f6f6f6;color:#4c4c4c;border-radius:3px;margin-left:15px}.week-title{padding:0 10px}ion-toolbar{--background:transparent !important}.toolbar-title-default{background:#f6f6f6!important;padding-top:15px!important;padding-bottom:15px!important}.ion-bttom-appl{--background: #e54e00;--background-hover: #e54e00;--background-activated: #e54e00;--background-focused: #88f4be;--color: white;--border-radius: 3px;--box-shadow: 0 2px 6px 0 rgb(0, 0, 0, .25);--padding-top: 25px;--padding-bottom: 25px;width:100%;margin:18px 15px;border-radius:10px}.button-container{display:flex;justify-content:center}.buttons-first-slot .button-clear,.button-clear .button-inner:hover{--color-hover: white;--background: #e54e00 !important;--color: white !important;--border-radius: 50% !important;margin-left:14px!important;color:#fff!important}.endSelection:before,.between button.days-btn,.startSelection:before{background-color:#e54e00c9!important}.primary .days .on-selected,.endSelection button.days-btn{background:#e54e00!important}.input-item{border-bottom:1px solid #e5e5e5;padding-left:0;padding-right:0}.input-label{color:#999;font-size:14px}.input-icon{color:#999;font-size:16px;margin-right:10px}.input-field{font-size:16px;line-height:24px;padding:14px 0}input:hover{border:none!important}ion-item{margin:20px auto;border:none;--background: #f4f4f4;border-radius:5px;--border-width: 0 0 0px 0 !important;--border-style: none;--box-shadow: none}ion-item:hover,ion-item:focus,ion-item:active{--border-width: 0 0 0px 0 !important;--border-style: none;--box-shadow: none}.icon{margin-right:10px;color:#919191}.container{display:block;margin:-18px 0 40px!important;padding:10px 10%;background:white;box-shadow:0 2px 6px #00000040}.ion-bttom-appl2{--background: #e54e00;--background-hover: #e54e00;--background-activated: #e54e00;--background-focused: #88f4be;--color: white;--border-radius: 3px;--box-shadow: 0 2px 6px 0 rgb(0, 0, 0, .25);--padding-top: 25px;--padding-bottom: 25px;width:100%;margin:10px 0 30px;border-radius:10px}ion-content{--background: #f4f4f4}.title{font-size:13px;font-weight:700;color:#333}.description{font-size:10px;color:#777}.fa-plane{font-size:55px;color:#e54e00;transform:rotate(-50deg)}.fa{font-size:35px;color:#e54e00}ion-grid.ion-text-center{display:grid;min-height:50px;align-items:center}.fcol{display:flex;align-items:center;position:relative;right:25px}.buttons-last-slot ion-button{--background: #e54e00;--background-hover: #e54e00;--background-activated: #e54e00;--background-focused: #88f4be;--color: white;--border-radius: 3px;--box-shadow: 0 2px 6px 0 rgb(0, 0, 0, .25);--padding-top: 25px;--padding-bottom: 25px;width:100%;margin:15px;border-radius:5px!important;width:95%;display:block;position:relative;height:50px;color:#fff;background:#e54e00}ion-select::part(icon){display:block;position:absolute!important;right:15px}ion-loading{--background: #e54e00;--spinner-color: white;color:#fff}ion-spinner.sc-ion-loading-md{color:#e54e00}.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{color:#5d5d5d}ion-select,ion-input{font-size:12px!important}ion-icon{font-size:14px}ion-button{font-size:11px}h2{margin-top:18px;font-size:17px}.start-t{margin-top:45px}.c2{padding:10px 5%}.button-inner{width:100%;height:auto}button.days-btn p{font-size:12px!important}h3{font-size:13px}ion-card{border-radius:10px;box-shadow:0 0 10px #a2a2a2b5;margin:5px}\n"],encapsulation:2}),l})()},9616:(L,k,a)=>{a.d(k,{L:()=>v});var h=a(9646),e=a(4004),C=a(1571),i=a(529),g=a(6401);let v=(()=>{class x{constructor(c,u){this.http=c,this.user=u}load(){return this.data?(0,h.of)(this.data):this.http.get("assets/data/data.json").pipe((0,e.U)(this.processData,this))}processData(c){return this.data=c,this.data.schedule.forEach(u=>{u.groups.forEach(f=>{f.sessions.forEach(s=>{s.speakers=[],s.speakerNames&&s.speakerNames.forEach(p=>{const r=this.data.speakers.find(y=>y.name===p);r&&(s.speakers.push(r),r.sessions=r.sessions||[],r.sessions.push(s))})})})}),this.data}getTimeline(c,u="",f=[],s="all"){return this.load().pipe((0,e.U)(p=>{const r=p.schedule[c];r.shownSessions=0;const y=(u=u.toLowerCase().replace(/,|\.|-/g," ")).split(" ").filter(b=>!!b.trim().length);return r.groups.forEach(b=>{b.hide=!0,b.sessions.forEach(_=>{this.filterSession(_,y,f,s),_.hide||(b.hide=!1,r.shownSessions++)})}),r}))}filterSession(c,u,f,s){let p=!1;u.length?u.forEach(b=>{c.name.toLowerCase().indexOf(b)>-1&&(p=!0)}):p=!0;let r=!1;c.tracks.forEach(b=>{-1===f.indexOf(b)&&(r=!0)});let y=!1;"favorites"===s?this.user.hasFavorite(c.name)&&(y=!0):y=!0,c.hide=!(p&&r&&y)}getSpeakers(){return this.load().pipe((0,e.U)(c=>c.speakers.sort((u,f)=>{const s=u.name.split(" ").pop(),p=f.name.split(" ").pop();return s.localeCompare(p)})))}getTracks(){return this.load().pipe((0,e.U)(c=>c.tracks.sort()))}getMap(){return this.load().pipe((0,e.U)(c=>c.map))}}return x.\u0275fac=function(c){return new(c||x)(C.\u0275\u0275inject(i.eN),C.\u0275\u0275inject(g.m))},x.\u0275prov=C.\u0275\u0275defineInjectable({token:x,factory:x.\u0275fac,providedIn:"root"}),x})()}}]);