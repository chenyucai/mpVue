<template>
  <button
    class="g-base-button"
    :class="{'fixed-bottom': fixedBottom, disabled: disabled}"
    @click="handleClick"
  >
    {{text}}
  </button>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '保存'
      },
      fixedBottom: {
        type: Boolean,
        default: false
      },
      disabled: Boolean
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      handleClick(evt) {
        if (!this.disabled) {
          this.$emit('click', evt);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/mixin";

  .g-base-button {
    display: block;
    margin: 0 auto;
    width: 80%;
    padding: 15px 0;
    background: @brand-primary;
    text-align: center;
    color: #ffffff;
    font-size: 17px;
    border-radius: 22px;
    line-height: 1;
    .touchOpacity();

    &.fixed-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      border-radius: 0;
    }

    &.disabled {
      opacity: 0.5;
    }
  }
</style>
