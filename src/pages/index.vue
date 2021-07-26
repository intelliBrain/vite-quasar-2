<template>
  <q-page class="q-pa-md column flex-center">
    <img alt="Vue logo" src="../assets/logo.png" />
    <q-btn label="hello" rounded size="md" />

    <q-icon name="event" size="md" />
    <icon-mdi-notification-clear-all class="text-h6 text-weight-bold" />
    <router-link to="/about">About</router-link>
  </q-page>
</template>

<script>
// @ is an alias to /src
import { userApi } from 'src/api/user'
import { onMounted, reactive } from 'vue'

export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      getCms()
    })
    const state = reactive({ name: 'allen' })
    console.log(state)
    const getCms = () => {
      userApi.currentUser().then((res) => {
        console.log(res)
      })
    }
    return {
      getCms
    }
  }
}
</script>
