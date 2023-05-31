<template>
  <div :id="divId" :style="{height: gHeight}" />
</template>
<script>
import * as echarts from 'echarts'

export default {
  props: {
    grpKey: {
      type: String
    },
    grpHeight: {
      type: String,
      required: true
    },
    grpParam: {
      type: Object
    }
  },
  data() {
    return {
      divId: this.grpKey + 'Grp',
      gHeight: '',
      myChart: '',
      selectParm: {
        yyyymm: '',
        days: []
      }
    }
  },
  created() {
    /* 真是DOM生成之前，需要提前把div的Height配置 */
    this.gHeight = this.grpHeight
  },
  mounted() {
    this.$nextTick(function() {
    //   this.myChart = echarts.init(document.getElementById(this.divId))
      this.getEchartsSeries()
    })
  },
  destroyed() {
    this.myChart.clear()
  },
  methods: {
    /* 计算当月日期 */
    calDateList() {
      const date = new Date()
      const mm = date.getMonth() + 1
      const days = new Date(date.getFullYear(), mm, 0).getDate()
      const dateList = []
      for (let day = 1; day <= days; day++) {
        const dateItem = date.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
        dateList.push([dateItem, Math.floor(Math.random() * 10000)])
      }
      return {
        yyyymm: date.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm),
        days: dateList
      }
    },
    /* 饼图 option */
    getPieSeries(days) {
      return days.map((item, index) => {
        // const ct = chart.convertToPixel('calendar', item);
        // console.log('getPieSeries convertToPixel >>>',  item);
        return {
          id: index + 'pie',
          type: 'pie',
          coordinateSystem: 'calendar',
          center: item[0],
          label: {
            formatter: '{c}',
            position: 'inside'
          },
          radius: 30,
          data: [
            { name: '工作', value: Math.round(Math.random() * 24) },
            { name: '娱乐', value: Math.round(Math.random() * 24) },
            { name: '睡觉', value: Math.round(Math.random() * 24) }
          ]
        }
      })
    },
    /* 生成日历模板 */
    getCalenderSeries(otherSeries, yyyymm) {
      return {
        tooltip: {},
        legend: {
          data: ['工作', '娱乐', '睡觉'],
          left: 20
        },
        calendar: {
          top: 'bottom',
          left: 'center',
          orient: 'vertical',
          cellSize: [120, 100],
          range: yyyymm,
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
          }
        },
        series: [
          {
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            label: {
              show: true,
              formatter(params) {
                return echarts.time.format(params.value[0], '{dd}', false)
              },
              color: '#000',
              fontSize: 14,
              offset: [-100 / 2 + 10, -100 / 2 + 10]
            },
            data: yyyymm
          },
          ...otherSeries
        ]
      }
    },
    /* 生成echarts */
    getEchartsSeries(dateObj) {
      console.log('getEchartsSeries before', dateObj)
      /* 如果调用方法的时候没有传值，用最初生成组件时传的数据 */
      if (!dateObj) {
        dateObj = this.grpParam
      }

      /* 初始化echarts */
      this.myChart = echarts.init(document.getElementById(this.divId))
      this.myChart.showLoading()

      /* 获取饼图 */
      const pieSeries = this.getPieSeries(dateObj.days)
      const option = this.getCalenderSeries(pieSeries, dateObj.yyyymm)
      if (option && typeof option === 'object') this.myChart.setOption(option)

      console.log('getEchartsSeries end', pieSeries)
      this.myChart.hideLoading()
    },
    /* 数据变更时，echarts更新 */
    updateEcharts(dateObj) {
      /* 销毁原有数据 */
      this.myChart.dispose()
      this.getEchartsSeries(dateObj)
    }
  }
}

</script>
