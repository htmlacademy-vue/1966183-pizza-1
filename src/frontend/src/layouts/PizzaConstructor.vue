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
                @changeDough="doughType = $event"
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
                @changeSize="sizeType = $event"
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
                  @setSauce="sauceType = $event"
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
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <builder-pizza-name :value="pizzaName" @input="pizzaName = $event" />
          <builder-pizza-view
            :fillings="fillings"
            :sauce="sauceType"
            :size="sizeType"
            :dough="doughType"
          />
          <builder-price-counter :price="finalPrice" />
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
      countOfIngredients: {},
      sauceType: "tomato",
      sizeType: "small",
      doughType: "light",
      pizzaName: "",
    };
  },
  methods: {
    setCounter(event) {
      this.countOfIngredients = { ...this.countOfIngredients, ...event };
    },
  },
  computed: {
    fillings() {
      return Object.keys(this.countOfIngredients);
    },
    finalPrice() {
      let price = 0;
      for (let key in this.countOfIngredients) {
        const item = this.ingredients.find((ing) => ing.name === key);
        const priceOfItem = this.countOfIngredients[key] * item.price;
        price += priceOfItem;
      }
      return price;
    },
  },
};
</script>
