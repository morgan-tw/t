import { quality } from "../quality";

export const backstagePassPolicy = () => {
  function updateQuality(sellIn, givenQuality) {
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
    updateQuality,
  };
};
