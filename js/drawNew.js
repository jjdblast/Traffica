// var svg = dimple.newSvg("#chartOne", 1200, 450);
//     d3.csv("/data/timespent.csv", function (data) {
//        console.log(data);
//       //data = dimple.filterData(data, "UserID", "Total_Time");
//       // dimple.filterData
//       var myChart = new dimple.chart(svg, data);
//       myChart.setBounds(60, 30, 1000, 350);
//       //myChart.addCategoryAxis("x", "UserID");
//       myChart.addMeasureAxis("p", "Total_Time");
//       var ring = myChart.addSeries("UserID", dimple.plot.pie);
//       ring.innerRadius = "50%";
//       myChart.addLegend(60, 10, 500, 20, "right");
//       myChart.draw();
//     });



function init() {
  //Create and open the socket
  ws = new WebSocket("ws://localhost:6437/");
  
  // On successful connection
  ws.onopen = function(event) {
    document.getElementById("main").style.visibility = "visible";
    document.getElementById("connection").innerHTML = "WebSocket connection open!";
  };
  
  // On message received
  ws.onmessage = function(event) {
    var obj = JSON.parse(event.data);
    var str = JSON.stringify(obj.hands, undefined, 2);
    if(obj.hands !== undefined){
     if(obj.hands[0].palmPosition !== undefined){
      p = obj.hands[0].palmPosition;
      var xpos = 300+4*parseInt(p[0]), ypos = 800-4*parseInt(p[1]), zpos = 10+parseInt(p[2]);
      d3.select("#pointer").attr("cx", xpos).attr("cy", ypos)
     }
    }
  };
  
  // On socket close
  ws.onclose = function(event) {
    ws = null;
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("connection").innerHTML = "WebSocket connection closed";
  }
  
  //On socket error
  ws.onerror = function(event) {
    alert("Received error");
  };
}
// var svg =  d3.select("#viz").append("svg");
// svg.attr("width", 600)
//         .attr('height', 400).style("border", "1px solid black");
// svg.append("circle").style("fill", "red").attr("r", 20).attr("cx", 300).attr("cy", 300).attr("id", "pointer");



var svg = dimple.newSvg("#chartOne", 1200, 450);
   svg.append("circle").style("fill", "red").attr("r", 10).attr("cx", 300).attr("cy", 300).attr("id", "pointer");
    d3.csv("/data/timespent.csv", function (data) {
       //console.log(data);
        init();
      //data = dimple.filterData(data, "UserID", "Total_Time");
      // dimple.filterData
      var myChart = new dimple.chart(svg, data);
      myChart.setBounds(60, 30, 1000, 350);
      myChart.addCategoryAxis("x", "UserID");
      myChart.addMeasureAxis("y", "Total_Time");
      myChart.addSeries(null, dimple.plot.line);
      myChart.addLegend(60, 10, 500, 20, "right");
      myChart.draw();
    });