<template>
  <article class="page">
    <section class="aside">
      <div class="q-pa-md q-gutter-sm">
        <q-tree
          ref="tree"
          :nodes="departmentTree"
          node-key="id"
          accordion
          default-expand-all
          selected-color="primary"
          v-model:selected="departmentId"
        >
          <template v-slot:default-header="prop">
            <div
              class="row items-center fit mett-tree-item cursor-pointer"
              draggable="true"
              @drop="drop($event, prop.key)"
              @dragenter="dragEnter"
              @dragover="dragOver"
              @dragleave="dragLeave"
              @dragstart="dragStart($event, prop.key)"
              @dragend="dragStop"
            >
              <icon-mdi-waze class="text-h6 text-weight-bold" />
              <div>
                {{ prop.node.name }}
              </div>
            </div>
          </template>
        </q-tree>
      </div>
    </section>
    <section class="main">
      <div class="row" v-if="departmentId == '1'">
        <q-select
          outlined
          clearable
          v-model="model"
          :options="options"
          label="请选择部门"
          :dense="true"
          class="q-ma-md flex-1"
        />
        <q-select
          outlined
          clearable
          v-model="model"
          :options="options"
          label="请选择状态"
          :dense="true"
          class="q-ma-md flex-1"
        />
        <q-select
          outlined
          clearable
          v-model="model"
          :options="options"
          label="姓名或者账号"
          :dense="true"
          class="q-ma-md flex-1"
        />
      </div>
      <div>
        <span class="text-h6 vertical-middle q-ml-md">{{
          selectedDep ? selectedDep.name : ''
        }}</span>
        <q-btn
          class="q-mx-md"
          outline
          color="primary"
          label="设置"
          size="md"
          @click="editDepartment"
        />
        <q-btn outline color="primary" label="添加子部门" size="md" @click="createDepartment" />
      </div>
      <div class="q-ma-md">
        <List :department="selectedDep" />
      </div>
    </section>
    <section>
      <department-dialog
        @create="onCreate"
        @update="onUpdate"
        @close="onClose"
        :department="department"
        :parentDepartment="parentDepartment"
        v-if="showDialog"
      ></department-dialog>
    </section>
  </article>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { departmentApi } from '@/api/department.js'
