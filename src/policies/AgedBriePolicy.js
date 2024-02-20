const isAgedBrie = (item) => item.name == "AgedBrie";

export const AgedBriePolicy = () => {
  function isEligible(item) {
    return isAgedBrie(item);
  }

  function applyTo(item) {
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

  return {
    isEligible,
    applyTo,
  };
};
