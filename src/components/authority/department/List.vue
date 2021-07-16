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
      <UserList />
    </section>
    <department-dialog
      @confirm="onConfirm"
      @close="onClose"
      :currentDepartment="currentDepartment"
      :parentDepartment="parentDepartment"
      v-if="showDialog"
    ></department-dialog>
  </article>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { departmentApi } from '@/api/department.js'
import DepartmentDialog from '@/components/DepartmentDialog.vue'
import utils from '@/util/utils.js'
import { useQuasar } from 'quasar'
import UserList from 'src/components/authority/user/List.vue'
export default {
  components: {
    DepartmentDialog,
    UserList
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
