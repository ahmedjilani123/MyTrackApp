sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController",
  "aj/sap/myexpenseapp/controller/BusyDialog/BusyD",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], (BaseController,BusyD,JSONModel,MessageToast) => {
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
          var page = this.getView().byId("FormPage");
          var titlePage = this.getView().byId("formTitleExIn");
          var footer = this.getView().byId("footerIdForm");
          var valueCss = page?.aCustomStyleClasses ? page.aCustomStyleClasses[0]:'';
          var footerClass = footer.aCustomStyleClasses.find(cls => cls.includes("Css"));
            var ttileClass = titlePage.aCustomStyleClasses.find(cls => cls.includes("Css"));
        page.removeStyleClass(valueCss)
         footer.removeStyleClass(footerClass)
          titlePage.removeStyleClass(ttileClass)
          var showData ;
          const mainModel = this.getOwnerComponent().getModel("mainService");
          mainModel.read("/Users('"+$.sap.UserID+"')",{
            urlParameters:{
              "$expand":"incomeResources,expenseCategories"
            },
            success:(oData)=>{
              const objCatIncom = {Categories:[],Incomes:[]};
              
                if(getValue == 'Add Expense'){
                var categoryData = oData.expenseCategories.results.filter(type=> type.CategoryType === "Expense");
                objCatIncom.Categories=categoryData;
                }else {
var categoryData = oData.expenseCategories.results.filter(type=> type.CategoryType === "Income");
                objCatIncom.Categories=categoryData;
                var incomeData = oData.incomeResources.results;
                objCatIncom.Incomes = incomeData;
                }
                  const categoryIncomModel = new JSONModel(objCatIncom);
                this.getView().setModel(categoryIncomModel,"CatIncomM");

          },
        error:(oError)=>{
            console.error("Error fetching categories:", oError);
        }});

if( getValue == 'Add Expense'){
    showData = "Ex";
    titlePage.addStyleClass("sapAddExpenseCss");
    footer.addStyleClass("sapBackgroundExpenseCss")
 page.addStyleClass("sapBackgroundExpenseCss")
}else if(getValue == 'Add Income'){
    showData = "In";
     titlePage.addStyleClass("sapAddIncomeCss");
      footer.addStyleClass("sapBackgroundIncomeCss")
 page.addStyleClass("sapBackgroundIncomeCss")
}else if (getValue == 'Add Notice'){
    showData = "No";
     titlePage.addStyleClass("sapAddAddTaskCss");
    footer.addStyleClass("sapBackgroundNoticeCss")
 page.addStyleClass("sapBackgroundNoticeCss")
}else if (getValue == 'Add Invest'){
    showData = "Inv";
     titlePage.addStyleClass("sapAddInvestCss");
  MessageToast.show("Under Development");
    var model = this.getOwnerComponent().getModel("ColumnLayout");
            model.setData({FLayout:"OneColumn"})
            model.refresh(true);
  return;
}
var oTempModel = new JSONModel({Title:getValue,Show:showData});
        this.getView().setModel(oTempModel,"TempModel");
          var model = this.getOwnerComponent().getModel("ColumnLayout");
            model.setData({FLayout:"TwoColumnsBeginExpanded"})
            model.refresh(true);
       },
       handleCloseSideScreenPre(){
         var model = this.getOwnerComponent().getModel("ColumnLayout");
            model.setData({FLayout:"OneColumn"})
            model.refresh(true);
       },
       SaveTransactionHandler(oEvent){
        console.log(oEvent);
        var data = this.getOwnerComponent().getModel("TransactModel");
        var mainService = this.getOwnerComponent().getModel("mainService");
        data.user_ID = $.sap.UserID;
        mainService.create("/Transactions",data,{
success(oData){

},
error(err){

}
        })
       }
    });
});