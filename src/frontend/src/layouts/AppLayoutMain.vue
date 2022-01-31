<template>
  <div>
    <AppLayoutHeader />
    <AppLayoutMainSidebar />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";
import AppLayoutMainSidebar from "./AppLayoutMainSidebar";

export default {
  name: "AppLayoutMain",
  components: { AppLayoutHeader, AppLayoutMainSidebar },
};
</script>

<style scoped></style>
