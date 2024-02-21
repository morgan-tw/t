import { quality } from "../quality";

export const backstagePassPolicy = () => {
  function update(sellIn, givenQuality) {
    if (sellIn.isLessThan(0)) {
      return quality(0);
    }

    let newQuality = givenQuality.increaseByIfLessThanFifty(1);
    if (sellIn.isLessThan(10)) {
      newQuality = newQuality.increaseByIfLessThanFifty(1);
    }
    if (sellIn.isLessThan(5)) {
      newQuality = newQuality.increaseByIfLessThanFifty(1);
    }

    return newQuality;
  }

  return {
    update,
  };
};
