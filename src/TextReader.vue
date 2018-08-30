<template>
  <label class="text-reader card-header-action btn-close" title="Open">
    <i class="fa fa-file-text"></i>
    <input type="file" @change="loadTextFromFile" :accept="types">
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    types: {
      type: Array
    }
  },
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(file);
    }
  }
};
</script>
<style>
.text-reader {
  position: relative;
  /* overflow: hidden; */
  /* display: inline-block; */

  /* Fancy button looking */
  /* border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px; */
  margin: 0;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
