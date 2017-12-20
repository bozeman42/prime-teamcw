let pool = require('./pool.js');


function createBatch(dataInfo) {
  return new Promise((resolve, reject) => {
    pool.connect(function (errorConnecting, db, done) {
      if (errorConnecting) {
        reject(errorConnecting);
      } else {
        var queryText = 'INSERT INTO "email_batch" ("file_name","user_id","office_id") VALUES($1,$2,$3) RETURNING "batch_id";';
        db.query(queryText, [
          dataInfo.fileName,
          dataInfo.user.id,
          dataInfo.user.o_id,
        ], function (errorMakingQuery, result) {
          done();
          if (errorMakingQuery) {
            reject(errorMakingQuery);
          } else {
            resolve(result.rows[0].batch_id);
          }
        });
      }
    }); //end of pool
  });
}

module.exports = createBatch;