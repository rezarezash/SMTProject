google.load('visualization', '1', { packages: ['table'] });
google.load('visualization', '1', { packages: ['corechart'] });

angular.module('project', []).config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', { controller: TechCtrl, templateUrl: '/Views/Technology.html' }).
      when('/App', { controller: ApplicationCtrl, templateUrl: '/Views/Application.html' }).
      when('/Ticket', { controller: TicketCtrl, templateUrl: '/Views/Ticket.html' }).
      otherwise({ redirectTo: '/' });
});

function AppCtrl($scope) {
    $scope.data = "SMT";
};
function TicketCtrl($scope) {
};
function ApplicationCtrl($scope) {
    $scope.AppName = ".NET";
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
    $scope.drawTables = function () {
        $scope.drawAppChart($scope.filterArrayApp(".NET"));
        $scope.drawDefectTypes(arrayDefectTypes);
        $scope.drawTrobleChart();
        $scope.drawTableMembers($scope.filterArrayMembers(".NET"));
    };

    $scope.drawTrobleChart = function () {
        var data = google.visualization.arrayToDataTable([
            ['Month', 'Sev-1', 'Sev-2', 'Sev-3'],
            ['May-2013', 2000, 3900, 1800],
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
    };
    $scope.drawTableMembers = function (arr) {
        var data = google.visualization.arrayToDataTable(arr);
        var view = new google.visualization.DataView(data);
        view.setColumns([1, 2]);
        memberTable = new google.visualization.Table(document.getElementById('tbl_mem'));
        memberTable.draw(view, { showRowNumber: false });
    };
    $scope.drawDefectTypes = function (arr) {
        var data = google.visualization.arrayToDataTable(arr);
        var options = {
            title: 'Applications defect types',
            width: 630,
            height: 320,
            legend: { position: "left" },
        };
        var chart = new google.visualization.PieChart(document.getElementById('table_defect'));
        chart.draw(data, options);
    };
    $scope.drawAppChart = function (arr) {
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
    };
    $scope.filterArrayMembers = function (str) {
        var result = new Array();
        result.push(['Team', 'App', 'Name']);
        for (var i = 0; i < arrayMembers.length; i++) {
            if (arrayMembers[i][0] == str) {
                result.push(arrayMembers[i]);
            }
        }
        return result;
    }
    $scope.filterArrayApp = function (str) {
        var result = new Array();
        result.push(['Title', 'LOC', 'TT']);
        for (var i = 0; i < arrayApplications.length; i++) {
            if (arrayApplications[i][1] == str) {
                result.push([arrayApplications[i][0], arrayApplications[i][2], arrayApplications[i][3]]);
            }
        }
        return result;
    }
    $scope.drawTables();
};
function TechCtrl($scope, $location, $rootScope) {
    $scope.drawTables = function () {
        $scope.drawNETechnology();
        $scope.drawJavaTechnology();
        $scope.drawPHPechnology();
    };
    $scope.drawPHPechnology = function () {
        var data = google.visualization.arrayToDataTable([
          ['Month', 'LOC', 'TT'],
          ['May-2013', 12000, 100],
          ['Jun-2013', 13400, 10],
          ['Jul-2013', 15600, 17],
          ['Aug-2013', 18093, 23],
          ['Sep-2013', 20000, 33],
          ['Oct-2013', 23100, 30],
        ]);

        var options = {
            title: 'LOC VS TT Count',
            vAxis: { title: "TT Raised" },
            hAxis: { title: "Month" },
            series: {
                0: { type: "bars", targetAxisIndex: 0, visibleInLegend: "true", color: "Blue" },
                1: { type: "line", targetAxisIndex: 1, visibleInLegend: "true" }
            },
            width: 630,
            height: 220,
            legend: { position: "left" },
        };
        var chart = new google.visualization.ComboChart(document.getElementById('table_div_php'));
        chart.draw(data, options);
        google.visualization.events.addListener(chart, 'select', function () {
            window.location = "/Views/Application.html?Tech=PHP";
        });
    };
    $scope.drawJavaTechnology = function () {
        var data = google.visualization.arrayToDataTable([
            ['Month', 'LOC', 'TT'],
            ['May-2013', 34000, 200],
            ['Jun-2013', 34300, 15],
            ['Jul-2013', 39500, 25],
            ['Aug-2013', 42550, 77],
            ['Sep-2013', 47000, 13],
            ['Oct-2013', 55000, 13],
        ]);

        var options = {
            title: 'LOC VS TT Count',
            vAxis: { title: "TT Raised" },
            hAxis: { title: "Month" },
            series: {
                0: { type: "bars", targetAxisIndex: 0, visibleInLegend: "true", color: "Blue" },
                1: { type: "line", targetAxisIndex: 1, visibleInLegend: "true" }
            },
            width: 630,
            height: 220,
            legend: { position: "left" },
        };
        var chart = new google.visualization.ComboChart(document.getElementById('table_div_java'));
        chart.draw(data, options);
        google.visualization.events.addListener(chart, 'select', function () {
            window.location = "Application.html?Tech=Java";
        });
    };
    $scope.drawNETechnology = function () {
        var data = google.visualization.arrayToDataTable([
          ['Month', 'LOC', 'TT'],
          ['May-2013', 33000, 20],
          ['Jun-2013', 34000, 15],
          ['Jul-2013', 45000, 16],
          ['Aug-2013', 45550, 90],
          ['Sep-2013', 46000, 43],
          ['Oct-2013', 47000, 22],
        ]);
        var options = {
            title: 'LOC VS TT Count',
            vAxis: { title: "TT Raised" },
            hAxis: { title: "Month" },
            series: {
                0: { type: "bars", targetAxisIndex: 0, visibleInLegend: "true", color: "Blue" },
                1: { type: "line", targetAxisIndex: 1, visibleInLegend: "true" }
            },
            width: 630,
            height: 220,
            legend: { position: "left" },
        };
        var chart = new google.visualization.ComboChart(document.getElementById('table_div_net'));
        chart.draw(data, options);
        google.visualization.events.addListener(chart, 'select', function () {
            $location.path('/App');
            $rootScope.$apply();
        });
    };
    $scope.drawTables();
};

function TroubleCtrl($scope) {
};

