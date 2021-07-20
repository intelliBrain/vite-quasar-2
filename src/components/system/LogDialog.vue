<template>
  <q-dialog v-model="fixed">
    <q-card style="width: 55%">
      <q-card-section>
        <div class="text-h6">查看</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <vue-json-pretty :data="jsonData"> </vue-json-pretty>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="关闭" color="primary" @click="close" />
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
    const fixed = ref(true)
    const jsonData = ref(null)
    const { item } = toRefs(props)

    const close = () => {
      context.emit('close')
    }

    onMounted(() => {
      jsonData.value = JSON.parse(item.value)
    })

    return {
      fixed,
      jsonData,
      close
    }
  }
}
</script>

<style lang="scss" scoped></style>
