import * as d3 from "d3";

var appalachiaPromise = d3.csv("data/AppalachiaData.csv");
var appalachiaPromise2 = d3.csv("data/AppalachiaDataLandArea.csv");
var appalachiaPromise3 = d3.csv("data/AppalachiaDataOpPresc.csv");
var appalachiaPromise4 = d3.csv("data/AppalachiaDataOpPois.csv");
var hold2;
var promises = [
  appalachiaPromise,
  appalachiaPromise2,
  appalachiaPromise3,
  appalachiaPromise4
];

var successFCN = function (data) {
  console.log("Data collected", data);
  var target = "#graph1";
  var target2 = "#graph2";
  var target3 = "#graph3";
  var target4 = "#graph4";
  var target5 = "#graph5";
  var target6 = "#graph6";
  var target7 = "#graph7";
  var target8 = "#graph8";
  var target9 = "#graph9";
  var target10 = "#graph10";

  initGraphs(
    data[0],
    target,
    getCollege,
    0,
    "College Completion in Appalachia by Area",
    1
  );
  initGraphs(
    data[0],
    target2,
    getUR,
    1,
    "Unemployment in Appalachia by Area",
    1
  );
  initGraphs(
    data[0],
    target3,
    getPR,
    2,
    "Poverty Rate in Appalachia by Area",
    1
  );
  initGraphs(
    data[3],
    target10,
    getPoisoning,
    3,
    "Poisoning Mortality Rates per 100^2 People",
    1
  );
  initGraphsScatter(
    data[1],
    target4,
    0,
    getCollege,
    "College Completion vs Percent State Appalachia",
    "Percent",
    "CC, Percent of US Avg",
    2,
    1
  );
  initGraphsScatter(
    data[1],
    target5,
    1,
    getPR,
    "Poverty Rate vs Percent State Appalachia",
    "Percent",
    "PR, Percent of US Avg",
    2,
    1
  );
  initGraphsScatter(
    data[1],
    target6,
    2,
    getUR,
    "Unemployment Rate vs Percent State Appalachia",
    "Percent",
    "UR, Percent of US Avg",
    2,
    1
  );

  initGraphsScatter(
    data[2],
    target7,
    0,
    getCollege,
    "CC vs Opiod Presc per 100^2 people",
    "Number of Opiods",
    "CC, Percent of US Avg",
    2,
    2
  );

  initGraphsScatter(
    data[2],
    target8,
    1,
    getPR,
    "PR vs Opiod Presc per 100^2 people",
    "Number of Opiods",
    "PR, Percent of US Avg",
    2,
    2
  );

  initGraphsScatter(
    data[2],
    target9,
    2,
    getUR,
    "UR vs Opiod Presc per 100^2 people",
    "Number of Opiods",
    "UR, Percent of US Avg",
    2,
    2
  );

  var FirstDiv = d3.selectAll("#graph1 rect");
  var SecondDiv = d3.selectAll("#graph2 rect");
  var ThirdDiv = d3.selectAll("#graph3 rect");
  var FourthDiv = d3.selectAll("#graph4 circle");
  var FifthDiv = d3.selectAll("#graph5 circle");
  var SixthDiv = d3.selectAll("#graph6 circle");
  var SeventhDiv = d3.selectAll("#graph7 circle");
  var EigthDiv = d3.selectAll("#graph8 circle");
  var NinthDiv = d3.selectAll("#graph9 circle");
  var TenthDiv = d3.selectAll("#graph10 rect");
  var Button = d3.select("#button");
  var Button2 = d3.select("#button2");
  onMouseOver(FirstDiv, 1);
  onMouseOver(SecondDiv, 2);
  onMouseOver(ThirdDiv, 3);
  onMouseOver(FourthDiv, 4);
  onMouseOver(FifthDiv, 5);
  onMouseOver(SixthDiv, 6);
  onMouseOver(SeventhDiv, 7);
  onMouseOver(EigthDiv, 8);
  onMouseOver(NinthDiv, 9);
  onMouseOver(TenthDiv, 10);
  Button.on("click", function (eventData, area) {
    d3.select("#graph1").classed("hidden", true);
    d3.select("#graph2").classed("hidden", true);
    d3.select("#graph3").classed("hidden", true);
    d3.select("#graph4").classed("hidden", true);
    d3.select("#graph5").classed("hidden", true);
    d3.select("#graph6").classed("hidden", true);
    d3.select("#graph7").classed("hidden", false);
    d3.select("#graph8").classed("hidden", false);
    d3.select("#graph9").classed("hidden", false);
    d3.select("#graph10").classed("hidden", false);
    d3.select("#firstscatter").classed("hidden", true);
    d3.select("#button2").classed("hidden", false);
    d3.select("#intro p").text(
      "My hypothesis is that these trends are the result of opiod abuse, which disproportionately affects Appalachia, as seen below. Also seen below is a correlation between prescribed opiods and issues such as a lack of college completion and poverty rates."
    );
  });

  Button2.on("click", function (eventData, area) {
    d3.select("#graph1").classed("hidden", false);
    d3.select("#graph2").classed("hidden", false);
    d3.select("#graph3").classed("hidden", false);
    d3.select("#graph4").classed("hidden", false);
    d3.select("#graph5").classed("hidden", false);
    d3.select("#graph6").classed("hidden", false);
    d3.select("#graph7").classed("hidden", true);
    d3.select("#graph8").classed("hidden", true);
    d3.select("#graph9").classed("hidden", true);
    d3.select("#graph10").classed("hidden", true);
    d3.select("#firstscatter").classed("hidden", false);
    d3.select("#button2").classed("hidden", true);
    d3.select("#intro p").text(
      "Appalachia is historically troubled in many socioeconomic areas. This remains true today. Pictured below are statistics on college completion,unemployment, and poverty rates in Appalachia by state and as a whole."
    );
  });
};
var failFCN = function (errorMsg) {
  console.log("Something went wrong", errorMsg);
};
//appalachiaPromise.then(successFCN, failFCN);

