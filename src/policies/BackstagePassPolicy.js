import { quality } from "../quality";

export const BackstagePassPolicy = () => {
  function isEligible(item) {
    return item.name == "Backstage pass";
  }

  function applyTo(item) {
    item.sellIn = item.sellIn - 1;

    item.quality = item.quality.increaseByIfLessThanFifty(1);
    if (item.sellIn < 10) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
    if (item.sellIn < 5) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
    if (item.sellIn < 0) {
      item.quality = quality(0);
    }
  }

  return {
    isEligible,
    applyTo,
  };
};
