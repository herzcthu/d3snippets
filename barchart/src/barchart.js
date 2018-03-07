require('./bootstrap');

!function () {
    // create empty object
    var D3BarChart = {};

    // create draw function
    // selector = css selector
    // data = json object
    D3BarChart.draw = function (selector, data) {
        var svg = d3.select(selector),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            // get width from placeholder element
            width = +svg.attr("width") - margin.left - margin.right,
            // get height from placeholder element
            height = +svg.attr("height") - margin.top - margin.bottom;

        // create x,y coordinate plain
        var x = d3.scaleBand().range([0, width]).padding(0.1),
            y = d3.scaleLinear().range([height, 0]),
            y1 = d3.scaleLinear().range([height, 0]);

        // add new svg element
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function (d) {
            return d.label;
        }));

        var value1 = y.domain([0, d3.max(data, function (d) {
            return d.value1;
        })]);

        var value2 = y1.domain([0, d3.max(data, function (d) {
            return d.value2;
        })]);


        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(20)
                .tickFormat(function (d) {
                    formatValue = d3.format(".2s");
                    return formatValue(d).replace('G', 'B');
                }))

            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Amount");
        // g.selectAll(".axis--x").selectAll(".tick")
        //     .attr("transform", "translate(" + x(d.label) + width + ",0)");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.label) + x.bandwidth() / 4;
            })
            .attr("y", function (d) {
                return y(d.value1);
            })
            .attr("width", x.bandwidth() / 4)
            .attr("height", function (d) {
                return height - y(d.value1);
            })
            .style("fill", "#31708f");
        // .style("fill", function (d) {
        //     return d.color
        // });
        g.selectAll(".bar2")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) {
                return x(d.label) + x.bandwidth() / 2;
            })
            .attr("y", function (d) {
                return y1(d.value2);
            })
            .attr("width", x.bandwidth() / 4)
            .attr("height", function (d) {
                return height - y1(d.value2);
            })
            .style("fill", "#a94442");
        // .style("fill", function (d) {
        //     return d.color1
        // });
    }
    this.D3BarChart = D3BarChart;
}();
