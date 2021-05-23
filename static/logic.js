// logic.js for Project 2:Inflation Research Tool for Economists

var column_types = ['Main','Change','Pct_Change']
var dropdown1 = d3.select('#selDataset1');
var dropdown2 = d3.select('#selDataset2');
var dropdown3 = d3.select('#selDataset3');
var dropdown4 = d3.select('#selDataset4');
var dropdown5 = d3.select('#selDataset5');
var dropdown6 = d3.select('#selDataset6');
var dropdown7 = d3.select('#selDataset7');
var dropdown8 = d3.select('#selDataset8');
var dropdown9 = d3.select('#selDataset9');
var dropdown10 = d3.select('#selDataset10');
var dropdown11 = d3.select('#selDataset11');
dropdown1.on("change",renderApexLine);
dropdown2.on("change",renderApexLine);
dropdown3.on("change",renderApexLine);
dropdown4.on("change",renderApexLine);
dropdown5.on("change",renderApexLine);
dropdown6.on("change",plotScatter);
dropdown7.on("change",plotScatter);
dropdown8.on("change",plotScatter);
dropdown9.on("change",plotScatter);
dropdown10.on("change",plotScatter);
dropdown11.on("change",plotScatter);
var sum_table1=d3.select("#sumstats-table-1");
var sum_table2=d3.select("#sumstats-table-2");
var selection_table=d3.select("#selection-table-body");

function init() {    
    d3.json("../static/column_index.json").then((data)=> {
        var index_dict=data;
        //populate dropdowns using json
        Object.entries(index_dict).forEach(([key,value]) => {
            dropdown1.append('option').text(key).property('value',key)
            dropdown2.append('option').text(key).property('value',key)
            dropdown3.append('option').text(key).property('value',key)
            dropdown4.append('option').text(key).property('value',key)
            dropdown5.append('option').text(key).property('value',key)
            dropdown6.append('option').text(key).property('value',key)
            dropdown7.append('option').text(key).property('value',key)
            });
        var temp1 = "1";
        var selDataset1 = document.getElementById('selDataset1');
        for(var i, j=0; i=selDataset1.options[j]; j++) {if(i.value==temp1){selDataset1.selectedIndex=j;}};
        var temp2 = "4";
        var selDataset2 = document.getElementById('selDataset2');
        for(var i, j=0; i=selDataset2.options[j]; j++) {if(i.value==temp2){selDataset2.selectedIndex=j;}};
        var temp3 = "2";
        var selDataset3 = document.getElementById('selDataset3');
        for(var i, j=0; i=selDataset3.options[j]; j++) {if(i.value==temp3){selDataset3.selectedIndex=j;}};
        var temp4 = "5";
        var selDataset4 = document.getElementById('selDataset4');
        for(var i, j=0; i=selDataset4.options[j]; j++) {if(i.value==temp4){selDataset4.selectedIndex=j;}};
        var temp5 = "12";
        var selDataset5 = document.getElementById('selDataset5');
        for(var i, j=0; i=selDataset5.options[j]; j++) {if(i.value==temp5){selDataset5.selectedIndex=j;}};
        var temp6 = "96";
        var selDataset6 = document.getElementById('selDataset6');
        for(var i, j=0; i=selDataset6.options[j]; j++) {if(i.value==temp6){selDataset6.selectedIndex=j;}};
        var temp7 = "98";
        var selDataset7 = document.getElementById('selDataset7');
        for(var i, j=0; i=selDataset7.options[j]; j++) {if(i.value==temp7){selDataset7.selectedIndex=j;}};
        var temp8 = "Change";
        var selDataset8 = document.getElementById('selDataset8');
        for(var i, j=0; i=selDataset8.options[j]; j++) {if(i.value==temp8){selDataset8.selectedIndex=j;}else {selDataset8.selectedIndex=temp8}};
        var temp9 = "Change";
        var selDataset9 = document.getElementById('selDataset1');
        for(var i, j=0; i=selDataset9.options[j]; j++) {if(i.value==temp9){selDataset9.selectedIndex=j;}else {selDataset9.selectedIndex=temp9}};
        column_types.forEach((column_type) => {
            dropdown8.append('option').text(column_type).property('value',column_type)
            dropdown9.append('option').text(column_type).property('value',column_type)});
        var index_table_body=d3.select("#index-table");
        //populate index table using csv
        d3.csv("../static/index.csv").then(each_series => {
        Object.entries(each_series).forEach(([key, value]) => {
            var index_row=index_table_body.append('tr');
            Object.entries(value).forEach(([keys,values]) => {
            index_row.append('td').text(values)})});
        chart.render();
        scatter.render();
        renderApexLine();
        plotScatter();
        Plotly.newPlot("gauge", gauge_trace, gauge_layout);
            })})};

