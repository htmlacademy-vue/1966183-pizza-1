<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <builder-dough-selector
                v-for="dough in doughs"
                :key="dough.name"
                :item="dough"
                selector-type="dough"
                subtype="dough"
                @changeDough="changeDough"
                :doughType="doughType"
              />
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <builder-size-selector
                v-for="size in sizes"
                :key="size.name"
                :item="size"
                selector-type="diameter"
                :sizeType="sizeType"
                @changeSize="changeSize"
              />
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <builder-sauce-selector
                  v-for="sauce in sauces"
                  :key="sauce.name"
                  :item="sauce"
                  selector-type="sauces"
                  :sauceType="sauceType"
                  @setSauce="setSauce"
                />
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <builder-ingredients-selector
                    v-for="ingredient in ingredients"
                    :key="ingredient.name"
                    :ingredient="ingredient"
                    @setInParent="setCounter"
                    :count="countOfIngredients[ingredient.name]"
                    @changeCount="
                      changeCountIngredients(ingredient.name, $event)
                    "
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <builder-pizza-name :value="pizzaName" @input="changePizzaName" />
          <builder-pizza-view
            :fillings="nameIngredients"
            :sauce="sauceType"
            :size="sizeType"
            :dough="doughType"
            @getName="changeCountIngredientsByDragAndDrop"
          />
          <builder-price-counter
            :price="price"
            @addPizza="addPizza(price, newPizza)"
            :buttonDisabled="buttonDisabled"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizzaJsonData from "@/static/pizza.json";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaName from "@/modules/builder/components/BuilderPizzaName.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";

export default {
  name: "PizzaConstructor",
  components: {
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderSauceSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaName,
  },
  data() {
    return {
      doughs: pizzaJsonData.dough,
      ingredients: pizzaJsonData.ingredients,
      sauces: pizzaJsonData.sauces,
      sizes: pizzaJsonData.sizes,
    };
  },
  methods: {
    ...mapMutations("Cart", ["addPizzaToBasket", "changeFinalPrice"]),
    addPizza(price, pizza) {
      this.addPizzaToBasket({
        ...pizza,
        countOfIngredients: { ...pizza.countOfIngredients },
      });
      this.$store.commit("Builder/setBuilderToDefault");
    },
    changeDough(event) {
      this.$store.commit("Builder/changeDough", event);
    },
    changeSize(event) {
      this.$store.commit("Builder/changeSize", event);
    },
    setSauce(event) {
      this.$store.commit("Builder/setSauce", event);
    },
    changeCountIngredients(name, event) {
      if (!this.countOfIngredients[name]) {
        Vue.set(this.countOfIngredients, name, 0);
      }
      this.$store.commit("Builder/changeCountIngredients", {
        name,
        count: event,
      });
    },
    changePizzaName(event) {
      this.$store.commit("Builder/changePizzaName", event);
    },
    changeCountIngredientsByDragAndDrop(event) {
      if (!this.countOfIngredients[event]) {
        Vue.set(this.countOfIngredients, event, 0);
      }
      this.$store.commit("Builder/changeCountIngredientsByDragAndDrop", event);
    },
    setCounter(event) {
      this.$store.commit("Builder/setCounter", event);
    },
  },
  computed: {
    ...mapGetters("Builder", [
      "countOfIngredients",
      "sauceType",
      "sizeType",
      "doughType",
      "pizzaName",
      "allIngredients",
      "price",
    ]),
    newPizza() {
      return this.allIngredients;
    },
    nameIngredients() {
      return Object.entries(this.countOfIngredients);
    },
    buttonDisabled() {
      return (
        Object.values(this.countOfIngredients).every((item) => item === 0) ||
        this.pizzaName === ""
      );
    },
  },
};
</script>
