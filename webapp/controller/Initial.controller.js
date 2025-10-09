sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
 "aj/sap/myexpenseapp/controller/BusyDialog/BusyD"
], (BaseController,BusyD) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.Initial", {
        onInit() {
         var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("TransactDetail").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
        loginHandler(){
            var Router = this.getOwnerComponent().getRouter();
            Router.navTo("RouteDashboard");
           BusyD.show();
        },
        submit(ovalue){
            console.log(ovalue)
        }
    });
});