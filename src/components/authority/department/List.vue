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
        <q-btn class="q-mx-md" @click="editDepartment">设置</q-btn>
        <q-btn @click="createDepartment">添加子部门</q-btn>
      </div>
    </section>
    <section>
      <department-dialog
        @confirm="onConfirm"
        @close="onClose"
        :currentDepartment="currentDepartment"
        :parentDepartment="parentDepartment"
        v-if="showDialog"
      ></department-dialog>
    </section>
  </article>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { departmentApi } from '@/api/department.js'
import DepartmentDialog from '@/components/DepartmentDialog.vue'
import utils from '@/util/utils.js'
import { useQuasar } from 'quasar'
export default {
  components: { DepartmentDialog },
  setup() {
    const $q = useQuasar()
    const showDialog = ref(false)
    const departmentList = ref([])
    const departmentTree = ref([])
    const currentDepartment = ref([])
    const departmentId = ref('')

    const department = computed(
      () => departmentList.value.filter((dep) => dep.id == departmentId.value)[0]
    )
    const parentDepartment = computed(
      () =>
        departmentList.value.filter((dep) => dep.id == department.value.parentId)[0] || {
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
        currentDepartment.value = {
          name: department.value.name
        }

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
        currentDepartment.value = department.value
        showDialog.value = true
      }
    }
    const onConfirm = (dep) => {
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
      editDepartment,
      createDepartment,
      onConfirm,
      onClose,
      department,
      parentDepartment,
      currentDepartment,
      departmentId,
      showDialog
    }
  }
}
</script>

<style lang="scss" scoped></style>
