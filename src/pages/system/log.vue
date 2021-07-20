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
              {{ props.row.module }}
            </q-td>
            <q-td key="module" :props="props">
              {{ props.row.module }}
            </q-td>
            <q-td key="operate" :props="props">
              {{ props.row.operate }}
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.message }}
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="optType" :props="props">
              <q-btn flat color="primary" label="查看详情" @click="viewDetail(props.row.data)" />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div class="flex-1">
            <div class="q-pa-sm pagination-end">
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
          </div>
        </template>
        <template v-slot:pagination> </template>
      </q-table>
    </div>

    <div>
      <log-dialog :item="selectedLog" v-if="dialogVisible" @close="onClose" />
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import { systemApi } from '@/api/system.js'
import dict from '@/util/dict.js'
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
    const selectedLog = ref(null)

    const columns = [
      {
        name: 'name',
        label: '用户',
        align: 'center'
      },
      {
        name: 'module',
        label: '模块',
        align: 'center'
      },
      {
        name: 'operate',
        label: '操作',
        align: 'center'
      },
      {
        name: 'carbs',
        label: '消息',
        align: 'center'
      },
      {
        name: 'protein',
        label: '操作时间',
        align: 'center'
      },
      {
        name: 'optType',
        label: '操作',
        align: 'center'
      }
    ]

    const viewDetail = (item) => {
      selectedLog.value = item
      dialogVisible.value = true
    }

    const onClose = () => {
      dialogVisible.value = false
    }

    const rows = ref([])

    const search = () => {
      systemApi.search({}).then((res) => {
        rows.value = res.data.records.map((log) => {
          log.module = dict.logModules[log.module.toUpperCase()]
          log.operate = dict.logOperates[log.operate]
          return log
        })
      })
    }

    onMounted(() => {
      search()
    })

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
      current,
      selectedLog
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
