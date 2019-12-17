am4core.useTheme(am4themes_animated);

let allData = Object.values(allCountries);
console.log(allData.length);

let allCharts = document.getElementById("all-charts");
console.log(allCharts);
// for (let m=1; m++; m<6){
//     console.log(m)
// }
allData.map(each=>{
    console.log(each.country);
    let chartContainer = document.createElement("div");
    chartContainer.setAttribute("id",`chartdiv-${each.country}`);
    chartContainer.setAttribute("class","each-chart");
    // let countryName = document.createElement("span");
    // countryName.setAttribute("class","country-name");
    // countryName.innerHTML=each.country;
    // let countrySum = document.createElement("span");
    // countrySum.setAttribute("class","country-sum");
    // countrySum.innerHTML=each.total;
    // chartContainer.appendChild(countryName);
    // chartContainer.appendChild(countrySum);
    allCharts.appendChild(chartContainer);
    let chart = am4core.create(`chartdiv-${each.country}`, am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    let data = [];
    for (let [key, value] of Object.entries(each.types)) {
        data.push({
            type: key,
            value: value,
            color: colors[key]
        });
    }
    console.log(data);
    chart.data = data;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(80);
    chart.startAngle = 160;
    chart.endAngle = 450;

    let series = chart.series.push(new am4charts.PieSeries());
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

    series.tooltip.background.filters.clear();
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "horizontal";
    series.tooltip.propertyFields.dx = "offset";

    series.zIndex=0;

    let info = chart.chartContainer.createChild(am4core.Container);
    info.width = 100;
    info.height = 100;
    info.x = 0;
    info.y = 0;
    info.paddingLeft=-25;
    info.paddingTop=65;
    // info.background.fill = am4core.color("#000");
    // info.background.fillOpacity = 0.1;
    info.layout = "vertical";
    info.zIndex = 5;
    let countryName = info.createChild(am4core.Label);
    let countrySum = info.createChild(am4core.Label);
    countryName.fontSize=8;
    countryName.text = each.country;
    countrySum.text = each.total;
    countryName.align = "center";
    countrySum.align = "center";
    countryName.valigm = "middle";
    countrySum.valign = "middle";

    // let coverBlock = document.createElement("div");
    // coverBlock.setAttribute("class","cover");
    // chartContainer.appendChild(coverBlock);
});

let legends = document.getElementById("legends");
const allColors = Object.entries(colors);
allColors.map(color=>{
    let colorLegend = document.createElement("div");
    colorLegend.setAttribute("class","legend");
    colorLegend.style.backgroundColor=color[1];
    let legendText = document.createElement("span");
    legendText.setAttribute("class", "legend-text");
    legendText.innerHTML=color[0];
    legends.appendChild(colorLegend);
    legends.appendChild(legendText);
})
