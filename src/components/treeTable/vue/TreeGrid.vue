<template>
  <el-table :data="tableData" border style="width: 100%" :row-style="showTr">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text">
      <template slot-scope="scope">
        <template v-if="!scope.row.editable">
          <!-- 缩进显示 -->
          <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>

          <el-button type="text" size="mini" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-arrow-right" aria-hidden="true"></i>
            <i v-if="scope.row._expanded" class="el-icon-arrow-down" aria-hidden="true"></i>
          </el-button>
          <span v-else-if="index===0" class="ms-tree-space"></span>
          {{scope.row[column.dataIndex]}}
        </template>
        <template v-else>
          <el-input v-model="scope.row[column.dataIndex]" placeholder="请输入内容" size="small"></el-input>
        </template>
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="treeType === 'normal'" width="400">
      <template slot-scope="scope">
        <template v-if="!scope.row.editable">
          <el-button size="small" @click="edit(scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, tableData)">
            删除
          </el-button>
        </template>
        <template v-else>
          <el-button size="small" @click="cancleEdit(scope.row)">
            取消
          </el-button>
          <el-button size="small" type="warning" @click="confirmEdit(scope.row)">
            确认
          </el-button>
        </template>

        <el-button type="success" size="small" @click="addSibling(scope.row, scope.$index)">
          添加同级
        </el-button>
        <el-button type="info" size="small" @click="addChild(scope.row)">
          添加下级
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import Utils from '../utils/index.js'
  export default {
    name: 'tree-grid',
    props: {
      // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      // 这是相应的字段展示
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 这是数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: function () {
          return ''
        }
      },
      // 这个是是否展示操作列
      treeType: {
        type: String,
        default: function () {
          return 'normal'
        }
      },
      // 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {
        tableData: []
      }
    },
    computed: {
    // 格式化数据源
      // data() {
      //   let me = this
      //   if (me.treeStructure) {
      //     let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
      //     return data
      //   }
      //   return me.dataSource
      // },
      // tableData() {
      //   let transfer = this.data.map(item => {
      //     this.$set(item, 'editable', false) // https://vuejs.org/v2/guide/reactivity.html
      //     // 将原有的值复制一份到以'_'开头的键中,取消编辑时用到
      //     for(let key in item){
      //       if(!['id', 'parentId', 'editable', 'children'].includes(key) && key[0] != '_'){
      //         this.$set(item, `_${key}`, item[key])
      //       }
      //     }
      //     return item
      //   })
      //   return transfer
      // }
    },
    methods: {
      formatData(){
        if (this.treeStructure) {
          let data = Utils.MSDataTransfer.treeToArray(this.dataSource, null, null, this.defaultExpandAll)
          this.tableData  = data
          return
        }
        this.tableData = this.dataSource
      },
      backupData(data){
        data = data.map(item => {
          this.$set(item, 'editable', false) // https://vuejs.org/v2/guide/reactivity.html
          // 将原有的值复制一份到以'_'开头的键中,取消编辑时用到
          for(let key in item){
            if(!['id', 'parentId', 'editable', 'children'].includes(key) && key[0] != '_'){
              this.$set(item, `_${key}`, item[key])
            }
          }
          return item
        })
      },
      // 显示行
      showTr(row, index) {
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
        row._show = show
        return show ? '' : 'display:none;'
      },
      // 展开下级
      toggle(trIndex) {
        let record = this.tableData[trIndex]
        record._expanded = !record._expanded
      },
      // 显示层级关系的空格和图标
      spaceIconShow(index) {
        if (this.treeStructure && index === 0) {
          return true
        }
        return false
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow(index, record) {
        if (this.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      edit(row){
        console.log(this.tableData)
        row.editable = true
      },
      handleDelete(rowIndex, tableData) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          tableData.splice(rowIndex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      cancleEdit(row){
        // 从保存的旧值恢复
        for(let key in row){
          if (!['id', 'parentId', 'editable', 'children'].includes(key) && key[0] != '_'){
            if(`_${key}` in row && row[key] != row[`_${key}`]){
              row[key] = row[`_${key}`]
            }
          }
        }
        row.editable = false
      },
      confirmEdit(row){
        for(let key in row){
          // 替换掉旧的备份
          if (!['id', 'parentId', 'editable', 'children'].includes(key) && key[0] != '_'){
            if(`_${key}` in row && row[key] != row[`_${key}`]){
              row[`_${key}`] = row[key]
            }
          }
        }
        row.editable = false
      },
      addSibling(row, index){
        // this.tabeData[index].splice(index, )
      },
      addChild(row){

      },

    },
    created(){
      this.formatData()
      this.backupData(this.tableData)
    }
  }
</script>
<style scoped>
  .ms-tree-space{
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before{
    content: ""
  }
  table td{
    line-height: 26px;
  }
</style>
