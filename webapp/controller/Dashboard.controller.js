sap.ui.define([
    "aj/sap/myexpenseapp/controller/BaseController",
    "sap/ui/Device",
    "aj/sap/myexpenseapp/controller/BusyDialog/BusyD",
    "sap/ui/core/Fragment"
], (BaseController,Device,BusyD,Fragment) => {
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
        MainAvatarHandler(oEvent){
            var oView = this.getView();
            if(!this.ProfileMain){
                this.ProfileMain = Fragment.load({
                    	id: oView.getId(),
                        	name: "aj.sap.myexpenseapp.fragments.SignOut.ProfileMain",
                        controller: this
                })
        }
                this.ProfileMain.then(function(Dialog){
                oView.addDependent(Dialog);
                 Dialog.openBy(oEvent.getSource());
            });
    }
        	
    });
});