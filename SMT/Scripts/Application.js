google.load('visualization', '1', { packages: ['table'] });
google.load('visualization', '1', { packages: ['corechart'] });
google.setOnLoadCallback(drawTables);
var param = GetParameterValues("Tech");
var arrayApplications = [
    ['Title', 'Team', 'LOC', 'TT'],
    ['NSMI', '.NET', 1002, 30],
    ['ESS', '.NET', 5000, 20],
    ['ORP', '.NET', 4000, 12],
    ['Enterprise Dashboard', '.NET', 3000, 35],
    ['YESMON', '.NET', 2340, 13],
    ['E-Bill', 'Java', 1231, 28],
    ['Portal', 'Java', 2322, 25],
    ['Portal', 'PHP', 2323, 39],
    ['VLE', 'PHP', 4455, 31],
];
var arrayMembers = [['Team', 'App', 'Name'],
                    ['.NET', 'Dashboard', 'Mahdi Askari'],
                    ['.NET', 'ESS', 'Mahdi Askari'],
                    ['.NET', 'ORP', 'Mahdi Askari'],
                    ['.NET', 'NSMI', 'Asokan Madasamy'],
                    ['.NET', 'NSMI', 'Balaji Pitchaimani'],
                    ['.NET', 'ESS', 'Reza Abbaspourshirazifard'],
                    ['.NET', 'ORP', 'Mohsen Mohebi'],
                    ['.NET', 'NSMI', 'Suraj'],
                    ['.NET', 'NSMI', 'Bilal Ahmed'],
                    ['.NET', 'Dashboard', 'Reza Rezaie'],
                    ['.NET', 'Dashboard', 'Arman Nasrollahi'],
                    ['.NET', 'Dashboard', 'Wieling'],
                    ['.NET', 'YESMON', 'Asokan Madasamy'],
                    ['Java', 'YCMS', 'Ramesh'],
                    ['Java', 'E-Bill', 'Savitha'],
                    ['PHP', 'VLE', 'Balaji'],
                    ['PHP', 'VLE', 'sjdjk ksjdks'],
];
var arrayDefectTypes = [['Data Issues', 100], ['Browser sessions', 50], ['Environmental issues', 40], ['Performance Issues', 24], ['Others', 10]];
function drawTables() {
    drawAppChart(filterArrayApp(param));
    drawTableMembers(filterArrayMembers(param));
    drawDefectTypes(arrayDefectTypes);
    drawTrobleChart();
}
function drawTrobleChart() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Sev-1', 'Sev-2', 'Sev-3'],      
        ['May-2013', 2000, 3900,1800],
        ['Jun-2013', 2000, 2900, 1340],
        ['Jul-2013', 2000, 5900, 1510],
        ['Aug-2013', 2000, 2900, 1200],
        ['Sep-2013', 2000, 3650, 1330],
        ['Oct-2013', 2000, 1900, 1650],
    ]);

    var options = {
        title: 'Trouble ticket',
        hAxis: { title: 'Year', titleTextStyle: { color: 'red' } }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('tbl_Trouble'));
    chart.draw(data, options);
}
function drawTableMembers(arr) {
    var data = google.visualization.arrayToDataTable(arr);
    var view = new google.visualization.DataView(data);
    view.setColumns([1, 2]);
    memberTable = new google.visualization.Table(document.getElementById('tbl_mem'));
    memberTable.draw(view, { showRowNumber: false });
}
function drawDefectTypes(arr) {
    var data = google.visualization.arrayToDataTable(arr);
    var options = {
        title: 'Applications defect types',
        width: 630,
        height: 320,
        legend: { position: "left" },
    };
    var chart = new google.visualization.PieChart(document.getElementById('table_defect'));
    chart.draw(data, options);
}
function drawAppChart(arr) {
    var data = google.visualization.arrayToDataTable(arr);
    var options = {
        title: 'LOC VS TT Count',
        vAxis: { title: "TT Raised" },
        hAxis: { title: "Application" },
        series: {
            0: { type: "bars", targetAxisIndex: 0, visibleInLegend: "true", color: "Blue" },
            1: { type: "line", targetAxisIndex: 1, visibleInLegend: "true" }
        },
        width: 630,
        height: 320,
        legend: { position: "left" },
    };
    var chart = new google.visualization.ComboChart(document.getElementById('table_app'));
    chart.draw(data, options);
}
function drawAppTable(arr) {
    //================== App Table
    var dataApp = new google.visualization.arrayToDataTable(arr);
    AppTable = new google.visualization.Table(document.getElementById('table_app'));
    AppTable.draw(dataApp, { showRowNumber: true });
    google.visualization.events.addListener(AppTable, 'select', function () {
        var selection = AppTable.getSelection();
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null) {
                var str = dataApp.getFormattedValue(item.row, 0);
                console.log(str);
                // drawAppSumChart(filterAppSumChart(str));
                // drawMembers(filterMembers(dataApp.getFormattedValue(item.row, 1), str));
            }
        }

    });
}
function filterArrayMembers(str) {
    var result = new Array();
    result.push(['Team', 'App', 'Name']);
    for (var i = 0; i < arrayMembers.length; i++) {
        if (arrayMembers[i][0] == str) {
            result.push(arrayMembers[i]);
        }
    }
    return result;
}
function filterArrayApp(str) {
    var result = new Array();
    result.push(['Title', 'LOC', 'TT']);
    for (var i = 0; i < arrayApplications.length; i++) {
        if (arrayApplications[i][1] == str) {
            result.push([arrayApplications[i][0], arrayApplications[i][2], arrayApplications[i][3]]);
        }
    }
    return result;
}
function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
