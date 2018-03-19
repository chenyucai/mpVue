<template>
  <div class="g-base-form-item">
    <div class="g-base-radio-group">
      <div class="m-base-radio-group-label">
        {{label}}
      </div>
      <div class="m-base-radio-group-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: [String, Number],
      label: String
    },
    data() {
      return {
        currentValue: ''
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: function (val) {
          this.setCurrentValue(val);
        }
      }
    },
    created() {
    },
    methods: {
      setCurrentValue(value) {
        this.currentValue = value;
      },
      handleChange(value) {
        this.$emit('input', value);
        this.setCurrentValue(value);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../form";
</style>
