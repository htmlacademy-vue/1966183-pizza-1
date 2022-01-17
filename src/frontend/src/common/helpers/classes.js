const getDoughClass = (name) => {
  switch (name) {
    case "Тонкое":
      return "light";
    default:
      return "large";
  }
}
const getSaucesClass = (name) => {
  switch (name) {
    case "Томатный":
      return "tomato";
    default:
      return "creamy";
  }
}
const getSizeClass = (name) => {
  switch (name) {
    case "23 см":
      return "small";
    case "32 см":
      return "normal";
    default:
      return "big";
  }
}
const getIngredientClass = (name) => {
  switch (name) {
    case "Грибы":
      return "mushrooms";
    case "Чеддер":
      return "cheddar";
    case "Салями":
      return "salami";
    case "Ветчина":
      return "ham";
    case "Ананас":
      return "ananas";
    case "Бекон":
      return "bacon";
    case "Лук":
      return "onion";
    case "Чили":
      return "chile";
    case "Халапеньо":
      return "jalapeno";
    case "Маслины":
      return "olives";
    case "Томаты":
      return "tomatoes";
    case "Лосось":
      return "salmon";
    case "Моцарелла":
      return "mozzarella";
    case "Блю чиз":
      return "blue_cheese";
    default:
      return "parmesan";
  }
}

export default
