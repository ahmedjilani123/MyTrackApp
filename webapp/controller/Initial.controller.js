sap.ui.define([
 "aj/sap/weconnect/controller/BaseController",
 "aj/sap/weconnect/controller/BusyDialog/BusyD",
 "sap/m/MessageToast"
], (BaseController,BusyD,MessageToast) => {
    "use strict";

    return BaseController.extend("aj.sap.weconnect.controller.Initial", {
        onInit() {},
        LoginToMainPage(){
            const Router = this.getOwnerComponent().getRouter();
            Router.navTo("MainRouter");
        }
          


           

    
    });
});