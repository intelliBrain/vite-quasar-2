<template>
  <q-dialog v-model="qDialogVisible">
    <q-card style="width: 55%; height: 70%">
      <q-card-section>
        <div class="text-h6">查看</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="height: 70%" class="scroll">
        <vue-json-pretty :data="jsonData"> </vue-json-pretty>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="关闭" color="primary" @click="closeQDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, toRefs, onMounted } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  components: {
    VueJsonPretty
  },
  props: {
    item: {
      type: String
    }
  },
  setup(props, context) {
    const qDialogVisible = ref(true)
    const jsonData = ref(null)
    const { item } = toRefs(props)

    const closeQDialog = () => {
      context.emit('close')
    }

    onMounted(() => {
      jsonData.value = JSON.parse(item.value)
    })

    return {
      qDialogVisible,
      jsonData,
      closeQDialog
    }
  }
}
</script>

<style lang="scss" scoped></style>