import DepartmentDialog from '@/components/authority/department/Dialog.vue'
import List from '@/components/authority/user/List.vue'
import utils from '@/util/utils.js'
import { useQuasar } from 'quasar'
export default {
  components: { DepartmentDialog, List },
  setup() {
    const $q = useQuasar()
    const showDialog = ref(false)
    const departmentList = ref([])
    const departmentTree = ref([])
    const departmentId = ref('')
    const department = ref({})
    const parentDepartment = ref({})
    //
    const model = ref()
    //
    const selectedDep = computed(
      () => departmentList.value.filter((dep) => dep.id == departmentId.value)[0] || {}
    )
    const selectedParentDep = computed(
      () =>
        departmentList.value.filter((dep) => dep.id == selectedDep.value.parentId)[0] || {
          name: '公司'
        }
    )

    const search = () => {
      departmentApi.search().then((res) => {
        departmentList.value = res.data
        departmentTree.value = utils.buildTree(departmentList.value)
      })
    }
    const createDepartment = () => {
      if (!departmentId.value) {
        $q.notify({
          type: 'warning',
          message: '请先选择部门'
        })
      } else {
        parentDepartment.value = selectedDep.value
        department.value = {}
        showDialog.value = true
      }
    }
    const editDepartment = () => {
      if (!departmentId.value) {
        $q.notify({
          type: 'warning',
          message: '请先选择部门'
        })
      } else {
        department.value = selectedDep.value
        parentDepartment.value = selectedParentDep.value
        showDialog.value = true
      }
    }
    const onCreate = (dep) => {
      departmentList.value.push(dep)
      departmentTree.value = utils.buildTree(departmentList.value)
      showDialog.value = false
    }
    const onUpdate = (dep) => {
      let index = utils.indexInArray(departmentList.value, dep.id)
      departmentList.value.splice(index, 1, dep)
      departmentTree.value = utils.buildTree(departmentList.value)
      showDialog.value = false
    }
    const onClose = () => {
      showDialog.value = false
    }
    //树的移动
    const tree = ref()
    const getNodeParent = (elem) => {
      let parent = null
      while (elem.parentNode && !parent) {
        elem = elem.parentNode
        if (elem.classList.contains('q-tree__node')) parent = elem
      }
      return parent
    }
    const getNodeById = (node, id, currentIndex, parentNode) => {
      let array
      let parent
      if (!Array.isArray(node)) {
        parent = node
        if (node.id === id) return { node: node, index: currentIndex, parent: parentNode }
        array = node.children
      } else {
        array = node
      }
      if (array) {
        let i
        let result = null
        for (i = 0; result == null && i < array.length; i++) {
          result = getNodeById(array[i], id, i, parent)
        }
        return result
      }
      return null
    }
    const moveNode = (from, to) => {
      if (from === to) return

      // 根据id 查询该节点值
      let fromResult = getNodeById(departmentTree.value, from, -1)

      let toResult = to === 'root' ? null : getNodeById(departmentTree.value, to, -1)

      if (fromResult) {
        // Return if trying to move a parent node into a child of that same parent
        if (toResult && getNodeById(fromResult.node, toResult.node.id, -1)) return

        if (fromResult.parent && fromResult.parent.children) {
          fromResult.parent.children.splice(fromResult.index, 1)
        } else {
          departmentTree.value.splice(fromResult.index, 1)
        }

        if (toResult && toResult.node) {
          if (toResult.node.children) {
            toResult.node.children.splice(0, 0, fromResult.node)
          } else {
            // Vue.set(toResult.node, 'children', [fromResult.node])
            toResult.node.children = []
            toResult.node.children.push(fromResult.node)
          }
          // this.$refs.tree.setExpanded(toResult.node.label, true)
          tree.value.setExpanded(toResult.node.label, true)
        } else if (to === 'root') {
          departmentTree.value.splice(departmentTree.value.length, 0, fromResult.node)
        }
      }
    }
    const dragEnter = (event) => {
      event.preventDefault()
    }
    const dragOver = (event) => {
      event.preventDefault()
      let target = event.target
      if (target) target.classList.add('container')
    }
    const dragLeave = (event) => {
      event.preventDefault()
      let target = event.target
      if (target) target.classList.remove('container')
    }
    const dragStart = (event, key) => {
      if (event.target) {
        let target = event.target
        let parent = getNodeParent(target)
        if (parent) parent.classList.add('dragging')
      }
      if (event.dataTransfer && event.target) event.dataTransfer.setData('node', key)
    }
    const dragStop = (event) => {
      if (event.target) {
        let target = event.target
        let parent = getNodeParent(target)
        if (parent) parent.classList.remove('dragging')
      }
    }
    const drop = (event, key) => {
      event.preventDefault()
      let target = event.target
      let nodeKey = ''
      if (event.dataTransfer) nodeKey = event.dataTransfer.getData('node')
      if (target) target.classList.remove('container')
      if (nodeKey) {
        moveNode(nodeKey, key)
        console.log(`Move ${nodeKey} to ${key}`)
      }
    }
    //结束
    onMounted(() => {
      departmentId.value = '1'
      search()
    })
    return {
      departmentList,
      departmentTree,
      departmentId,
      department,
      selectedDep,
      parentDepartment,
      selectedParentDep,
      editDepartment,
      createDepartment,
      onCreate,
      onUpdate,
      onClose,
      showDialog,
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      model,
      getNodeParent,
      getNodeById,
      moveNode,
      dragEnter,
      dragOver,
      dragLeave,
      dragStart,
      dragStop,
      drop,
      tree
    }
  }
}
</script>

<style lang="scss" scoped>
[draggable='true'] {
  /*
   To prevent user selecting inside the drag source
  */
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.mett-page-tree {
  .q-tree__node-header {
    padding: 0;
  }

  .q-tree__node--child > .q-tree__node-header {
    &:focus {
      box-shadow: none;
    }
  }

  .q-tree__node {
    &.dragging {
      background: rgba(#333f52, 0.1);
      border-radius: 4px;

      .q-hoverable:hover > .q-focus-helper {
        background: none;
        opacity: 0;
      }
    }
  }
}

.mett-tree-item {
  border-radius: 4px;
  padding: 8px;

  &.container {
    background: rgba(#008847, 0.1);
  }
}
</style>
