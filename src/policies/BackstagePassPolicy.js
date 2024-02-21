import { quality } from "../quality";

export const backstagePassPolicy = () => {
  function update(sellIn, givenQuality, aValue) {
    if (sellIn.isLessThan(0)) {
      return quality(0).value;
    }

    let newValue = aValue.increaseBy(1);
    if (sellIn.isLessThan(10)) {
      newValue = newValue.increaseBy(1);
    }
    if (sellIn.isLessThan(5)) {
      newValue = newValue.increaseBy(1);
    }

    return newValue.value;
  }

  return {
    update,
  };
};
