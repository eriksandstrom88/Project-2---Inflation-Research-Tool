// logic.js for Project 2:Inflation Research Tool for Economists
// var dropdown1=d3.select('#selDataset1')
// dropdown1.on("change",updateLineChart);
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
dropdown1.on("change",renderApexLine);
dropdown2.on("change",renderApexLine);
dropdown3.on("change",renderApexLine);
dropdown4.on("change",renderApexLine);
dropdown5.on("change",renderApexLine);
dropdown6.on("change",plotScatter);
dropdown7.on("change",plotScatter);
dropdown8.on("change",plotScatter);
dropdown9.on("change",plotScatter);


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
        var table_body=d3.select("tbody");
        //populate index table using csv
        d3.csv("../static/index.csv").then(each_series => {
        Object.entries(each_series).forEach(([key, value]) => {
            var index_row=table_body.append('tr');
            Object.entries(value).forEach(([keys,values]) => {
            index_row.append('td').text(values)})});
        var chosen_series1 = 1;
        var chosen_series2 = 2;
        var chosen_series3 = 6;
        var chosen_series4 = 4;
        var chosen_series5 = 5;
        // renderApex(chosen_series1,chosen_series2,chosen_series3,chosen_series4,chosen_series5);
        chart.render();
        scatter.render();
        renderApexLine();
        plotScatter();
        Plotly.newPlot("gauge", gauge_trace, gauge_layout);
            })})};

        

        // var wfreq = .75;
        // var gauge_trace = [{
        //     domain: {x:[0,1],y:[0,1]},
        //     value: wfreq,
        //     type:"indicator",
        //     textposition: "inside",
        //     mode: "gauge+number",
        //     //delta:{reference:10},
        //     gauge:{
        //         axis:{range:[0,1]},
        //         steps: [{range:[0,.25], color:"maroon"},
        //                 {range:[.25,.5], color:"orange"},
        //                 {range:[.5,.75], color:"yellow"},
        //                 {range:[.75,1], color:"green"}
        //                 ],
        //         bar:{color:"fuchsia"}
        //     }
        // }];
        // var gauge_layout = {width: 600, height: 300, margin:{t:1,b:0},paper_bgcolor:"lightgray"};
        // Plotly.newPlot("gauge", gauge_trace, gauge_layout);
// })})})})})};
init();


// DECLARE OPTIONS FOR LINE CHART
var options = {
    series: [
    ],
    chart: {
    type: 'area',
    stacked: false,
    height: 600,
    width: 1000,
    zoom: {
    type: 'x',
    enabled: true,
    autoScaleYaxis: true
    },
    toolbar: {
    autoSelected: 'zoom'
    }
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
    // labels: {
    // formatter: function (val) {
    //     return (val / 1000000).toFixed(0);
    // },
    // },
    // {
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
    // y: {
    // formatter: function (i) {
    //     return (i / 1000000).toFixed(0)
    // }
    // }
}
};


//CREATE AN INSTANCE OF THE LINE CHART
var chart = new ApexCharts(document.querySelector("#area-datetime"), options);


