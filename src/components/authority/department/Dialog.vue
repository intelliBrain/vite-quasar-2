<template>
  <div>
    <q-dialog v-model="prompt" persistent>
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
              :rules="[
                (val) => (val && val.length > 0) || '请填写部门名称',
                (val) => val.length < 20 || '部门名称长度过长',
                checkName
              ]"
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
  emits: ['update', 'create', 'close'],
  setup(props, context) {
    const $q = useQuasar()
    const { department, parentDepartment } = toRefs(props)
    const prompt = ref(true)
    const state = reactive({
      form: {
        name: ''
      }
    })

    const checkName = (val) => {
      return new Promise((resolve, reject) => {
        let dep = null
        setTimeout(() => {
          departmentApi.findByName(val).then((res) => {
            dep = res.data
            if (dep && dep.id != state.form.id) {
              resolve('部门名称重复，不可用')
            } else {
              resolve(true)
            }
          })
        }, 350)
      })
    }
    const onSubmit = () => {
      if (state.form.id) {
        departmentApi.update(state.form).then((res) => {
          $q.notify({
            type: 'positive',
            message: '修改部门成功'
          })
          context.emit('update', res.data)
        })
      } else {
        state.form.parentId = parentDepartment.value.id
        state.form.seq = '0'
        departmentApi.create(state.form).then((res) => {
          $q.notify({
            type: 'positive',
            message: '新建部门成功'
          })
          context.emit('create', res.data)
        })
      }
    }
    const onReset = () => {
      context.emit('close')
    }
    onMounted(() => {
      state.form = JSON.parse(JSON.stringify(department.value))
    })
    return {
      prompt,
      ...toRefs(state),
      onSubmit,
      onReset,
      checkName
    }
  }
}
</script>

<style></style>
