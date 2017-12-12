var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

//RETRIEVE ALL DATA
router.get('/all', function (req, res){
    let year = req.query.year;
    let quarter = req.query.quarter;
    let market = req.query.market;
    console.log('testing', year, quarter, market);
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
          console.log('Error connecting ', errorConnecting);
          res.sendStatus(500);
        } else {
          //select owner, pet, breed, color, checkin, and checkout
          var queryText = `SELECT "dbo_RPRT_Property"."Property_SubType" as "Class",
          COUNT("dbo_RPRT_Property"."Property_SubType") as "Total_Buildings", 
          SUM("dbo_RPRT_Property"."Building_Size") as "NRA", 
          SUM("dbo_RPRT_Property"."Squarefeet_Vacant") as "Vacant_Space", 
          SUM("dbo_RPRT_Property"."Squarefeet_Sublease") as "Sublease_Space",
          (SUM("dbo_RPRT_Property"."Squarefeet_Vacant")/SUM("dbo_RPRT_Property"."Building_Size")*100)::numeric(4,2) as "Percent_Vacant",
          (SUM("dbo_RPRT_Property"."Squarefeet_Vacant")/SUM("dbo_RPRT_Property"."Building_Size")*100)::numeric(4,2) as "Percent_Vacant_With_Sublease",
          SUM("dbo_RPRT_Property"."Absorption") as "Absorption",
          (SUM("dbo_RPRT_Property"."Rate_Low") + SUM("dbo_RPRT_Property"."Rate_Low"))/COUNT("dbo_RPRT_Property"."Property_SubType") as "Avg_Rate",
          SUM("dbo_RPRT_Property"."Total_Op_Expenses_Taxes")/COUNT("dbo_RPRT_Property"."Property_SubType") as "OE_T"
          FROM "dbo_RPRT_Property"
          JOIN "dbo_RPRT_Dataset"
          ON "dbo_RPRT_Property"."Report_Dataset_ID" = "dbo_RPRT_Dataset"."Report_Dataset_ID"
          WHERE "dbo_RPRT_Dataset"."Period_Type_ID" = 2 
          AND "dbo_RPRT_Dataset"."Period_Year" = $1
          AND SUBSTRING("dbo_RPRT_Dataset"."Dataset_Label",1,1) = $2 
          AND "dbo_RPRT_Property"."Submarket" = $3
          GROUP BY "dbo_RPRT_Property"."Property_SubType";`
          db.query(queryText, [year, quarter, market], function (errorMakingQuery, result) {
            done();
            if (errorMakingQuery) {
              console.log('errorMakingQuery', errorMakingQuery);
              res.sendStatus(500);
            } else {
              res.send(result.rows);
            }
          });
        }
      });//end of pool
})

//Inventory Donut chart
// router.get('/inventory', function (req, res){
//   pool.connect(function (errorConnecting, db, done) {
//       if (errorConnecting) {
//         console.log('Error connecting ', errorConnecting);
//         res.sendStatus(500);
//       } else {
//         //select owner, pet, breed, color, checkin, and checkout
//         var queryText = `SELECT "dbo_PROP_PropertySubType"."Property_SubType", SUM("dbo_RPRT_HistoricMeasures"."Total_Buildings") as "buildings" FROM "dbo_RPRT_HistoricMeasures" JOIN "dbo_PROP_PropertySubType" ON "dbo_PROP_PropertySubType"."Property_SubType_ID" = "dbo_RPRT_HistoricMeasures"."Property_SubType_Id" GROUP BY "Property_SubType";`
//         db.query(queryText, function (errorMakingQuery, result) {
//           done();
//           if (errorMakingQuery) {
//             console.log('errorMakingQuery', errorMakingQuery);
//             res.sendStatus(500);
//           } else {
//             res.send(result.rows);
//           }
//         });
//       }
//     });//end of pool
// });

// 

//Total Direct Absorption line graph
router.get('/absorption', function (req, res){
  let market = req.query.market;
  pool.connect(function (errorConnecting, db, done) {
      if (errorConnecting) {
        console.log('Error connecting ', errorConnecting);
        res.sendStatus(500);
      } else {
        //select owner, pet, breed, color, checkin, and checkout
        var queryText = `SELECT "dbo_RPRT_Property"."Property_SubType" as "Class",
        "dbo_RPRT_Dataset"."Period_Year" || '-' || SUBSTRING("dbo_RPRT_Dataset"."Dataset_Label",1,1) as "Time",
        SUM("dbo_RPRT_Property"."Absorption") as "Absorption"
        FROM "dbo_RPRT_Property"
        JOIN "dbo_RPRT_Dataset"
        ON "dbo_RPRT_Property"."Report_Dataset_ID" = "dbo_RPRT_Dataset"."Report_Dataset_ID"
        WHERE "dbo_RPRT_Dataset"."Period_Type_ID" = 2
        AND "dbo_RPRT_Property"."Submarket" = $1
        GROUP BY "dbo_RPRT_Property"."Property_SubType", "dbo_RPRT_Dataset"."Dataset_Label", "dbo_RPRT_Dataset"."Period_Year";
        `
        db.query(queryText, [market], function (errorMakingQuery, result) {
          done();
          if (errorMakingQuery) {
            console.log('errorMakingQuery', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      }
    });//end of pool
});

module.exports = router;