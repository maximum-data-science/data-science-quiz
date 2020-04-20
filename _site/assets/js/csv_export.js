$(document).ready(function() {
    divideCards();
    insertNumPointsLabels();
    insertCardLabels();
    var html = getCardsCsv();
    initCsvExportElements(html);
});
