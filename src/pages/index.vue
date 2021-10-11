<template>
  <q-page class="q-pa-md column flex-center">
    <div class="logo">
      <img alt="Vue logo" src="src/assets/images/logo.png" class="w-35px inline-block" />
      <icon-mdi-notification-clear-all
        class="text-h3 text-weight-bold text-dark-200 inline-block"
      />
    </div>
    <span class="text-dark-200 text-h5 pt-sm pb-md">build on top of quasar with windicss</span>
    <q-card class="column items-stretch">
      <q-card-section>
        <p class="text-blue-500 font-bold px-md">demo from quasar</p>
      </q-card-section>
      <q-separator />
      <q-card-section class="justify-start flex-1">
        <q-list class="w-600px">
          <template v-for="(item, index) in generatedRoutes" :key="index">
            <q-item clickable @click="router.push({ path: item.path })">
              <span class="col-6">name: {{ item.name }}</span>
              <span class="c0l-6">path: {{ item.path }}</span>
            </q-item>
            <q-separator />
          </template>
        </q-list>
      </q-card-section>
    </q-card>

    <q-icon name="eva-calendar-outline" size="md" />

    <router-link to="/about">About</router-link>
  </q-page>
</template>

<script setup>
import { userApi } from 'src/api/user'
import { useQuasar } from 'quasar'
import generatedRoutes from 'virtual:generated-pages'
onMounted(() => {
  getUser()
})

const router = useRouter()
const $q = useQuasar()
const getUser = () => {
  userApi.currentUser().then((res) => {
    $q.notify({
      type: 'positive',
      message: `welcome ${res.data.username}`
    })
  })
}
</script>
