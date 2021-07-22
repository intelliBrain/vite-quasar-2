<template>
  <div>
    <div class="row my-lg">
      <icon-mdi-account class="q-mr-sm text-h6" />
      <span class="text-subtitle2">全部人员({{ userList.length }}人)</span>
    </div>

    <div class="bg-grey-2 q-py-md q-px-md">
      <div class="row">
        <q-btn color="primary" size="md" @click="create">添加成员</q-btn>
        <q-select
          outlined
          clearable
          dense
          class="q-mx-md w-220px"
          v-model="params.enabled"
          :options="statusOptions"
          label="请选择状态"
          option-value="value"
          option-label="label"
          emit-value
          map-options
        />
        <q-input
          outlined
          clearable
          dense
          class="w-220px"
          v-model="params.keyword"
          label="姓名或者账号"
        />
      </div>
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
                @click="editUser(props.row)"
              >
                <template v-slot:label>
                  <div class="row items-center no-wrap pl-sm">
                    <icon-mdi-square-edit-outline />
                    <div class="text-center px-sm">编辑</div>
                  </div>
                </template>
                <q-list class="text-caption" dense>
                  <q-item clickable v-close-popup @click="resetPassword(props.row)">
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
    <div>
      <UserDialog v-if="userDialog" :user="user" @confirm="onConfirm" @close="onClose">
      </UserDialog>
      <PasswordResetDialog
        v-if="passwordDialog"
        @confirm="onPasswordConfirm"
        @close="onPasswordClose"
      ></PasswordResetDialog>
    </div>
  </div>
</template>

<script>
import { toRefs, onMounted, watch, ref, reactive, watchEffect } from 'vue'
import { userApi } from '@/api/user.js'
import UserDialog from '@/components/authority/UserDialog.vue'
import PasswordResetDialog from '@/components/authority/user/PasswordResetDialog.vue'
export default {
  components: { UserDialog, PasswordResetDialog },
  props: {
    departmentId: {
      type: Number,
      required: true
    }
  },
  setup(props, context) {
    const { departmentId } = toRefs(props)
    const state = reactive({
      params: { departmentId: '', enabled: '', keyword: '' }
    })
    const statusOptions = [
      { label: '离职', value: false },
      { label: '在职', value: true }
    ]

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
      state.params.departmentId = departmentId
      userApi.list(state.params).then((res) => {
        userList.value = res.data.records
      })
    }
    //人员修改开始
    const user = ref({})
    const userDialog = ref(false)
    const passwordDialog = ref(false)

    const create = () => {
      user.value = {}
      userDialog.value = true
    }
    const editUser = (item) => {
      userDialog.value = true
      user.value = item
      console.log(item)
    }
    const resetPassword = (item) => {
      passwordDialog.value = true
      console.log(item)
    }
    const onConfirm = (savedUser, dep) => {
      if (dep.id == department.value.id || department.value.id == '1') {
        if (user.value.id) {
          let index = userList.value.findIndex((item) => item.id == user.value.id)
          userList.value.splice(index, 1, savedUser)
        } else {
          userList.value.push(savedUser)
        }
      }
      userDialog.value = false
    }
    const onClose = () => {
      userDialog.value = false
    }
    const onPasswordConfirm = () => {
      passwordDialog.value = false
    }
    const onPasswordClose = () => {
      passwordDialog.value = false
    }
    //人员修改结束
    onMounted(() => {
      searchUsers()
    })
    watch(state, (newValue, oldValue) => {
      console.log(150, newValue, oldValue)
      searchUsers()
    })

    watch(departmentId, (newValue, oldValue) => {
      console.log(155, newValue, oldValue)
      searchUsers()
    })
    watchEffect(() => {
      console.log(state.params, departmentId)
    })
    return {
      columns,
      userList,
      searchUsers,
      //人员修改开始
      user,
      userDialog,
      passwordDialog,
      create,
      editUser,
      resetPassword,
      onConfirm,
      onClose,
      onPasswordConfirm,
      onPasswordClose,
      statusOptions,
      ...toRefs(state)
      //人员修改结束
    }
  }
}
</script>

<style></style>
