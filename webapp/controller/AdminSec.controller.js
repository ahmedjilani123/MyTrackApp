sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
 "aj/sap/myexpenseapp/controller/BusyDialog/BusyD",
  "sap/ui/core/Fragment",
  "sap/m/MessageBox"
], (BaseController,BusyD,Fragment,MessageBox) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.AdminSec", {
        onInit() {
           var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("AdminSec").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
        EditCategoryHandler(){
            if(!this.EditCategory){
 this.EditCategory = Fragment.load({
                	name: "aj.sap.myexpenseapp.fragments.AdminD.CategoryD",
                    controller: this
            })
            }
              this.EditCategory.then(function(Dialog){
                Dialog.open();
            })
        },
        EditYearHandler(){
            if(!this.EditYear){
 this.EditYear = Fragment.load({
                	name: "aj.sap.myexpenseapp.fragments.AdminD.YearD",
                    controller: this
            })
            }
                this.EditYear.then(function(Dialog){
                Dialog.open();
            })

        },
        EditUserNameHandler(){
            if(!this.EditUserName){
 this.EditUserName = Fragment.load({
                	name: "aj.sap.myexpenseapp.fragments.AdminD.UserName",
                    controller: this
            })
            }
                this.EditUserName.then(function(Dialog){
                Dialog.open();
            })
        },
        CloseCategoryYearPress(oEvent){
            oEvent.getSource().getParent().close();
        },
        PasswordInformationPress(oEvent){
    const oButton = oEvent.getSource();

    // Create Popover only once
    if (!this._oPasswordPopover) {
       

      

      

        this._oPasswordPopover = new sap.m.Popover({
            placement: sap.m.PlacementType.Bottom,
            showHeader: false,
            class: "sapUiContentPadding",
            content: [
                new sap.m.VBox({
                    items: [
                     
                        new sap.m.Label({
                            text: "Password (4 digits + 1 symbol)",
                            design: "Bold"
                        }).addStyleClass("sapUiSmallMarginBottom  sapUiTinyMargin"),

                 
                        new sap.m.ObjectStatus({
                            text: "->First 2 letters should be Numbers",
                            state: "Success"
                        }).addStyleClass("sapUiTinyMarginBeginEnd"),
                        new sap.m.ObjectStatus({
                            text: "->Next 2 letters should be Alphabets",
                            state: "Success"
                        }).addStyleClass("sapUiTinyMarginBeginEnd"),
                        new sap.m.ObjectStatus({
                            text: "->1 Special Character (e.g., @, #, $)",
                            state: "Success"
                        }).addStyleClass("sapUiTinyMarginBeginEnd"),
                    ],
                    class: "sapUiLargeMargin"
                })
            ]
        });
        this.getView().addDependent(this._oPasswordPopover);
    }

    this._oPasswordPopover.openBy(oButton);
        }
      
    });
});