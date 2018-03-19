<template>
  <div class="g-base-form-item">
    <div class="g-base-input">
      <div class="m-base-input-label">
        {{label}}
      </div>
      <div class="m-base-input-content">
        <input
          class="u-base-input-inner"
          ref="input"
          :type="type"
          :value="currentValue"
          :placeholder="placeholder"
          @input="handleInput"
          @change="handleChange"
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: [String, Number],
      label: String,
      placeholder: {
        type: String,
        default: '请输入'
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value(val) {
        this.setCurrentValue(val);
      }
    },
    created() {
    },
    methods: {
      setCurrentValue(value) {
        this.currentValue = value;
      },
      handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../form";
</style>
