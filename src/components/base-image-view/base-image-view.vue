<template>
  <figure class="g-base-image-view" :data-preview="realImageUrl">
    <img :src="realImageUrl" hidden/>
    <div
      v-show="!loading"
      class="image-view"
      :style="{backgroundImage: 'url('+realImageUrl+')', width: width+'px', height: height+'px'}"
    >
      <span class="image-del" v-show="showRemove" @click.stop.prevent="removeImage"></span>
    </div>
    <div
      class="loading"
      v-show="loading"
      :style="{width: width+'px', height: height+'px', lineHeight: height+'px'}"
    >
      <img src="~images/loading.gif" alt="" class="loading-icon">
    </div>
  </figure>
</template>

<script>
  import {getOssRcfsFile} from "../../api/common";

  export default {
    props: {
      width: {
        type: [String, Number],
        default: '80'
      },
      height: {
        type: [String, Number],
        default: '80'
      },
      imageUrl: {
        type: String,
        default: ''
      },
      imageIndex: [Number],
      showRemove: {
        type: Boolean,
        default: false
      },
      onRemove: {
        type: Function,
        default: function () {
        }
      },
      async: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        realImageUrl: '',
        loading: true
      }
    },
    created() {
      if (this.async) {
        getOssRcfsFile(this.imageUrl).then((url) => {
          this.realImageUrl = url;
          this.loading = false;
        });
      } else {
        let img = {};
        img.onload = () => {
          this.realImageUrl = this.imageUrl;
          this.loading = false;
        };
        img.onerror = () => {};
        img.src = this.imageUrl;
      }
    },
    methods: {
      removeImage() {
        this.onRemove(this.imageUrl, this.imageIndex);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/mixin";

  .g-base-image-view {
    .image-view {
      display: block;
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
      background-size: cover;
      background-position: center;
      .image-del {
        position: absolute;
        right: -6px;
        top: -6px;
        .bg-image('~images/icon-image-del', 18px, 18px);
        .touchOpacity();
      }
    }

    .loading {
      padding: 5px;
      text-align: center;
      .loading-icon {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
