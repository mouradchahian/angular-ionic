"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9028],{9028:(h,g,i)=>{i.r(g),i.d(g,{SignUpModule:()=>f});var p=i(6895),r=i(433),o=i(7151),u=i(8468),e=i(1571),m=i(6401);const c=[{path:"",component:(()=>{class n{constructor(t,a){this.router=t,this.userData=a,this.signup={username:"",password:""},this.submitted=!1}onSignup(t){this.submitted=!0,t.valid&&(this.userData.signup(this.signup.username),this.router.navigateByUrl("/app/tabs/schedule"))}}return n.\u0275fac=function(t){return new(t||n)(e.\u0275\u0275directiveInject(u.F0),e.\u0275\u0275directiveInject(m.m))},n.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["page-signup"]],decls:19,vars:2,consts:[["slot","start"],[1,"signup-logo"],["src","assets/img/appicon.svg","alt","Ionic Logo"],[1,"signup-form"],["novalidate",""],["signupForm","ngForm"],["label","Username","labelPlacement","stacked","fill","solid","name","username","type","text","errorText","Username is required","required","",3,"ngModel","ngModelChange"],["username","ngModel"],["label","Password","labelPlacement","stacked","fill","solid","name","password","type","password","errorText","Password is required","required","",3,"ngModel","ngModelChange"],["password","ngModel"],[1,"ion-padding"],["type","submit","expand","block",3,"click"]],template:function(t,a){if(1&t){const S=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e.\u0275\u0275element(3,"ion-menu-button"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ion-title"),e.\u0275\u0275text(5,"Signup"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(6,"ion-content")(7,"div",1),e.\u0275\u0275element(8,"img",2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(9,"div",3)(10,"form",4,5)(12,"ion-input",6,7),e.\u0275\u0275listener("ngModelChange",function(l){return a.signup.username=l}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(14,"ion-input",8,9),e.\u0275\u0275listener("ngModelChange",function(l){return a.signup.password=l}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(16,"div",10)(17,"ion-button",11),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(S);const l=e.\u0275\u0275reference(11);return e.\u0275\u0275resetView(a.onSignup(l))}),e.\u0275\u0275text(18,"Create"),e.\u0275\u0275elementEnd()()()()()}2&t&&(e.\u0275\u0275advance(12),e.\u0275\u0275property("ngModel",a.signup.username),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngModel",a.signup.password))},dependencies:[r.\u0275NgNoValidate,r.NgControlStatus,r.NgControlStatusGroup,r.RequiredValidator,r.NgModel,r.NgForm,o.IonButton,o.IonButtons,o.IonContent,o.IonHeader,o.IonInput,o.IonMenuButton,o.IonTitle,o.IonToolbar,o.TextValueAccessor],styles:[".signup-logo[_ngcontent-%COMP%]{min-height:200px;padding:20px 0;text-align:center}.signup-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:150px}.signup-form[_ngcontent-%COMP%]{padding:16px}ion-input[_ngcontent-%COMP%]{margin-bottom:10px}"]}),n})()}];let M=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[u.Bz.forChild(c),u.Bz]}),n})(),f=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[p.CommonModule,r.FormsModule,o.IonicModule,M]}),n})()}}]);