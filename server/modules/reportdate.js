//Global time variables

function calcReportDate() {

    // This is a hacky fix for this not working when you don't have current
    // data. How I would fix this if I were to continue work on this project
    // is to find the most current reports and default to that, rather than
    // depending on data arriving in time for the application not to break.
    const hackyDateFix = new Date('December 10, 2017');

    let reportDate = {
        year: hackyDateFix.getFullYear(),
        month: hackyDateFix.getMonth() + 1,
        quarter: null
    }

    if (reportDate.month === 1 || reportDate.month === 2 || reportDate.month === 3) {
        reportDate.year -= 1;
    }

    if (reportDate.month < 4) {
        reportDate.quarter = 4
    } else if (reportDate.month > 3 && reportDate.month < 7) {
        reportDate.quarter = 1
    } else if (reportDate.month > 6 && reportDate.month < 10) {
        reportDate.quarter = 2
    } else if (reportDate.month > 9) {
        reportDate.quarter = 3
    }


    return reportDate;
}

module.exports = calcReportDate;