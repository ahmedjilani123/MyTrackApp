sap.ui.define([
 "aj/sap/myexpenseapp/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.transactDetail", {
        onInit() {
              
        },
        NavtoBack(){
            window.history.go(-1);
        }
    });
});