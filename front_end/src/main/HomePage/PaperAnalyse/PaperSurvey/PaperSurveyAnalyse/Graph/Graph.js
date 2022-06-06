import {useEffect, useState} from "react";
import echarts from 'echarts/lib/echarts'// 引入 ECharts 主模块
import ReactEcharts from 'echarts-for-react';

let all_data = JSON.parse(localStorage.getItem("analyse_data"));



function getDateFromString(str) {
    //let reg = /^(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/;
    let reg = /^(\d+)-(\d+)-(\d+)/;
    // let reg = /^(\d+)/;
    let temp = str.match(reg);
    let result = "";
    // if (temp) {
    //     // result = new Date(temp[1], temp[2] - 1, temp[3]);
    //     result = new Date(temp[1]);
    // }
    return temp[1];
}

const Graph = () =>{
    let [data,setData] = useState([]);
    let [tree_option,set_tree_option] = useState([]);
    useEffect(()=>{
        console.log(JSON.parse(localStorage.getItem("analyse_data")))
        setData(JSON.parse(localStorage.getItem("analyse_data")))
        // set_tree_option(get_all_tree_option());
    },[])


    //--------------------field------------------------
    const get_all_tree_option = () => {
        let tmp_data = JSON.parse(localStorage.getItem("analyse_data"));
        let option;
        let data_all_tree = new Array();
        data_all_tree.push({"name":tmp_data["field"],"children":[]})
        let num1 = 0;
        for (let problem in tmp_data["problem"]){
            data_all_tree[0]["children"].push({"name":problem,"children":[]})
            //let num2 = 0;
            for (let solution in tmp_data["problem"][problem]["solution"]){
                data_all_tree[0]["children"][num1]["children"].push({"name":solution})
            }
            num1 ++;
        }
        option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            series: [
                {
                    type: 'tree',
                    data: data_all_tree,
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'descendant'
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        }
        console.log(option)
        return option;
    };
    const get_field_time_line_option = () =>{
        let tmp_data = JSON.parse(localStorage.getItem("analyse_data"));
        let option;
        let time_data = []
        let tmp = {}
        for(let i = 0; i< tmp_data["time"].length;++i){
            console.log(getDateFromString(tmp_data["time"][i]["value"][0]))
            if (!tmp.hasOwnProperty(getDateFromString(tmp_data["time"][i]["value"][0]))){
                tmp[getDateFromString(tmp_data["time"][i]["value"][0])]= 0
            }
            tmp[getDateFromString(tmp_data["time"][i]["value"][0])] += 1

        }
        for (let key in tmp){
            time_data.push([key,tmp[key]]);
        }
        option = {
            title: {
                text: "固定横轴坐标，包含时分秒刻度，根据数据展示对应图",
                subtext: "故事点数",
            },
            tooltip: {
                trigger: "axis",
                //   鼠标上移x轴、y轴刻度展示
                //   axisPointer: {
                //     type: "cross",
                //   },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            // formatter: function(params) {
            //     //   console.log(params);
            //     var temp = "";
            //     temp = params[0].data[0] + "<br/>" + "故事点数：" + params[0].data[1];
            //     return temp;
            // },
            xAxis: [
                {
                    // data: diffDate,
                    //设置类别
                    type: "time",
                    interval: 365 * 24 * 60 * 60 * 1000, // 固定x轴时间间隔 间隔24小时，也就是一天
                    // 自己想固定间隔多长时间可以改成自己的间隔时间
                    //min: startTime, // 开始时间时间戳
                    //max: endTime, // 结束时间时间戳 如果实际的最大日期不确定，也可以不设定这个属性
                    // x轴的字
                    axisLabel: {
                        show: true,
                        showMinLabel: true,
                        showMaxLabel: true
                    },
                },
            ],
            yAxis: {
                type: "value",
                // axisLabel: {
                //     formatter: "{value} W",
                // },
                axisPointer: {
                    snap: true,
                },
            },
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [
                    {
                        lte: 6,
                        color: "green",
                    },
                    {
                        gt: 6,
                        lte: 8,
                        color: "red",
                    },
                    {
                        gt: 8,
                        lte: 14,
                        color: "green",
                    },
                    {
                        gt: 14,
                        lte: 17,
                        color: "red",
                    },
                    {
                        gt: 17,
                        color: "green",
                    },
                ],
            },
            series: [
                {
                    name: "Electricity",
                    type: "line",
                    smooth: true,
                    // data的格式 [[实际日期:数值],[[实际日期:数值]]]
                    // 不需要属性名
                    data:time_data,
        },
    ],
    };
        return option;
    };

    const get_field_level_vertical_option = () =>{
        let tmp_data = JSON.parse(localStorage.getItem("analyse_data"));
        let option;
        let all_level_data = new Array();
        all_level_data.push({"name":"A","value":tmp_data.level["A"]})
        all_level_data.push({"name":"B","value":tmp_data.level["B"]})
        all_level_data.push({"name":"C","value":tmp_data.level["C"]})
        option = {
            title: {
                text: tmp_data["field"],
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: all_level_data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    };

    //--------------------problem and its solution------------------------
    const get_time_line_option = (name,tmp_data) =>{
        let option;
        let time_data = []
        let tmp = {}
        for(let i = 0; i< tmp_data["time"].length;++i){
            console.log(getDateFromString(tmp_data["time"][i]["value"][0]))
            if (!tmp.hasOwnProperty(getDateFromString(tmp_data["time"][i]["value"][0]))){
                tmp[getDateFromString(tmp_data["time"][i]["value"][0])]= 0
            }
            tmp[getDateFromString(tmp_data["time"][i]["value"][0])] += 1

        }
        for (let key in tmp){
            time_data.push([key,tmp[key]]);
        }
        option = {
            title: {
                text: "固定横轴坐标，包含时分秒刻度，根据数据展示对应图",
                subtext: "故事点数",
            },
            tooltip: {
                trigger: "axis",
                //   鼠标上移x轴、y轴刻度展示
                //   axisPointer: {
                //     type: "cross",
                //   },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            formatter: function(params) {
                //   console.log(params);
                var temp = "";
                temp = params[0].data[0] + "<br/>" + "故事点数：" + params[0].data[1];
                return temp;
            },
            xAxis: [
                {
                    // data: diffDate,
                    //设置类别
                    type: "time",
                    interval: 24 * 60 * 60 * 1000, // 固定x轴时间间隔 间隔24小时，也就是一天
                    // 自己想固定间隔多长时间可以改成自己的间隔时间
                    //min: startTime, // 开始时间时间戳
                    //max: endTime, // 结束时间时间戳 如果实际的最大日期不确定，也可以不设定这个属性
                    // x轴的字
                    axisLabel: {
                        show: true,
                        showMinLabel: true,
                        showMaxLabel: true
                    },
                },
            ],
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} W",
                },
                axisPointer: {
                    snap: true,
                },
            },
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [
                    {
                        lte: 6,
                        color: "green",
                    },
                    {
                        gt: 6,
                        lte: 8,
                        color: "red",
                    },
                    {
                        gt: 8,
                        lte: 14,
                        color: "green",
                    },
                    {
                        gt: 14,
                        lte: 17,
                        color: "red",
                    },
                    {
                        gt: 17,
                        color: "green",
                    },
                ],
            },
            series: [
                {
                    name: "Electricity",
                    type: "line",
                    smooth: true,
                    // data的格式 [[实际日期:数值],[[实际日期:数值]]]
                    // 不需要属性名
                    data:time_data,
                },
            ],
        };
        return option;
    };
    const get_level_vertical_option = (name,tmp_data) =>{
        let option;
        let all_level_data = new Array();
        all_level_data.push({"name":"A","value":tmp_data.level["A"]})
        all_level_data.push({"name":"B","value":tmp_data.level["B"]})
        all_level_data.push({"name":"C","value":tmp_data.level["C"]})
        option = {
            title: {
                text: name,
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: all_level_data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    }

    const add_all_problems = () =>{
        let tmp_data = JSON.parse(localStorage.getItem("analyse_data"));
        let num1 =0

        let tmp = []
        for (let problem in tmp_data["problem"]) {
            num1++;
            tmp.push(<h1>{String(num1) + " 问题 " + problem}</h1>)

            tmp.push( <ReactEcharts option={get_time_line_option(problem,tmp_data["problem"][problem])}/>)
            tmp.push(<ReactEcharts option={get_level_vertical_option(problem,tmp_data["problem"][problem])}/>)

            tmp.push(<h1>{String(num1) + " 解决方案 " + problem}</h1>)

            let tmp2 = []
            let num2 =0
            for (let solution in tmp_data["problem"][problem]["solution"]){
                num2 ++;
                tmp2.push(<h1>{String(num1) + "." + String(num2) + " " + solution}</h1>)
                tmp2.push(<ReactEcharts option={get_time_line_option(solution,tmp_data["problem"][problem]["solution"][solution])}/>)
                tmp2.push(<ReactEcharts option={get_level_vertical_option(solution,tmp_data["problem"][problem]["solution"][solution])}/>)
            }
            tmp.push(tmp2)
        }
        return <div>{tmp}</div>
    };

    return (
      <div>
          <h1>领域总览</h1>
          <ReactEcharts option={get_all_tree_option()}/>
          <ReactEcharts option={get_field_time_line_option()}/>
          <ReactEcharts option={get_field_level_vertical_option()}/>

          <h1>相关问题及其解决方法</h1>
          <div>
              {
                  add_all_problems()
              }
          </div>
      </div>
    );
};

export default Graph;