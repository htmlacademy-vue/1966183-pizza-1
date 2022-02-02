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
                @changeDough="$store.commit('Builder/changeDough', $event)"
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
                @changeSize="$store.commit('Builder/changeSize', $event)"
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
                  @setSauce="$store.commit('Builder/setSauce', $event)"
                />
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <builder-ingredients-selector
                    v-for="ingredient in ingredients"
                    :key="ingredient.name"
                    :ingredient="ingredient"
                    @setInParent="$store.commit('Builder/setCounter', $event)"
                    :count="countOfIngredients[ingredient.name]"
                    @changeCount="
                      $store.commit('Builder/changeCountIngredients', {
                        name: ingredient.name,
                        count: $event,
                      })
                    "
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <builder-pizza-name
            :value="pizzaName"
            @input="$store.commit('Builder/changePizzaName', $event)"
          />
          <builder-pizza-view
            :fillings="nameIngredients"
            :sauce="sauceType"
            :size="sizeType"
            :dough="doughType"
            @getName="
              $store.commit(
                'Builder/changeCountIngredientsByDragAndDrop',
                $event
              )
            "
          />
          <builder-price-counter
            :price="finalPrice"
            @addPizza="addPizza(finalPrice, newPizza)"
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
import { getSauce, getSize, getDough } from "@/common/helpers/classes";

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
    pickedItem(arr, pickedName) {
      return arr.find((item) => item.name === pickedName);
    },
    addPizza(price, pizza) {
      this.addPizzaToBasket({
        ...pizza,
        countOfIngredients: { ...pizza.countOfIngredients },
      });
      this.$store.commit("Builder/setBuilderToDefault");
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
    ]),
    newPizza() {
      return this.allIngredients;
    },
    nameIngredients() {
      return Object.entries(this.countOfIngredients);
    },
    pickedSauce() {
      const picked = getSauce(this.sauceType);
      return this.pickedItem(this.sauces, picked);
    },
    pickedDough() {
      const picked = getDough(this.doughType);
      return this.pickedItem(this.doughs, picked);
    },
    pickedSize() {
      let picked = getSize(this.sizeType);
      return this.pickedItem(this.sizes, picked);
    },
    buttonDisabled() {
      return (
        Object.values(this.countOfIngredients).every((item) => item === 0) ||
        this.pizzaName === ""
      );
    },
    finalPrice() {
      let price = 0;
      for (let key in this.countOfIngredients) {
        const item = this.ingredients.find((ing) => ing.name === key);
        const priceOfItem = this.countOfIngredients[key] * item.price;
        price += priceOfItem;
      }
      if (this.pickedSauce && this.pickedDough && this.pickedSize) {
        price += this.pickedSauce.price;
        price += this.pickedDough.price;
        price *= this.pickedSize.multiplier;
      }
      this.$store.commit("Builder/setPizzaPrice", price);
      return price;
    },
  },
};
</script>