Promise.all(promises).then(successFCN, failFCN);

var onMouseOver = function (graph, num) {
  graph
    .on("mouseover", function (eventData, area) {
      var target = d3.select("#tooltip1");
      console.log("Here");
      var xPosition = eventData.pageX + 20;
      var yPosition = eventData.pageY - 20;

      target
        .classed("hidden", false)
        .classed("detail", true)
        .style("left", xPosition + "px")
        .style("top", yPosition + "px");
      var hold;

      hold2 = String(area.State);
      if (hold2 == "West Virginia") {
        hold2 = "We";
      } else if (hold2 == "South Carolina") {
        hold2 = "So";
      } else if (hold2 == "North Carolina") {
        hold2 = "No";
      } else if (hold2 == "New York") {
        hold2 = "Ne";
      }
      console.log(hold2);
      if (num == 1) {
        hold = area.CollegeComp;
      } else if (num == 2) {
        hold = area.UnemployRate;
      } else if (num == 3) {
        hold = area.PovertyRate;
      } else if (num == 4) {
        hold = area.CollegeComp;
      } else if (num == 5) {
        hold = area.PovertyRate;
      } else if (num == 6) {
        hold = area.UnemployRate;
      } else if (num == 7) {
        hold = area.CollegeComp;
      } else if (num == 8) {
        hold = area.PovertyRate;
      } else if (num == 9) {
        hold = area.UnemployRate;
      } else if (num == 10) {
        hold = area.Poisoning;
      }
      d3.selectAll(".".concat(hold2)).attr("fill", "red");
      target.select(".amount").text(hold);
      target.select(".area").text(area.State);
    })
    .on("mouseleave", function (eventData, character) {
      var target = d3.select(".detail");
      target.classed("hidden", true).classed("detail", false);
      d3.selectAll(".".concat(hold2)).attr("fill", "blue");
    });
};

var getCollege = function (subject) {
  var college = Number(subject.CollegeComp.replace(",", ""));
  college = Number(subject.CollegeComp.replace("%", ""));
  return college;
};

var getLandArea = function (subject) {
  var area = Number(subject.PercentApp);
  return area;
};

var getPR = function (subject) {
  var pr = Number(subject.PovertyRate.replace(",", ""));
  pr = Number(subject.PovertyRate.replace("%", ""));
  return pr;
};

var getUR = function (subject) {
  var ur = Number(subject.UnemployRate.replace(",", ""));
  ur = Number(subject.UnemployRate.replace("%", ""));
  return ur;
};

var getPoisoning = function (subject) {
  return subject.Poisoning;
};

var getPresc = function (subject) {
  return subject.OpiodPresc;
};

//title,xTitle,yTitle are strings for the labels for the graph, x and y axis
var createLabels = function (
  screen,
  margins,
  graph,
  target,
  title,
  xtitle,
  ytitle
) {
  var labels = d3.select(target).append("g").classed("labels", true);

  labels
    .append("text")
    .text(title)
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2 - 25)
    .attr("y", margins.top / 2);

  labels
    .append("text")
    .text(xtitle)
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", screen.height - 10);

  labels
    .append("g")
    .attr("transform", "translate(20," + (margins.top + graph.height / 2) + ")")
    .append("text")
    .text(ytitle)
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)");
};

