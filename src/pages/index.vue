<template>
  <q-page class="q-pa-md column flex-center">
    <img alt="Vue logo" src="src/assets/logo.png" class="w-35px" />
    <icon-mdi-notification-clear-all class="text-h6 text-weight-bold" />
    <q-card>
      <q-card-section>
        <p class="text-blue-500 font-bold px-md">demo form quasar</p>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list>
          <template v-for="(item, index) in generatedRoutes" :key="index">
            <q-item clickable>
              <q-item-section @click="router.push({ path: item.path })">{{
                item.name
              }}</q-item-section>
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
