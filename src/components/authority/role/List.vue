<template>
  <article class="page">
    <section class="aside no-padding bg-grey-2">
      <div class="text-sm text-gray-500">
        <div
          class="p-sm cursor-pointer item"
          :class="{ active: item.id == selectedRole.id }"
          v-for="(item, index) in roles"
          :key="index"
          @click="selectedRole = item"
        >
          {{ item.name }}
        </div>
        <div class="btn-add" @click="createRole">新增角色</div>
      </div>
    </section>
    <section class="main">
      <div>
        <span class="text-h6 m-md">{{ selectedRole.name || '' }}</span>
      </div>
      <div class="bg-grey-2 py-sm pl-md m-md">
        <q-btn color="primary" size="md" @click="editRole">角色编辑</q-btn>
      </div>
      <div class="m-md">
        <q-table
          :columns="columns"
          :rows="selectedRole.privileges"
          row-key="index"
          class="no-box-shadow"
          no-data-label="该角色暂无权限，请为其添加权限。"
          hide-pagination
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="index" :props="props">
                {{ props.rowIndex + 1 }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </section>
    <section>
      <RoleDialog v-if="showDialog" :role="role" @confirm="onConfirm" @close="onClose" />
    </section>
  </article>
</template>

<script>
import { onMounted, ref } from 'vue'
import RoleDialog from '@/components/authority/role/Dialog.vue'
import { roleApi } from '@/api/user.js'
export default {
  components: { RoleDialog },
  setup() {
    const roles = ref([])
    const listRoles = () => {
      roleApi.list().then((res) => {
        roles.value = res.data
        selectedRole.value = roles.value[0]
      })
    }
    const role = ref({})
    const selectedRole = ref({})
    const showDialog = ref(false)
    const createRole = () => {
      role.value = {
        name: '',
        privileges: []
      }
      showDialog.value = true
    }
    const editRole = () => {
      role.value = selectedRole.value
      showDialog.value = true
    }
    const onConfirm = (data) => {
      if (!role.value.id) {
        roles.value.push(data)
      } else {
        let index = roles.value.findIndex((item) => item.id == data.id)
        roles.value.splice(index, 1, data)
      }
      selectedRole.value = data
      showDialog.value = false
    }
    const onClose = () => {
      showDialog.value = false
    }
    const columns = [
      {
        name: 'index',
        label: '序号',
        field: 'index',
        align: 'left'
      },
      { name: 'name', label: '权限名', field: 'name', align: 'left' },
      { name: 'description', label: '权限描述', field: 'description' }
    ]
    onMounted(() => {
      listRoles()
    })
    return {
      listRoles,
      roles,
      role,
      selectedRole,
      columns,
      createRole,
      editRole,
      onConfirm,
      onClose,
      showDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #e7e7e7;
  &.active {
    background: #027be3;
    color: #fff;
  }
}

.btn-add {
  position: absolute;
  bottom: 0;
  height: 44px;
  left: 0;
  line-height: 44px;
  background: #ebebeb;
  text-align: center;
  width: 300px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
</style>
