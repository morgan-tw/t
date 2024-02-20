import { quality } from "../quality";

const isBackstagePass = (item) => item.name == "Backstage pass";

export const BackstagePassPolicy = () => {
  function isEligible(item) {
    return isBackstagePass(item);
  }

  function applyTo(item) {
    if (item.quality.isLessThan(50)) {
      item.quality = item.quality.increaseBy(1);
    }
    if (item.sellIn < 11) {
      if (item.quality.isLessThan(50)) {
        item.quality = item.quality.increaseBy(1);
      }
    }
    if (item.sellIn < 6) {
      if (item.quality.isLessThan(50)) {
        item.quality = item.quality.increaseBy(1);
      }
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
