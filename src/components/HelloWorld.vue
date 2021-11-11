<script setup lang="ts">
  import { ref, toRefs } from 'vue'
  const props = defineProps({
    msg: String,
  })

  const count = ref(0)
  const { msg } = toRefs(props)
</script>

<template>
  <div class="text-2xl text-pink-300 py-20px">{{ msg }}</div>

  <p class="m-1 p-1 bg-gray-100">test p attribute</p>
  <p class="m-2 p-2 bg-gray-200">test p attribute</p>
  <p class="m-3 p-3 bg-gray-300">test p attribute</p>
  <p class="m-4 p-4 bg-gray-400">test p attribute</p>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Documentation </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <q-btn color="primary mb-20px" icon="check" :label="'count is: ' + count" @click="count++" />
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
  a {
    color: #42b983;
  }
</style>
