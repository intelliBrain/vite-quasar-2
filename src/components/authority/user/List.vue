<template>
  <div>
    <div class="row my-lg">
      <icon-mdi-account class="q-mr-sm text-h6" />
      <span class="text-subtitle2">全部人员(10人)</span>
    </div>
    <div class="bg-grey-2 q-py-sm q-pl-md">
      <q-btn color="primary" size="md" @click="create">添加成员</q-btn>
    </div>
    <div class="q-mt-md">
      <q-table
        :columns="columns"
        :rows="rows"
        row-key="name"
        class="no-box-shadow"
        hide-pagination
        :rows-per-page-options="[0]"
      >
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
            <q-td key="operating" :props="props">
              <q-btn-dropdown
                split
                color="primary"
                outline
                size="md"
                dense
                @click="onItemClick('edit')"
              >
                <template v-slot:label>
                  <div class="row items-center no-wrap pl-sm">
                    <icon-mdi-square-edit-outline />
                    <div class="text-center px-sm">编辑</div>
                  </div>
                </template>
                <q-list class="text-caption" dense>
                  <q-item clickable v-close-popup @click="onItemClick('password')">
                    <q-item-section>
                      <q-item-label class="row">
                        <icon-mdi-square-edit-outline />
                        <span class="q-ml-sm">修改密码</span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  props: {
    department: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const { department } = toRefs(props)
    const columns = [
      {
        name: 'name',
        required: true,
        label: '姓名',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      { name: 'calories', align: 'center', label: '所在部门', field: 'calories' },
      { name: 'fat', label: '状态', field: 'fat' },
      { name: 'carbs', label: '角色', field: 'carbs' },
      { name: 'operating', label: '操作', field: 'operating' }
    ]

    const rows = [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65
      }
    ]
    const onItemClick = (item) => {
      console.log(item)
    }
    const create = () => {
      console.log('create')
    }
    return { rows, columns, onItemClick, create }
  }
}
</script>

<style></style>
