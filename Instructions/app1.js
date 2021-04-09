
function dropdownmenu() {
  d3.json("samples.json").then(function (data) {
    // console.log(data.names);
    var selData = d3.select('#selDataset');
    var dataNames = data.names;
    dataNames.forEach((x) => {
      selData.append('option').text(x).property('value', x);
    })
    charts(dataNames[0]);
    metatable(dataNames[0]);

  })
}
function charts(newid) {
  // 1. Use the D3 library to read in `samples.json`.
  d3.json("samples.json").then(function (data) {
    console.log(data.samples);

    filterdata = data.samples.filter(x => x.id === newid)
    var sample_values =filterdata[0].sample_values;
    var otu_ids = filterdata[0].otu_ids;
    var otu_labels = filterdata[0].otu_labels;
    // var top_ten = filterdata[0].slice(0, 10).reverse();

    // // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    // // * Use `sample_values` as the values for the bar chart.

    // // * Use `otu_ids` as the labels for the bar chart.

    // // * Use `otu_labels` as the hovertext for the chart.

    var trace1 = {
      x: otu_ids.slice(0, 10).reverse(),
      y: sample_values.slice(0, 10).reverse(),
      type: "bar"
    };

    var data1 = [trace1];

    var layout1 = {
      title: "Top 10 OTUs Found",
      xaxis: { title: "OTU" },
      yaxis: { title: "OTU Sample Values" }
    };

    Plotly.newPlot("bar", data1, layout1);

    // 3. Create a bubble chart that displays each sample.

    // * Use `otu_ids` for the x values.

    // * Use `sample_values` for the y values.

    // * Use `sample_values` for the marker size.

    // * Use `otu_ids` for the marker colors.

    // * Use `otu_labels` for the text values.

    var trace2 = {
      x: otu_ids,
      y: sample_values,
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };

    var data2 = [trace2];

    var layout2 = {
      title: 'Bubble Chart',
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "OTU Sample Values" }
    };

    Plotly.newPlot("bubble", data2, layout2);
  });


}
function metatable(newid) {
  d3.json("samples.json").then(function (data) {
    console.log(data.metadata);
    // 4. Display the sample metadata, i.e., an individual's demographic information.
    // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
    var samplemeta = d3.select('#sample-metadata')
    samplemeta.html('')
    var filterdata = data.metadata.filter(x => x.id == newid)
    // console.log(filterdata);
    Object.entries(filterdata[0]).forEach(([key, value]) => {
      var row = samplemeta.append('tr')
      row.append('td').html(key)
      row.append('td').html(value)
    })
  })
}


function optionChanged(newid) {
  charts(newid)
  metatable(newid)
}
dropdownmenu()





// ###################################

// ###################################



// ## Deployment

// * Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.

// * Ensure your repository has regular commits (i.e. 20+ commits) and a thorough README.md file




// ## Hints

// * Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

// * Refer to the [Plotly.js documentation](https://plot.ly/javascript/) when building the plots.