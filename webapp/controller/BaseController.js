sap.ui.define([
    "sap/ui/core/mvc/Controller"
],function(Controller){
    return Controller.extend("aj.sap.myexpenseapp.controller.BaseController",{
ViewDetailTranHandler(){
            let Router = this.getOwnerComponent().getRouter();
            Router.navTo("TransactDetail")
        }
    })

})