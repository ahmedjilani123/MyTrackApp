sap.ui.define([
 "aj/sap/weconnect/controller/BaseController",
 "aj/sap/weconnect/controller/BusyDialog/BusyD",
 "sap/m/MessageToast",
 "aj/sap/weconnect/controller/formatter",
 "sap/ui/core/Fragment"
], (BaseController,BusyD,MessageToast,formatter,Fragment) => {
    "use strict";

    return BaseController.extend("aj.sap.weconnect.controller.Main", {
formatter: formatter,
        onInit() {},
        onOpenDialogU: function () {
           this.dialogUp = Fragment.load({
            id: this.getView().getId(),
            name: "aj.sap.weconnect.fragments.AdminD.UpdateD",
            controller: this
        }).then((oDialog) => {
            this.getView().addDependent(oDialog);
            return oDialog;
        });

        this.dialogUp.then(function(oDialog){
            oDialog.open();
        });
        },
        onDetailNavigate(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("DetailRouter");
        }
        
    
    });
});