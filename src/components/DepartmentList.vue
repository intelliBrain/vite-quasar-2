<template>
  <article class="page">
    <aside class="w-30vw bg-gray-200">aside</aside>
    <main class="w-70vw">main</main>
  </article>
</template>

<script setup>
import { departmentApi } from 'src/api/department.js'

onMounted(() => {
  search()
})

const departments = ref(null)
function search() {
  departmentApi.search().then((res) => {
    res.data = departments
  })
}
</script>

<style lang="scss" scoped></style>
