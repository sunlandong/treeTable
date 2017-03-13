<template>
  <div class="hello">
    <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource"></tree-grid>
  </div>
</template>

<script>
import {TreeGrid} from './treeTable'
export default {
  name: 'hello',
  data () {
    return {
      columns: [
          {
            text: '姓名',
            dataIndex: 'name'
          },
          {
            text: '年龄',
            dataIndex: 'age'
          },
          {
            text: '性别',
            dataIndex: 'sex'
          }
        ],
      dataSource: [
        {
          id: 1,
          parentId: 0,
          name: '测试1',
          age: 18,
          sex: '男',
          children: [
            {
              id: 2,
              parentId: 1,
              name: '测试2',
              age: 22,
              sex: '男'
            }
          ]
        },
        {
          id: 3,
          parentId: 0,
          name: '测试3',
          age: 23,
          sex: '女',
          children: [
            {
              id: 4,
              parentId: 3,
              name: '测试4',
              age: 22,
              sex: '男'
            },
            {
              id: 5,
              parentId: 3,
              name: '测试5',
              age: 25,
              sex: '男'
            },
            {
              id: 6,
              parentId: 3,
              name: '测试6',
              age: 26,
              sex: '女',
              children: [
                {
                  id: 7,
                  parentId: 6,
                  name: '测试7',
                  age: 27,
                  sex: '男'
                }
              ]
            }
          ]
        },
        {
          id: 18,
          parentId: 0,
          name: '测试8',
          age: 18,
          sex: '男'
        }
      ]
    }
  },
  components: {
    TreeGrid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
