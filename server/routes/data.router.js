var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

//RETRIEVE ALL DATA
router.get('/all', function (req, res){
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
          console.log('Error connecting ', errorConnecting);
          res.sendStatus(500);
        } else {
          //select owner, pet, breed, color, checkin, and checkout
          var queryText = `SELECT "dbo_PROP_PropertyType"."Property_Type", "dbo_PROP_PropertySubType"."Property_SubType", "dbo_RPRT_HistoricMeasures"."Year", "dbo_RPRT_HistoricMeasures"."Total_Buildings", "dbo_RPRT_HistoricMeasures"."Net_Rentable_Area", "dbo_RPRT_HistoricMeasures"."Vacant_Space", "dbo_RPRT_HistoricMeasures"."Sublease_Space", "dbo_RPRT_HistoricMeasures"."Rental_Rate", "dbo_RPRT_HistoricMeasures"."Absorption", "dbo_RPRT_HistoricMeasures"."Construction_Space", "dbo_RPRT_HistoricMeasures"."Vacancy_Rate", "dbo_RPRT_HistoricMeasures"."Sublease_Vacany_Rate" FROM "dbo_RPRT_HistoricMeasures" JOIN "dbo_PROP_PropertyType" ON "dbo_RPRT_HistoricMeasures"."Property_Type_Id" = "dbo_PROP_PropertyType"."Property_Type_ID" JOIN "dbo_PROP_PropertySubType" ON "dbo_PROP_PropertySubType"."Property_SubType_ID" = "dbo_RPRT_HistoricMeasures"."Property_SubType_Id";`
          db.query(queryText, function (errorMakingQuery, result) {
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
router.get('/inventory', function (req, res){
  pool.connect(function (errorConnecting, db, done) {
      if (errorConnecting) {
        console.log('Error connecting ', errorConnecting);
        res.sendStatus(500);
      } else {
        //select owner, pet, breed, color, checkin, and checkout
        var queryText = `SELECT "dbo_PROP_PropertySubType"."Property_SubType", SUM("dbo_RPRT_HistoricMeasures"."Total_Buildings") as "buildings" FROM "dbo_RPRT_HistoricMeasures" JOIN "dbo_PROP_PropertySubType" ON "dbo_PROP_PropertySubType"."Property_SubType_ID" = "dbo_RPRT_HistoricMeasures"."Property_SubType_Id" GROUP BY "Property_SubType";`
        db.query(queryText, function (errorMakingQuery, result) {
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

//Total Direct Absorption line graph
router.get('/absorption', function (req, res){
  pool.connect(function (errorConnecting, db, done) {
      if (errorConnecting) {
        console.log('Error connecting ', errorConnecting);
        res.sendStatus(500);
      } else {
        //select owner, pet, breed, color, checkin, and checkout
        var queryText = `SELECT "dbo_PROP_PropertySubType"."Property_SubType", "dbo_RPRT_HistoricMeasures"."Year", SUM("dbo_RPRT_HistoricMeasures"."Absorption") as "absorption" FROM "dbo_RPRT_HistoricMeasures" JOIN "dbo_PROP_PropertySubType" ON "dbo_PROP_PropertySubType"."Property_SubType_ID" = "dbo_RPRT_HistoricMeasures"."Property_SubType_Id" GROUP BY "Property_SubType", "Year" HAVING "Year" > 2013 ORDER BY "Year";`
        db.query(queryText, function (errorMakingQuery, result) {
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