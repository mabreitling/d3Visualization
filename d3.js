var left = d3.select("#left")
    .append("svg")
    .attr("width", 800)
    .attr("height", 800);

var upperRight = d3.select("#upperRight")
    .append("svg")
    .attr("width", 500)
    .attr("height", 400)


upperRight.append("text")
    .attr("x", (0))             
    .attr("y", 50)
    .attr("text-anchor", "left")  
    .style("font-size", "30px") 
    .style("font-family", "sans-serif")
    .style("fill", "#dbbf83")
    .text("Region: ")
    .attr( "visibility", "hidden")
    .attr("id", "TitleUpperRight");

var lowerRight = d3.select("#lowerRight")
    .append("xhtml:body");
		

var chosenProjection = d3.geoMercator()
  .scale(3200)
  .translate([-1550, 50])

var pathG = left.append("g"),
    //pumpsG = left.append("g"),
    pumpsGFunc = left.append("g"),
    pumpsGRep = left.append("g"),
    pumpsGNonFunc = left.append("g");
    

var path = d3.geoPath()
    .projection(chosenProjection);

d3.json("regions.geojson", function(data) {
        pathG.selectAll("path").data(data.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function() { return "#233337" })
        .attr("stroke", "white")
        //.attr( "visibility", "hidden")
        .attr("stroke-width", "2")
        .on("mouseover", mouseover)
        .on("mouseout", function(e){d3.select(this).style("fill", "#233337")})
        .on("click", click)
        
      });

left.append("text")
    .attr("x", (100))             
    .attr("y", 50)
    .attr("text-anchor", "left")  
    .text("Pump it Up: Water Pumps in Tanzania")
     .style("font-size", "30px") 
    .style("fill", "#dbbf83")
    .style("font-family", "sans-serif");

left.append("text")
    .attr("x", 100)             
    .attr("y", 700)
    .attr("text-anchor", "left")  
    .attr("id", "leftSubtitle")
    .text("")
    .style("fill", "#984B43")
    .style("font-size", "25px") 
    .style("font-family", "sans-serif");


function nameFn(d){
  return d && d.properties ? d.properties.Region_Nam : null;
}


function mouseover(d){
  // Highlight hovered province
  d3.select(this).style("fill", "#984B43")
  // Draw effects
  d3.select("#left").select("#leftSubtitle")
   .text(nameFn(d));
}


function click(d){
    clickedRegion(nameFn(d));
    // Highlight hovered province
    d3.selectAll("path").style("fill", "#233337");
    d3.select(this).style("fill", "#dbbf83");
    // Draw effects
    d3.select("#upperRight").select("#TitleUpperRight")
        .attr("visibility", "visible")
        .text("Region: "+ nameFn(d));
    
    d3.json('regionsInfo.json', function (error,data) {

        function tabulate(data, columns) {
            d3.select('#infoTable').remove();
            var InfoTable = d3.select('#lowerRight').append('table')
            .attr("id", "infoTable")
            var thead = InfoTable.append('thead')
            var	tbody = InfoTable.append('tbody');

            // append the header row
            thead.append('tr')
            .selectAll('th')
            .data(columns).enter()
            .append('th')
            .text(function (column) { return column; });
            
            // create a row for each object in the data 
            var rows = tbody.selectAll('tr')
            .data(data.filter(function(jsonInfo){return jsonInfo.Region == nameFn(d);}))
            .enter()
            .append('tr');

            // create a cell in each row for each column
            var cells = rows.selectAll('td')
            .data(function (row) {
            return columns.map(function (column) {
              return {column: column, value: row[column]};
            });
            })
            .enter()
            .append('td')
            .text(function (d) { return d.value; });

            return InfoTable;
        }

// render the table(s)
tabulate(data, ['Region', 'Capital', 'Population', 'Area']); // 2 column table
});
}


d3.csv("trainDataPreRed.csv", function(error, data) {pumpsGFunc.selectAll("circle")
    .data(data.filter(function(d){return d.status_group == 'functional';})).enter().append("circle").attr("cx", function(d) {
    return chosenProjection([d.longitude, d.latitude])[0]; })
    .attr("cy", function(d) {return chosenProjection([d.longitude, d.latitude])[1]; })
    .attr("r", 2) .style("fill", "green")
    .attr("visibility", "hidden");                                   
});

