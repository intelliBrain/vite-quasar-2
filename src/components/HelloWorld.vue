<script setup="props" lang="ts">
  import { ref, toRefs } from 'vue'
  const props = defineProps<{ msg: string }>()

  const count = ref(0)
  const { msg } = toRefs(props)
</script>

<template>
  <div class="text-2xl text-pink-300">{{ msg }}</div>

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
