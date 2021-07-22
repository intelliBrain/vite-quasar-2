<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>密码重置 </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="form.name" dense label="密码" hint="密码" />
            <div>
              <q-btn label="确认" type="submit" color="primary" />
              <q-btn label="取消" type="reset" color="primary" flat class="ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  emits: ['confirm', 'close'],
  setup(props, context) {
    const state = reactive({
      form: {}
    })
    const show = ref(true)
    const onSubmit = () => {
      context.emit('confirm')
    }
    const onReset = () => {
      context.emit('close')
    }

    return { ...toRefs(state), show, onSubmit, onReset }
  }
}
</script>

<style></style>
