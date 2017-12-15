var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

//RETRIEVE STATE DROPDOWN INFORMATION ON HOMEPAGE
router.get('/states', function (req, res) {
  pool.connect(function (errorConnecting, db, done) {
    if (errorConnecting) {
      console.log('Error connecting ', errorConnecting);
      res.sendStatus(500);
    } else {
      var queryText = `SELECT "dbo_RPRT_Property"."State" 
      FROM "dbo_RPRT_Property" 
      GROUP BY "dbo_RPRT_Property"."State";`
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

//RETRIEVE MARKET DROPDOWN INFORMATION ON HOMEPAGE
router.get('/markets/:state', function (req, res) {
  let state = req.params.state;
  pool.connect(function (errorConnecting, db, done) {
    if (errorConnecting) {
      console.log('Error connecting ', errorConnecting);
      res.sendStatus(500);
    } else {
      var queryText = `SELECT "dbo_RPRT_Property"."Submarket" 
      FROM "dbo_RPRT_Property" 
      WHERE "dbo_RPRT_Property"."State" = $1
      GROUP BY "dbo_RPRT_Property"."Submarket";`
      db.query(queryText, [state], function (errorMakingQuery, result) {
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

//RETRIEVE ALL DATA
router.get('/all', function (req, res) {
  let state = req.query.state;
  let year = req.query.year;
  let quarter = req.query.quarter;
  let market = req.query.market;
  pool.connect(function (errorConnecting, db, done) {
    if (errorConnecting) {
      console.log('Error connecting ', errorConnecting);
      res.sendStatus(500);
    } else {
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
          AND "dbo_RPRT_Property"."State" = $1 
          AND "dbo_RPRT_Dataset"."Period_Year" = $2
          AND SUBSTRING("dbo_RPRT_Dataset"."Dataset_Label",1,1) = $3 
          AND "dbo_RPRT_Property"."Submarket" = $4
          GROUP BY "dbo_RPRT_Property"."Property_SubType";`
      db.query(queryText, [state, year, quarter, market], function (errorMakingQuery, result) {
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

//Total Direct Absorption line graph
router.get('/absorption', function (req, res) {
  let state = req.query.state;
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
        AND "dbo_RPRT_Property"."State" = $1        
        AND "dbo_RPRT_Property"."Submarket" = $2
        GROUP BY "dbo_RPRT_Property"."Property_SubType", "dbo_RPRT_Dataset"."Dataset_Label", "dbo_RPRT_Dataset"."Period_Year"
        ORDER BY "Time";
        `
      db.query(queryText, [state, market], function (errorMakingQuery, result) {
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

//Vacancy Rate bar chart
router.get('/vacancy', function (req, res) {
  let state = req.query.state;
  let market = req.query.market;
  pool.connect(function (errorConnecting, db, done) {
    if (errorConnecting) {
      console.log('Error connecting ', errorConnecting);
      res.sendStatus(500);
    } else {
      //select owner, pet, breed, color, checkin, and checkout
      var queryText = `SELECT "dbo_RPRT_Property"."Property_SubType" as "Class",
        "dbo_RPRT_Dataset"."Period_Year" || '-' || SUBSTRING("dbo_RPRT_Dataset"."Dataset_Label",1,1) as "Time",
        (SUM("dbo_RPRT_Property"."Squarefeet_Vacant")/SUM("dbo_RPRT_Property"."Building_Size")*100)::numeric(4,2) as "Squarefeet_Vacant"
        FROM "dbo_RPRT_Property"
        JOIN "dbo_RPRT_Dataset"
        ON "dbo_RPRT_Property"."Report_Dataset_ID" = "dbo_RPRT_Dataset"."Report_Dataset_ID"
        WHERE "dbo_RPRT_Dataset"."Period_Type_ID" = 2
        AND "dbo_RPRT_Property"."State" = $1         
        AND "dbo_RPRT_Property"."Submarket" = $2
        GROUP BY "dbo_RPRT_Property"."Property_SubType", "dbo_RPRT_Dataset"."Dataset_Label", "dbo_RPRT_Dataset"."Period_Year"
        ORDER BY "Time";
        `
      db.query(queryText, [state, market], function (errorMakingQuery, result) {
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

router.get('/marketproperties', function (req, res) {
  let state = req.query.state;
  let year = req.query.year;
  let quarter = req.query.quarter;
  let market = req.query.market;
  pool.connect(function (errorConnecting, db, done) {
    if (errorConnecting) {
      console.log('Error connecting ', errorConnecting);
      res.sendStatus(500);
    } else {
      //select owner, pet, breed, color, checkin, and checkout
      var queryText = `SELECT "dbo_RPRT_Property"."Property_SubType" as "Class",
        "dbo_RPRT_Property"."Report_Property_ID" as "Property_Id",
        "dbo_RPRT_Property"."Submarket" as "Submarket",
        ("dbo_RPRT_Property"."Building_Size") as "NRA", 
        ("dbo_RPRT_Property"."Squarefeet_Vacant") as "Vacant_Space", 
        ("dbo_RPRT_Property"."Squarefeet_Sublease") as "Sublease_Space",
        ("dbo_RPRT_Property"."Absorption") as "Absorption",
        "dbo_RPRT_Property"."Rate_Low" as "Low Rate",
        "dbo_RPRT_Property"."Rate_Low" as "High Rate",
        "dbo_RPRT_Property"."Total_Op_Expenses_Taxes" as "OE_T",
        "dbo_RPRT_Property"."X_Coordinate" as "Y",
        "dbo_RPRT_Property"."Y_Coordinate" as "X",
        "dbo_RPRT_Property"."Address_1" as "Address",
        "dbo_RPRT_Property"."State" as "State"
        FROM "dbo_RPRT_Property"
        JOIN "dbo_RPRT_Dataset"
        ON "dbo_RPRT_Property"."Report_Dataset_ID" = "dbo_RPRT_Dataset"."Report_Dataset_ID"
        WHERE "dbo_RPRT_Dataset"."Period_Type_ID" = 2
        AND "dbo_RPRT_Property"."State" = $1 
        AND "dbo_RPRT_Dataset"."Period_Year" = $2
        AND SUBSTRING("dbo_RPRT_Dataset"."Dataset_Label",1,1) = $3 
        AND "dbo_RPRT_Property"."Submarket" = $4;
        `
      db.query(queryText, [state, year, quarter, market], function (errorMakingQuery, result) {
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