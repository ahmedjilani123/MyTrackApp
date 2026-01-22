sap.ui.define([
    "aj/sap/myexpenseapp/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	 "aj/sap/myexpenseapp/controller/BusyDialog/BusyD"
], (BaseController,Fragment,JSONModel,MessageBox,BusyD) => {
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

				this.GetYEar();
          var Router = this.getOwnerComponent().getRouter();
        Router.getRoute("Home").attachPatternMatched(this.ObjectRouterViewData,this );
        },
        ObjectRouterViewData(){
//   BusyD.hide();
var Model = this.getOwnerComponent().getModel("mainService");
Model.read(`/Users('${$.sap.UserID}')`,{
	success:function(odata){
console.log(odata)
	},
	error:function(err){
		console.log(err)
	}
})
        },
		GetYEar(){
var Model = this.getOwnerComponent().getModel("mainService");
Model.read(`/Users('${$.sap.UserID}')`,{
	urlParameters:{
		"$expand":"yearlyAmounts"

	},
	success:function(odata){
console.log(odata)
	},
	error:function(err){
		console.log(err)
	}
})
		},
        AddContactHandler(){
            if(!this.AddContact){
 this.AddContact = Fragment.load({
                	name: "aj.sap.myexpenseapp.fragments.ContactF.Phone",
					controller: this
            })
            }
           this.AddContact.then(function(Dialog){
                Dialog.open();
            })
        },
        ClosePhoneDialogH(oEvent){
            oEvent.getSource().getParent().close();
        },
        onOpenPopoverYear: function (oEvent) {
			var oButton = oEvent.getSource(),
				oView = this.getView();
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "aj.sap.myexpenseapp.fragments.Dash.SeeYears",
					controller: this
				})
			}
			this._pPopover.then(function(oPopover){
				oPopover.openBy(oButton);
			});
		},
      	onNavYearDetail: function (oEvent) {
			var oCtx = oEvent.getSource().getBindingContext();
			var oNavCon = this.byId("navYearCon");
			var oDetailPage = this.byId("detailYear");
			oNavCon.to(oDetailPage);
			this.byId("myPopoverYear").focus();
		},
onNavBackYear(){
	var oNavCon = this.byId("navYearCon");
			oNavCon.back();
			this.byId("myPopoverYear").focus();
},
		onNavBackContact : function (oEvent) {
			var oNavCon = this.byId("navContact");
			oNavCon.back();
			this.byId("myPopover").focus();
		},
        	onIndividualPress: function(oEvent) {
			var oEventSource = oEvent.getParameter("eventSource"),
				oView = this.getView();
			if (oEvent.getParameter("overflowButtonPressed")) {
				this.onGroupPress(oEvent);
			} else {
				var oBindingInfo = oEventSource.getBindingContext("ContactM").getPath();
				if (!this._pIndividualPopover) {
					this._pIndividualPopover = Fragment.load({
						id: oView.getId(),
						name: "aj.sap.myexpenseapp.fragments.ContactF.SingleContact",
						controller: this
					}).then(function(oIndividuaLPopover) {
						oView.addDependent(oIndividuaLPopover.bindElement({path:`ContactM>${oBindingInfo}`}));
						return oIndividuaLPopover;
					});
				}
				this._pIndividualPopover.then(function(oIndividuaLPopover){
					
					oIndividuaLPopover.openBy(oEventSource).addStyleClass("sapFAvatarGroupPopover");
				}.bind(this));
			}
		},
        onGroupPress(oEvent){
            var oEventSource = oEvent.getParameter("eventSource");
            var	oView = this.getView();
            	if (!this._pGroupPopover) {
					this._pGroupPopover = Fragment.load({
						id: oView.getId(),
						name: "aj.sap.myexpenseapp.fragments.ContactF.GroupContact",
						controller: this
					}).then(function(_pGroupPopover) {
						oView.addDependent(_pGroupPopover);
						return _pGroupPopover;
					});
				}
				this._pGroupPopover.then(function(_pGroupPopover){
					
					_pGroupPopover.openBy(oEventSource).addStyleClass("sapFAvatarGroupPopover");
				}.bind(this));
        },
        	onAvatarPressContact: function (oEvent) {
			var oBindingInfo = oEvent.getSource().getBindingContext("ContactM").getPath(),
				oNavCon = this.byId("navContact"),
				oDetailPage = this.byId("detailContact");
                oDetailPage.bindElement({path:`ContactM>${oBindingInfo}`})
			var	oGroupPopover = this.byId("groupPopover");
			oNavCon.to(oDetailPage);
			oGroupPopover.focus();
		},
		SeeAllNoticeHandler(){
			   var	oView = this.getView();
            	if (!this.Notice) {
					this.Notice = Fragment.load({
						id: oView.getId(),
						name: "aj.sap.myexpenseapp.fragments.SeeAllNotice",
						controller: this
					})
				}
				this.Notice.then(function(Notice) {
						oView.addDependent(Notice);
						Notice.open()
					});
		},
		onItemNoticeClose(){
			MessageBox.confirm("Are you sure you want to delete ?");
		},
		ClickTilePress(oEvent){
			
			var RouterName =  oEvent.getSource().data("key")
			var Router = this.getOwnerComponent().getRouter();
			Router.navTo('AnalyticTran',{
				type:'Income',
				year:'2024'	
			});
		},
		NavToMainTransactionPress(oEvent){
			var Router = this.getOwnerComponent().getRouter();
			Router.navTo('AnalyticTran',{
				type:'',
				year:'2024'	
			});
		}
    });
});