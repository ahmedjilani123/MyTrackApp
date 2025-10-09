sap.ui.define([
    "sap/m/BusyDialog"
],function(BusyDialog){
    'use strict';
    return {
        show(){
 if(!this.DialogBusy){
 this.DialogBusy = new BusyDialog({
                title:"Loading Data",
                customIcon:'./images/Loading.png'
            })
            }
         this.DialogBusy.open()
        },
         hide(){
 if(!this.DialogBusy){
 this.DialogBusy = new BusyDialog({
                title:"Loading Data",
                customIcon:'./images/Loading.png'
            })
            }
            var that=this;
            setTimeout(function(){
  that.DialogBusy.close()
            },1000)
       
        }
    }
})