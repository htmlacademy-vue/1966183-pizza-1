<template>
  <div>
    <HeaderLayout></HeaderLayout>
    <Constructor></Constructor>
  </div>
</template>

<script>
import HeaderLayout from "/src/layouts/HeaderLayout.vue";
import Constructor from "/src/layouts/Constructor.vue";
export default {
  name: "Index",
  components: { HeaderLayout, Constructor },
};
</script>

<style lang="scss" scoped></style>
