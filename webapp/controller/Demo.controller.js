sap.ui.define([
  "./BaseController"
], (BaseController) => {
  "use strict";

  return BaseController.extend("aj.sap.myexpenseapp.controller.Demo", {
      onInit() {
          this.VizFrame = this.getView().byId("demo1VizFrameID");
               this.VizFrame.setVizProperties({
                    title: {
                        visible:false
                    },
                    plotArea: {
                        colorPalette: ["#dd6100","#0040B0"],
                        drawingEffect: "glossy"
                    },
                    legendGroup: {
                        layout: {
                            position: "bottom"
                        }
                    },
                    categoryAxis:{
                        label:{
                            rotation:"auto"
                        },
                        visible:true
                    }
                })
                 this.qVizFrame = this.getView().byId("demo2VizFrameID");
               this.qVizFrame.setVizProperties({
                    title: {
                        visible:false
                    },
                    plotArea: {
                        colorPalette: ["#00a63e","#0040B0"],
                        drawingEffect: "glossy"
                    },
                   valueAxis: {
                        title: {
                            visible: false
                        }
                    },
                    categoryAxis: {
                        title: {
                            visible: false
                        }
                    },
                    legendGroup: {
                        layout: {
                            position: "auto"
                        }
                    }
                })
                 this.rVizFrame = this.getView().byId("demo3VizFrameID");
               this.rVizFrame.setVizProperties({
                    title: {
                        visible:false
                    },
                     valueAxis: {
                        title: {
                            visible: false
                        }
                    },
                    categoryAxis: {
                        title: {
                            visible: false
                        }
                    },
                    plotArea: {
                        colorPalette: ["#3b90fe","#0040B0"],
                        drawingEffect: "glossy"
                    },
                    legendGroup: {
                        layout: {
                            position: "auto"
                        }
                    }
                })
                
      },
      MaterialFormat(value){
        if(value >=4){
            return "Error";
        }else{
 return 'Success'
        }
       
      },
     
  });
});