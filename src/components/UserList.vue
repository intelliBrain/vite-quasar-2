<template>
  <div>this is user list {{ departmentId }}</div>
</template>

<script>
export default {
  props: {
    departmentId: {
      type: Number,
      required: true
    }
  },
  setup(props, context) {
    return {}
  }
}
</script>

<style></style>
