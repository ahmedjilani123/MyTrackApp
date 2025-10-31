sap.ui.define(
  [
    "aj/sap/myexpenseapp/controller/BaseController",
    "aj/sap/myexpenseapp/controller/BusyDialog/BusyD",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/Token",
    "sap/m/Dialog",
    "sap/ui/layout/form/SimpleForm",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/MessageBox",
     "sap/m/MessageToast"
  ],
  (
    BaseController,
    BusyD,
    Fragment,
    JSONModel,
    Token,
    Dialog,
    SimpleForm,
    Label,
    Input,
    MessageBox,
    MessageToast
  ) => {
    "use strict";

    return BaseController.extend(
      "aj.sap.myexpenseapp.controller.ResourceInfo",
      {
        onInit() {
          var Router = this.getOwnerComponent().getRouter();
          Router.getRoute("BasicInfo").attachPatternMatched(
            this.ObjectRouterViewData,
            this
          );
        },
        ObjectRouterViewData(oEvent) {
             BusyD.show();
          var Model = this.getOwnerComponent().getModel("mainService");
          var that = this;
          Model.read(`/Users('${$.sap.UserID}')`, {
             urlParameters:{
              $expand:"incomeResources"
            },
            success: function (odata) {
             const aRemoveKeys = [
        "contacts", "createdAt", "createdBy", "expenseCategories",
         "modifiedAt", "modifiedBy","ConfirmPassword","Password",
        "monthlyExpenses", "notices", "transactions",
        "yearlyAmounts", "__metadata"
      ];
      aRemoveKeys.forEach(key => delete odata[key]);

              let UserModel = that.getOwnerComponent().getModel("UserDataM");
              UserModel.setData(odata);
              BusyD.hide();
            },
            error: function (err) {
              console.log(err);
              BusyD.hide();
            },
          });
        },
        EditProfileHandler(oEvent) {
          var getUserData = oEvent.getSource().getModel("UserDataM").getData();
          var TempUserModel = new JSONModel(getUserData);
          var oView = this.getView();
          if (!this.EditProfile) {
            this.EditProfile = Fragment.load({
              id: oView.getId(),
              name: "aj.sap.myexpenseapp.fragments.UserEditForm",
              controller: this,
            });
          }
          this.EditProfile.then(function (Dialog) {
            oView.addDependent(Dialog.setModel(TempUserModel, "TempUserModel"));
            Dialog.open();

            // imput source data array for token
            var allTokenSource = [
              Dialog.getContent()[1].getContent()[11],
              Dialog.getContent()[1].getContent()[16],
              Dialog.getContent()[1].getContent()[18],
            ];
            var temItemArr = ["Skills", "Language", "Qualification"]; //json property name
            temItemArr.forEach(function (itemset, index) {
              //split array for items like e.g 'sapui5','js'
              var ItemSetArr = TempUserModel.getData()[itemset].split(",");
              var _MainArr = [];
              ItemSetArr.forEach(function (mitem) {
                _MainArr.push(new Token({ key: mitem, text: mitem }));
              });
              allTokenSource[index].setTokens(_MainArr);
              _MainArr = [];
            });
            // add validator for new items
            allTokenSource.forEach(function (items) {
              var skilsset = function (args) {
                var textSkills = args.text;
                return new Token({ key: textSkills, text: textSkills });
              };
              items.addValidator(skilsset);
            });
          });
        },
        AvatarChangeHandlerEdit(oEvent) {
          var getValue = oEvent
            .getSource()
            .getSelectedItem()
            .getBindingContext("AvatarProfile")
            .getObject().AvatarImage;
          this.getView()
            .byId("ProfileImageID")
            .setSrc("." + getValue);
          let oModel = oEvent.getSource().getModel("TempUserModel");
          oModel.setProperty("/AvatarImage",getValue);

        },
        CloseEditProfileResourceHandler(oEvent) {
          oEvent.getSource().getParent().close();
          var tempModel = oEvent
            .getSource()
            .getParent()
            .getModel("TempUserModel");
          tempModel.setData({});
          tempModel.refresh();
        },
        EditResourceHandler(oEvent) {
          var ItemTable = this.getView().byId("IncomeResourceTableID");
          var getSelectItem = ItemTable.getSelectedItem();
          if (!getSelectItem) {
            sap.m.MessageToast.show("Please select any one record to edit");
            return;
          }
          var oView = this.getView();
          if (!this.EditResource) {
            this.EditResource = Fragment.load({
              name: "aj.sap.myexpenseapp.fragments.IncomeResource.EditResource",
              controller: this,
            });
          }
          this.EditResource.then(function (Dialog) {
            var oTempModel = new JSONModel(
              getSelectItem.getBindingContext("UserDataM").getObject()
            );
            oView.addDependent(Dialog.setModel(oTempModel, "TempUserModel"));
            Dialog.open();
          });
        },
        DeleteResourceHandler(oEvent) {
          var ItemTable = this.getView().byId("IncomeResourceTableID");
          var getSelectItem = ItemTable.getSelectedItem();
          if (!getSelectItem) {
            sap.m.MessageToast.show("Please select any one record to delete");
            return;
          }
          MessageBox.confirm("Are you sure you want to delete this record?", {
            title: "Confirm Deletion",
            onClose: function (oAction) {
              if (oAction === "OK") {
                var getIndex = ItemTable.indexOfItem(getSelectItem);
                var getModel = ItemTable.getModel("UserDataM");
                var getData = getModel.getData();
                getData.splice(getIndex, 1);
                getModel.setData(getData);
                getModel.refresh();
                sap.m.MessageToast.show("Record deleted successfully");
              }
            },
          });
        },
      ChangeResourceDataHander(oEvent) {
        BusyD.show();
  let data = oEvent.getSource().getModel("TempUserModel").getData();

  if (!data.JobTitle || !data.Organization || !data.Experience || !data.Salary) {
    sap.m.MessageToast.show("Please fill all required fields before saving.");
     BusyD.hide();
    return;
  }

  delete data.createdAt;
  delete data.createdBy;
  delete data.modifiedAt;
  delete data.modifiedBy;
  delete data.user;
  delete data.user_ID;
  delete data.__metadata; 
  let oModel = this.getOwnerComponent().getModel("mainService");
var that=this;
  oModel.update(`/IncomeResources('${data.ID}')`, data, {
    success: function (odata) {
that.ObjectRouterViewData();
oEvent.getSource().getParent().close();
      MessageToast.show("Resource data updated successfully!");
     
    },
    error: function (err) {
     BusyD.hide();
      console.error(" Update Error:", err);
    },
  });

  console.log("📦 Final Payload Sent:", data);
}
,
        AddResourceHandler(oEvent) {
          var oView = this.getView();
          var that = this;
          if (!this.AddResource) {
            this.AddResource = new Dialog({
              title: "Add Resource",
              resizable: true,
              draggable: true,
              content: new SimpleForm({
                layout: "ColumnLayout",
                columnsL: 2,
                columnsM: 2,
                columnsS: 1,
                content: [
                  new Label({ text: "Job Title", required:true }),
                  new Input({ value: "{TempUserModel>/JobTitle}" ,placeholder:"e.g Software Engineer"}),
                  new Label({ text: "Organization Name" ,required:true }),
                  new Input({ value: "{TempUserModel>/Organization}", placeholder: "e.g. xyz Solutions" }),
                  new Label({ text: "Expertise Area" }),
                  new Input({ value: "{TempUserModel>/ExpertiseArea}" ,placeholder: "e.g. SAPUI5 / Fiori Development" }),
                  new Label({ text: "Experience",required:true }),
                  new Input({ value: "{TempUserModel>/Experience}" ,  type: "Number",  placeholder: "e.g. 2.5"}),
                  new Label({ text: "Location" }),
                  new Input({ value: "{TempUserModel>/Location}" ,  placeholder: "e.g. Ahmedabad, India"}),
                  new Label({ text: "Payer Name" }),
                  new Input({ value: "{TempUserModel>/PayerName}",placeholder: "e.g. Ramesh bhai" }),
                  new Label({ text: "Salary" ,required:true}),
                  new Input({
                    value: "{TempUserModel>/Salary}",
                    type: "Number",
                     placeholder: "e.g. 450000"
                  }),
                ],
              }),
              beginButton: new sap.m.Button({
                text: "Close",
                press: this.CloseEditProfileResourceHandler.bind(that),
              }),
              endButton: new sap.m.Button({
                text: "Save",
                type: "Emphasized",
                press: this.SaveResourceDataHandler.bind(that),
              }),
            });
          }
          this.AddResource.setModel(new JSONModel({}), "TempUserModel");
          oView.addDependent(this.AddResource);
          this.AddResource.open();
        },
        EditSaveUserInfoHandler(oEvent){
           
            let UserEditData = oEvent.getSource().getModel("TempUserModel").getData();
            UserEditData.DisplayValue=UserEditData.PercentValue.toString()+"%";
 var Model = this.getOwnerComponent().getModel("mainService");
          var that = this;
           BusyD.show();
          Model.update(`/Users('${$.sap.UserID}')`,UserEditData, {
            urlParameters:{
              $expand:"incomeResources"
            },
            success: function (odata) {
             const aRemoveKeys = [
        "contacts", "createdAt", "createdBy", "expenseCategories",
         "modifiedAt", "modifiedBy","ConfirmPassword","Password",
        "monthlyExpenses", "notices", "transactions",
        "yearlyAmounts", "__metadata"
      ];
      aRemoveKeys.forEach(key => delete odata[key]);

              let UserModel = that.getOwnerComponent().getModel("UserDataM");
              UserModel.setData(odata);
              BusyD.hide();
              that._getUserDataMethod(odata.ID);
              oEvent.getSource().getParent().close();
            },
            error: function (err) {
              console.log(err);
              BusyD.hide();
            },
          });
          
        },
      SaveResourceDataHandler(oEvent) {

  let AddResourceData = oEvent.getSource().getModel("TempUserModel").getData();
BusyD.show();
  if (!AddResourceData.JobTitle || !AddResourceData.Organization || !AddResourceData.Location || !AddResourceData.Salary) {
    sap.m.MessageToast.show("Please fill all required fields before saving.");
    BusyD.hide();
    return;
  }
  let oModel = this.getOwnerComponent().getModel("mainService");
AddResourceData.user_ID =$.sap.UserID;
 var that=this;
  oModel.create("/IncomeResources", AddResourceData, {
    success: function (odata) {
      that.ObjectRouterViewData();
oEvent.getSource().getParent().close();
      MessageToast.show("Resource added successfully!");
 
    },
    error: function (err) {
       BusyD.hide();
      MessageToast.show("Error adding resource data, error like "+JSON.parse(err.responseText).error.message.value);
   
    },
  });

  console.log("📦 Payload Sent:", AddResourceData);
},
 async DownloadPressHander(oEent){
  let oModel = this.getOwnerComponent().getModel("mainService");

 var that=this;
  oModel.read("/IncomeResources", {
    success: async function (odata) {

   var workbook = new ExcelJS.Workbook();
    var sheet = workbook.addWorksheet("Finance Tracker App Data");

    sheet.mergeCells('D1', 'F1');
    sheet.getCell('D1').value = 'My Tracker Data';
    sheet.getCell('D1').font = { bold: true, size: 14 };
    sheet.getCell('D1').alignment = { horizontal: 'center' };

    sheet.mergeCells('D2', 'F2');
    sheet.getCell('D2').value = 'Finance Income Resource ';
    sheet.getCell('D2').font = { bold: true, size: 12 };
    sheet.getCell('D2').alignment = { horizontal: 'center' };

 var HeaderName ;
 var dataRows=[];
 odata.results.forEach(function(item,i){
   const keysToDelete = [
    "createdAt", "createdBy", "modifiedAt",
    "modifiedBy", "user", "user_ID", "__metadata"
  ];

  keysToDelete.forEach(key => delete item[key]);
  if(i === 0){
    HeaderName = Object.keys(item);
  }
  dataRows.push(Object.values(item))

 })
  const headerRow = sheet.addRow(HeaderName);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '002060' } 
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    dataRows.forEach(rowData => {
      const row = sheet.addRow(rowData);
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'middle', wrapText: true };
      });
    });

    const widths = [28, 19, 12, 19, 25, 19, 15, 19, 25];
    widths.forEach((w, i) => sheet.getColumn(i + 1).width = w);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_finance_data.xlsx";
    link.click();

    },
    error: function (err) {
       
    },
  });
       


    // const headers = [
    //   '#', 'Date', 'Received Date', 'Gate Pass No', 'Vehicle No',
    //   'From Site Name', 'To Site Name', 'Material Description', 'Qty.',
    //   'Received Qty', 'Unit', 'Seq. Inward No', 'PSP Seal No',
    //   'Transporter Name', 'GP Received By', 'Physical Count By'
    // ];

   
      }

      }
     
    );
  }
);