init();


// DECLARE OPTIONS FOR LINE CHART
var options = {
    series: [
    ],
    chart: {
    type: 'area',
    stacked: false,
    height: 700,
    width: 1050,
    zoom: {
    type: 'x',
    enabled: true,
    autoScaleYaxis: true
    },
    toolbar: {
    autoSelected: 'zoom'
    },
    events: {
        zoomed: function(chartContext, {xaxis, yaxis}) {
            var zoomed_x_min=new Date(xaxis['min']);
            var zoomed_x_max=new Date(xaxis['max']);
            var min_month = zoomed_x_min.getMonth();
            var min_day = zoomed_x_min.getDate();
            var min_year = zoomed_x_min.getFullYear();
            var zoomed_x_min_date = (min_month+1) + "-" + min_day + "-" + min_year;
            var max_month = zoomed_x_max.getMonth();
            var max_day = zoomed_x_max.getDate();
            var max_year = zoomed_x_max.getFullYear();
            var zoomed_x_max_date = (max_month+1) + "-" + max_day + "-" + max_year;
            var zoomed_x_max_date_quotes = "'" + zoomed_x_max_date + "'";
            var zoomed_x_min_date_quotes = "'" + zoomed_x_min_date + "'";
            sum_table1.text("");
            sum_table2.text("");
            zoomSumChartUpdate(zoomed_x_min_date_quotes, zoomed_x_max_date_quotes);
        },
        beforeResetZoom: function(chartContext, opts) {
            renderApexLine()
        },
        scrolled: function(chartContext, {xaxis}) {
            var zoomed_x_min=new Date(xaxis['min']);
            var zoomed_x_max=new Date(xaxis['max']);
            var min_month = zoomed_x_min.getMonth();
            var min_day = zoomed_x_min.getDate();
            var min_year = zoomed_x_min.getFullYear();
            var zoomed_x_min_date = (min_month+1) + "-" + min_day + "-" + min_year;
            var max_month = zoomed_x_max.getMonth();
            var max_day = zoomed_x_max.getDate();
            var max_year = zoomed_x_max.getFullYear();
            var zoomed_x_max_date = (max_month+1) + "-" + max_day + "-" + max_year;
            var zoomed_x_max_date_quotes = "'" + zoomed_x_max_date + "'";
            var zoomed_x_min_date_quotes = "'" + zoomed_x_min_date + "'";
            sum_table1.text("");
            sum_table2.text("");
            zoomSumChartUpdate(zoomed_x_min_date_quotes, zoomed_x_max_date_quotes);
        }
    },
},

dataLabels: {
    enabled: false
},
markers: {
    size: 0,
},
title: {
    text: '',
    align: 'left'
},
fill: {
    type: 'gradient',
    gradient: {
    shadeIntensity: 0,
    inverseColors: false,
    opacityFrom: 0,
    opacityTo: 0,
    stops: [0, 90, 100]
    },
},
yaxis: [{
    labels: {
    formatter: function (val) {
        return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        },
    },
},
{
    title: {
        text: ' '
    },
    },
    {
    opposite: true,
    title: {
        text:' '
    },
    }],
// }],
xaxis: {
    type: 'datetime',
},
grid: {
    show: true,
    position:'back',
    row: {
        colors: ['darkgray', 'lightgray'], 
        opacity: 0.9,
        },
    },
tooltip: {
    shared: true,
    fillSeriesColor: true,
    theme: 'dark',
    x: {
        format: 'MMM d, yyyy'
    }

},
// responsive: [
//     {
//       breakpoint: 1000,
//       options:{}
//     }]
};


