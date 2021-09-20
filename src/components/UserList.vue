<template>
  <div>you did it</div>
</template>

<script setup="props, {}">
import { userApi } from '@/api/user.js'

const props = defineProps({
  department: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  searchUsers()
})
watch(users, () => {
  searchUsers()
})
const users = ref(null)
function searchUsers() {
  userApi.list().then((res) => {
    users.value = res.data
  })
}
</script>

<style></style>
