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
  this.getAllCategoriesHandler();
        },
        EditCategoryHandler(object){
            var oView = this.getView();
            var newJSonget = object.getSource().getBindingContext("CategoryM").getObject();
            const newObj = new sap.ui.model.json.JSONModel();
            newObj.setData(newJSonget);
            if(!this.EditCategory){
 this.EditCategory = Fragment.load({
                	name: "aj.sap.myexpenseapp.fragments.AdminD.CategoryD",
                    controller: this
            })
            }
              this.EditCategory.then(function(Dialog){
                oView.addDependent(Dialog.setModel(newObj,"EditCategoryM"));
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
        },
        onSaveCategoryHandler(oEvent){
            const oModelC = this.getView().getModel("CategoryM");
            const oData = oModelC.getData();
        oData.user_ID = $.sap.UserID;
        delete oData.categories;
            this.getView().getModel("mainService").create("/ExpenseCategories", oData, {
                success: function(oData, response) {
                    oModelC.setData({}); 
                    oModelC.refresh();
                    this.getAllCategoriesHandler();
                    MessageBox.success("Category saved successfully!");
                 
                }.bind(this),
                error: function(oError) {
                    MessageBox.error("Error saving category.");
                }
            });
        },
        getAllCategoriesHandler(){
            BusyD.show();
            const oModel = this.getView().getModel("mainService");
            const oCategoryM = this.getView().getModel("CategoryM");
            oModel.read("/ExpenseCategories", {
                filters: [new sap.ui.model.Filter("user_ID", sap.ui.model.FilterOperator.EQ, $.sap.UserID)],
                success: function(oData, response) {
                    oCategoryM.setData({ categories: oData.results });
                    oCategoryM.refresh();
                    BusyD.hide();
                }.bind(this),
                error: function(oError) {
                    BusyD.hide();
                    MessageBox.error("Error fetching categories.");
                }});
        },
        onSaveEditCategoryHandler(oEvent){
            const oEditModel = oEvent.getSource().getParent().getModel("EditCategoryM");
            const oData = oEditModel.getData();
            const sCategoryID = oData.ID;
            const payload ={
                CategoryName: oData.CategoryName,
                Description: oData.Description,
                CategoryType: oData.CategoryType
            }
            this.getView().getModel("mainService").update(`/ExpenseCategories('${sCategoryID}')`, payload, {
                success: function(oData, response) {
                     oEvent.getSource().getParent().close();
                    this.getAllCategoriesHandler();
                    MessageBox.success("Category updated successfully!");
                }
                .bind(this),
                error: function(oError) {
                    MessageBox.error("Error updating category.");
                }
            });
        },
        onDeleteCategoryHandler(oEvent){
            const oCategory = oEvent.getSource().getBindingContext("CategoryM").getObject();
            const sCategoryID = oCategory.ID;
            this.getView().getModel("mainService").remove(`/ExpenseCategories('${sCategoryID}')`, {
                success: function(oData, response) {
                    this.getAllCategoriesHandler();
                    MessageBox.success("Category deleted successfully!");
                }
                .bind(this),
                error: function(oError) {
                    MessageBox.error("Error deleting category.");
                }
            });
        }
                

    });
});