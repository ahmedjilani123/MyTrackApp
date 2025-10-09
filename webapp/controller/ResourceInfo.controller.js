sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
  "aj/sap/myexpenseapp/controller/BusyDialog/BusyD"
], (BaseController,BusyD) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.ResourceInfo", {
        onInit() {
            var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("BasicInfo").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
    });
});