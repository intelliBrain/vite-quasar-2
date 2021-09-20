<template>
  <article class="page">
    <aside class="w-30vw bg-gray-200">aside</aside>
    <main class="w-70vw">main</main>
  </article>
</template>

<script setup>
import { roleApi } from '@/api/user.js'

const roles = ref([])
const listRoles = () => {
  roleApi.list().then((res) => {
    roles.value = res.data
    selectedRole.value = roles.value[0]
  })
}

onMounted(() => {
  listRoles()
})
</script>

<style lang="scss" scoped></style>
