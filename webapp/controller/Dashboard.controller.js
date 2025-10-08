sap.ui.define([
    "aj/sap/myexpenseapp/controller/BaseController",
    "sap/ui/Device"
], (BaseController,Device) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.Dashboard", {
        onInit() {
        },
        NavigationPress(oEvent){
            if(!Device.system.desktop){
  var oToolPage = this.byId("ToolpageID");
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
            }
          
          var RouterName =  oEvent.getParameter("item").getProperty("key")
            var Router = this.getOwnerComponent().getRouter();
            Router.navTo(RouterName)
        },
        	onSideNavButtonPress: function () {
			var oToolPage = this.byId("ToolpageID");
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
    });
});