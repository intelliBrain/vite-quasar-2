<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 750px">
        <q-card-section>人员添加 </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="row">
              <div class="col-1 text-sm">基础信息</div>
              <div class="col-11"><q-separator class="mt-2" /></div>
            </div>
            <q-input
              outlined
              v-model="form.nickname"
              :rules="rules.nickname"
              dense
              clearable
              label="姓名"
              hint="请输入姓名"
            />
            <q-input
              outlined
              dense
              clearable
              mask="N"
              reverse-fill-mask
              v-model="form.username"
              :rules="rules.username"
              label="账号"
              hint="请输入账号"
              :disable="!!form.id"
            />
            <q-input
              outlined
              dense
              clearable
              v-model="form.phone"
              :rules="rules.phone"
              type="tel"
              label="手机号码"
              hint="请输入手机号码"
            />
            <q-input
              outlined
              dense
              clearable
              v-model="form.email"
              :rules="rules.email"
              type="email"
              label="邮箱地址"
              hint="请输入邮箱地址"
            />
            <q-input
              v-if="!form.id"
              outlined
              dense
              clearable
              v-model="form.password"
              :rules="rules.password"
              :type="isPwd ? 'password' : 'text'"
              label="密码"
              hint="请输入密码"
            >
              <template v-slot:append>
                <q-icon
                  type="text"
                  :name="isPwd ? matVisibilityOff : matVisibility"
                  @click="isPwd = !isPwd"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-select
              outlined
              clearable
              dense
              stack-label
              :options="departments"
              v-model="form.departmentId"
              :rules="rules.departmentId"
              label="请选择部门"
              option-value="id"
              option-label="name"
              emit-value
              map-options
            />
            <q-select
              outlined
              clearable
              dense
              v-model="form.enabled"
              :rules="rules.enabled"
              :options="enabledList"
              stack-label
              label="请选择状态"
              option-value="value"
              option-label="label"
              emit-value
              map-options
            />
            <div class="row">
              <div class="col-1 text-sm">角色信息</div>
              <div class="col-11"><q-separator class="mt-2" /></div>
            </div>
            <q-select
              outlined
              clearable
              dense
              multiple
              v-model="form.roles"
              :rules="rules.roles"
              :options="roles"
              option-value="id"
              option-label="name"
              emit-value
              map-options
              stack-label
              use-chips
              label="角色"
            />
            <div>
              <q-btn label="确认" type="submit" color="primary" />
              <q-btn label="取消" type="reset" color="primary" flat class="ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { matVisibility, matVisibilityOff } from '@quasar/extras/material-icons'
import { passwordRegex, phoneRegex, emailRegex } from '@/util/regex.js'
import { roleApi, userApi } from '@/api/user.js'
import { departmentApi } from '@/api/department.js'
import { useQuasar } from 'quasar'
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['confirm', 'close'],
  setup(props, context) {
    const $q = useQuasar()

    const { user } = toRefs(props)

    const roles = ref([])
    const departments = ref([])
    const listDepartment = () => {
      departmentApi.search().then((res) => {
        departments.value = res.data
      })
    }
    const listRoles = () => {
      roleApi.list().then((res) => {
        roles.value = res.data
      })
    }
    const state = reactive({
      form: {}
    })
    const show = ref(true)
    const rules = ref({
      nickname: [
        (val) => (val && val.length > 0) || '请填写昵称',
        (val) => val.length < 20 || '昵称长度过长'
      ],
      username: [
        (val) => (val && val.length > 0) || '请填写用户名',
        (val) => val.length < 15 || '用户名长度过长',
        (val) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let params = {
                type: 'username',
                id: state.form.id,
                value: val
              }
              userApi.check({ params: params }).then((res) => {
                if (res.data) {
                  resolve(true)
                } else {
                  resolve('用户名重复，不可用')
                }
              })
            }, 350)
          })
        }
      ],
      phone: [
        (val) => (val && val.length > 0) || '请填写手机号',
        (val) => phoneRegex(val) || '手机号格式错误',
        (val) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let params = {
                type: 'phone',
                id: state.form.id,
                value: val
              }
              userApi.check({ params: params }).then((res) => {
                if (res.data) {
                  resolve(true)
                } else {
                  resolve('手机号重复，不可用')
                }
              })
            }, 350)
          })
        }
      ],
      email: [
        (val) => (val && val.length > 0) || '请填写邮箱',
        (val) => emailRegex(val) || '邮箱格式错误',
        (val) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let params = {
                type: 'email',
                id: state.form.id,
                value: val
              }
              userApi.check({ params: params }).then((res) => {
                if (res.data) {
                  resolve(true)
                } else {
                  resolve('邮箱重复，不可用')
                }
              })
            }, 350)
          })
        }
      ],
      password: [
        (val) => (val && val.length > 0) || '请填写密码',
        (val) => (val.length >= 12 && val.length <= 30) || '密码长度应为12-30个字符',
        (val) => passwordRegex(val) || '密码需包含大写字母、小写字母、数字、特殊符号'
      ],
      departmentId: [(val) => val || '请选择部门'],
      enabled: [(val) => val == true || val == false || '请选择状态'],
      roles: [(val) => (val && val.length > 0) || '请选择角色']
    })
    const isPwd = ref(true)
    const enabledList = [
      { label: '离职', value: false },
      { label: '在职', value: true }
    ]
    const onSubmit = () => {
      let promise = null
      state.form.roles = state.form.roles.map((item) => roles.value.find((role) => role.id == item))
      state.form.department = departments.value.find((item) => item.id == state.form.departmentId)
      if (state.form.id) {
        promise = userApi.update(state.form)
      } else {
        promise = userApi.create(state.form)
      }
      promise.then((res) => {
        $q.notify({
          type: 'positive',
          message: state.form.id ? '修改人员成功' : '新建人员成功'
        })
        context.emit('confirm', res.data, state.form.department)
      })
    }
    const onReset = () => {
      context.emit('close')
    }
    const formatForm = () => {
      state.form = JSON.parse(JSON.stringify(user.value))
      let form = state.form
      if (form.id) {
        state.form.departmentId = form.department.id
        let roles = form.roles || []
        state.form.roles = roles.map((item) => item.id)
      }
    }
    onMounted(() => {
      formatForm()
      listRoles()
      listDepartment()
    })
    return {
      roles,
      departments,
      listRoles,
      listDepartment,
      ...toRefs(state),
      show,
      enabledList,
      onSubmit,
      onReset,
      rules,
      isPwd,
      matVisibility,
      matVisibilityOff
    }
  }
}
</script>

<style></style>
