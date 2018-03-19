<template>
  <div class="g-base-form-item">
    <div class="g-base-select">
      <div class="m-base-select-label">
        {{label}}
      </div>
      <div class="m-base-select-content">
        <span class="u-base-select-value" :class="{'no-value': !currentValue}">
          {{currentValue ? currentText : placeholder}}
        </span>
        <span class="u-base-select-arrow"></span>
        <select
          class="u-base-select-inner"
          ref="select"
          :value="currentValue"
          @change="handleChange"
        >
          <slot></slot>
        </select>
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
        currentValue: this.value,
        currentText: ''
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
        this.$nextTick(() => {
          let select = this.$refs.select;
          this.currentText = select.options[select.selectedIndex].text;
        });
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
