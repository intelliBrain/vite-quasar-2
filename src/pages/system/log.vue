<template>
  <q-page>
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="row">
        <q-input outlined v-model="date1" label="操作时间（始）" class="p-sm flex-1" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="date1" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input outlined v-model="date1" label="操作时间（终）" class="p-sm flex-1" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="date1" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select outlined v-model="model" :options="md" label="模块" class="p-sm flex-1" dense />
        <q-input outlined bottom-slots v-model="text" label="消息" class="p-sm flex-1" dense>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          outlined
          bottom-slots
          v-model="text1"
          label="姓名或者账号"
          class="p-sm flex-1"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-form>

    <div class="q-pa-md">
      <q-table :columns="columns" :rows="rows" row-key="name" class="no-box-shadow">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="calories" :props="props">
              {{ props.row.calories }}
            </q-td>
            <q-td key="fat" :props="props">
              {{ props.row.fat }}
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.carbs }}
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.protein }}
            </q-td>
            <q-td key="optType" :props="props">
              <q-btn flat color="primary" label="查看详情" @click="viewDetail()" />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom> </template>
        <template v-slot:pagination>
          <span></span>
        </template>
      </q-table>
    </div>

    <div class="q-pa-sm flex justify-end">
      <q-pagination
        v-model="current"
        :max="5"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
        dense
      />
    </div>

    <div>
      <log-dialog v-if="dialogVisible" @close="onClose" />
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import LogDialog from '@/components/system/LogDialog.vue'
export default {
  components: {
    LogDialog
  },
  setup() {
    const $q = useQuasar()
    const name = ref(null)
    const date1 = ref(null)
    const date2 = ref(null)
    const dialogVisible = ref(false)
    const current = ref(3)
    const columns = [
      {
        name: 'name',
        label: '用户',
        align: 'center',
        field: (row) => row.name
      },
      {
        name: 'calories',
        label: '模块',
        align: 'center',
        field: (row) => row.name
      },
      {
        name: 'fat',
        label: '操作',
        align: 'center',
        field: (row) => row.name
      },
      {
        name: 'carbs',
        label: '消息',
        align: 'center',
        field: (row) => row.name
      },
      {
        name: 'protein',
        label: '操作时间',
        align: 'center',
        field: (row) => row.name
      },
      {
        name: 'optType',
        label: '操作',
        align: 'center',
        field: 'optType'
      }
    ]

    const rows = [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        optType: 87
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        optType: 129
      }
    ]

    const viewDetail = () => {
      dialogVisible.value = true
    }
    const onClose = () => {
      dialogVisible.value = false
    }
    return {
      name,
      date1,
      date2,
      md: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      columns,
      rows,
      logData: {},
      dialogVisible,
      viewDetail,
      onClose,
      current
    }
  }
}
</script>

<style lang="scss" scoped>
.qtb {
  min-height: 1px;
}
</style>
