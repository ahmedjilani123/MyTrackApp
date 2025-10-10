sap.ui.define([
    "aj/sap/myexpenseapp/controller/BaseController",
    "sap/ui/Device",
    "aj/sap/myexpenseapp/controller/BusyDialog/BusyD"
], (BaseController,Device,BusyD) => {
    "use strict";
var GlobalData;
    return BaseController.extend("aj.sap.myexpenseapp.controller.Dashboard", {
        onInit() {
     
         var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("RouteDashboard").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
      
        NavigationPress(oEvent){
            // if(GlobalData == oEvent.getParameter("item").getProperty("key")){
            //   return;  
            // }
            // GlobalData = oEvent.getParameter("item").getProperty("key")
            // BusyD.show()
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
		}
        	
    });
});