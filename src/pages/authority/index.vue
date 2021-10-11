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

    <q-tab-panels v-model="tab" animated keep-alive>
      <q-tab-panel :key="'role'" name="role" class="no-padding">
        <RoleList />
      </q-tab-panel>
      <q-tab-panel :key="'department'" name="department" class="no-padding">
        <DepartmentList />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
const tab = ref('department')
const tabs = {
  role: 'Role',
  department: 'department'
}
</script>

<style lang="scss" scoped></style>
