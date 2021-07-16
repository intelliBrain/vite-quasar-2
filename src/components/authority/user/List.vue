<template>
  <div>
    <q-table
      v-model:pagination="pagination"
      :wrap-cells="true"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      :filter="keyword"
      class="sticky-table"
      row-key="id"
      @request="searchContents"
    >
      <template #top-right>
        <q-input v-model="keyword" borderless dense debounce="300" placeholder="Search">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template #body-cell-thumbnailImg="props">
        <q-td :props="props">
          <q-img v-if="props.value" :src="props.value" :ratio="16 / 9" />
          <div v-else class="empty">--</div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  setup() {
    const columns = [
      {
        name: 'username',
        required: true,
        label: '姓名',
        align: 'left',
        field: (row) => row.categoryName, //function style to get field
        format: (val) => `${val}`,
        // classes: 'ellipsis-2-lines',
        sortable: true
      },
      {
        name: 'departMent',
        label: '所在部门',
        field: 'name',
        align: 'left',
        style: 'max-width: 200px'
      },
      { name: 'enabled', label: '状态', field: 'featured', sortable: true },
      { name: 'role', label: '角色', field: 'publishedTime' },
      { name: ' createdAt', label: '创建时间', field: 'createdTime' },
      {
        name: 'avatar',
        label: '用户头像',
        field: 'thumbnailImg',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      },
      {
        name: 'viewCount',
        label: '点击量',
        field: 'viewCount',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      }
    ]
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
