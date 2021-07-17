<template>
  <article class="page">
    <section class="aside">
      <div class="q-pa-md">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>Single line item</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
    <section class="main">
      <div>
        <span class="text-h6 m-md">超级管理员</span>
      </div>
      <div class="bg-grey-2 py-sm pl-md m-md">
        <q-btn color="primary" size="md" @click="create">角色编辑</q-btn>
      </div>
      <div class="m-md">
        <q-table :columns="columns" :rows="rows" row-key="index" class="no-box-shadow">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="index" :props="props">
                {{ props.rowIndex + 1 }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  setup() {
    const columns = [
      {
        name: 'index',
        label: '序号',
        field: 'index',
        align: 'left'
      },
      { name: 'name', label: '权限名', field: 'name', align: 'left' },
      { name: 'description', label: '权限描述', field: 'description' }
    ]

    const rows = [
      {
        name: '写文章',
        description: '写文章写文章写文章写文章写文章写文章写文章写文章写文章写文章写文章'
      },
      {
        name: '文章审核',
        description: '文章审核文章审核文章审核文章审核文章审核文章审核文章审核'
      },
      {
        name: 'Eclair',
        description: 262
      },
      {
        name: 'Cupcake',
        description: 305
      },
      {
        name: 'Gingerbread',
        description: 356
      },
      {
        name: 'Jelly bean',
        description: 375
      },
      {
        name: 'Lollipop',
        description: 392
      },
      {
        name: 'Honeycomb',
        description: 408
      },
      {
        name: 'Donut',
        description: 452
      },
      {
        name: 'KitKat',
        description: 518
      },
      {
        name: '写文章',
        description: '写文章写文章写文章写文章写文章写文章写文章写文章写文章写文章写文章'
      },
      {
        name: '文章审核',
        description: '文章审核文章审核文章审核文章审核文章审核文章审核文章审核'
      }
    ]
    const create = () => {
      console.log('create')
    }
    return { columns, rows, create }
  }
}
</script>

<style lang="scss" scoped></style>
