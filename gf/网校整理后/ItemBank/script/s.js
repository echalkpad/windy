// Step:3 conifg ECharts's path, link to echarts.js from current page.
    // Step:3 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
    require.config({
        paths: {
            echarts: './script'
        }
    });

    // Step:4 require echarts and use it in the callback.
    // Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
    setTimeout(function(){
        require(
            [
                'echarts',
                'echarts/chart/bar',
                'echarts/chart/line'
            ],
            function (ec) {
                //--- 折柱 ---
                var myChart = ec.init(document.getElementById('main'));
                myChart.setOption({
                    tooltip : {
                        trigger: 'axis'
                    },
                    /*legend: {
                        data:['得分']      //
                    },*/
                    toolbox: {
                        show : false,       //是否显示右上角的小标签
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar','stack','tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : ['15-07-12\n每日一题','15-07-12\n每月一测','15-07-12\n知识点5题','15-07-12\n知识点15题','15-07-12\n知识点5题'],
                            axisLabel:{
                                rotate:45,          //刻度旋转45度角
                                interval:0,
                                textStyle:{
                                    color:'#666',    //刻度颜色
                                    fontSize:12      //刻度颜色
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color:'#ddd',    //x轴的颜色
                                }
                            },
                            splitLine: {                //X轴的网格颜色
                                lineStyle: {
                                    color: '#ddd',
                                    type: 'dashed'
                                }
                            },
                        }
                    ],
                    grid: {
                        x:30,
                        x2:10,
                        y2:100,
                    },
                    yAxis : [
                        {
                            type : 'value',
                            splitNumber:5 ,  // 数值轴用，分割段数，默认为5
                            axisLabel:{
                                interval:0,
                                textStyle:{
                                    color:'#666',    //刻度颜色
                                    fontSize:12      //刻度颜色
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color:'#ddd',        //y轴的颜色
                                }
                            },
                            splitLine: {                //y轴的网格颜色
                                lineStyle: {
                                    color: '#ddd',
                                    type: 'dashed'
                                }
                            },
                        }
                    ],
                    series : [
                        {
                            name:'得分',
                            type:'line',
                            // smooth:true,
                            itemStyle: {
                                   /* normal: {borderColor:'#e64d4d',areaStyle: {type: 'default',color:'rgba(250,219,219,0.6)'},//控制线下区域显示*/
                                    normal: {borderColor:'#30ac64',//控制折线焦点显示颜色
                                    lineStyle: {color:'#30ac64'}    //折线图线的样式
                                }
                            },
                            data:[75, 84, 72,86, 74]
                        },
                    ]
                });
            }
        );
},800)