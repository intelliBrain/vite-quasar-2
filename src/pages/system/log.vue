<template>
  <q-page>
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="row q-pa-md">
        <q-input
          outlined
          v-model="params.startDate"
          label="操作时间（始）"
          class="p-sm flex-1"
          dense
        >
          <q-popup-proxy transition-show="scale" transition-hide="scale" ref="popStartDate">
            <q-date
              v-model="params.startDate"
              mask="YYYY-MM-DD"
              @update:model-value="closeDateDialog('start')"
            >
            </q-date>
          </q-popup-proxy>
          <template v-slot:prepend>
            <q-icon :name="matEvent" class="cursor-pointer"> </q-icon>
          </template>
        </q-input>
        <q-input outlined v-model="params.endDate" label="操作时间（终）" class="p-sm flex-1" dense>
          <q-popup-proxy transition-show="scale" transition-hide="scale" ref="popEndDate">
            <q-date
              v-model="params.endDate"
              mask="YYYY-MM-DD"
              @update:model-value="closeDateDialog('end')"
            >
            </q-date>
          </q-popup-proxy>
          <template v-slot:prepend>
            <q-icon :name="matEvent" class="cursor-pointer"> </q-icon>
          </template>
        </q-input>
        <q-select
          outlined
          v-model="module"
          :options="modules"
          label="模块"
          class="p-sm flex-1"
          dense
          @update:model-value="searchLogs"
        />
        <q-input
          outlined
          bottom-slots
          v-model="params.keyword"
          label="消息"
          class="p-sm flex-1"
          dense
          @update:model-value="searchLogs"
        >
          <template v-slot:prepend>
            <q-icon :name="matSearch" />
          </template>
        </q-input>
        <q-input
          outlined
          bottom-slots
          v-model="params.name"
          label="姓名或者账号"
          class="p-sm flex-1"
          dense
          @update:model-value="searchLogs"
        >
          <template v-slot:prepend>
            <q-icon :name="matSearch" />
          </template>
        </q-input>
      </div>
    </q-form>

    <div class="q-pa-md">
      <q-table
        :columns="columns"
        :rows="rows"
        :pagination="{ rowsPerPage: 10 }"
        no-data-label="暂无数据"
        row-key="name"
        class="no-box-shadow"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="module" :props="props">
              {{ props.row.module }}
            </q-td>
            <q-td key="operate" :props="props">
              {{ props.row.operate }}
            </q-td>
            <q-td key="message" :props="props">
              {{ props.row.message }}
            </q-td>
            <q-td key="createdAt" :props="props">
              {{ props.row.createdAt }}
            </q-td>
            <q-td key="data" :props="props">
              <q-btn flat color="primary" label="查看详情" @click="viewDetail(props.row.data)" />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div class="flex-1">
            <div class="q-pa-sm pagination-end">
              <q-pagination
                v-model="params.page"
                :max="pages"
                :max-pages="10"
                direction-links
                boundary-links
                :icon-first="matSkipPrevious"
                :icon-last="matSkipNext"
                :icon-prev="matFastRewind"
                :icon-next="matFastForward"
                dense
                @click="search"
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
import { ref, onMounted } from 'vue'
import { systemApi } from '@/api/system.js'
import dict from '@/util/dict.js'
import LogDialog from '@/components/system/LogDialog.vue'
import {
  matClose,
  matEvent,
  matSearch,
  matSkipPrevious,
  matSkipNext,
  matFastRewind,
  matFastForward
} from '@quasar/extras/material-icons'

export default {
  components: {
    LogDialog
  },
  setup() {
    const dialogVisible = ref(false)
    const selectedLog = ref(null)
    const module = ref(null)
    const dateLocale =
      "{days: ['0', '1', '2', '3','4','5','6'],daysShort: ['0', '1', '2', '3','4','5','6']}"
    const pages = ref(0)
    const params = ref({
      page: 1
    })

    const moduleList = []
    Object.keys(dict.logModules).forEach((k) => {
      let item = {}
      item['value'] = k
      item['label'] = dict.logModules[k]
      moduleList.push(item)
    })
    const modules = ref(moduleList)

    const columns = [
      {
        name: 'name',
        label: '用户',
        align: 'left'
      },
      {
        name: 'module',
        label: '模块',
        align: 'left'
      },
      {
        name: 'operate',
        label: '操作类型',
        align: 'left'
      },
      {
        name: 'message',
        label: '消息',
        align: 'left'
      },
      {
        name: 'createdAt',
        label: '操作时间',
        align: 'center'
      },
      {
        name: 'data',
        label: '操作',
        align: 'center'
      }
    ]

    const rows = ref([])

    const viewDetail = (item) => {
      selectedLog.value = item
      dialogVisible.value = true
    }

    const onClose = () => {
      dialogVisible.value = false
    }

    const searchLogs = () => {
      params.value.page = 1
      search()
    }

    const search = () => {
      let filter = params.value
      if (module.value) {
        let m = module.value
        filter.module = m.value
      }

      systemApi.search(filter).then((res) => {
        rows.value = res.data.records.map((log) => {
          log.module = dict.logModules[log.module.toUpperCase()]
          log.operate = dict.logOperates[log.operate]
          if (log.createdBy.nickname) {
            log.name = log.createdBy.nickname
          } else {
            log.name = log.createdBy.username
          }
          return log
        })
        pages.value = res.data.pages
      })
    }

    onMounted(() => {
      search()
    })

    return {
      modules,
      columns,
      rows,
      module,
      dialogVisible,
      viewDetail,
      onClose,
      selectedLog,
      pages,
      params,
      search,
      searchLogs,
      matClose,
      matEvent,
      matSearch,
      matSkipPrevious,
      matSkipNext,
      matFastRewind,
      matFastForward,
      dateLocale
    }
  },
  methods: {
    closeDateDialog(type) {
      if (type == 'start') {
        this.$refs.popStartDate.hide()
      } else {
        this.$refs.popEndDate.hide()
      }
      this.searchLogs()
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
