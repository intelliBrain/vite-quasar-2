<template>
  <div>
    <!-- 未完全实现， 参考https://codepen.io/Evertvdw/details/Bajqedj  -->
    <q-tree ref="tree" :nodes="simple" node-key="label" default-expand-all class="mett-page-tree">
      <template v-slot:default-header="prop">
        <div
          class="row items-center fit mett-tree-item cursor-pointer"
          draggable="true"
          @drop="drop($event, prop.key)"
          @dragenter="dragEnter"
          @dragover="dragOver"
          @dragleave="dragLeave"
          @dragstart="dragStart($event, prop.key)"
          @dragend="dragStop"
        >
          {{ prop.node.label }}
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
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
    return { simple }
  }
}
</script>

<style lang="scss" scoped></style>
