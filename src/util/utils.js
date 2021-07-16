const indexInArray = function (objects, objectId) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === objectId) {
      return i
    }
  }
  return -1
}

const getIndex = function (objects, propName, propValue) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i][propName] === propValue) {
      return i
    }
  }
  return -1
}

const getIndexByTwoLevelProp = function (objects, propNameLevelOne, propNameLevelTwo, propValue) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i][propNameLevelOne][propNameLevelTwo] === propValue) {
      return i
    }
  }
  return -1
}

const getProperties = function (objects, propName) {
  let result = []

  objects.forEach((element) => {
    result.push(element[propName])
  })

  return result
}

const getTwoLevelProperties = function (objects, propNameLevelOne, propNameLevelTwo) {
  let result = []

  objects.forEach((element) => {
    result.push(element[propNameLevelOne][propNameLevelTwo])
  })

  return result
}

const getWebClientHomepageUrl = function () {
  let webClientPort = process.env.VUE_APP_WEB_CLIENT_PORT
  let baseUrl = `${location.protocol}//${location.hostname}${
    webClientPort && webClientPort !== '80' ? ':' + webClientPort : ''
  }`

  return baseUrl
}

const isIos = () => navigator.userAgent.match(/iPhone|iPad|iPod/i)
const isAndroid = () => navigator.userAgent.match(/Android/i)
const isWap = () => isIos() || isAndroid()

const searchTree = (tree, prop, value) => {
  let i,
    f = null // iterator, found node
  if (Array.isArray(tree)) {
    // if entry object is array objects, check each object
    for (i = 0; i < tree.length; i++) {
      f = this.searchTree(tree[i], prop, value)
      if (f) {
        // if found matching object, return it.
        return f
      }
    }
  } else if (typeof tree === 'object') {
    // standard tree node (one root)
    if (tree[prop] !== undefined && tree[prop] === value) {
      return tree // found matching node
    }
  }
  if (tree['children'] !== undefined && tree['children'].length > 0) {
    // if this is not maching node, search nodes, children (if prop exist and it is not empty)
    return this.searchTree(tree['children'], prop, value)
  } else {
    return null // node does not match and it neither have children
  }
}

const getDateRange = (startDate, days) => {
  let dates = []
  dates.push(startDate.toISOString().slice(0, 10))
  for (let i = 0; i < days; i++) {
    dates.push(new Date(startDate.setDate(startDate.getDate() - 1)).toISOString().slice(0, 10))
  }
  dates.reverse()
  return dates
}

const formatSeconds = (value) => {
  let result = parseInt(value)
  let h =
    Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
  let m =
    Math.floor((result / 60) % 60) < 10
      ? '0' + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60)
  let s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)
  if (result >= 3600) {
    result = `${h}:${m}:${s}`
  } else {
    result = `${m}:${s}`
  }
  return result
}

const getTreeNodeParent = (treeData, parentId) => {
  let parent = null
  for (let index in treeData) {
    parent = getParent(treeData[index], parentId)
    if (parent && parent.id) {
      break
    }
  }
  return parent
}

function getParent(treeNode, id) {
  if (id === treeNode.id) {
    return treeNode
  }

  if (!treeNode.children || treeNode.children.length === 0) {
    return null
  }

  for (let i in treeNode.children) {
    let fetchTreeNode = getParent(treeNode.children[i], id)
    if (fetchTreeNode) {
      return fetchTreeNode
    }
  }
}

const setFavicon = (favicon) => {
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = favicon
  document.getElementsByTagName('head')[0].appendChild(link)
}

const getLang = () => {
  let lang = ''
  if (navigator.languages != undefined) {
    lang = navigator.languages[0]
  } else {
    lang = navigator.language
  }
  if (lang.startsWith('zh')) {
    return 'cn'
  } else {
    return 'en'
  }
}

const buildTree = (list) => {
  let arr = JSON.parse(JSON.stringify(list))
  arr.sort((first, second) => first.seq - second.seq)
  let rootIds = arr.map((item) => item.id)
  let rootTrees = arr.filter((item) => !item.parentId || !rootIds.includes(item.parentId))

  buildTreeChild(rootTrees)
  function buildTreeChild(rootTrees) {
    rootTrees.forEach((rootTree) => {
      let children = arr.filter((item) => item.parentId == rootTree.id)
      if (children.length > 0) {
        rootTree.children = children
        buildTreeChild(children)
      }
    })
  }
  return rootTrees
}

export default {
  indexInArray,
  getIndex,
  getIndexByTwoLevelProp,
  getProperties,
  getTwoLevelProperties,
  getWebClientHomepageUrl,
  isWap,
  isIos,
  isAndroid,
  searchTree,
  getDateRange,
  formatSeconds,
  getTreeNodeParent,
  setFavicon,
  getLang,
  buildTree
}
