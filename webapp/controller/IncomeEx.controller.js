sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.IncomeEx", {
        onInit() {
              
        },
       CreateDataForTrack(){
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