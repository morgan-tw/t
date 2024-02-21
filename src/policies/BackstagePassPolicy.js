import { quality } from "../quality";

const isBackstagePass = (item) => item.name == "Backstage pass";

export const BackstagePassPolicy = () => {
  function isEligible(item) {
    return isBackstagePass(item);
  }

  function applyTo(item) {
    item.quality = item.quality.increaseByIfLessThanFifty(1);
    if (item.sellIn < 11) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
    if (item.sellIn < 6) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      item.quality = quality(0);
    }
  }

  return {
    isEligible,
    applyTo,
  };
};
