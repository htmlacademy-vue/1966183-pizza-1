<template>
  <li>
    <img :src="miscObj.image" width="20" height="30" :alt="miscObj.name" />
    <p>
      <span>{{ miscObj.name }}</span>
      <b> {{ currentMisc.quantity }} Х {{ miscObj.price }} ₽</b>
    </p>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrderAdditionalListItem",
  props: {
    currentMisc: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("IngredientsProducts", ["misc"]),
    miscObj() {
      if (this.misc.length !== 0) {
        return this.misc.find((item) => item.id === this.currentMisc.miscId);
      }
      return {};
    },
  },
};
</script>

<style scoped></style>
