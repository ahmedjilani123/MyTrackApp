sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
  "aj/sap/myexpenseapp/controller/BusyDialog/BusyD",
  "sap/ui/core/Fragment",
  	'sap/m/Token'
], (BaseController,BusyD,Fragment,Token) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.ResourceInfo", {
        onInit() {
            	

            var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("BasicInfo").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
        EditProfileHandler(oEvent){
            var oView = this.getView();
            if(!this.EditProfile){
 this.EditProfile = Fragment.load({
                	id: oView.getId(),
                	name: "aj.sap.myexpenseapp.fragments.UserEditForm",
                    controller: this
            })
            }
                this.EditProfile.then(function(Dialog){
                oView.addDependent(Dialog);
                 Dialog.open();
  var oMultiInput1 = Dialog.getContent()[1].getContent()[11]; 
  var oMultiInput2 = Dialog.getContent()[1].getContent()[16];
   var oMultiInput3 = Dialog.getContent()[1].getContent()[18];
			oMultiInput1.setTokens([]);
            	var fnValidator = function(args){
				var text = args.text;
				return new Token({key: text, text: text});
			};

			oMultiInput1.addValidator(fnValidator);
            oMultiInput2.setTokens([]);
            	var fnValidator = function(args){
				var text = args.text;
				return new Token({key: text, text: text});
			};

			oMultiInput2.addValidator(fnValidator);
              oMultiInput3.setTokens([]);
            	var fnValidator = function(args){
				var text = args.text;
				return new Token({key: text, text: text});
			};

			oMultiInput3.addValidator(fnValidator);
               
            })
          
        },
        AvatarChangeHandlerEdit(oEvent){
            var getValue = oEvent.getSource().getSelectedItem().getBindingContext("AvatarProfile").getObject().AvatarImage;
            this.getView().byId("ProfileImageID").setSrc('.'+getValue)
        }
       

    });
});