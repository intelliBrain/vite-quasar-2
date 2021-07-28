<template>
  <q-page class="q-pa-md column flex-center">
    <img alt="Vue logo" src="../assets/logo.png" />
    <q-btn label="hello" rounded size="md" class="my-md" />

    <q-icon name="eva-calendar-outline" size="md" />
    <icon-mdi-notification-clear-all class="text-h6 text-weight-bold" />
    <router-link to="/about">About</router-link>
  </q-page>
</template>

<script setup>
// @ is an alias to /src
import { userApi } from 'src/api/user'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

onMounted(() => {
  getUser()
})

const $q = useQuasar()
const getUser = () => {
  userApi.currentUser().then((res) => {
    $q.notify({
      type: 'positive',
      message: `welcome ${res.data.username}`
    })
    console.log(res)
  })
}
</script>
