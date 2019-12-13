const reducer = (accumulator, currentValue) => accumulator + currentValue;

am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4charts.PieChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
const summary={'fritware': 1169,
    'other/unspecified': 75,
    'terracotta': 139,
    'ceramic': 1606,
    'pottery': 1580,
    'earthenware': 3255,
    'stoneware': 155,
    'clay': 232,
    'porcelain': 1319};
const colors={'fritware':  am4core.color("#6374bf"),
    'other/unspecified': am4core.color("#c4abb0"),
    'terracotta': am4core.color("#d98248"),
    'ceramic': am4core.color("#fae6cf"),
    'pottery': am4core.color("#a3b39d"),
    'earthenware': am4core.color("#c98e79"),
    'stoneware': am4core.color("#D9D0C8"),
    'clay': am4core.color("#ccb21f"),
    'porcelain': am4core.color("#abbfe0")}
let data=[]
for (let [key, value] of Object.entries(summary)) {
    data.push({
        type:key,
        value:value,
        color:colors[key]})
}

chart.data = data
chart.radius = am4core.percent(70);
chart.innerRadius = am4core.percent(80);
chart.startAngle = 160;
chart.endAngle = 450;

var series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "value";
series.dataFields.category = "type";

series.slices.template.cornerRadius = 20;
series.slices.template.innerCornerRadius = 20;
series.slices.template.draggable = true;
series.slices.template.inert = true;

series.hiddenState.properties.startAngle = 90;
series.hiddenState.properties.endAngle = 90;
series.slices.template.propertyFields.fill = "color";

series.slices.template.stroke = am4core.color("#ffffff");
series.slices.template.strokeWidth = 5;
series.slices.template.strokeOpacity = 0;
series.labels.template.disabled = true;
series.ticks.template.disabled = true;

// series.tooltip.background.filters.clear();
// series.tooltip.background.cornerRadius = 20;
// series.tooltip.background.strokeOpacity = 0;
// series.tooltip.pointerOrientation = "horizontal";
// series.tooltip.propertyFields.dx="offset";

let info = chart.plotContainer.createChild(am4core.Container);
info.width = 80;
info.height = 60;
info.x = 10;
info.y = 10;
info.padding(10, 10, 10, 10);
// info.background.fill = am4core.color("#000");
// info.background.fillOpacity = 0.1;
// info.layout = "grid";
let label = info.createChild(am4core.Label);
label.text = "Total" + String(Object.values(summary).reduce(reducer));

chart.legend = new am4charts.Legend();
