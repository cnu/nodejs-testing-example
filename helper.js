function getOffset(currentPage = 1, listPerPage=10) {
    return (parseInt(currentPage) - 1) * [parseInt(listPerPage)];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}