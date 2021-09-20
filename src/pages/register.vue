<template>
  <div class="page-register q-pa-md flex row flex-center">
    <div class="col row login-container">
      <q-form class="form-login col-12 col-md-5" @submit="onSubmit" @reset="onReset">
        <div class="text-h4 q-ma-sm">注册</div>
        <q-input
          v-model="form.email"
          outlined
          label="邮箱"
          hint="填写邮箱"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入邮箱']"
        >
          <template #prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input
          v-model="form.username"
          outlined
          label="用户名"
          hint="用户名可输入中文或者英文"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入用户名']"
        >
          <template #prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>

        <q-input
          v-model="form.password"
          outlined
          label="密码"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <q-input
          v-model="form.authCode"
          outlined
          label="验证码"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '请输入验证码']"
        >
          <template #prepend>
            <q-icon name="sms" />
          </template>
          <template #append>
            <span class="text-body1 cursor-pointer">获取验证码</span>
          </template>
        </q-input>

        <q-toggle v-model="accept" class="q-checkbox">
          我同意 <router-link tag="a" :to="{ path: '/' }">隐私政策</router-link>
        </q-toggle>

        <div>
          <q-btn
            class="btn-submit full-width no-outline text-h6"
            color="primary"
            label="注册"
            type="submit"
          />
        </div>

        <SocialLogin />

        <div
          class="sign-up q-pt-md text-center cursor-pointer"
          @click="$router.push({ path: '/login' })"
        >
          已有有账号？现在登录！
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
import { useQuasar } from 'quasar'
import { reactive, ref, toRefs } from 'vue'
import { userApi } from 'src/api/user'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const $q = useQuasar()

    let state = reactive({
      form: {
        email: '',
        username: '',
        password: '',
        authCode: '',
        accept: false,
        captcha: null
      }
    })
    const accept = ref(false)

    const onSubmit = () => {
      if (accept.value !== true) {
        $q.notify({
          type: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        userApi.register(state.form).then((res) => {
          console.log(176, res)
          if (res.code == 200) {
            $q.notify({
              type: 'positive',
              message: 'Registered Success'
            })
            const router = useRouter()
            router.push({ path: '/login' })
          }
        })
      }
    }
    const onReset = () => {
      state = reactive({
        email: '',
        username: '',
        password: '',
        authCode: '',
        captcha: null
      })
    }

    return {
      ...toRefs(state),
      accept,
      onSubmit,
      onReset
    }
  }
}
</script>
<style>
.page-register .q-field--with-bottom {
  padding: 18px 0;
}
</style>
<style lang="scss" scoped>
.page-register {
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
    // width: 960px;
    max-width: 1080px;
    .form-login {
      background: #f4f5f7 !important;

      border-radius: 10px;
      // overflow: hidden;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-between;
      padding: 1rem 2rem;
      box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
      margin: 0 auto;
    }
    .q-checkbox {
      margin-top: -6px;
      user-select: none;
    }
    .btn-submit {
      height: 56px;
      &::before {
        border-color: rgba(0, 0, 0, 0.24);
      }
    }
    .oath {
      .icon {
        width: 50px;
        height: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>
