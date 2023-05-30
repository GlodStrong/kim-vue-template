<template>
    <div :id="this.divId"  :style="{height: this.gHeight}" ></div>
</template>
<script>
import * as echarts from 'echarts';

export default {
    data() {
      return {
        divId: this.grpKey + 'Grp',
        gHeight: '',
        myChart: '',
        selectParm: {
            yyyymm: '',
            days:[]
        },
      };
    },
    props: {
        grpKey: {
            type: String
        },
        grpHeight: {
            type: String,
            required: true
        },
        grpParam:{
            type: Object
        }
    },
    methods: {
        /* 计算当月日期 */
        calDateList() {
            let date = new Date();
            let mm = date.getMonth() + 1;
            let days = new Date(date.getFullYear(), mm, 0).getDate();
            let dateList = [];
            for (let day = 1; day <= days; day++) {
                let dateItem = date.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day);
                dateList.push([dateItem, Math.floor(Math.random() * 10000)]);
            }
            return {
                yyyymm: date.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm),
                days: dateList
            };
        },
        /* 饼图 option */ 
        getPieSeries(days) {
            return days.map((item, index) => {
            // const ct = chart.convertToPixel('calendar', item);
            // console.log('getPieSeries convertToPixel >>>',  item);
                return {
                    id: index + 'pie' ,
                    type: 'pie',
                    coordinateSystem: 'calendar',
                    center: item[0],
                    label: {
                        formatter: '{c}',
                        position: 'inside'
                    },
                    radius: 30,
                    data: [
                        {name: '工作', value: Math.round(Math.random() * 24)},
                        {name: '娱乐', value: Math.round(Math.random() * 24)},
                        {name: '睡觉', value: Math.round(Math.random() * 24)}
                    ]
                };
            });
        },
        /* 生成日历模板 */
        getCalenderSeries(otherSeries) {
            return {
                tooltip: {},
                legend: {
                    data: ['工作', '娱乐', '睡觉'],
                    bottom: 20
                },
                calendar: {
                    top: 'middle',
                    left: 'center',
                    orient: 'vertical',
                    cellSize: [120, 100],
                    range: this.grpParam.yyyymm,
                    // range: '2023-01',
                    yearLabel: {
                        show: false
                    },
                    monthLabel: {
                        show: false
                    },
                    dayLabel: {
                        margin: 20,
                        nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    },
                },
                series: [
                    {
                        id: 'label',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        label: {
                            show: true,
                            formatter(params) {
                                return echarts.time.format(params.value[0], '{dd}', false);
                            },
                            color: '#000',
                            fontSize: 14,
                            offset: [-100 / 2 + 10, -100 / 2 + 10]
                        },
                        data: this.grpParam.days
                    },
                    ...otherSeries
                ]
            };
        },
        getEchartsSeries() {
            console.log('getEchartsSeries', this.grpParam);
            // var myChart = echarts.init(document.getElementById(this.divId));
            this.myChart.showLoading();

            /* 获取日期 */
            // const dayObj = this.calDateList();
            /* 设置日历显示的月份 */
            // this.selectParm.ym = dayObj.yyyymm;

            /* 获取饼图 */
            const pieSeries = this.getPieSeries(this.grpParam.days);
            const option = this.getCalenderSeries(pieSeries);
            if(option && typeof option === "object") this.myChart.setOption(option);

            this.myChart.hideLoading();
        }
    },
    created() {
        /* 真是DOM生成之前，需要提前把div的Height配置 */
        this.gHeight = this.grpHeight;
        this.selectParm = this.grpParam;
    },
    mounted() {
        this.$nextTick(function () {
            this.myChart = echarts.init(document.getElementById(this.divId));
            this.getEchartsSeries();
        })
    }
}

</script>