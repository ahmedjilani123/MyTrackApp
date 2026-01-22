sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("aj.sap.weconnect.controller.Detail", {
      onInit() {
      },
      NavBacktoHome(){
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("MainRouter");
      }
  });
});