d3.csv("trainDataPreRed.csv", function(error, data) {pumpsGRep.selectAll("circle")
    .data(data.filter(function(d){return d.status_group == 'functional needs repair';})).enter().append("circle").attr("cx", function(d) {
    return chosenProjection([d.longitude, d.latitude])[0]; })
    .attr("cy", function(d) {return chosenProjection([d.longitude, d.latitude])[1]; })
    .attr("r", 2) .style("fill", "orange")
    .attr("visibility", "hidden");                                   
});

d3.csv("trainDataPreRed.csv", function(error, data) {pumpsGNonFunc.selectAll("circle")
    .data(data.filter(function(d){return d.status_group == 'non functional';})).enter().append("circle").attr("cx", function(d) {
    return chosenProjection([d.longitude, d.latitude])[0]; })
    .attr("cy", function(d) {return chosenProjection([d.longitude, d.latitude])[1]; })
    .attr("r", 2) .style("fill", "red")
    .attr("visibility", "hidden");                                   
});


function handleClick(cb) {
  if (cb.checked == false && cb.id == 'checkBoxFunctional') {
      pumpsGFunc.selectAll("circle").style("visibility", "hidden")
  }
if (cb.checked == true && cb.id == 'checkBoxFunctional') {
      pumpsGFunc.selectAll("circle").style("visibility", "visible")
  } 
if (cb.checked == false && cb.id == 'checkBoxRepair') {
      pumpsGRep.selectAll("circle").style("visibility", "hidden")
  }
if (cb.checked == true && cb.id == 'checkBoxRepair') {
      pumpsGRep.selectAll("circle").style("visibility", "visible")
  } 
if (cb.checked == false && cb.id == 'checkBoxNonFunctional') {
      pumpsGNonFunc.selectAll("circle").style("visibility", "hidden")
  }
if (cb.checked == true && cb.id == 'checkBoxNonFunctional') {
      pumpsGNonFunc.selectAll("circle").style("visibility", "visible")
  } 
}



// Set the margins
var margin = {top: 80, right: 40, bottom: 50, left: 60},
  width = 500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
var y = d3.scaleLinear().range([height, 0]);


// Create the svg canvas in the "graph" div
var svg = upperRight.append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "barchart")
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");

// Import the CSV data

var clickedRegion = function(clickedRegion){
    d3.select('#barchart').remove();
    
    // Set the margins
var margin = {top: 80, right: 40, bottom: 50, left: 60},
  width = 500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
var y = d3.scaleLinear().range([height, 0]);


// Create the svg canvas in the "graph" div
var svg = upperRight.append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "barchart")
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");

// Import the CSV data
    
    d3.csv("trainDataPreRed.csv", function(error, data) {
      if (error) throw error;
      data = data.filter(function(row) {
            return row['region'] == clickedRegion;
        })

       // Format the data
      data.forEach(function(d) {
          d.region = d.region;
          d.status_group = d.status_group;
      });

        var nest = d3.nest()
          //.key(function(d){return d.region;})
          .key(function(d){return d.status_group;})
          .sortKeys(d3.ascending)
          .rollup(function(leaves) { return leaves.length;})
          .entries(data);
        console.log(nest);

      // Scale the range of the data
      x.domain(nest.map(function(d) { return d.key; }));
      y.domain([0, d3.max(nest, function(d) { return d.value; })]);

      // Set up the x axis
      var xaxis = svg.append("g")
           .attr("transform", "translate(0," + height + ")")
           .attr("class", "x axis")
           .call(d3.axisBottom(x)
              //.ticks(d3.timeMonth)
              .tickSize(0, 0)
              //.tickFormat(d3.timeFormat("%B"))
              .tickSizeInner(0)
              .tickPadding(10));

      // Add the Y Axis
       var yaxis = svg.append("g")
           .attr("class", "y axis")
           .call(d3.axisLeft(y)
              .ticks(5)
              .tickSizeInner(0)
              .tickPadding(6)
              .tickSize(0, 0));

     // yaxis.select(".domain").style("display","none")

      // Add a label to the y axis
      svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 60)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
             .style("font-family", "sans-serif")
            .text("Number of Pumps")
            .attr("class", "y axis label");

      // Draw the bars
      svg.selectAll(".rect")
          .data(nest)
          .enter()
          .append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.key); })
              .attr("y", function(d) { return y(d.value); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return height - y(d.value); });

})};




