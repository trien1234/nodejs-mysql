const moment = require('moment');

const formatDateBeforeSaving = date => {
    return date ? moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
}

const formatDateBeforeServing = date => {
    return date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : null;
}

module.exports = { formatDateBeforeSaving, formatDateBeforeServing };