sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {
    "use strict";

    return Control.extend("aj.sap.weconnect.utils.MyButton", {
        metadata: {
            properties: {
                text: { type: "string", defaultValue: "" },   // button label
                width: { type: "sap.ui.core.CSSSize", defaultValue: "auto" },
                height: { type: "sap.ui.core.CSSSize", defaultValue: "2.25rem" }
            },
            events: {
                press: {}  
            }
        },

        onAfterRendering: function () {
            const btn = this.getDomRef();
            const that = this;

            if (btn) {
         
                btn.removeEventListener("click", this._onClick);

                this._onClick = function () {
                    that.firePress(); 
                };
                btn.addEventListener("click", this._onClick);
            }
        },

        renderer: {
            apiVersion: 2,
            render: function (oRM, oControl) {
                oRM.openStart("button", oControl);
                oRM.style("width", oControl.getWidth());
                oRM.style("height", oControl.getHeight());
                oRM.class("customButtonClass");
                oRM.openEnd();
                oRM.text(oControl.getText()); 
                oRM.close("button");
            }
        }
    });
});
