<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>密码重置 </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              outlined
              dense
              clearable
              v-model="form.newPassword"
              :rules="rules.isPwdNew"
              :type="isPwdNew ? 'password' : 'text'"
              label="新密码"
              hint="请输入新密码"
            >
              <template v-slot:append>
                <q-icon
                  type="text"
                  :name="isPwdNew ? matVisibilityOff : matVisibility"
                  @click="isPwdNew = !isPwdNew"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              outlined
              dense
              clearable
              v-model="form.confirm"
              :rules="rules.isPwdConfirm"
              :type="isPwdConfirm ? 'password' : 'text'"
              label="确定新密码"
              hint="请再次输入密码"
            >
              <template v-slot:append>
                <icon-ic-round-visibility-off
                  v-if="isPwd"
                  class="text-lg"
                  @click="isPwd = !isPwd"
                />
                <icon-ic-round-visibility v-else class="text-lg" @click="isPwd = !isPwd" />
              </template>
            </q-input>
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
import { passwordRegex } from '@/util/regex.js'
import { userApi } from '@/api/user.js'
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
    const state = reactive({
      form: {}
    })
    const isPwdNew = ref(true)
    const isPwdConfirm = ref(true)
    const rules = ref({
      isPwdNew: [
        (val) => (val && val.length > 0) || '请填写密码',
        (val) => (val.length >= 12 && val.length <= 30) || '密码长度应为12-30个字符',
        (val) => passwordRegex(val) || '密码需包含大写字母、小写字母、数字、特殊符号'
      ],
      isPwdConfirm: [(val) => (val && val == state.form.newPassword) || '两次输入的新密码不一致']
    })
    const show = ref(true)
    const onSubmit = () => {
      console.log(state.form)
      let params = {
        id: user.value.id,
        newPassword: state.form.newPassword
      }
      userApi.resetPassword({ params: params }).then((res) => {
        if (res.data) {
          $q.notify({
            type: 'positive',
            message: '重置密码成功'
          })
        } else {
          $q.notify({
            type: 'warning',
            message: '重置密码失败'
          })
        }
      })
      context.emit('confirm')
    }
    const onReset = () => {
      context.emit('close')
    }

    return {
      ...toRefs(state),
      rules,
      isPwdNew,
      isPwdConfirm,
      show,
      onSubmit,
      onReset
    }
  }
}
</script>

<style></style>
