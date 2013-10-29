var map;
google.load('visualization', '1', { packages: ['table'] });
google.load('visualization', '1', { packages: ['corechart'] });

google.setOnLoadCallback(drawTables);
var teamTable;
var AppTable;
var memberTable;
var memberTable;

var arrayTeams = [
    ['Title', 'Members', 'Applications'],
    ['.NET', 10, 4],
    ['Java', 15, 3],
    ['PHP', 20, 5],
    ['Testing', 15, 15]
];
var arrayApplications = [
    ['Title', 'Team', 'Members'],
    ['NSMI', '.NET', 3],
    ['ESS', '.NET', 2],
    ['YESMON', '.NET', 1],
    ['E-Bill', 'Java', 2],
    ['YCMS', 'PHP', 3],
    ['ORP', '.NET', 2],
    ['Dashboard', '.NET', 3]

];

var arrayAppSummary = [
    ['App', 'LOC', 'TT', 'Bug'],
    ['NSMI', 1440, 7, 1],
    ['ESS', 1300, 9, 10],
    ['YESMON', 1672, 8, 15],
    ['E-Bill', 1900, 10, 12],
    ['YCMS', 1560, 9, 7]
];
var arrayMembers = [['Team', 'App', 'Name'],
                    ['.NET', 'Dashboard', 'Mahdi Askari'],
                    ['.NET', 'ESS', 'Mahdi Askari'],
                    ['.NET', 'ORP', 'Mahdi Askari'],
                    ['.NET', 'NSMI', 'Asokan Madasamy'],
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
];
function drawTables() {
    drawTeamTable(arrayTeams);
    drawAppTable(arrayApplications);
    drawAppSumChart(arrayAppSummary);
    drawMembers(arrayMembers);
}
function drawMembers(arr) {
    var data = google.visualization.arrayToDataTable(arr);
    var view = new google.visualization.DataView(data);
    view.setColumns([1,2]);
    memberTable = new google.visualization.Table(document.getElementById('tbl_members'));
    memberTable.draw(view, { showRowNumber: false });
}
function drawAppSumChart(arr) {
    var data = google.visualization.arrayToDataTable(arr);
    var options = {
        title: 'Application Summary',
        vAxis: { title: 'Application', titleTextStyle: { color: 'red' } }
    };

    var chart = new google.visualization.BarChart(document.getElementById('table_div_App_summary'));
    chart.draw(data, options);
}
function drawTeamTable(arr) {
    //================== Team Table
    var dataTeam = new google.visualization.arrayToDataTable(arr);
    teamTable = new google.visualization.Table(document.getElementById('table_div'));
    teamTable.draw(dataTeam, { showRowNumber: true });

    google.visualization.events.addListener(teamTable, 'select', function () {
        var selection = teamTable.getSelection();
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null) {
                var str = dataTeam.getFormattedValue(item.row, 0);
                $("#drpteam").val(str);
                drawAppTable(filterArrayApp(str));
                drawMembers(filterMembers(str, ""));
            }
        }
    });
}
function filterArrayApp(str) {
    var result = new Array();
    result.push(['Title', 'Team', 'Members']);
    for (var i = 0; i < arrayApplications.length; i++) {
        if (arrayApplications[i][1] == str)
            result.push(arrayApplications[i]);
    }
    return result;
}
function filterAppSumChart(str) {
    var result = new Array();
    result.push(['App', 'LOC', 'TT', 'Bug']);
    for (var i = 0; i < arrayAppSummary.length; i++) {
        if (arrayAppSummary[i][0] == str)
            result.push(arrayAppSummary[i]);
    }
    return result;
}
function filterMembers(team, app) {
    var result = new Array();    
    result.push(['Team', 'App', 'Name']);
    for (var i = 0; i < arrayMembers.length; i++) {
        if (team != "" && app=="") {
            if (arrayMembers[i][0] == team)
                result.push(arrayMembers[i]);
        } else if (team == "" && app != "") {
            if (arrayMembers[i][1] == app)
                result.push(arrayMembers[i]);
        } else if(team != "" && app!="") {
            if (arrayMembers[i][0] == team && arrayMembers[i][1] == app)
                result.push(arrayMembers[i]);
        }
    }
    return result;
}
function drawAppTable(arr) {
    //================== App Table
    var dataApp = new google.visualization.arrayToDataTable(arr);
    AppTable = new google.visualization.Table(document.getElementById('table_div_App'));
    AppTable.draw(dataApp, { showRowNumber: true });
    google.visualization.events.addListener(AppTable, 'select', function () {
        var selection = AppTable.getSelection();
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null) {
                var str = dataApp.getFormattedValue(item.row, 0);
                drawAppSumChart(filterAppSumChart(str));
                drawMembers(filterMembers( dataApp.getFormattedValue(item.row, 1),str));
            }
        }

    });
}
function TeamChanged(vl) {
    if (vl == 'All') {
        drawAppTable(arrayApplications);
        drawAppSumChart(arrayAppSummary);
        drawMembers(arrayMembers);
    } else
        drawAppTable(filterArrayApp(vl));
}