//POPULATE THE LINE CHART AND HANDLE CHANGES
function renderApexLine() {
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
        // console.log(chosen_column1, chosen_column2, chosen_column3, chosen_column4, chosen_column5);
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table1=table_dict[chosen_column1];
            var chosen_table2=table_dict[chosen_column2];
            var chosen_table3=table_dict[chosen_column3];
            var chosen_table4=table_dict[chosen_column4];
            var chosen_table5=table_dict[chosen_column5];
            d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
                var no_xy1 = return_dict['no_xy'];
                d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
                var no_xy2 = return_dict['no_xy'];
                    d3.json(`http://127.0.0.1:5000/api/${chosen_table3}/${chosen_column3}`).then((return_dict)=>{
                    var no_xy3 = return_dict['no_xy'];
                        d3.json(`http://127.0.0.1:5000/api/${chosen_table4}/${chosen_column4}`).then((return_dict)=>{
                            var no_xy4 = return_dict['no_xy'];
                            d3.json(`http://127.0.0.1:5000/api/${chosen_table5}/${chosen_column5}`).then((return_dict)=>{
                            var no_xy5 = return_dict['no_xy'];
                            // console.log(no_xy1);
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
var gauge_layout = {width: 600, height: 300, margin:{t:1,b:0},paper_bgcolor:"lightgray"};


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
    height: 450,
    width: 750,
    type: 'scatter',
    zoom: {
        enabled: true,
        type: 'xy'
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
    },
    xaxis: {
        type: 'datetime',
        tickAmount: 10,
    //     labels: {
    //         formatter: function(val) {
    //         return parseFloat(val).toFixed(1)
    //     }
    // }
    },
    
    yaxis: {
    tickAmount: 7
    }
    };

//CREATE AN INSTANCE OF SCATTER PLOT
var scatter = new ApexCharts(document.querySelector("#scatter"), scatter_options);

//POPULATE THE SCATTER PLOT AND CALCULATE CORRELATION
function plotScatter() {
    var chosen_series6=dropdown6.property('value');
    var chosen_series7=dropdown7.property('value');
    var chosen_series8=dropdown8.property('value');
    var chosen_series9=dropdown9.property('value');
    // if (chosen_series8=='Main') {
    //     chosen_column6=index_dict3[chosen_series6];}
    //     else if (chosen_series_8=='Change') {
    //         chosen_column6=index_dict3[chosen_series6].concat('_Change');}
    //         else if (chosen_series8=='Pct_Change') {
    //             chosen_column6=index_dict3[chosen_series6].concat('_Pct_Change');}
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
        // console.log(chosen_column6);
        // console.log(chosen_column7);
        d3.json("../static/column_table.json").then((columns)=> {
            var table_dict=columns;
            var chosen_table6=table_dict[chosen_main6];
            var chosen_table7=table_dict[chosen_main7];
            // console.log(chosen_table6);
            // console.log(chosen_table7);
            d3.json(`http://127.0.0.1:5000/api/${chosen_table6}/${chosen_column6}`).then((return_dict)=>{
                var no_xy = return_dict['no_xy'];
                // console.log(no_xy);
                d3.json(`http://127.0.0.1:5000/api/${chosen_table7}/${chosen_column7}`).then((return_dict)=>{
                    var no_xy2 = return_dict['no_xy'];
                    // console.log(no_xy);
                    // console.log(no_xy2);
                    d3.json(`http://127.0.0.1:5000/correlation/${chosen_table6}/${chosen_column6}/${chosen_table7}/${chosen_column7}`).then((corr_coef_dict) => {
                        var corr_coef = corr_coef_dict['corr_coef'];
                        console.log(corr_coef_dict);
                        console.log(corr_coef);
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
// function updateLineChart() {

//                                     chart: {
//                                     type: 'area',
//                                     stacked: false,
//                                     height: 600,
//                                     width: 1000,
//                                     zoom: {
//                                     type: 'x',
//                                     enabled: true,
//                                     autoScaleYaxis: true
//                                     },
//                                     toolbar: {
//                                     autoSelected: 'zoom'
//                                     }
//                                 },
//                                 dataLabels: {
//                                     enabled: false
//                                 },
//                                 markers: {
//                                     size: 0,
//                                 },
//                                 title: {
//                                     text: 'Stock Price Movement',
//                                     align: 'left'
//                                 },
//                                 fill: {
//                                     type: 'gradient',
//                                     gradient: {
//                                     shadeIntensity: 0,
//                                     inverseColors: false,
//                                     opacityFrom: 0,
//                                     opacityTo: 0,
//                                     stops: [0, 90, 100]
//                                     },
//                                 },
//                                 yaxis: {
//                                     labels: {
//                                     formatter: function (val) {
//                                         return (val / 1000000).toFixed(0);
//                                     },
//                                     },
//                                     title: {
//                                     text: 'Price'
//                                     },
//                                 },
//                                 xaxis: {
//                                     type: 'datetime',
//                                 },
//                                 grid: {
//                                     show: true,
//                                     position:'back',
//                                     row: {
//                                         colors: ['darkgray', 'lightgray'], // takes an array which will be repeated on columns
//                                         opacity: 0.9,
//                                         },
//                                     },
//                                 tooltip: {
//                                     shared: false,
//                                     y: {
//                                     formatter: function (val) {
//                                         return (val / 1000000).toFixed(0)
//                                     }
//                                     }
//                                 }
//                                 };

//                                 var chart = new ApexCharts(document.querySelector("#area-datetime"), options);
//                                 chart.updateSeries();
//     var chart = new ApexCharts(document.querySelector("#area-datetime"), options);
//         chart.updateSeries([{
//             name:);
//     renderApex(chosen_series1,chosen_series2,chosen_series3,chosen_series4,chosen_series5);
    // d3.json("../static/column_index.json").then((indexed_columns)=> {
    //     var dropdown1 = d3.select('#selDataset1');
    //     var index_dict=indexed_columns;
    //     // var chosen_series=dropdown1.property('value');
    //     console.log(chosen_series);
    //     var chosen_column=index_dict[chosen_series];
    //     console.log(chosen_column);
    //     d3.json("../static/column_table.json").then((columns)=> {
    //         var table_dict=columns;
    //         var chosen_table=table_dict[chosen_column];
    //         console.log(chosen_table);
    //         d3.json(`http://127.0.0.1:5000/api/${chosen_table}/${chosen_column}`).then((return_dict)=>{
    //             var no_xy = return_dict['no_xy'];
    //             // var xy = return_dict['xy'];
    //             const chart = new lineChart({el,data,options});
    //             chart.addSeries({
    //                 name: `${chosen_column}`,
    //                 data: no_xy,
    //             },
    //             {chartType:'line'}
    //             );
    //         });
    //     });    
    // });
// };

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// RENDER SCATTER ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// function renderScatter(chosen_series1, chosen_series2) {
//     d3.json("../static/column_index.json").then((indexed_columns)=> {
//         var index_dict3=indexed_columns;
//         var chosen_column1=index_dict3[chosen_series1];
//         var chosen_column2=index_dict3[chosen_series2];
//         d3.json("../static/column_table.json").then((columns)=> {
//             var table_dict=columns;
//             var chosen_table1=table_dict[chosen_column1];
//             var chosen_table2=table_dict[chosen_column2];
//             d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
//                 var no_xy = return_dict['no_xy'];
//                 d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
//                 var no_xy2 = return_dict['no_xy'];
//                 var xy = return_dict['xy'];
//                     var scatter_options = {
//                         series: [{
//                             name: `${chosen_column1}`,
//                             data: no_xy
//                             },
//                             {
//                             name: `${chosen_column2}`,
//                             data: no_xy2,
//                             },
//                         ],
//                         chart: {
//                         height: 450,
//                         width: 750,
//                         type: 'scatter',
//                         zoom: {
//                             enabled: true,
//                             type: 'xy'
//                         },
//                         animations: {
//                             enabled: true,
//                             speed: 200,
//                             animateGradually: {
//                                 enabled: false,
//                                 delay: 0
//                             },
//                             dynamicAnimation: {
//                                 enabled: true,
//                                 speed: 200,
//                             },
//                         },
//                         background: 'darkgray',
//                         grid: {
//                             row: {
//                                 colors: ['darkgray', 'lightgray'], 
//                                 opacity: 0.9
//                             },
//                             },
//                         },
//                         xaxis: {
//                             type: 'datetime',
//                             tickAmount: 10,
//                         //     labels: {
//                         //         formatter: function(val) {
//                         //         return parseFloat(val).toFixed(1)
//                         //     }
//                         // }
//                         },
                        
//                         yaxis: {
//                         tickAmount: 7
//                         }
//                         };

//                     var scatter = new ApexCharts(document.querySelector("#scatter"), scatter_options);
//                     scatter.render();
//                 });
//             });
//         });
//     });
// };

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// RENDER LINE CHART/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// function renderApex(chosen_series1,chosen_series2,chosen_series3,chosen_series4,chosen_series5) {
//     d3.json("../static/column_index.json").then((indexed_columns)=> {
//         var index_dict2=indexed_columns;
//         var chosen_column1=index_dict2[chosen_series1];
//         var chosen_column2=index_dict2[chosen_series2];
//         var chosen_column3=index_dict2[chosen_series3];
//         var chosen_column4=index_dict2[chosen_series4];
//         var chosen_column5=index_dict2[chosen_series5];
//         // console.log(chosen_column1, chosen_column2, chosen_column3, chosen_column4, chosen_column5);
//         d3.json("../static/column_table.json").then((columns)=> {
//             var table_dict=columns;
//             var chosen_table1=table_dict[chosen_column1];
//             var chosen_table2=table_dict[chosen_column2];
//             var chosen_table3=table_dict[chosen_column3];
//             var chosen_table4=table_dict[chosen_column4];
//             var chosen_table5=table_dict[chosen_column5];
//             d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
//                 var no_xy1 = return_dict['no_xy'];
//                 d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
//                 var no_xy2 = return_dict['no_xy'];
//                     d3.json(`http://127.0.0.1:5000/api/${chosen_table3}/${chosen_column3}`).then((return_dict)=>{
//                     var no_xy3 = return_dict['no_xy'];
//                         d3.json(`http://127.0.0.1:5000/api/${chosen_table4}/${chosen_column4}`).then((return_dict)=>{
//                             var no_xy4 = return_dict['no_xy'];
//                             d3.json(`http://127.0.0.1:5000/api/${chosen_table5}/${chosen_column5}`).then((return_dict)=>{
//                             var no_xy5 = return_dict['no_xy'];
//                                 var options = {
//                                     series: [{
//                                     name: `${chosen_column1}`,
//                                     data: no_xy1,
//                                 },{
//                                     name: `${chosen_column2}`,
//                                     data: no_xy2,
//                                 },{
//                                     name: `${chosen_column3}`,
//                                     data: no_xy3,
//                                 },{
//                                     name: `${chosen_column4}`,
//                                     data: no_xy4,
//                                 },{
//                                     name: `${chosen_column5}`,
//                                     data: no_xy5,
//                                 }],
//                                     chart: {
//                                     type: 'area',
//                                     stacked: false,
//                                     height: 600,
//                                     width: 1000,
//                                     zoom: {
//                                     type: 'x',
//                                     enabled: true,
//                                     autoScaleYaxis: true
//                                     },
//                                     toolbar: {
//                                     autoSelected: 'zoom'
//                                     }
//                                 },
//                                 dataLabels: {
//                                     enabled: false
//                                 },
//                                 markers: {
//                                     size: 0,
//                                 },
//                                 title: {
//                                     text: 'Stock Price Movement',
//                                     align: 'left'
//                                 },
//                                 fill: {
//                                     type: 'gradient',
//                                     gradient: {
//                                     shadeIntensity: 0,
//                                     inverseColors: false,
//                                     opacityFrom: 0,
//                                     opacityTo: 0,
//                                     stops: [0, 90, 100]
//                                     },
//                                 },
//                                 yaxis: {
//                                     labels: {
//                                     formatter: function (val) {
//                                         return (val / 1000000).toFixed(0);
//                                     },
//                                     },
//                                     title: {
//                                     text: 'Price'
//                                     },
//                                 },
//                                 xaxis: {
//                                     type: 'datetime',
//                                 },
//                                 grid: {
//                                     show: true,
//                                     position:'back',
//                                     row: {
//                                         colors: ['darkgray', 'lightgray'], // takes an array which will be repeated on columns
//                                         opacity: 0.9,
//                                         },
//                                     },
//                                 tooltip: {
//                                     shared: false,
//                                     y: {
//                                     formatter: function (val) {
//                                         return (val / 1000000).toFixed(0)
//                                     }
//                                     }
//                                 }
//                                 };

//                                 var chart = new ApexCharts(document.querySelector("#area-datetime"), options);
//                                 chart.render();
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// RENDER LINE CHART/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// function renderToastLine(chosen_series1,chosen_series2,chosen_series3,chosen_series4,chosen_series5) {
//     d3.json("../static/column_index.json").then((indexed_columns)=> {
//         var index_dict2=indexed_columns;
//         var chosen_column1=index_dict2[chosen_series1];
//         var chosen_column2=index_dict2[chosen_series2];
//         var chosen_column3=index_dict2[chosen_series3];
//         var chosen_column4=index_dict2[chosen_series4];
//         var chosen_column5=index_dict2[chosen_series5];
//         // console.log(chosen_column1, chosen_column2, chosen_column3, chosen_column4, chosen_column5);
//         d3.json("../static/column_table.json").then((columns)=> {
//             var table_dict=columns;
//             var chosen_table1=table_dict[chosen_column1];
//             var chosen_table2=table_dict[chosen_column2];
//             var chosen_table3=table_dict[chosen_column3];
//             var chosen_table4=table_dict[chosen_column4];
//             var chosen_table5=table_dict[chosen_column5];
//             d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
//                 var no_xy1 = return_dict['no_xy'];
//                 d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
//                 var no_xy2 = return_dict['no_xy'];
//                     d3.json(`http://127.0.0.1:5000/api/${chosen_table3}/${chosen_column3}`).then((return_dict)=>{
//                     var no_xy3 = return_dict['no_xy'];
//                         d3.json(`http://127.0.0.1:5000/api/${chosen_table4}/${chosen_column4}`).then((return_dict)=>{
//                             var no_xy4 = return_dict['no_xy'];
//                             d3.json(`http://127.0.0.1:5000/api/${chosen_table5}/${chosen_column5}`).then((return_dict)=>{
//                             var no_xy5 = return_dict['no_xy'];
//                                 const el = document.getElementById('area-datetime');
//                                 const data = {
//                                     series: [
//                                         {
//                                             name: `${chosen_column1}`,
//                                             data: no_xy1,
//                                             visible: true
//                                         },
//                                         {
//                                             name: `${chosen_column2}`,
//                                             data: no_xy2,
//                                             visible: false,
//                                         },
//                                         {
//                                             name: `${chosen_column3}`,
//                                             data: no_xy3,
//                                             visible: false,
//                                         },
//                                         {
//                                             name: `${chosen_column4}`,
//                                             data: no_xy4,
//                                             visible: false,
//                                         },
//                                         {
//                                             name: `${chosen_column5}`,
//                                             data: no_xy5,
//                                             visible: true,
//                                         },
//                                     ],
//                                 };
//                                 const options = {
//                                     chart: {width:1000, height: 600, linecolor:'blueviolet'},
//                                     xAxis: {pointOnColumn: true, title: 'Date', date: {format: 'mm-yyyy'},},
//                                     yAxis: [
//                                         {title:'',},
//                                         {title:'',
//                                         scale: {
//                                             min:0,
//                                             max: 15,
//                                             margin: 0,
//                                         },
//                                     },
//                                     ],
//                                     series: {
//                                         zoomable: true,
//                                         selectable: true,
//                                     },
//                                     theme: {
//                                         chart: {
//                                             backgroundColor: 'darkgray'
//                                         },
//                                         plot:{
//                                             backgroundColor:'lightgray',
//                                         },
//                                         series: {
//                                             lineColor: 'blueviolet',
//                                         },
//                                     },
//                                 };
//                                 const chart = toastui.Chart.lineChart({el,data,options});
//                                 chart.on('selectSeries', (ev) => {
//                                     console.log(ev);
//                                     chart.updateOptions({
//                                         yAxis:{
//                                             scale: {
//                                                 min:0,
//                                                 max: 1000,
//                                                 margin: 0,
//                                                 },
//                                             }
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     })
// };

// function drawSeries(series) {
//     const chart_data = d3.json("../static/column_index.json").then((indexed_columns)=> {
//         var index_dict = indexed_columns;
//         var chosen_column5=index_dict[series];        
//         console.log(chosen_column5);
//         return d3.json("../static/column_table.json").then((columns)=> {
//             var table_dict=columns;
//             var chosen_table5=table_dict[chosen_column5];
//             console.log(chosen_table5);
//             return d3.json(`http://127.0.0.1:5000/api/${table_dict[chosen_column5]}/${index_dict[series]}`).then((return_dict)=>{
//                 query_data = return_dict['no_xy'];
//                 // query_data = ^             
//                 // console.log(query_data);
//                 return query_data;
//             });
//         })
//     });
//     const result = async () => {
//         const a = await chart_data;
//         // console.log(a);
//     };
//     result()
// };
// var test_chart_function = drawSeries5(5);
// console.log(test_chart_function);
// drawSeries5(5).then(console.log(data));
// var test_again=drawSeries5(5).then((data) => {
//     data});
// console.log(test_again);
// });
// console.log(drawSeries5(5));
// drawSeries5(5);

    // })})})};
                // var xy1 = return_dict['xy'];
                // console.log(xy);
                // console.log(no_xy5);
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// RENDER SCATTER ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// function renderScatter(chosen_series1, chosen_series2) {
//     d3.json("../static/column_index.json").then((indexed_columns)=> {
//         var index_dict3=indexed_columns;
//         var chosen_column1=index_dict3[chosen_series1];
//         var chosen_column2=index_dict3[chosen_series2];
//         d3.json("../static/column_table.json").then((columns)=> {
//             var table_dict=columns;
//             var chosen_table1=table_dict[chosen_column1];
//             var chosen_table2=table_dict[chosen_column2];
//             d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
//                 var no_xy = return_dict['no_xy'];
//                 d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
//                 var no_xy2 = return_dict['no_xy'];
//                 var xy = return_dict['xy'];
//                     var scatter_options = {
//                         series: [{
//                             name: `${chosen_column1}`,
//                             data: no_xy
//                             },
//                             {
//                             name: `${chosen_column2}`,
//                             data: no_xy2,
//                             },
//                         ],
//                         chart: {
//                         height: 450,
//                         width: 750,
//                         type: 'scatter',
//                         zoom: {
//                             enabled: true,
//                             type: 'xy'
//                         },
//                         animations: {
//                             enabled: true,
//                             speed: 100,
//                             animateGradually: {
//                                 enabled: false,
//                                 delay: 0
//                             },
//                             dynamicAnimation: {
//                                 enabled: true,
//                                 speed: 500,
//                             },
//                         },
//                         background: 'darkgray',
//                         grid: {
//                             row: {
//                                 colors: ['darkgray', 'lightgray'], 
//                                 opacity: 0.9
//                             },
//                             },
//                         },
//                         xaxis: {
//                             type: 'datetime',
//                             tickAmount: 10,
//                         //     labels: {
//                         //         formatter: function(val) {
//                         //         return parseFloat(val).toFixed(1)
//                         //     }
//                         // }
//                         },
                        
//                         yaxis: {
//                         tickAmount: 7
//                         }
//                         };

//                     var scatter = new ApexCharts(document.querySelector("#scatter"), scatter_options);
//                     scatter.render();
//                 });
//             });
//         });
//     });
// };


// function renderApex(chosen_series1,chosen_series2,chosen_series3,chosen_series4,chosen_series5) {
//     d3.json("../static/column_index.json").then((indexed_columns)=> {
//         var index_dict2=indexed_columns;
//         var chosen_column1=index_dict2[chosen_series1];
//         var chosen_column2=index_dict2[chosen_series2];
//         var chosen_column3=index_dict2[chosen_series3];
//         var chosen_column4=index_dict2[chosen_series4];
//         var chosen_column5=index_dict2[chosen_series5];
//         // console.log(chosen_column1, chosen_column2, chosen_column3, chosen_column4, chosen_column5);
//         d3.json("../static/column_table.json").then((columns)=> {
//             var table_dict=columns;
//             var chosen_table1=table_dict[chosen_column1];
//             var chosen_table2=table_dict[chosen_column2];
//             var chosen_table3=table_dict[chosen_column3];
//             var chosen_table4=table_dict[chosen_column4];
//             var chosen_table5=table_dict[chosen_column5];
//             d3.json(`http://127.0.0.1:5000/api/${chosen_table1}/${chosen_column1}`).then((return_dict)=>{
//                 var no_xy1 = return_dict['no_xy'];
//                 d3.json(`http://127.0.0.1:5000/api/${chosen_table2}/${chosen_column2}`).then((return_dict)=>{
//                 var no_xy2 = return_dict['no_xy'];
//                     d3.json(`http://127.0.0.1:5000/api/${chosen_table3}/${chosen_column3}`).then((return_dict)=>{
//                     var no_xy3 = return_dict['no_xy'];
//                         d3.json(`http://127.0.0.1:5000/api/${chosen_table4}/${chosen_column4}`).then((return_dict)=>{
//                             var no_xy4 = return_dict['no_xy'];
//                             d3.json(`http://127.0.0.1:5000/api/${chosen_table5}/${chosen_column5}`).then((return_dict)=>{
//                             var no_xy5 = return_dict['no_xy'];
//                                 var options = {
//                                     series: [{
//                                     name: `${chosen_column1}`,
//                                     data: no_xy1,
//                                 },{
//                                     name: `${chosen_column2}`,
//                                     data: no_xy2,
//                                 },{
//                                     name: `${chosen_column3}`,
//                                     data: no_xy3,
//                                 },{
//                                     name: `${chosen_column4}`,
//                                     data: no_xy4,
//                                 },{
//                                     name: `${chosen_column5}`,
//                                     data: no_xy5,
//                                 }],
//                                     chart: {
//                                     type: 'area',
//                                     stacked: false,
//                                     height: 600,
//                                     width: 1000,
//                                     zoom: {
//                                     type: 'x',
//                                     enabled: true,
//                                     autoScaleYaxis: true
//                                     },
//                                     toolbar: {
//                                     autoSelected: 'zoom'
//                                     }
//                                 },
//                                 dataLabels: {
//                                     enabled: false
//                                 },
//                                 markers: {
//                                     size: 0,
//                                 },
//                                 title: {
//                                     text: 'Stock Price Movement',
//                                     align: 'left'
//                                 },
//                                 fill: {
//                                     type: 'gradient',
//                                     gradient: {
//                                     shadeIntensity: 0,
//                                     inverseColors: false,
//                                     opacityFrom: 0,
//                                     opacityTo: 0,
//                                     stops: [0, 90, 100]
//                                     },
//                                 },
//                                 yaxis: {
//                                     labels: {
//                                     formatter: function (val) {
//                                         return (val / 1000000).toFixed(0);
//                                     },
//                                     },
//                                     title: {
//                                     text: 'Price'
//                                     },
//                                 },
//                                 xaxis: {
//                                     type: 'datetime',
//                                 },
//                                 grid: {
//                                     show: true,
//                                     position:'back',
//                                     row: {
//                                         colors: ['darkgray', 'lightgray'], // takes an array which will be repeated on columns
//                                         opacity: 0.9,
//                                         },
//                                     },
//                                 tooltip: {
//                                     shared: false,
//                                     y: {
//                                     formatter: function (val) {
//                                         return (val / 1000000).toFixed(0)
//                                     }
//                                     }
//                                 }
//                                 };

//                                 var chart = new ApexCharts(document.querySelector("#area-datetime"), options);
//                                 chart.render();
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };

// })
// };
///////////////////////////////////// RENDER APEX LINE CHART - NOT BEING USED//////////////////////

// function renderLineChart(chosen_series,index_dict) {
//     d3.json("../static/column_index.json").then((indexed_columns)=> {
//         var chosen_column=index_dict[chosen_series];
//         console.log(chosen_column);
//         d3.json("../static/column_table.json").then((columns)=> {
//             var table_dict=columns;
//             var chosen_table=table_dict[chosen_column];
//             console.log(chosen_table);
//             d3.json(`http://127.0.0.1:5000/api/${table_dict[chosen_column]}/${index_dict[chosen_series]}`).then((return_dict)=>{
//                 var no_xy = return_dict['no_xy'];
//                 var xy = return_dict['xy'];
//                 console.log(xy);
//                 console.log(no_xy);
//                 var options = {
//                     series: [{
//                         name: `${chosen_column}`,
//                         data: xy
//                     }],
//                     chart: {
//                         id: 'area-datetime',
//                         type:'area',
//                         stacked: false,
//                         height: 600,
//                         width: 1000,
//                         zoom: {
//                             type:'x',
//                             enabled: true,
//                             autoScaleYaxis: true
//                     },
//                     toolbar: {
//                         autoSelected: 'zoom'
//                     },
//                     },
//                     dataLabels: {
//                     enabled: false
//                     },
//                     markers: {
//                         size: 0,
//                     },
//                     title: {
//                     text: 'Just testing',
//                     align: 'left'
//                 },
//                     fill: {
//                         type:'gradient',
//                         gradient: {
//                             shadeIntensity: 1,
//                         inverseColors: false,
//                         opacityFrom: 0.5,
//                         opacityTo: 0,
//                         stops: [0, 90, 100]
//                     },
//                     },
//                     yaxis: {
//                         title: {
//                             text: `${chosen_column}`
//                         }
//                     },
//                     xaxis: {
//                         type: 'datetime',
//                     },
//                     tooltip: {
//                         shared: false
//                     },
//                     // colors: ['#A300D6'],
//                     // type: 'solid',
//                     // opacity: 0.9,
                
                    
//                     grid: {
//                         show: true,
//                         position:'back',
//                         row: {
//                             colors: ['darkgray', 'lightgray'], // takes an array which will be repeated on columns
//                             opacity: 0.9,
//                             },
//                     },
//                     stroke: {
//                         // show: false,
//                         curve: 'straight',
//                         lineCap: 'square',
//                         colors: ['#A300D6'],
//                         width: 4,
//                         opacity: 0.9,
//                         // fill: {
//                         //     type:'solid'
//                         // }
//                     }};
                            
//                     // };

//                 var chart = new ApexCharts(document.querySelector("#area-datetime"), options);
//                 chart.render(); 
//             });//closes 3rd d3.json
//         });//closes 2nd d3.json
//     });//closes 1st d3.json
// };//closes main functio  