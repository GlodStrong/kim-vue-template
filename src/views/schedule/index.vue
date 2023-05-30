<template>
    <div class="app-container">
        <el-card>
            <el-form  :inline="true" class="demo-form-inline">
                <el-form-item label="月份">
                    <el-date-picker v-model="selectParam.yyyymm" type="month" @change="onDateChage"> </el-date-picker>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <charts ref="grp" grpKey="schedule" :grpParam="this.grpParam"  grpHeight="610px"/>
        </el-card>
    </div>
  </template>
  
<script>
// import * as echarts from 'echarts';
import charts from '@/components/echarts/index.vue';

export default {
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
    components: {
        charts
    },
    methods: {
        /* 计算当月日期 */
        calDateList(selectDate) {
            let date = new Date(selectDate);
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
        onDateChage(value) {
            console.log('onDateChange', value);
            this.grpParam = this.calDateList(value);
            this.$refs.grp.getEchartsSeries();
        }
    },
    mounted() {
        this.grpParam = this.calDateList(new Date());
        this.selectParam.yyyymm = this.grpParam.yyyymm;
    }
}
</script>
  