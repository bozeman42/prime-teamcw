let processLine = (data) => {
    let result = [];
    let variations = [];
    if (data.email !== '') {
        result.push(data);
    } else {
        variations.push(data.first + '.' + data.last + '@' + data.domain);
        variations.push(data.first[0] + data.last + '@' + data.domain);
        variations.push(data.first + '@' + data.domain);
        variations.push(data.last + data.first[0] + '@' + data.domain);
        result = variations.map((email) => {
            data.email = email;
            return Object.assign({},data);
        });
    }
    return result;
};

module.exports = processLine;