<template>
  <div class="g-base-form-item">
    <div class="g-base-select">
      <div class="m-base-select-label">
        {{label}}
      </div>
      <div class="m-base-select-content">
        <span class="u-base-select-value" :class="{'no-value': !currentValue}">
          {{currentValue ? currentValue : placeholder}}
        </span>
        <span class="u-base-select-arrow"></span>
        <input
          class="u-base-select-inner"
          ref="select"
          type="date"
          :value="currentValue"
          @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      label: String,
      placeholder: {
        type: String,
        default: '请选择'
      }
    },
    data() {
      return {
        currentValue: this.value
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
      handleChange(event) {
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../form";
</style>
