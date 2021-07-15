<template>
  <div class="q-pa-md">
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
                show-if-above
                bordered
                :width="300"
                :breakpoint="500"
                content-class="bg-grey-3"
              >
                <q-scroll-area class="fit">
                  <div class="q-pa-sm">
                    <div class="q-pa-md q-gutter-sm">
                      <q-tree
                        :nodes="departmentTree"
                        node-key="id"
                        label-key="name"
                        selected-color="primary"
                        v-model:selected="departmentId"
                        default-expand-all
                      />
                    </div>
                  </div>
                </q-scroll-area>
              </q-drawer>
              <q-page-container>
                <q-page padding>
                  {{ departmentId }}
                  <q-btn class="q-mx-md" @click="editDepartment">设置</q-btn>
                  <q-btn @click="createDepartment">添加子部门</q-btn>
                  <div><user-list :departmentId="departmentId" v-if="departmentId" /></div>
                </q-page>
              </q-page-container>
            </q-layout>
          </q-tab-panel>

          <q-tab-panel name="role">
            <q-layout>
              <q-drawer
                side="left"
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
      <department-dialog
        @confirm="onConfirm"
        @close="onClose"
        :currentDepartment="currentDepartment"
        :parentDepartment="parentDepartment"
        v-if="showDialog"
      ></department-dialog>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, computed } from 'vue'
import { departmentApi } from '@/api/department.js'
import DepartmentDialog from '@/components/DepartmentDialog.vue'
import utils from '@/util/utils.js'
import UserList from '@/components/UserList.vue'
import { useQuasar } from 'quasar'
export default {
  components: { DepartmentDialog, UserList },
  setup() {
    const $q = useQuasar()
    const tab = ref('department')
    const departmentList = ref([])
    const departmentTree = ref([])
    const currentDepartment = ref([])
    const department = computed(
      () => departmentList.value.filter((dep) => dep.id == departmentId.value)[0]
    )
    const parentDepartment = computed(
      () =>
        departmentList.value.filter((dep) => dep.id == department.value.parentId)[0] || {
          name: '公司'
        }
    )
    const state = reactive({
      department: {}
    })
    const showDialog = ref(false)
    const code = ref('')
    const departmentId = ref('')
    const getDepartment = () => {
      departmentApi.get('1').then((res) => {
        state.department = res.data
      })
    }
    const createDepartment = () => {
      if (!departmentId.value) {
        $q.notify({
          type: 'warning',
          message: '请先选择部门'
        })
      } else {
        currentDepartment.value = {}
        showDialog.value = true
      }
    }
    const editDepartment = () => {
      if (!departmentId.value) {
        $q.notify({
          type: 'warning',
          message: '请先选择部门'
        })
      } else {
        currentDepartment.value = department.value
        showDialog.value = true
      }
    }
    const onConfirm = (dep) => {
      showDialog.value = false
    }
    const onClose = () => {
      showDialog.value = false
    }

    const findByCode = () => {
      departmentApi.findByCode(code.value).then((res) => {
        console.log(rs.data)
      })
    }
    const search = () => {
      departmentApi.search().then((res) => {
        departmentList.value = res.data
        departmentTree.value = utils.buildTree(departmentList.value)
      })
    }
    onMounted(() => {
      getDepartment()
      search()
    })

    return {
      departmentTree,
      tab,
      state,
      showDialog,
      code,
      createDepartment,
      editDepartment,
      onConfirm,
      onClose,
      findByCode,
      search,
      departmentId,
      department,
      currentDepartment,
      parentDepartment
    }
  }
}
</script>

<style></style>
