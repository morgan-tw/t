import { quality } from "./quality";

export const createGildedRose = (originalItems) => {
  const items = originalItems;

  const isAgedBrie = (item) => item.name == "AgedBrie";
  const isBackstagePass = (item) => item.name == "Backstage pass";
  const isStandard = (item) =>
    item.name != "AgedBrie" &&
    item.name != "Backstage pass" &&
    item.name != "Legendary";

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.updateQuality();

      if (isAgedBrie(item)) {
        if (item.quality.isLessThan(50)) {
          item.quality = item.quality.increaseBy(1);
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality.isLessThan(50)) {
            item.quality = item.quality.increaseBy(1);
          }
        }
      }

      if (isBackstagePass(item)) {
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

      if (isStandard(item)) {
        if (item.quality.isGreaterThan(0)) {
          item.quality = item.quality.decreaseBy(1);
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality.isGreaterThan(0)) {
            item.quality = item.quality.decreaseBy(1);
          }
        }
      }
    }

    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