var drawbarcharts = function (
  data,
  graph,
  target,
  ageScale,
  childScale,
  barLabelScale,
  mapFxn,
  colorScale
) {
  var rects = d3
    .select(target)
    .select(".graph")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (area) {
      return ageScale(area.Area);
    })
    .attr("width", function (area) {
      return ageScale.bandwidth();
    })
    .attr("y", function (area) {
      return childScale(mapFxn(area));
    })
    .attr("height", function (area) {
      return graph.height - childScale(mapFxn(area));
    })
    .attr("fill", function (area) {
      return colorScale(mapFxn(area));
    });

  d3.select(target)
    .select(".graph")
    .selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", "0")
    .attr("y1", function (area) {
      if (area.Area == "US") {
        return childScale(mapFxn(area));
      }
    })
    .attr("x2", function (area) {
      if (area.Area == "US") {
        return graph.width;
      }
    })
    .attr("y2", function (area) {
      if (area.Area == "US") {
        return childScale(mapFxn(area));
      }
    })
    .attr("stroke", "black");

  var barLabels = d3
    .select(target)
    .select(".graph")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function (person) {
      return barLabelScale(person.age);
    })
    .attr("y", function (person) {
      return childScale(100 - person.childless) - 5;
    })
    .text(function (person) {
      return person.age;
    })
    .attr("text-anchor", "middle");
};

var createAxes = function (
  screen,
  margins,
  graph,
  target,
  xScale,
  yScale,
  choice
) {
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale).ticks(6);

  var axes = d3.select(target).append("g").classed("axes", true);
  var xGroup = axes
    .append("g")
    .attr(
      "transform",
      "translate(" + margins.left + "," + (margins.top + graph.height) + ")"
    )
    .call(xAxis)
    .classed("xaxis", true);

  axes
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .call(yAxis)
    .classed("yaxis", true);

  if (choice == 1) {
    xGroup
      .selectAll("text")
      .attr("text-anchor", "start")
      .attr("transform", "translate(5,0) rotate(35)");
  } else {
  }
};

/*
childless is an array of age categories and the percentage of women childless 
target is a string selector to indicate which svg to put things into

*/
var initGraphs = function (
  appdata,
  target,
  mapFxn,
  scaleChoice,
  title,
  choice
) {
  //the size of the screen
  var screen = { width: 400, height: 200 };

  //how much space will be on each side of the graph
  var margins = { top: 40, bottom: 70, left: 90, right: 40 };

  //generated how much space the graph will take up
  var graph = {
    width: screen.width - margins.left - margins.right,
    height: screen.height - margins.top - margins.bottom
  };

  //set the screen size
  d3.select(target).attr("width", screen.width).attr("height", screen.height);

  //create a group for the graph
  var g = d3
    .select(target)
    .append("g")
    .classed("graph", true)
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  //Need to create scales here
  var areas = appdata.map(function (area) {
    return area.Area;
  });
  var areaScale = d3
    .scaleBand()
    .domain(areas)
    .range([0, graph.width])
    .padding(0.1);

  var barLabelScale = d3
    .scalePoint()
    .domain(areas)
    .range([0, graph.width])
    .padding(0.5);

  if (scaleChoice != 3) {
    var collegeCompletions = appdata.map(getCollege);
    var maxCC = d3.max(collegeCompletions);

    var unemploymentRates = appdata.map(getUR);
    var maxUR = d3.max(unemploymentRates);

    var povertyRates = appdata.map(getPR);
    var maxPR = d3.max(povertyRates);

    var ccScale = d3.scaleLinear().domain([0, maxCC]).range([graph.height, 0]);
    var urScale = d3.scaleLinear().domain([0, maxUR]).range([graph.height, 0]);
    var prScale = d3.scaleLinear().domain([0, maxPR]).range([graph.height, 0]);

    var collegeScale = d3
      .scaleDiverging()
      .domain([
        d3.min(collegeCompletions),
        d3.median(collegeCompletions),
        d3.max(collegeCompletions)
      ])
      .interpolator(d3.interpolate("black", "blue"));

    var povScale = d3
      .scaleDiverging()
      .domain([
        d3.min(povertyRates),
        d3.median(povertyRates),
        d3.max(povertyRates)
      ])
      .interpolator(d3.interpolate("blue", "black"));

    var unemployScale = d3
      .scaleDiverging()
      .domain([
        d3.min(unemploymentRates),
        d3.median(unemploymentRates),
        d3.max(unemploymentRates)
      ])
      .interpolator(d3.interpolate("blue", "black"));
  }

  var poisScale = d3.scaleLinear().domain([0, 20.4]).range([graph.height, 0]);

  var poisScaleColor = d3
    .scaleDiverging()
    .domain([14.4, 17.4, 20.4])
    .interpolator(d3.interpolate("blue", "black"));

  var scales = [ccScale, urScale, prScale, poisScale];
  var colorScales = [collegeScale, povScale, unemployScale, poisScaleColor];

  //while these function are already written the parameters might not be properly set
  //be sure to read what they want and provide it in the parameters.
  if (scaleChoice == 3) {
    createLabels(
      screen,
      margins,
      graph,
      target,
      title,
      "Area",
      "Number of Deaths"
    );
  } else {
    createLabels(
      screen,
      margins,
      graph,
      target,
      title,
      "Area",
      "Percent of US Average"
    );
  }
  createAxes(
    screen,
    margins,
    graph,
    target,
    areaScale,
    scales[scaleChoice],
    choice
  );
  drawbarcharts(
    appdata,
    graph,
    target,
    areaScale,
    scales[scaleChoice],
    barLabelScale,
    mapFxn,
    colorScales[scaleChoice]
  );
};

