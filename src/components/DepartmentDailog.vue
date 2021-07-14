<template>
  <div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="closeDialog" />
          <q-btn flat label="Add address" @click="confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['confirm', 'close'],
  setup(props, context) {
    const prompt = ref(true)
    const confirm = () => {
      context.emit('confirm')
    }
    const closeDialog = () => {
      context.emit('close')
    }
    return {
      prompt,
      confirm,
      closeDialog
    }
  }
}
</script>

<style></style>
