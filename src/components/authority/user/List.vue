<template>
  <div>
    <div class="row my-lg">
      <icon-mdi-account class="q-mr-sm text-h6" />
      <span class="text-subtitle2">全部人员(10人)</span>
    </div>
    <div class="bg-grey-2 q-py-sm q-pl-md">
      <q-btn color="primary" size="md" @click="create">添加成员</q-btn>
    </div>
    <div class="q-mt-md">
      <q-table
        :columns="columns"
        :rows="userList"
        row-key="name"
        class="no-box-shadow"
        hide-pagination
        :rows-per-page-options="[0]"
        no-data-label="该条件没有查到符合的人员！"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nickname" :props="props">
              {{ props.row.nickname }}
            </q-td>
            <q-td key="department" :props="props">
              {{ props.row.department.name }}
            </q-td>
            <q-td key="enabled" :props="props">
              {{ props.row.enabled ? '在职' : '离职' }}
            </q-td>
            <q-td key="roles" :props="props">
              <span v-for="role in props.row.roles" :key="role.id" class="pl-sm">
                {{ role.name }}
              </span>
            </q-td>
            <q-td key="operating" :props="props">
              <q-btn-dropdown
                split
                color="primary"
                outline
                size="md"
                dense
                @click="onItemClick('edit')"
              >
                <template v-slot:label>
                  <div class="row items-center no-wrap pl-sm">
                    <icon-mdi-square-edit-outline />
                    <div class="text-center px-sm">编辑</div>
                  </div>
                </template>
                <q-list class="text-caption" dense>
                  <q-item clickable v-close-popup @click="onItemClick('password')">
                    <q-item-section>
                      <q-item-label class="row">
                        <icon-mdi-square-edit-outline />
                        <span class="q-ml-sm">修改密码</span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { toRefs, onMounted, watch } from 'vue'
import { userApi } from '@/api/user.js'
export default {
  props: {
    department: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const { department, filter } = toRefs(props)
    const columns = [
      {
        name: 'nickname',
        required: true,
        label: '姓名',
        align: 'left'
      },
      { name: 'department', align: 'center', label: '所在部门', field: 'department' },
      { name: 'enabled', label: '状态', field: 'enabled' },
      { name: 'roles', label: '角色', field: 'roles', align: 'center' },
      { name: 'operating', label: '操作', field: 'operating' }
    ]
    const userList = ref([])
    const searchUsers = () => {
      userApi.list(filter.value).then((res) => {
        userList.value = res.data.records
      })
    }
    const onItemClick = (item) => {
      console.log(item)
    }
    const create = () => {
      console.log('create')
    }
    onMounted(() => {
      searchUsers()
    })
    watch(filter.value, (newValue, oldValue) => {
      searchUsers()
    })
    watch(filter, (newValue, oldValue) => {
      searchUsers()
    })
    return { columns, onItemClick, create, userList, searchUsers }
  }
}
</script>

<style></style>
