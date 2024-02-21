import { quality } from "../quality";

export const BackstagePassPolicy = () => {
  function isEligible(name) {
    return name == "Backstage pass";
  }

  function applyTo(item) {
    item.sellIn = item.sellIn.decreaseBy(1);

    item.quality = item.quality.increaseByIfLessThanFifty(1);
    if (item.sellIn.isLessThan(10)) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
    if (item.sellIn.isLessThan(5)) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
    if (item.sellIn.isLessThan(0)) {
      item.quality = quality(0);
    }
  }

  return {
    isEligible,
    applyTo,
  };
};
