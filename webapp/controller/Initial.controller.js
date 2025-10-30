sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
 "aj/sap/myexpenseapp/controller/BusyDialog/BusyD",
 "sap/m/MessageToast"
], (BaseController,BusyD,MessageToast) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.Initial", {
        onInit() {
           


         var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("TransactDetail").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
      async loginHandler(oEvent){
            try {
                 var oData = {
    Email: "ahmed@gmail.com",
    Password: "Admin@123"
  };

  $.ajax({
    url: "https://trackerfinance.onrender.com/odata/v2/trackService/UserLogin",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(oData),
    success: function (response) {
      sap.m.MessageToast.show("✅ User created successfully!");
      console.log("Response:", response);
    },
    error: function (xhr, status, error) {
      sap.m.MessageToast.show("❌ Failed to create user");
      console.error("Error:", xhr.responseText);
    }
  });
                var MainModel = this.getOwnerComponent().getModel("mainService");
                 let LoginInfoM = this.getOwnerComponent().getModel("LoginInfoM")
            let UserData = LoginInfoM.getData();
       
                 
            if(Object.keys(UserData).length === 0 ) throw Error("Please Enter a Email");
           let checkArr=["Email","Password"];

           for(let key of checkArr){
            if(!UserData[key]) throw Error("Please Enter a "+key);
           }
          UserData.Email = UserData.Email.toLowerCase();
           BusyD.show();
         
var that=this;
MainModel.callFunction("/UserLogin", {
    method: "POST",
    urlParameters:UserData,
    success: function (oData, response) {
        const UserID = oData.UserLogin.UserID;
        var Router = that.getOwnerComponent().getRouter();
            Router.navTo("RouteDashboard",{
                id:UserID
            });
        MessageToast.show("Login success!");
    },
    error: function (oError) {
BusyD.hide();
        console.error("Error:", oError);
        MessageToast.show(JSON.parse(oError.responseText).error.message.value);
    }
});

            } catch (error) {
                BusyD.hide()
                  MessageToast.show(error)
            }
           

       
        },
        submit(ovalue){
            console.log(ovalue)
        }
    });
});