<template>
    <div :id="this.divId" :style="{height: this.gHeight}" ></div>
</template>
<script>
import * as echarts from 'echarts';

export default {
    data() {
      return {
        divId: 'grp' + this.grpKey,
        gHeight: ''
      };
    },
    props: {
        graphics: {
            type: Object
        },
        grpHeight: {
            type: String,
            required: true
        },
        grpKey: {
            type: Number
        }
    },
    methods: {
        /* 生成饼图流程 */
        getEchartsSeries() {
            console.log('echarts', echarts);
            /* 1.初始化Echart实例 */
            const myChart = echarts.init(document.getElementById(this.divId));
            console.log('myChart', myChart);
            myChart.showLoading();
            myChart.setOption({
                series: [
                    {
                        name: 'Test',
                        type: 'pie',
                        left: '0%',
                        label: {
                            show: true,
                            position: 'inner'
                        },
                        data: [
                        {
                            value: this.graphics?.work,
                            name: 'Work'
                        },
                        {
                            value: this.graphics?.study,
                            name: 'Study'
                        },
                        {
                            value: this.graphics?.game,
                            name: 'Game'
                        }
                        ]
                    }
                ]
            });
            
            myChart.hideLoading();
        }
    },
    created() {
        /* 真是DOM生成之前，需要提前把div的Height配置 */
        this.gHeight = this.grpHeight;
    },
    mounted() {
        this.$nextTick(function () {
            this.getEchartsSeries();
        })
    }
}

</script>