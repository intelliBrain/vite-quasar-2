<template>
  <div class="column flex-center">
    <img alt="Vue logo" src="src/assets/img/logo.png" @click="getUser" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
  </div>
</template>

<script setup="props, { emit }" lang="ts">
  interface User {
    name: string
    age: number
  }
  import { ref } from 'vue'
  import HelloWorld from 'src/components/HelloWorld.vue'
  const emit = defineEmits(['update'])

  const changed = ref(false)
  changed.value = true
  const getUser = (): User => {
    emit('update', {
      name: 'John Doe',
      age: 30,
    })
    return {
      name: 'John Doe',
      age: 30,
    }
  }
</script>

<style lang="scss" scoped></style>
