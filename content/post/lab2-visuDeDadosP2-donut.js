document.write("<!DOCTYPE html>
<meta charset="utf-8">
<style>
    .arc text {
        font: 10px sans-serif;
        text-anchor: middle;
    }

    .arc path {
        stroke: #fff;
    }

    polyline {
        opacity: .3;
        stroke: black;
        stroke-width: 2px;
        fill: none;
    }

</style>

<body>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script>
        var path = 'https://raw.githubusercontent.com/gabrielmla/portfolio/master/dados/lab2-parte4/';
        var dados_total_categoria = path + 'total.categoria.csv';
        
        /*var color = d3.scale.ordinal()
            .domain(json_fields(dados_total_categoria))
            .range(["#8f0d0d", "#b52626", "#f57373", "#ffa3a3", "#d34747", "#5db43d", "#80d163", "#a9e592", "#306d84", "#4c849a", "#7cabbd"]);*/

        var width = 640,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#8f0d0d", "#b52626", "#f57373", "#ffa3a3", "#d34747", "#5db43d", "#80d163", "#a9e592", "#306d84", "#4c849a", "#7cabbd"]);

        var arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);

        var outerArc = d3.svg.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.total;
            });

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");

        d3.csv(dados_total_categoria, type, function(error, data) {
            if (error) throw error;

            var key = function(d) {
                return d.data.categoria;
            };

            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color(d.data.categoria);
                });
            
            g.append("svg:title")
                .text(function(d) {
                    return d.data.total;
                })

            var text = svg.select(".labels").selectAll("text")
                .data(pie(data), key);

            text.enter()
                .append("text")
                .attr("dy", ".35em")
                .text(function(d) {
                    return d.data.categoria;
                });

            function midAngle(d) {
                return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }

            text.transition().duration(1000)
                .attrTween("transform", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                        return "translate(" + pos + ")";
                    };
                })
                .styleTween("text-anchor", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        var d2 = interpolate(t);
                        return midAngle(d2) < Math.PI ? "start" : "end";
                    };
                });

            text.exit()
                .remove();

            /* ------- SLICE TO TEXT POLYLINES -------*/

            var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(data), key);

            polyline.enter()
                .append("polyline");

            polyline.transition().duration(1000)
                .attrTween("points", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                        return [arc.centroid(d2), outerArc.centroid(d2), pos];
                    };
                });

            polyline.exit()
                .remove();

        });

        function type(d) {
            d.total = +d.total;
            return d;
        }

        function json_fields(json) {
            var fields = [];
            for (field in json) {
                if (json.hasOwnProperty(field)) {
                    fields.push(field);
                }
            };
            return fields;
        }

    </script>
</body>");