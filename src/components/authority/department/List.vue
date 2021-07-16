<template>
  <article class="page">
    <section class="aside">
      <div class="q-pa-md q-gutter-sm">
        <q-tree
          :nodes="departmentTree"
          node-key="id"
          label-key="name"
          selected-color="primary"
          v-model:selected="departmentId"
          default-expand-all
        />
      </div>
    </section>
    <section class="main">
      <div>
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
import utils from '@/util/utils.js'
import { useQuasar } from 'quasar'
export default {
  components: { DepartmentDialog },
  setup() {
    const $q = useQuasar()
    const showDialog = ref(false)
    const departmentList = ref([])
    const departmentTree = ref([])
    const departmentId = ref('')
    const department = ref({})
    const parentDepartment = ref({})

    const selectedDep = computed(
      () => departmentList.value.filter((dep) => dep.id == departmentId.value)[0]
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
    onMounted(() => {
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
      showDialog
    }
  }
}
</script>

<style lang="scss" scoped></style>
