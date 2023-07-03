<template>
  <div>
    <el-tabs style="height: 100%;">
      <el-tab-pane label="人力费">
        <laborTab style="width: 100%;" />
      </el-tab-pane>
      <el-tab-pane label="外包费">外包费</el-tab-pane>
      <el-tab-pane label="材料费">材料费</el-tab-pane>
      <el-tab-pane label="经费">经费</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import laborTab from '@/views/components/budgetTab/laborTab/index.vue'

export default {
  components: {
    laborTab
  },
  data() {
    return {}
  }
}
</script>