var initGraphsScatter = function (
  appdata,
  target,
  scaleChoice,
  fxn,
  title,
  xLabel,
  yLabel,
  choice,
  choice2
) {
  //the size of the screen
  var screen = { width: 450, height: 200 };

  //how much space will be on each side of the graph
  var margins = { top: 35, bottom: 70, left: 90, right: 10 };

  //generated how much space the graph will take up
  var graph = {
    width: screen.width - margins.left - margins.right,
    height: screen.height - margins.top - margins.bottom
  };

  var g = d3
    .select(target)
    .append("g")
    .classed("graph", true)
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  var landAreas = appdata.map(getLandArea);
  var maxLandArea = d3.max(landAreas);
  var minLandArea = d3.min(landAreas);
  console.log(landAreas);

  var OpPrescs = appdata.map(getPresc);
  var maxPrescs = d3.max(OpPrescs);
  var minPrescs = d3.min(OpPrescs);

  var landScale = d3
    .scaleLinear()
    .domain([0, maxLandArea])
    .range([0, graph.width]);

  var prescScale = d3
    .scaleLinear()
    .domain([minPrescs, maxPrescs])
    .range([0, graph.width]);

  var collegeCompletions = appdata.map(getCollege);
  var maxCC = d3.max(collegeCompletions);

  var unemploymentRates = appdata.map(getUR);
  var maxUR = d3.max(unemploymentRates);

  var povertyRates = appdata.map(getPR);
  var maxPR = d3.max(povertyRates);

  var ccScale = d3.scaleLinear().domain([0, maxCC]).range([graph.height, 0]);
  var urScale = d3.scaleLinear().domain([0, maxUR]).range([graph.height, 0]);
  var prScale = d3.scaleLinear().domain([0, maxPR]).range([graph.height, 0]);

  var scales = [ccScale, urScale, prScale];

  if (choice2 == 2) {
    createAxes(
      screen,
      margins,
      graph,
      target,
      prescScale,
      scales[scaleChoice],
      choice
    );
  } else {
    createAxes(
      screen,
      margins,
      graph,
      target,
      landScale,
      scales[scaleChoice],
      choice
    );
  }

  createLabels(screen, margins, graph, target, title, xLabel, yLabel);

  if (choice2 == 2) {
    d3.select(target)
      .select(".graph")
      .selectAll("circle")
      .data(appdata)
      .enter()
      .append("circle")
      .attr("cx", function (area) {
        return prescScale(getPresc(area));
      })
      .attr("cy", function (area) {
        return scales[scaleChoice](fxn(area));
      })
      .attr("r", "5")
      .attr("fill", "blue")
      .attr("class", function (area) {
        if (area.State == "West Virginia") {
          return "We";
        } else if (area.State == "South Carolina") {
          return "So";
        } else if (area.State == "North Carolina") {
          return "No";
        } else if (area.State == "New York") {
          return "Ne";
        } else {
          return area.State;
        }
      });
  } else {
    d3.select(target)
      .select(".graph")
      .selectAll("circle")
      .data(appdata)
      .enter()
      .append("circle")
      .attr("cx", function (area) {
        return landScale(getLandArea(area));
      })
      .attr("cy", function (area) {
        return scales[scaleChoice](fxn(area));
      })
      .attr("r", "5")
      .attr("fill", "blue")
      .attr("class", function (area) {
        if (area.State == "West Virginia") {
          return "We";
        } else if (area.State == "South Carolina") {
          return "So";
        } else if (area.State == "North Carolina") {
          return "No";
        } else if (area.State == "New York") {
          return "Ne";
        } else {
          return area.State;
        }
      });
  }
};
