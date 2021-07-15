<template>
  <q-page class="p-md">
    <span class="text-xl text-gray-700">{{ tabs[tab] }}</span>
    <q-tabs
      v-model="tab"
      class="bg-grey-2 text-gray my-md"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <q-tab name="department" :label="tabs['department']"> </q-tab>
      <q-tab name="role" :label="tabs['role']"></q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="role" class="no-padding">
        <RoleList />
      </q-tab-panel>
      <q-tab-panel name="department" class="no-padding">
        <DepartmentList />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import RoleList from 'src/components/authority/role/List.vue'
import DepartmentList from 'src/components/authority/department/List.vue'
export default {
  components: {
    RoleList,
    DepartmentList
  },
  setup() {
    const tab = ref('department')
    const tabs = {
      role: '角色管理',
      department: '组织架构'
    }
    return {
      tab,
      tabs
    }
  }
}
</script>

<style lang="scss" scoped></style>
