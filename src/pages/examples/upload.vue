<template>
  <q-page class="p-md">
    <q-uploader
      url="http://localhost:4444/upload"
      style="max-width: 300px"
      hide-upload-btn
      color="white"
      flat
      label="uploader"
    >
      <template v-slot:header></template>
      <template v-slot:list="scope">{{ scope }},list </template>
    </q-uploader>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
