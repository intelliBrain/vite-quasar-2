<template>
  <q-page class="text-center mt-xl">
    <div class="full-screen">404 not found!</div>
    <pre>Params - {{ params }}</pre>
    <router-link to="/" tag="a" class="text-primary">Back to home page</router-link>
  </q-page>
</template>
<script setup="props">
import { useRoute } from 'vue-router'
const route = useRoute()

const params = JSON.stringify(route.params)
</script>
