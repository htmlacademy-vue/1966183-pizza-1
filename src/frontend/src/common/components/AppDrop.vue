<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrop",
  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData("name");
      if (payload) {
        this.$emit("drop", payload);
      }
    },
  },
};
</script>
