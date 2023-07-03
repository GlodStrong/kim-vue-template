<template>
  <div>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <!-- <el-row :gutter="60">
          <el-col :span="1" :offset="20">
            <el-button type="primary" icon="el-icon-plus" />
          </el-col>
          <el-col :span="1">
            <el-button type="primary" icon="el-icon-minus" />
          </el-col>
        </el-row> -->
        <el-button-group style="float: right">
          <el-button type="primary" icon="el-icon-copy-document">复制</el-button>
          <el-button type="primary" icon="el-icon-edit">添加</el-button>
          <!-- <el-button type="primary" icon="el-icon-share" /> -->
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-button-group>
      </el-header>

      <!-- 内容 -->
      <el-main>
        <el-table
          ref="laborsRef"
          style="width: 100%;"
          height="600"
          border
          show-summary
          :data="tableData"
          :summary-method="getSummaries"
          @row-dblclick="handleRowClick"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          />
          <el-table-column
            label="PM"
            width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-radio
                v-model="tempRadio"
                :label="scope.$index"
                @change.native="singleElection(scope.row)"
              ><span />
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column
            label="序列"
            width="60"
            align="center"
            prop="id"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="100"
            align="center"
            prop="name"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="个人信息"
            align="center"
          >
            TBD
            <!-- <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template> -->
          </el-table-column>
          <el-table-column
            label="职位"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>职位: {{ scope.row.pos_cd }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.pos_cd }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="80"
            align="center"
            prop="apr_cd"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>状态: {{ scope.row.apr_cd }}</p>
                <div slot="reference" class="name-wrapper">
                  <i v-if="scope.row.apr_cd === 'approved'" class="el-icon-check" />
                  <i v-if="scope.row.apr_cd === 'waiting'" class="el-icon-loading" />
                  <i v-if="scope.row.apr_cd === 'cancel'" class="el-icon-close" />
                  <!-- <el-tag size="medium">{{ scope.row.apr_cd }}</el-tag> -->
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            width="100"
            align="center"
            prop="unit"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>单价: {{ scope.row.unit }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.unit }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="工作天数"
            width="100"
            align="center"
            prop="work_day"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>工作天数: {{ scope.row.work_day }}天</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.work_day }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="level"
            width="150"
            align="center"
            prop="level_cd"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>level: {{ scope.row.level_cd }} </p>
                <div slot="reference" class="name-wrapper">
                  <!-- <el-tag size="medium">{{ scope.row.level_cd }}</el-tag> -->
                  <el-rate
                    v-model="scope.row.level_cd"
                    disabled
                    text-color="#ff9900"
                  />
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="开始日期"
            width="180"
            align="center"
            prop="iv_str_dt"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.iv_str_dt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结束日期"
            width="180"
            align="center"
            prop="iv_end_dt"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.iv_end_dt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                :disabled="scope.row.apr_cd === 'waiting'"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import { getList } from '@/api/labor'

export default {
  data() {
    return {
      tempRadio: false,
      tempSelectRow: '',
      tableData: []
    }
  },
  mounted() {
    console.log('laborTab >>>')
    /* 通过API获取数据 */
    getList().then(response => {
      this.tableData = response.data.items
    })
  },
  methods: {
    /* 表尾合计行 */
    getSummaries(columns, data) {
      console.log('columns, data', columns, data)
      const sums = []
      // if (columns) {
      //   columns.array.forEach((column, index) => {
      //     if (index === 0) {
      //       sums[index] = '总价'
      //       return
      //     }
      //     const valueList = data.map(item => Number(item.unit))
      //     console.log(valueList)
      // const values = data.map(item => Number(item.unit))
      // if (!values.every(value => isNaN(value))) {
      //   sums[index] = values.reduce((prev, curr) => {
      //     const value = Number(curr)
      //     if (!isNaN(value)) {
      //       return prev + curr
      //     } else {
      //       return prev
      //     }
      //   }, 0)
      //   sums[index] += ' 元'
      // } else {
      //   sums[index] = 'N/A'
      // }
      // })
      // }
      return sums
    },
    singleElection(row) {
      this.tempSelectRow = this.tableData.indexOf(row)
    },
    /* 点击Row事件 */
    handleRowClick(row) {
      console.log('handleRowClick >>>', row)
      this.$refs.laborsRef.toggleRowSelection(row)
    }
  }
}
</script>
