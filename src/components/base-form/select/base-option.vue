<template>
  <option :value="value">{{label}}</option>
</template>

<script>
  export default {
    props: {
      value: [String, Number],
      label: [String, Number]
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>

</style>