//CREATE AN INSTANCE OF THE LINE CHART
var chart = new ApexCharts(document.querySelector("#area-datetime"), options);


//POPULATE THE LINE CHART & SUMMARY STATS, AND HANDLE CHANGES
function renderApexLine() {
    sum_table1.text("");
    sum_table2.text("");
    selection_table.text("");
    var chosen_series1=dropdown1.property('value');
    var chosen_series2=dropdown2.property('value');
    var chosen_series3=dropdown3.property('value');
    var chosen_series4=dropdown4.property('value');
    var chosen_series5=dropdown5.property('value');
    var xyz = 0
    d3.json("../static/column_index.json").then((indexed_columns)=> {
        var index_dict2=indexed_columns;
        var chosen_column1=index_dict2[chosen_series1];
        var chosen_column2=index_dict2[chosen_series2];
        var chosen_column3=index_dict2[chosen_series3];
        var chosen_column4=index_dict2[chosen_series4];
        var chosen_column5=index_dict2[chosen_series5];
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table1=table_dict[chosen_column1];
            var chosen_table2=table_dict[chosen_column2];
            var chosen_table3=table_dict[chosen_column3];
            var chosen_table4=table_dict[chosen_column4];
            var chosen_table5=table_dict[chosen_column5];
            d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
                var no_xy1 = return_dict['no_xy'];
                var stats1a = return_dict['stats'];
                var stats1b = return_dict['stats2'];
                d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
                    var no_xy2 = return_dict['no_xy'];
                    var stats2a = return_dict['stats'];
                    var stats2b = return_dict['stats2'];
                    d3.json(`http://127.0.0.1:5000/api/${chosen_table3}/${chosen_column3}`).then((return_dict)=>{
                        var no_xy3 = return_dict['no_xy'];
                        var stats3a = return_dict['stats'];
                        var stats3b = return_dict['stats2'];
                        d3.json(`http://127.0.0.1:5000/api/${chosen_table4}/${chosen_column4}`).then((return_dict)=>{
                            var no_xy4 = return_dict['no_xy'];
                            var stats4a = return_dict['stats'];
                            var stats4b = return_dict['stats2'];
                            d3.json(`http://127.0.0.1:5000/api/${chosen_table5}/${chosen_column5}`).then((return_dict)=>{
                                var no_xy5 = return_dict['no_xy'];
                                var stats5a = return_dict['stats'];
                                var stats5b = return_dict['stats2'];
                                chart.updateSeries([{
                                    name: `${chosen_column1}`,
                                    data: no_xy1,
                                },{
                                    name: `${chosen_column2}`,
                                    data: no_xy2,
                                },{
                                    name: `${chosen_column3}`,
                                    data: no_xy3,
                                },{
                                    name: `${chosen_column4}`,
                                    data: no_xy4,
                                },{
                                    name: `${chosen_column5}`,
                                    data: no_xy5,
                                }]);
                                // POPULATE SUMMARY TABLES HERE #############################################################
                                var sum1_row=sum_table1.append('tr')
                                var sum2_row=sum_table1.append('tr')
                                var sum3_row=sum_table1.append('tr')
                                var sum4_row=sum_table1.append('tr')
                                var sum5_row=sum_table1.append('tr')
                                var sum6_row=sum_table2.append('tr')
                                var sum7_row=sum_table2.append('tr')
                                var sum8_row=sum_table2.append('tr')
                                var sum9_row=sum_table2.append('tr')
                                var sum0_row=sum_table2.append('tr')
                                stats1a.forEach((value) => {
                                    sum1_row.append('td').text(value)});
                                stats2a.forEach((value) => {
                                    sum2_row.append('td').text(value)});
                                stats3a.forEach((value) => {
                                    sum3_row.append('td').text(value)});
                                stats4a.forEach((value) => {
                                    sum4_row.append('td').text(value)});
                                stats5a.forEach((value) => {
                                    sum5_row.append('td').text(value)});
                                stats1b.forEach((value) => {
                                    sum6_row.append('td').text(value)});
                                stats2b.forEach((value) => {
                                    sum7_row.append('td').text(value)});
                                stats3b.forEach((value) => {
                                    sum8_row.append('td').text(value)});
                                stats4b.forEach((value) => {
                                    sum9_row.append('td').text(value)});
                                stats5b.forEach((value) => {
                                    sum0_row.append('td').text(value)});
                                d3.csv("../static/index.csv").then((each_series) => {
                                Object.entries(each_series).forEach(([key, value]) => {
                                    if (key==chosen_series1-1) {
                                        var selection1_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection1_row.append('td').text(values)})};
                                    if (key==chosen_series2-1) {
                                        var selection2_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection2_row.append('td').text(values)})};
                                    if (key==chosen_series3-1) {
                                        var selection3_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection3_row.append('td').text(values)})};
                                    if (key==chosen_series4-1) {
                                        var selection4_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection4_row.append('td').text(values)})};
                                    if (key==chosen_series5-1) {
                                        var selection5_row=selection_table.append('tr');
                                        Object.entries(value).forEach(([keys,values]) => {
                                        selection5_row.append('td').text(values)})};
                                })});
                            });
                        });
                    });
                });
            });
        });
    });
};


