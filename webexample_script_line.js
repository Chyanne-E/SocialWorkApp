$(document).ready(function() {

  var TITLE = 'Hartford School District is No Longer the Largest in Connecticut'; //text title

  // Which column names contain data points?
  var X_LABELS = ['2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19']; //these are all column names
  //Dates

  // Which column name contains names (labels) for each series?
  var NAMES = 'district'; //the column from data that populates line LABELS (legend) (AssessmentSW)

  // Optionally, which column contains color names for the series?
  // If not specified, will apply default color scheme
  //var COLORS = 'color'; //style choice

  var X_AXIS = 'Academic Year';  // text label for x-axis label and label in tooltip (Dates)
  var Y_AXIS = 'Number of students'; // text label y-axis label and label in tooltip (caseload)

  var SHOW_GRID = true; // `true` to show the grid, `false` to hide
  var SHOW_LEGEND = true; // `true` to show the legend, `false` to hide

  // Read data file and create a chart
  d3.csv('data.csv').then(function(rows) {

    var datasets = rows.map(function(row) {

      var dataset = {
        label: row[NAMES],
        fill: false,
        data: X_LABELS.map(function(t) { return row[t] })
      }

      if (row[COLORS]) {
        dataset.backgroundColor = row[COLORS];
        dataset.borderColor = row[COLORS];
        dataset.pointBackgroundColor = row[COLORS];
        dataset.pointBorderColor = row[COLORS];
      }

      return dataset;

    });

		var lineChartData = {
      labels: X_LABELS,
			datasets: datasets
    };

    var ctx = document.getElementById('container').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: lineChartData,

      options: {
        title: {
          display: true,
          text: TITLE,
          fontSize: 14,
        },
        legend: {
          display: SHOW_LEGEND,
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: X_AXIS !== '',
              labelString: X_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              callback: function(value, index, values) {
                return value.toLocaleString();
              }
            }
          }],
          yAxes: [{
            beginAtZero: true,
            scaleLabel: {
              display: Y_AXIS !== '',
              labelString: Y_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              callback: function(value, index, values) {
                return value.toLocaleString()
              }
            }
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function(tooltipItem, all) {
              return all.datasets[tooltipItem.datasetIndex].label
                + ': ' + tooltipItem.yLabel.toLocaleString();
            }
          }
        },
        plugins: {
          colorschemes: {
            scheme: 'brewer.Paired12'
          }
        }
      }
    });

  });

});
