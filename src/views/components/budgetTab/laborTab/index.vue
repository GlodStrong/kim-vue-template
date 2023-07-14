<template>
  <div>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <el-button-group style="float: right">
          <el-button type="primary" icon="el-icon-copy-document">复制</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delLabor">删除</el-button>
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
          @select="handleTbChk"
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

        <!-- 弹窗 -->
        <el-dialog title="人力信息" size="tiny" :visible="dialogFormVisible" :before-close="handleClose">
          <el-form ref="laborInfo" :model="laborForm" label-width="80px" :rules="rules">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="laborForm.name" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="职位" prop="pos_cd">
              <el-select v-model="laborForm.pos_cd" placeholder="请选择职位" style="width: 100%;">
                <el-option label="intern" value="intern" />
                <el-option label="staff" value="staff" />
                <el-option label="director" value="director" />
                <el-option label="manager" value="manager" />
                <el-option label="chief" value="chief" />
                <el-option label="ceo" value="ceo" />
              </el-select>
            </el-form-item>
            <el-form-item label="PM" prop="pm_yn">
              <el-switch v-model="laborForm.pm_yn" />
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-date-picker v-model="laborForm.birthday" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="审批状态" prop="apr_cd">
              <el-input v-model="laborForm.apr_cd" style="width: 100%;" disabled />
            </el-form-item>
            <el-form-item label="投入期间" required>
              <!-- <el-col :span="7">
                <el-date-picker v-model="laborForm.iv_str_dt" type="date" placeholder="选择日期" style="width: 100%;" />
              </el-col>
              <el-col class="line" :span="2">~</el-col>
              <el-col :span="7">
                <el-date-picker v-model="laborForm.iv_end_dt" type="date" placeholder="选择日期" style="width: 100%;" />
              </el-col> -->
              <el-col :span="11">
                <el-form-item prop="iv_str_dt">
                  <el-date-picker v-model="laborForm.iv_str_dt" type="date" placeholder="选择日期" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="iv_end_dt">
                  <el-date-picker v-model="laborForm.iv_end_dt" type="date" placeholder="选择日期" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="工作天数">
              <el-input v-model="laborForm.work_day" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="单价" prop="unit">
              <el-input v-model="laborForm.unit" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="Level">
              <el-rate v-model="laborForm.level_cd" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="其他">
              <el-input type="textarea" style="width: 100%;" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('laborInfo')">确认</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
      dialogFormVisible: false,
      tempRadio: false,
      tempSelectRow: '',
      laborForm: {
        name: '',
        pos_cd: '',
        unit: '',
        work_day: '',
        level_cd: '',
        pm_yn: false,
        apr_cd: 'new',
        iv_dt: '',
        iv_str_dt: '',
        iv_end_dt: '',
        birthday: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        pos_cd: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择生日', trigger: 'change' }
        ],
        iv_str_dt: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        iv_end_dt: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        unit: [
          { required: true, message: '请填写单价', trigger: 'blur' }
        ]
      },
      tableData: [],
      tempSelectedData: []
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
      return sums
    },
    singleElection(row) {
      this.tempSelectRow = this.tableData.indexOf(row)
    },
    /* 表格多选空点击事件 */
    handleTbChk(selection, row) {
      console.log('handleTbChk >>>>', selection, row)
      // 初始化
      this.tempSelectedData = selection
      console.log('tempSelectedData >>>>', this.tempSelectedData)
    },
    /* 窗口点击确认 */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 删除 */
    delLabor() {
      /* 实际删除应走后端，但现在只呈现画面效果 */
      /* 判断有没有check */
      if (!this.tempSelectedData || this.tempSelectedData.length === 0) {
        return
      }
      this.tableData.forEach((element, index) => {
        if (this.tempSelectedData.some(item => item.id === element.id)) {
          this.tableData.splice(index, 1)
        }
      })
    },
    /* 弹窗关闭 */
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogFormVisible = false
        })
        .catch(_ => {})
    }
  }
}
</script>
