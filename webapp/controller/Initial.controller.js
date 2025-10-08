sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.Initial", {
        onInit() {
              this.ShowBusyIndicator();
        },
        loginHandler(){
            var Router = this.getOwnerComponent().getRouter();
            Router.navTo("RouteDashboard");
        },
        submit(ovalue){
            console.log(ovalue)
        }
    });
});