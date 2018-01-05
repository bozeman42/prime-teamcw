let pool = require('./pool.js');
let csv = require('fast-csv');
let Stream = require('stream');

function processPropertyCSV(dataInfo) {
  //Process data CSV
  return new Promise((resolve, reject) => {
    let bufferStream = new Stream.PassThrough();
    bufferStream.end(dataInfo.data);
    csv.fromStream(bufferStream, {
      quote: '"',
      headers: true
    })
      .on("data", function (data) {
        for (var prop in data) {
          if (data[prop] === undefined || data[prop] === '') {
            data[prop] = null;
          }
        }
        dataInfo.uploadedData.push(data);
      })
      .on("end", function (data) {
        storePropertyCSV(dataInfo)
          .then((result) => {
            resolve(result);
          });
      });
  });
}

function storePropertyCSV(dataInfo) {
  //Attempt to store object
  return new Promise((resolve, reject) => {
    let data = dataInfo.uploadedData;
    let user = dataInfo.user;
    let batchId = dataInfo.batchId;
    data.forEach((property) => {
      pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
          console.log('Error connecting', errorConnecting);
          reject(errorConnecting);
        } else {
          var queryText = 'INSERT INTO "dbo_RPRT_Property" ("Report_Property_ID","Report_Dataset_ID","Property_ID","Property_Name",' +
            '"Address_1","Address_2","City_ID","State","Zip","Outlook","SubMarket_ID","Submarket","Property_Type_ID","Property_Type",' +
            '"Building_Size","Number_Of_Floors","Year_Built","Year_Renovated","X_Coordinate","Y_Coordinate","Squarefeet_Available",' +
            '"Squarefeet_Vacant","Squarefeet_Sublease","Absorption","Divisible_Min","Divisible_Max","Rate_Low","Rate_High",' +
            '"Squarefeet_OP_Expenses","Squarefeet_Taxes","Year_Tax","Sale_Asking_Price","Rate_Alpha","Property_SubType_ID",' +
            '"Property_SubType","Total_Op_Expenses_Taxes","RUFactor","TenantsInfo","Created_User","Created_Date","Modified_User",' +
            '"Modified_Date","Construction","IsInAbsorptionCalculation","TenancyTypeId") ' +
            'VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24' +
            ',$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45);';
          db.query(queryText, [
            property.Report_Property_ID,
            property.Report_Dataset_ID,
            property.Property_ID,
            property.Property_Name,
            property.Address_1,
            property.Address_2,
            property.City_ID,
            property.State,
            property.Zip,
            property.Outlook,
            property.SubMarket_ID,
            property.Submarket,
            property.Property_Type_ID,
            property.Property_Type,
            property.Building_Size,
            property.Number_Of_Floors,
            property.Year_Built,
            property.Year_Renovated,
            property.X_Coordinate,
            property.Y_Coordinate,
            property.Squarefeet_Available,
            property.Squarefeet_Vacant,
            property.Squarefeet_Sublease,
            property.Absorption,
            property.Divisible_Min,
            property.Divisible_Max,
            property.Rate_Low,
            property.Rate_High,
            property.Squarefeet_OP_Expenses,
            property.Squarefeet_Taxes,
            property.Year_Tax,
            property.Sale_Asking_Price,
            property.Rate_Alpha,
            property.Property_SubType_ID,
            property.Property_SubType,
            property.Total_Op_Expenses_Taxes,
            property.RUFactor,
            property.TenantsInfo,
            property.Created_User,
            property.Created_Date,
            property.Modified_User,
            property.Modified_Date,
            property.Construction,
            property.IsInAbsorptionCalculation,
            property.TenancyTypeId
          ], function (errorMakingQuery, result) {
            done();
            if (errorMakingQuery) {
              console.log('Error making property database entries', errorMakingQuery);
              console.log('Error with this property:', property);
              reject(errorMakingQuery);
            }
          });
        }
      }); //end of pool
    });
    resolve(true);
  });
}

module.exports = processPropertyCSV;