//DECLARE OPTIONS FOR GAUGE
var corr_coef=.75;
var gauge_trace = [{
        domain: {x:[0,1],y:[0,1]},
        value: corr_coef,
        type:"indicator",
        textposition: "inside",
        mode: "gauge+number",
        //delta:{reference:10},
        gauge:{
            axis:{range:[0,1]},
            steps: [{range:[0,.25], color:"maroon"},
                    {range:[.25,.5], color:"orange"},
                    {range:[.5,.75], color:"yellow"},
                    {range:[.75,1], color:"green"}
                    ],
            bar:{color:"fuchsia"}
        }
    }];
var gauge_layout = {width: 650, height: 430, margin:{t:0,b:0},paper_bgcolor:"darkgray"};


//DECLARE OPTIONS FOR SCATTER PLOT
var scatter_options = {
     series: [//{
    //     name: `${chosen_column1}`,
    //     data: no_xy
    //     },
    //     {
    //     name: `${chosen_column2}`,
    //     data: no_xy2,
    //     },
    ],
    chart: {
    height: 600,
    width: 1000,
    type: 'scatter',
    zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
    },
    animations: {
        enabled: true,
        speed: 200,
        animateGradually: {
            enabled: false,
            delay: 0
        },
        dynamicAnimation: {
            enabled: true,
            speed: 200,
        },
    },
    background: 'darkgray',
    grid: {
        row: {
            colors: ['darkgray', 'lightgray'], 
            opacity: 0.9
        },
        },
    toolbar: {
        offsetY: -30,
        },
    events: {
        zoomed: function(chartContext, {xaxis, yaxis}) {
            var zoomed_x_min=new Date(xaxis['min']);
            var zoomed_x_max=new Date(xaxis['max']);
            var min_month = zoomed_x_min.getMonth();
            var min_day = zoomed_x_min.getDate();
            var min_year = zoomed_x_min.getFullYear();
            var zoomed_x_min_date = (min_month+1) + "-" + min_day + "-" + min_year;
            var max_month = zoomed_x_max.getMonth();
            var max_day = zoomed_x_max.getDate();
            var max_year = zoomed_x_max.getFullYear();
            var zoomed_x_max_date = (max_month+1) + "-" + max_day + "-" + max_year;
            var zoomed_x_max_date_quotes = "'" + zoomed_x_max_date + "'";
            var zoomed_x_min_date_quotes = "'" + zoomed_x_min_date + "'";
            correlationUpdate(zoomed_x_min_date_quotes, zoomed_x_max_date_quotes);
        },
        beforeResetZoom: function(chartContext, opts) {
            plotScatter()
        }
    },
    },    
    tooltip: {
        shared: false,
        fillSeriesColor: true,
        theme: 'dark',
        x: {
            format: 'MMM d, yyyy'
        }
    },
    xaxis: {
        type: 'datetime',
        tickAmount: 10,
    },
    yaxis: [{
        labels: {
        formatter: function (val) {
            return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            },
        },
    },

    ],
    };

//CREATE AN INSTANCE OF SCATTER PLOT
var scatter = new ApexCharts(document.querySelector("#scatter"), scatter_options);

