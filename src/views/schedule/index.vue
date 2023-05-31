<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="月份">
          <el-date-picker v-model="selectParam.yyyymm" type="month" @change="onDateChage" />
        </el-form-item>
      </el-form>
    </el-card>
    <el-card :body-style="{height: '800px'}">
      <charts ref="grp" grp-key="schedule" :grp-param="grpParam" grp-height="610px" />
    </el-card>
  </div>
</template>
<script>
// import * as echarts from 'echarts';
import charts from '@/components/echarts/index.vue'

export default {
  components: {
    charts
  },
  data() {
    return {
      selectParam: {
        yyyymm: ''
      },
      grpParam: {
        yyyymm: '',
        days: []
      }
    }
  },
  mounted() {
    this.grpParam = this.calDateList(new Date())
    this.selectParam.yyyymm = this.grpParam.yyyymm
  },
  methods: {
    /* 计算当月日期 */
    calDateList(selectDate) {
      if (!selectDate) selectDate = new Date()
      const mm = selectDate.getMonth() + 1
      const days = new Date(selectDate.getFullYear(), mm, 0).getDate()
      const dateList = []
      console.log('calDateList >>>', mm, days, selectDate)
      for (let day = 1; day <= days; day++) {
        const dateItem = selectDate.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
        dateList.push([dateItem, Math.floor(Math.random() * 10000)])
      }
      return {
        yyyymm: selectDate.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm),
        days: dateList
      }
    },
    /* 变更年月事件 */
    onDateChage(value) {
      console.log('onDateChange', value)
      this.grpParam = this.calDateList(value)
      console.log('grpParam', this.grpParam)
      this.$refs.grp.updateEcharts(this.grpParam)
    }
  }
}
</script>

