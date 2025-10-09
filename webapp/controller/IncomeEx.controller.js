sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
  "aj/sap/myexpenseapp/controller/BusyDialog/BusyD"
], (BaseController,BusyD) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.IncomeEx", {
        onInit() {
             var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("IncomeExpense").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
  BusyD.hide();
        },
       CreateDataForTrack(oEvent){
        var getValue = oEvent.getParameter("listItem").getAggregation("content")[0].getAggregation("items")[1].getProperty("text")
          var page = this.getView().byId("FormPage")
          var footer = this.getView().byId("footerIdForm");
          var valueCss = page?.aCustomStyleClasses ? page.aCustomStyleClasses[0]:'';
          var footerClass = footer.aCustomStyleClasses.find(cls => cls.includes("Css"));
        page.removeStyleClass(valueCss)
         footer.removeStyleClass(footerClass)
if( getValue== 'Add Expense'){
    footer.addStyleClass("sapBackgroundExpenseCss")
 page.addStyleClass("sapBackgroundExpenseCss")
}else if(getValue == 'Add Income'){
      footer.addStyleClass("sapBackgroundIncomeCss")
 page.addStyleClass("sapBackgroundIncomeCss")
}else if (getValue == 'Add Notice'){
    footer.addStyleClass("sapBackgroundNoticeCss")
 page.addStyleClass("sapBackgroundNoticeCss")
}
      
       
          var model = this.getOwnerComponent().getModel("ColumnLayout");
            model.setData({FLayout:"TwoColumnsBeginExpanded"})
            model.refresh(true);
       },
       handleCloseSideScreenPre(){
         var model = this.getOwnerComponent().getModel("ColumnLayout");
            model.setData({FLayout:"OneColumn"})
            model.refresh(true);
       }
    });
});