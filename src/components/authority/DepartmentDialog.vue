<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">部门管理</div>
          <div class="text-sm">上级部门-----------{{ parentDepartment.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="form.name"
              label="部门名称"
              hint="部门名称"
              lazy-rules
              :rules="rules.name"
            />
            <div>
              <q-btn label="确认" type="submit" color="primary" />
              <q-btn label="取消" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { departmentApi } from '@/api/department.js'
import { useQuasar } from 'quasar'
export default {
  props: {
    department: {
      type: Object,
      required: true
    },
    parentDepartment: {
      type: Object,
      required: true
    }
  },
  emits: ['confirm', 'close'],
  setup(props, context) {
    const $q = useQuasar()
    const { department, parentDepartment } = toRefs(props)
    const show = ref(true)
    const state = reactive({
      form: {}
    })
    const rules = ref({
      name: [
        (val) => (val && val.length > 0) || '请填写部门名称',
        (val) => val.length < 20 || '部门名称长度过长',
        (val) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              let params = {
                id: state.form.id,
                name: val
              }
              departmentApi.checkName({ params: params }).then((res) => {
                res.data ? resolve(true) : resolve('部门名称重复，不可用')
              })
            }, 350)
          })
        }
      ]
    })
    const onSubmit = () => {
      let promise = null
      if (state.form.id) {
        promise = departmentApi.update(state.form)
      } else {
        state.form.parentId = parentDepartment.value.id
        state.form.seq = '0'
        promise = departmentApi.create(state.form)
      }
      promise.then((res) => {
        $q.notify({
          type: 'positive',
          message: state.form.id ? '修改部门成功' : '新建部门成功'
        })
        context.emit('confirm', res.data)
      })
    }
    const onReset = () => {
      context.emit('close')
    }
    onMounted(() => {
      state.form = JSON.parse(JSON.stringify(department.value))
    })
    return {
      show,
      ...toRefs(state),
      rules,
      onSubmit,
      onReset
    }
  }
}
</script>

<style></style>
