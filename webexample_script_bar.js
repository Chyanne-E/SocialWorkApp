//original sample from web: https://datavizforall.github.io/chartjs-templates/
$(document).ready(function() {

  var HORIZONTAL = false;   // `false` for vertical (column) chart, `true` for horizontal bar
  var STACKED = false;  // `false` for individual bars, `true` for stacked bars

  var TITLE = 'English Learners by Select School Districts in Connecticut, 2018-19'; //text title

  var LABELS = 'district';  // Column from dataset that will populate x-axis tick labels (team members)

  var SERIES = [  // For each column representing a series, define its name and color
    {
      column: 'nonlearner',
      name: 'Non-Learners',
      color: 'grey'
    },
    {
      column: 'learner', //won't reeplicate this, not pairing bars in chart
      name: 'Learners',
      color: 'blue'
    }
  ];

  var X_AXIS = 'School Districts';  // Text label for x-axis and label in tooltip
  var Y_AXIS = 'Number of Enrolled Students'; // Text label for y-axis and label in tooltip

  var SHOW_GRID = true; // style choice: `true` to show the grid, `false` to hide
  var SHOW_LEGEND = true; // style choice: `true` to show the legend, `false` to hide

  // Read data file and create a chart
  d3.csv('https://raw.githubusercontent.com/DataVizForAll/chartjs-templates/master/bar-chart/data.csv').then(function(rows) {

    var datasets = SERIES.map(function(el) { //what is el? arbitrary?
      return {
        label: el.name,
        labelDirty: el.column,
        backgroundColor: el.color,
        data: []
      }
    });

    rows.map(function(row) { //function to be performed in d3 on GitHub link dataset
      datasets.map(function(d) {
        d.data.push(row[d.labelDirty])
      })
    });

		var barChartData = {
      labels: rows.map(function(el) { return el[LABELS] }), //LABELS is important- refers back to var LABELS (team members)
			datasets: datasets //data after row function
    };

    var ctx = document.getElementById('container').getContext('2d');

    new Chart(ctx, {
      type: HORIZONTAL ? 'horizontalBar' : 'bar',
      data: barChartData,

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
            stacked: STACKED,
            scaleLabel: {
              display: X_AXIS !== '',
              labelString: X_AXIS
            },
            gridLines: {
              display: SHOW_GRID, //style choice
            },
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return value.toLocaleString();
              }
            }
          }],
          yAxes: [{
            stacked: STACKED,
            beginAtZero: true,
            scaleLabel: {
              display: Y_AXIS !== '',
              labelString: Y_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              beginAtZero: true,
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
        }
      }
    });

  });

});
