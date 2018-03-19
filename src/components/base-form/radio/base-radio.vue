<template>
  <div
    class="g-base-radio"
    :class="{selected: currentValue === value}"
    @click="handleClick"
  >
    {{label}}
  </div>
</template>

<script>
  export default {
    props: {
      label: [String, Number],
      value: [String, Number]
    },
    data() {
      return {}
    },
    computed: {
      currentValue() {
        return this.$parent.currentValue;
      }
    },
    created() {
    },
    methods: {
      handleClick() {
        this.$parent.handleChange(this.value)
      },
      setCurrentValue(value) {
        this.currentValue = value;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../form";
</style>
