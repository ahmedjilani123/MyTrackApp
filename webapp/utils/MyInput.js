sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {
    "use strict";

    return Control.extend("aj.sap.weconnect.utils.MyButton", {
        metadata: {
            properties: {
                type:{ type: "string", defaultValue: "text" },
                value: { type: "string", defaultValue: "" },
                placeholder: { type: "string", defaultValue: "" },
                 width: { type: "sap.ui.core.CSSSize", defaultValue: "auto" },
                   height: { type: "sap.ui.core.CSSSize", defaultValue: "2.25rem" }
            },
            events: {
                change: { parameters: { value: { type: "string" } } },
                liveChange: { parameters: { value: { type: "string" } } }
            }
        },
        onAfterRendering: function () {
            const input = this.getDomRef();
            const that = this;
            if (input) {
                input.removeEventListener("input", this._onInput);
                input.removeEventListener("change", this._onChange);
                this._onInput = function (e) {
                    const value = e.target.value;
                    that.setProperty("value", value, true);
                    that.fireLiveChange({ value });
                };
                this._onChange = function (e) {
                    const value = e.target.value;
                    that.setProperty("value", value, true);
                    that.fireChange({ value });
                };
                input.addEventListener("input", this._onInput);
                input.addEventListener("change", this._onChange);
            }
        },
            renderer: function (oRM, oControl) {
                oRM.openStart("input", oControl)
                oRM.attr("type", oControl.getType()); 
                 oRM.style("width", oControl.getWidth());
                  oRM.style("height", oControl.getHeight());
                oRM.attr("placeholder", oControl.getPlaceholder()); 
                oRM.attr("value", oControl.getValue());  
                oRM.class("customInputClass");
                oRM.openEnd();
                oRM.close("input");
            }
    });
});
