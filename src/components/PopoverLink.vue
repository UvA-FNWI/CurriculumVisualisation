<template>
  <div class="wrapper">
    <a><slot></slot></a>
    <div class="popover">
      <slot name="popover"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PopoverLink',
});
</script>

<style lang="scss" scoped>
  .wrapper {
      position: relative;
  }

  .popover {
      text-align: left;
      visibility: hidden;
      position: absolute;
      left: 45px; 
      top: -10px;
      opacity: 0;
      transition: opacity 0.2s ease-in-out; 
      background-color: white;
      border: 1px solid #aaa;
      padding: 10px;
  }

  .popover:before {
    position: absolute;
    z-index: -1;
    content: '';
    top: 10px;
    left: -10px;
    border-style: solid;
    border-width: 10px 10px 10px 0px;
    border-color: transparent #777 transparent transparent;
}

  .wrapper:hover .popover {
      visibility: visible;
      opacity: 1;
      z-index: 10;
  }
</style>