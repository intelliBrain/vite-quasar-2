<template>
  <div class="column flex-center">
    <img alt="Vue logo" src="src/assets/img/logo.png" @click="getUser" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    {{ user }}
  </div>
</template>

<script setup="props, { emit }" lang="ts">
  interface User {
    name: string
    age: number
  }
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { ref, toRefs } from '@vue/reactivity'
  import HelloWorld from 'src/components/HelloWorld.vue'
  const props = defineProps<{
    msg: string
    user: {
      type: User
      default: () => {}
    }
  }>()
  const emit = defineEmits(['update'])

  const { user } = toRefs(props)
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
