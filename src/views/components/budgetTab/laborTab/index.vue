<template>
  <div>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <el-row :gutter="60">
          <el-col :span="1" :offset="20">
            <el-button type="primary" icon="el-icon-plus" />
          </el-col>
          <el-col :span="1">
            <el-button type="primary" icon="el-icon-minus" />
          </el-col>
        </el-row>
      </el-header>

      <!-- 内容 -->
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%;"
          height="600"
          border
        >
          <el-table-column
            label="序列"
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="100"
            align="center"
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
            label="职称"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.pos_cd }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.apr_cd }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.unit }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="level"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.level_cd }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="开始日期"
            width="180"
            align="center"
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
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.iv_end_dt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
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
      tableData: []
    }
  },
  mounted() {
    console.log('laborTab >>>')
    /* 通过API获取数据 */
    getList().then(response => {
      this.tableData = response.data.items
    })
  }
}
</script>
