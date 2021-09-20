<template>
  <div class="q-pa-md flex row flex-center page-login">
    <div class="login-container col row">
      <q-form greedy class="form-login col-12 col-md-5" @submit="onSubmit" @reset="onReset">
        <div class="text-h4 q-my-sm">登录</div>
        <q-input
          v-model="form.username"
          outlined
          label="用户名"
          hint="填写邮箱或手机号"
          lazy-rules
          :rules="rules.username"
        >
          <template #prepend>
            <icon-ic-baseline-perm-identity />
          </template>
        </q-input>

        <q-input
          v-model="form.password"
          outlined
          label="密码"
          lazy-rules
          type="password"
          :rules="rules.password"
        >
          <template #prepend>
            <icon-bx-bx-lock-alt />
          </template>
        </q-input>
        <div class="q-checkbox">
          <q-checkbox v-model="form.rememberMe" :rules="rules.rememberMe" label="10内保持登录" />
        </div>
        <div>
          <q-btn
            class="btn-submit full-width no-outline text-h6"
            color="primary"
            label="登录"
            type="submit"
          />
        </div>

        <SocialLogin />
        <div class="row justify-between q-pt-md text-grey-8">
          <span>忘记密码</span>
          <span
            class="sign-up text-center cursor-pointer"
            @click="$router.push({ path: '/register' })"
          >
            还没有账号？现在注册！
          </span>
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { useQuasar } from 'quasar'
import { ref, reactive, toRefs } from 'vue'
import { userApi } from '@/api/user'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const $q = useQuasar()

    const state = reactive({
      form: { username: '', password: '', rememberMe: false, captcha: null }
    })

    const rules = {
      username: [(val) => (val && val.length > 0) || '请输入用户名'],
      password: [(val) => (val && val.length > 0) || '请输入用户名'],
      rememberMe: [(val) => !!val || 'You need to accept the license and terms first']
    }
    const onSubmit = async () => {
      showSlideDialog.value = true
    }

    const onReset = () => {
      state.form = { username: '', password: '', rememberMe: false, captcha: null }
    }
    const onSlideFail = () => {
      showSlideDialog.value = false
    }
    const onSlideVerify = (captcha) => {
      showSlideDialog.value = false
      state.form.captcha = captcha
      userApi.login(qs.stringify(state.form)).then((res) => {
        if (res.code == 200) {
          const { accessToken, refreshToken } = res.data
          $q.localStorage.set('User/accessToken', {
            expiresAt: accessToken.expiresAt,
            tokenValue: accessToken.tokenValue
          })
          $q.localStorage.set('User/refreshToken', {
            expiresAt: refreshToken.expiresAt,
            tokenValue: refreshToken.tokenValue
          })
          $q.notify({
            type: 'positive',
            message: 'Login Success'
          })
          router.push({ path: '/' })
        }
      })
    }

    const router = new useRouter()

    const showSlideDialog = ref(false)
    return {
      ...toRefs(state),
      showSlideDialog,
      rules,
      onSubmit,
      onReset,
      onSlideFail,
      onSlideVerify
    }
  }
}
</script>
<style lang="scss">
.page-login {
  .q-field--with-bottom {
    padding: 18px 0;
  }
}
</style>
<style lang="scss" scoped>
.page-login {
  width: 100%;
  min-height: 100vh;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: center;
  // align-items: center;
  // padding: 15px;
  background: #9053c7;
  background: linear-gradient(-135deg, #c850c0, #4158d0);

  .login-container {
    max-width: 1080px;
    // width: 960px;
    // display: flex;
    // flex-wrap: wrap;
    .form-login {
      background: #f4f5f7 !important;
      box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
      border-radius: 10px;
      padding: 1rem 2rem;
      margin: 0 auto;
    }
    .q-checkbox {
      margin-top: 0px;
      user-select: none;
    }
    .btn-submit {
      height: 56px;
      &::before {
        border-color: rgba(0, 0, 0, 0.24);
      }
    }
  }
}
</style>
