<template>
  <div>
    <!-- 未完全实现， 参考https://codepen.io/Evertvdw/details/Bajqedj  -->
    {{ simple }}
    <q-tree ref="tree" :nodes="simple" node-key="id" default-expand-all class="mett-page-tree">
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
          :move="checkMove"
        >
          {{ prop.node.label }}
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup() {
    const simple = ref([
      {
        id: '1',
        label: 'Satisfied customers (with avatar)',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        children: [
          {
            id: '2',
            label: 'Good food (with icon)',
            icon: 'restaurant_menu',
            children: [
              { id: '3', label: 'Quality ingredients' },
              { id: '4', label: 'Good recipe' }
            ]
          },
          {
            id: '5',
            label: 'Good service (disabled node with icon)',
            icon: 'room_service',
            children: [
              { id: '6', label: 'Prompt attention', disabled: true },
              { id: '7', label: 'Professional waiter' }
            ]
          },
          {
            id: '8',
            label: 'Pleasant surroundings (with icon)',
            icon: 'photo',
            children: [
              {
                id: '9',
                label: 'Happy atmosphere (with image)',
                img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
              },
              { id: '10', label: 'Good table presentation' },
              { id: '11', label: 'Pleasing decor' }
            ]
          },
          {
            id: '13',
            label: 'Good service (disabled node with icon)',
            icon: 'room_service'
          }
        ]
      }
    ])
    //树的移动
    const tree = ref()
    const getNodeParent = (elem) => {
      let parent = null
      while (elem.parentNode && !parent) {
        elem = elem.parentNode
        if (elem.classList.contains('q-tree__node')) {
          parent = elem
        }
      }
      return parent
    }
    const getNodeById = (node, id, currentIndex, parentNode) => {
      let array
      let parent
      if (!Array.isArray(node)) {
        parent = node
        if (node.id === id) return { node: node, index: currentIndex, parent: parentNode }
        array = node.children
      } else {
        array = node
      }
      if (array) {
        let i
        let result = null
        for (i = 0; result == null && i < array.length; i++) {
          result = getNodeById(array[i], id, i, parent)
        }
        return result
      }
      return null
    }
    const moveNode = (from, to) => {
      if (from === to) return

      const fromResult = getNodeById(simple.value, from, -1)
      const toResult = getNodeById(simple.value, to, -1)

      if (fromResult) {
        // 如果尝试将父节点移动到同一父节点的子节点中，则返回
        if (toResult && getNodeById(fromResult.node, toResult.node.id, -1)) {
          return
        }

        //移动的父节点存在则有孩子,将原本存在删除,如果不存在则表明是一级标题，则删除原始数据
        if (fromResult.parent && fromResult.parent.children) {
          fromResult.parent.children.splice(fromResult.index, 1)
        } else {
          simple.value.splice(fromResult.index, 1)
        }

        //添加数据
        if (toResult && toResult.node) {
          //如果投放的节点有孩子，则将孩子加入，不存在新建放入
          if (toResult.node.children) {
            toResult.node.children.splice(0, 0, fromResult.node)
          } else {
            // Vue.set(toResult.node, 'children', [fromResult.node])
            toResult.node.children = []
            toResult.node.children.push(fromResult.node)
          }
          //展开
          tree.value.setExpanded(toResult.node.id, true)
        }
      }
    }
    const dragEnter = (event) => {
      console.log('dragEnter')
      event.preventDefault()
    }
    const dragOver = (event) => {
      console.log('dragOver')
      event.preventDefault()
      const target = event.target
      if (target) {
        target.classList.add('container')
      }
    }
    const dragLeave = (event) => {
      console.log('dragLeave')
      event.preventDefault()
      const target = event.target
      if (target) {
        target.classList.remove('container')
      }
    }
    const dragStart = (event, key) => {
      console.log('dragStart')
      if (event.target) {
        const target = event.target
        const parent = getNodeParent(target)
        if (parent) {
          parent.classList.add('dragging')
        }
      }
      if (event.dataTransfer && event.target) {
        event.dataTransfer.setData('node', key)
      }
    }
    const dragStop = (event) => {
      console.log('dragStop')
      if (event.target) {
        const target = event.target
        const parent = getNodeParent(target)
        if (parent) {
          parent.classList.remove('dragging')
        }
      }
    }
    const drop = (event, key) => {
      console.log('drop')
      event.preventDefault()
      const target = event.target
      let nodeKey = ''
      if (event.dataTransfer) {
        nodeKey = event.dataTransfer.getData('node')
      }
      if (target) {
        target.classList.remove('container')
      }
      if (nodeKey) {
        moveNode(nodeKey, key)
        console.log(`Move ${nodeKey} to ${key}`)
      }
    }
    const checkMove = () => {
      console.log('checkMovecheckMovecheckMovecheckMove')
    }
    onMounted(() => console.log('1111111111', tree.value))
    //结束
    return {
      simple,
      dragEnter,
      dragOver,
      dragLeave,
      dragStart,
      dragStop,
      drop,
      getNodeById,
      tree,
      checkMove
    }
  }
}
</script>

<style lang="scss" scoped>
[draggable='true'] {
  /*
   To prevent user selecting inside the drag source
  */
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.mett-page-tree {
  .q-tree__node-header {
    padding: 0;
  }

  .q-tree__node--child > .q-tree__node-header {
    &:focus {
      box-shadow: none;
    }
  }

  .q-tree__node {
    &.dragging {
      background: rgba(#333f52, 0.1);
      border-radius: 4px;

      .q-hoverable:hover > .q-focus-helper {
        background: none;
        opacity: 0;
      }
    }
  }
}

.mett-tree-item {
  border-radius: 4px;
  padding: 8px;

  &.container {
    background: rgba(#008847, 0.1);
  }
}
</style>