//POPULATE THE SCATTER PLOT AND CALCULATE CORRELATION
function plotScatter() {
    var chosen_series6=dropdown6.property('value');
    var chosen_series7=dropdown7.property('value');
    var chosen_series8=dropdown8.property('value');
    var chosen_series9=dropdown9.property('value');
    d3.json("../static/column_index.json").then((indexed_columns)=> {
        var index_dict3=indexed_columns;
        var chosen_main6=index_dict3[chosen_series6];
        var chosen_main7=index_dict3[chosen_series7];
        if (chosen_series8=='Main') {
            var chosen_column6=index_dict3[chosen_series6];}
            else if (chosen_series8=='Change') {
                var chosen_column6=index_dict3[chosen_series6].concat('_change');}
                else {
                    var chosen_column6=index_dict3[chosen_series6].concat('_Pct_Change');};
        if (chosen_series9=='Main') {
            var chosen_column7=chosen_main7;}
            else if (chosen_series9=='Change') {
                var  chosen_column7=chosen_main7.concat('_change');}
                else {
                    var  chosen_column7=chosen_main7.concat('_Pct_Change');};
        // console.log(chosen_column6);
        // console.log(chosen_column7);
        
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table6=table_dict[chosen_main6];
            var chosen_table7=table_dict[chosen_main7];
            // console.log(`Chosen table`, chosen_table6);
            // console.log(`Chosen column`, chosen_column6);
            // console.log(chosen_table7);
            d3.json(`http://127.0.0.1:5000/scatter_api/${chosen_table6}/${chosen_column6}`).then((return_dict)=>{
                console.log(return_dict);
                var no_xy = return_dict['no_xy'];
                // console.log(no_xy);
                d3.json(`http://127.0.0.1:5000/scatter_api/${chosen_table7}/${chosen_column7}`).then((return_dict)=>{
                    var no_xy2 = return_dict['no_xy'];
                    // console.log(no_xy);
                    // console.log(no_xy2);
                    d3.json(`http://127.0.0.1:5000/correlation/${chosen_table6}/${chosen_column6}/${chosen_table7}/${chosen_column7}`).then((corr_coef_dict) => {
                        var corr_coef = corr_coef_dict['corr_coef'];
                        // console.log(corr_coef_dict);
                        // console.log(corr_coef);
                        Plotly.restyle('gauge', 'value',[corr_coef]);
                        scatter.updateSeries([{
                            name: `${chosen_column6}`,
                            data: no_xy
                            },
                            {
                            name: `${chosen_column7}`,
                            data: no_xy2,
                            },
                        ]);
                    });
                });
            });
        });
    });
};

