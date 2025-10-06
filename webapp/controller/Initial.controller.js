sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("aj.sap.myexpenseapp.controller.Initial", {
        onInit() {
              
        },
        RouterHandler(){
            var Router = this.getOwnerComponent().getRouter();
            Router.navTo("RouteDashboard");
        },
        submit(ovalue){
            console.log(ovalue)
        }
    });
});