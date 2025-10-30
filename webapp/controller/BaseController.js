sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/BusyDialog"
],function(Controller,BusyDialog){
    return Controller.extend("aj.sap.myexpenseapp.controller.BaseController",{
ViewDetailTranHandler(){
            let Router = this.getOwnerComponent().getRouter();
            Router.navTo("TransactDetail")
        },
        _getUserDataMethod(UserID){
            var that=this;
var Model = this.getOwnerComponent().getModel("mainService");
Model.read(`/Users('${UserID}')`,{
      urlParameters: {
    "$select": "FullName,Email,AvatarImage" 
  },
	success:function(odata){
console.log(odata)
var oModel = that.getOwnerComponent().getModel("DashboardM");
oModel.setData(odata);
	},
	error:function(err){
		console.log(err)
	}
})
        },
          ShowHideBusyIndicator(X){
           
        }
      
    })

})