sap.ui.define([
    "aj/sap/myexpenseapp/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.Dashboard", {
        onInit() {
        },
        NavigationPress(oEvent){
          var RouterName =  oEvent.getParameter("item").getProperty("key")
            var Router = this.getOwnerComponent().getRouter();
            Router.navTo(RouterName)
        }
    });
});