function zoomSumChartUpdate(start_date, end_date) {
    sum_table1.text("")
    sum_table2.text("")
    var chosen_series1=dropdown1.property('value');
    var chosen_series2=dropdown2.property('value');
    var chosen_series3=dropdown3.property('value');
    var chosen_series4=dropdown4.property('value');
    var chosen_series5=dropdown5.property('value');
    d3.json("../static/column_index.json").then((indexed_columns)=> {
        var index_dict2=indexed_columns;
        var chosen_column1=index_dict2[chosen_series1];
        var chosen_column2=index_dict2[chosen_series2];
        var chosen_column3=index_dict2[chosen_series3];
        var chosen_column4=index_dict2[chosen_series4];
        var chosen_column5=index_dict2[chosen_series5];
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table1=table_dict[chosen_column1];
            var chosen_table2=table_dict[chosen_column2];
            var chosen_table3=table_dict[chosen_column3];
            var chosen_table4=table_dict[chosen_column4];
            var chosen_table5=table_dict[chosen_column5];
            d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table1}/${chosen_column1}/${start_date}/${end_date}`).then((return_dict)=>{
                var stats1a = return_dict['stats'];
                var stats1b = return_dict['stats2'];
                d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table2}/${chosen_column2}/${start_date}/${end_date}`).then((return_dict)=>{
                    var stats2a = return_dict['stats'];
                    var stats2b = return_dict['stats2'];
                    d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table3}/${chosen_column3}/${start_date}/${end_date}`).then((return_dict)=>{
                        var stats3a = return_dict['stats'];
                        var stats3b = return_dict['stats2'];
                        d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table4}/${chosen_column4}/${start_date}/${end_date}`).then((return_dict)=>{
                            var stats4a = return_dict['stats'];
                            var stats4b = return_dict['stats2'];
                            d3.json(`http://127.0.0.1:5000/sumtablezoom/${chosen_table5}/${chosen_column5}/${start_date}/${end_date}`).then((return_dict)=>{
                                var stats5a = return_dict['stats'];
                                var stats5b = return_dict['stats2'];
                                // POPULATE SUMMARY TABLES HERE #############################################################
                                var sum1_row=sum_table1.append('tr')
                                var sum2_row=sum_table1.append('tr')
                                var sum3_row=sum_table1.append('tr')
                                var sum4_row=sum_table1.append('tr')
                                var sum5_row=sum_table1.append('tr')
                                var sum6_row=sum_table2.append('tr')
                                var sum7_row=sum_table2.append('tr')
                                var sum8_row=sum_table2.append('tr')
                                var sum9_row=sum_table2.append('tr')
                                var sum0_row=sum_table2.append('tr')
                                stats1a.forEach((value) => {
                                    sum1_row.append('td').text(value)});
                                stats2a.forEach((value) => {
                                    sum2_row.append('td').text(value)});
                                stats3a.forEach((value) => {
                                    sum3_row.append('td').text(value)});
                                stats4a.forEach((value) => {
                                    sum4_row.append('td').text(value)});
                                stats5a.forEach((value) => {
                                    sum5_row.append('td').text(value)});
                                stats1b.forEach((value) => {
                                    sum6_row.append('td').text(value)});
                                stats2b.forEach((value) => {
                                    sum7_row.append('td').text(value)});
                                stats3b.forEach((value) => {
                                    sum8_row.append('td').text(value)});
                                stats4b.forEach((value) => {
                                    sum9_row.append('td').text(value)});
                                stats5b.forEach((value) => {
                                    sum0_row.append('td').text(value)});
                            });
                        });
                    });
                });
            });
        });
    });
};

function correlationUpdate(start_date, end_date) {
        var chosen_series6=dropdown6.property('value');
        var chosen_series7=dropdown7.property('value');
        var chosen_series8=dropdown8.property('value');
        var chosen_series9=dropdown9.property('value');
        d3.json("../static/column_index.json").then((indexed_columns)=> {
            var index_dict3=indexed_columns;
            var chosen_main6=index_dict3[chosen_series6];
            var chosen_main7=index_dict3[chosen_series7];
            if (chosen_series8=='Main') {
                var chosen_column6=index_dict3[chosen_series6];}
                else if (chosen_series8=='Change') {
                    var chosen_column6=index_dict3[chosen_series6].concat('_Change');}
                    else {
                        var chosen_column6=index_dict3[chosen_series6].concat('_Pct_Change');};
            if (chosen_series9=='Main') {
                var chosen_column7=chosen_main7;}
                else if (chosen_series9=='Change') {
                    var  chosen_column7=chosen_main7.concat('_Change');}
                    else {
                        var  chosen_column7=chosen_main7.concat('_Pct_Change');};
            console.log(chosen_column6);
            console.log(chosen_column7);
            d3.json("../static/column_table.json").then((columns)=> {
                var table_dict=columns;
                var chosen_table6=table_dict[chosen_main6];
                var chosen_table7=table_dict[chosen_main7];
                console.log(chosen_table6);
                console.log(chosen_table7);
                d3.json(`http://127.0.0.1:5000/correlationupdate/${chosen_table6}/${chosen_column6}/${chosen_table7}/${chosen_column7}/${start_date}/${end_date}`).then((corr_coef_dict) => {
                    var corr_coef = corr_coef_dict['corr_coef'];
                    console.log(corr_coef_dict);
                    console.log(corr_coef);
                    Plotly.restyle('gauge', 'value',[corr_coef]);                    
                    var corr_coef = corr_coef_dict['corr_coef'];
                    console.log(corr_coef_dict);
                    console.log(corr_coef);
                    Plotly.restyle('gauge', 'value',[corr_coef]);
                });
            });
        });
    };
