<template>
  <app-drop @drop="$emit('getName', $event)">
    <div class="content__constructor">
      <div :class="pizzaClass">
        <div class="pizza__wrapper">
          <div v-for="(fill, index) in fillings" :key="`filling--${index}`">
            <div :class="getCorrectClassName(fill)" v-show="fill[1] > 0"></div>
            <div
              :class="`${getCorrectClassName(fill)} pizza__filling--second`"
              v-show="fill[1] > 1"
            ></div>
            <div
              :class="`${getCorrectClassName(fill)} pizza__filling--third`"
              v-show="fill[1] > 2"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </app-drop>
</template>

<script>
import { getIngredientClass } from "@/common/helpers/classes";
import AppDrop from "@/common/components/AppDrop.vue";
export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  props: {
    size: {
      type: String,
    },
    sauce: {
      type: String,
    },
    fillings: {
      type: Array,
      required: true,
    },
    doughType: {
      type: String,
    },
  },
  methods: {
    getIngredientClass,
    getCorrectClassName(fill) {
      const fillName = this.getIngredientClass(fill[0]);
      return `pizza__filling pizza__filling--${fillName}`;
    },
  },
  computed: {
    pizzaClass() {
      return `pizza pizza--foundation--${this.size}-${this.sauce}`;
    },
  },
};
</script>

<style scoped></style>
