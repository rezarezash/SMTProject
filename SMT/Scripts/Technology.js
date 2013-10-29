var map;
google.load('visualization', '1', { packages: ['table'] });
google.load('visualization', '1', { packages: ['corechart'] });
google.setOnLoadCallback(drawTables);

function drawTables() {
    drawJavaTechnology();
    drawNETechnology();
    drawPHPechnology();
}
function drawPHPechnology() {
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
        window.location = "Application.html?Tech=PHP";
    });
}
function drawJavaTechnology() {
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
}
function drawNETechnology() {
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
        window.location = "Application.html?Tech=.NET";
    });
}