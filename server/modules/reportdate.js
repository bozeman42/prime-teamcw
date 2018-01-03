//Global time variables

function calcReportDate() {
    let reportDate = {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1,
        quarter: ''
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