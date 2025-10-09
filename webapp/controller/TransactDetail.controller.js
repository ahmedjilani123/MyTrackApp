sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
  "aj/sap/myexpenseapp/controller/BusyDialog/BusyD"
], (BaseController,BusyD) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.transactDetail", {
        onInit() {
              
                 var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("TransactDetail").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
        NavtoBack(){
            window.history.go(-1);
        }
    });
});