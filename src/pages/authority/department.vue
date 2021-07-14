<template>
  <div class="q-pa-md">
    <div>
      {{ state.department }}
      <q-btn @click="openDailog"> 添加</q-btn>
      <br />
      <br />
      <br />
    </div>

    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="department" label="组织架构" />
          <q-tab name="role" label="角色管理" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="department">
            <q-layout>
              <q-drawer
                side="left"
                v-model="drawerRight"
                show-if-above
                bordered
                :width="300"
                :breakpoint="500"
                content-class="bg-grey-3"
              >
                <q-scroll-area class="fit">
                  <div class="q-pa-sm">
                    <div class="q-pa-md q-gutter-sm">
                      <q-tree :nodes="simple" node-key="label" />
                    </div>
                  </div>
                </q-scroll-area>
              </q-drawer>
              <q-page-container>
                <q-page padding>
                  <p v-for="n in 5" :key="n">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium
                    molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates
                    asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
                  </p>
                </q-page>
              </q-page-container>
            </q-layout>
          </q-tab-panel>

          <q-tab-panel name="role">
            <q-layout>
              <q-drawer
                side="left"
                v-model="drawerRight"
                show-if-above
                bordered
                :width="300"
                :breakpoint="500"
                content-class="bg-grey-3"
              >
                <q-scroll-area class="fit">
                  <div class="q-pa-sm">
                    <div>超级管理员</div>
                    <div>普通管理员</div>
                    <div>普通用户</div>
                  </div>
                </q-scroll-area>
              </q-drawer>
              <q-page-container>
                <q-page padding>
                  <p v-for="n in 5" :key="n">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium
                    molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates
                    asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
                  </p>
                </q-page>
              </q-page-container>
            </q-layout>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <div>
      <department-dailog
        @confirm="onConfirm"
        @close="onClose"
        v-if="showDailog"
      ></department-dailog>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from 'vue'
import { departmentApi } from '@/api/department.js'
import DepartmentDailog from '@/components/DepartmentDailog.vue'
export default {
  components: { DepartmentDailog },
  setup() {
    const tab = ref('department')
    const simple = ref([
      {
        label: 'Satisfied customers (with avatar)',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        children: [
          {
            label: 'Good food (with icon)',
            icon: 'restaurant_menu',
            children: [{ label: 'Quality ingredients' }, { label: 'Good recipe' }]
          },
          {
            label: 'Good service (disabled node with icon)',
            icon: 'room_service',
            children: [{ label: 'Prompt attention' }, { label: 'Professional waiter' }]
          },
          {
            label: 'Pleasant surroundings (with icon)',
            icon: 'photo',
            children: [
              {
                label: 'Happy atmosphere (with image)',
                img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
              },
              { label: 'Good table presentation' },
              { label: 'Pleasing decor' }
            ]
          }
        ]
      }
    ])
    const expanded = ref(['Satisfied customers (with avatar)', 'Good food (with icon)'])
    const state = reactive({
      department: {}
    })
    const showDailog = ref(false)
    const getDepartemtn = () => {
      departmentApi.get('1').then((res) => {
        state.department = res.data
      })
    }
    const openDailog = () => {
      showDailog.value = true
    }
    const onConfirm = () => {
      showDailog.value = false
    }
    const onClose = () => {
      showDailog.value = false
    }
    onMounted(getDepartemtn)

    return {
      tab,
      simple,
      expanded,
      state,
      showDailog,
      openDailog,
      onConfirm,
      onClose
    }
  }
}
</script>

<style></style>
