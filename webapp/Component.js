sap.ui.define([
    "sap/ui/core/UIComponent",
    "aj/sap/weconnect/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("aj.sap.weconnect.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
       
            // enable routing
            this.getRouter().initialize();
        }
    });
});