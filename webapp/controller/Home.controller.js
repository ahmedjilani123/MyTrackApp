sap.ui.define([
    "aj/sap/myexpenseapp/controller/BaseController",
    "sap/ui/core/Fragment"
], (BaseController,Fragment) => {
    "use strict";

    return BaseController.extend("aj.sap.myexpenseapp.controller.Home", {
        onInit() {
              this.VizFrame = this.getView().byId("VizFrameID");
               this.VizFrame.setVizProperties({
                    title: {
                        visible:false
                    },
                    plotArea: {
                        colorPalette: ["#925FE2","#0040B0"],
                        drawingEffect: "glossy"
                    },
                    legendGroup: {
                        layout: {
                            position: "auto"
                        }
                    }
                })
        },
        AddContactHandler(){
            if(!this.AddContact){
 this.AddContact = Fragment.load({
                	name: "aj.sap.myexpenseapp.fragments.Phone",
					controller: this
            })
            }
           this.AddContact.then(function(Dialog){
                Dialog.open();
            })
        },
        ClosePhoneDialogH(oEvent){
            oEvent.getSource().getParent().close();
        }
    });
});