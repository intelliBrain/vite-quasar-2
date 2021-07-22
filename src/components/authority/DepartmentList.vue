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
          class="page-tree"
        >
          <template v-slot:default-header="prop">
            <div class="row items-center fit met-tree-item cursor-pointer">
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
      <div>
        <span class="text-h6 vertical-middle q-ml-md">
          {{ selectedDep.name }}
        </span>
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
        <UserList :departmentId="departmentId" />
      </div>
    </section>
    <section>
      <DepartmentDialog
        @confirm="onConfirm"
        @close="onClose"
        :department="department"
        :parentDepartment="parentDepartment"
        v-if="showDialog"
      ></DepartmentDialog>
    </section>
  </article>
</template>

<script>
import { ref, reactive, onMounted, computed, toRefs } from 'vue'
import { departmentApi } from '@/api/department.js'
import DepartmentDialog from '@/components/authority/DepartmentDialog.vue'
import UserList from '@/components/authority/UserList.vue'
import utils from '@/util/utils.js'
import { useQuasar } from 'quasar'
export default {
  components: { DepartmentDialog, UserList },
  setup() {
    const $q = useQuasar()
    const showDialog = ref(false)
    const departmentList = ref([])
    const departmentTree = ref([])
    const department = ref({})
    const parentDepartment = ref({})
    const departmentId = ref(1)
    //
    const model = ref()

    const selectedDep = computed(
      () => departmentList.value.find((dep) => dep.id == departmentId) || {}
    )
    const selectedParentDep = computed(
      () =>
        departmentList.value.filter((dep) => dep.id == selectedDep.value.parentId) || {
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
      if (!departmentId) {
        $q.notify({
          type: 'warning',
          message: '请先选择部门'
        })
      } else {
        parentDepartment.value = selectedDep.value
        department.value = { name: '' }
        showDialog.value = true
      }
    }
    const editDepartment = () => {
      if (!departmentId) {
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
    const onConfirm = (dep) => {
      if (!department.value.id) {
        departmentList.value.push(dep)
      } else {
        let index = departmentList.value.findIndex((item) => item.id == dep.id)
        departmentList.value.splice(index, 1, dep)
      }
      departmentTree.value = utils.buildTree(departmentList.value)
      showDialog.value = false
    }
    const onClose = () => {
      showDialog.value = false
    }
    //树的移动
    const tree = ref()

    //结束
    onMounted(() => {
      search()
    })
    return {
      departmentList,
      departmentTree,
      department,
      selectedDep,
      parentDepartment,
      selectedParentDep,
      departmentId,
      editDepartment,
      createDepartment,
      onConfirm,
      onClose,
      showDialog,
      model,
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

.page-tree {
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

.met-tree-item {
  border-radius: 4px;
  padding: 8px;

  &.container {
    background: rgba(#008847, 0.1);
  }
}
</style>
