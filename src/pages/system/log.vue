<template>
  <q-page>
    <div class="main">
      <div class="main-header">
        <q-form @submit="onSubmit" @reset="onReset">
          <q-input filled v-model="date1" mask="date" :rules="['date']" label="操作时间（始）">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer"> </q-icon>
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="date1">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>
          <q-input filled v-model="date2" mask="date" :rules="['date']" label="操作时间（终）">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer"> </q-icon>
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="date2">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>

          <q-select outlined v-model="model1" :options="md" label="模块" />

          <q-input outlined bottom-slots v-model="text" label="消息">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-input outlined bottom-slots v-model="text1" label="姓名或者账号">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-form>
      </div>
      <div class="main-content">
        <div class="q-pa-md">
          <q-table :rows="rows" :columns="columns" row-key="name" />
        </div>
      </div>
      <div class="main-footer"></div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const columns = [
  {
    label: '用户',
    align: 'center',
    field: (row) => row.name
  },
  {
    label: '模块',
    align: 'center',
    field: (row) => row.name
  },
  {
    label: '操作',
    align: 'center',
    field: (row) => row.name
  },
  {
    label: '消息',
    align: 'center',
    field: (row) => row.name
  },
  {
    label: '操作时间',
    align: 'center',
    field: (row) => row.name
  },
  {
    label: '操作',
    align: 'center',
    field: (row) => row.name
  }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129
  }
]

export default {
  setup() {
    const $q = useQuasar()
    const name = ref(null)
    const date1 = ref(null)
    const date2 = ref(null)
    return {
      name,
      date1,
      date2,
      md: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      columns,
      rows
    }
  }
}
</script>

<style lang="scss" scoped></style>
