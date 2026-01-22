sap.ui.define([
 "aj/sap/weconnect/controller/BaseController",
  "aj/sap/weconnect/controller/BusyDialog/BusyD",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], (BaseController,BusyD,JSONModel,MessageToast) => {
    "use strict";

    return BaseController.extend("aj.sap.weconnect.controller.NotFound", {
onInit(){},
BackToLoginPress(){
    const oRouter = this.getOwnerComponent().getRouter();
    oRouter.navTo("RouteInitial");
}
    })
})