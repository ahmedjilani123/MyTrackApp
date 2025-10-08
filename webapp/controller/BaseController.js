sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/BusyDialog"
],function(Controller,BusyDialog){
    return Controller.extend("aj.sap.myexpenseapp.controller.BaseController",{
ViewDetailTranHandler(){
            let Router = this.getOwnerComponent().getRouter();
            Router.navTo("TransactDetail")
        },
        ShowBusyIndicator(){
            let Dialog = new BusyDialog({
                title:"Loading Data",
                customIcon:'./images/Loading.png'
            })
            Dialog.open();
            setTimeout(function(){
Dialog.close()
            },5000)
        }
    })

})