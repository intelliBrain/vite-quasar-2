<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>角色管理 </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="form.name"
              dense
              label="角色名称"
              hint="角色名称"
              lazy-rules
              :rules="rules.name"
            />
            <q-field
              borderless
              label="权限"
              :model-value="form.privileges"
              :rules="rules.privileges"
              stack-label
            >
              <q-option-group
                name="accepted_genres"
                v-model="form.privileges"
                :options="privileges"
                type="checkbox"
                color="primary"
                inline
              />
            </q-field>
            <div>
              <q-btn label="确认" type="submit" color="primary" />
              <q-btn label="删除" @click="deleteRole" class="ml-sm" color="red" v-if="form.id" />
              <q-btn label="取消" type="reset" color="primary" flat class="ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { roleApi } from '@/api/user.js'
export default {
  props: {
    role: {
      type: Object,
      required: true
    }
  },
  emits: ['confirm', 'close'],
  setup(props, context) {
    const $q = useQuasar()
    const { role } = toRefs(props)
    const state = reactive({
      form: {}
    })
    const show = ref(true)
    const rules = ref({
      name: [
        (val) => (val && val.length > 0) || '请填写角色名称',
        (val) => val.length < 20 || '部门角色长度过长',
        (val) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let params = {
                id: state.form.id,
                name: val
              }
              roleApi.checkName({ params: params }).then((res) => {
                res.data ? resolve(true) : resolve('角色名称重复，不可用')
              })
            }, 350)
          })
        }
      ],
      privileges: [(val) => val.length || '至少选择一个权限']
    })
    const onSubmit = () => {
      state.form.privileges = state.form.privileges.map((item) => ({ code: item }))
      let promise = null
      if (state.form.id) {
        promise = roleApi.update(state.form)
      } else {
        promise = roleApi.create(state.form)
      }
      promise.then((res) => {
        $q.notify({
          type: 'positive',
          message: state.form.id ? '修改角色成功' : '新建角色成功'
        })
        context.emit('confirm', res.data)
      })
    }
    const onReset = () => {
      context.emit('close')
    }
    const deleteRole = () => {
      console.log('todo delete')
    }
    const privileges = ref([
      { value: 'user', label: '用户管理' },
      { value: 'log', label: '日志管理' },
      { value: 'authority', label: '权限管理' }
    ])
    onMounted(() => {
      state.form = JSON.parse(JSON.stringify(role.value))
      state.form.privileges = state.form.privileges.map((item) => item.code)
    })
    return {
      ...toRefs(state),
      rules,
      show,
      onSubmit,
      deleteRole,
      onReset,
      privileges
    }
  }
}
</script>

<style></style>
