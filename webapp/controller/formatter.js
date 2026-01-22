sap.ui.define([],function(){
"use strict";
return{
 statusText:function(sStatus){
    switch(sStatus){
        case "A":
            return "Indication15";
        case "R":
            return "Indication16";
        case "W":
            return "Indication13";
        default:
            return "Indication18";
    }
},
formatYYYYMMDD: function (sDate) {
  if (!sDate) {
    return "";
  }

  let oDate;

  // Case 1: yyyyMMdd → 20240112
  if (/^\d{8}$/.test(sDate)) {
    const year = sDate.substring(0, 4);
    const month = sDate.substring(4, 6);
    const day = sDate.substring(6, 8);
    oDate = new Date(`${year}-${month}-${day}`);
  }
  // Case 2: yyyy-MM-dd → 2024-01-12
  else if (/^\d{4}-\d{2}-\d{2}$/.test(sDate)) {
    oDate = new Date(sDate);
  }
  // Invalid format
  else {
    return "";
  }

  return oDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

}
})