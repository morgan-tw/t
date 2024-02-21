const isAgedBrie = (item) => item.name == "AgedBrie";

export const AgedBriePolicy = () => {
  function isEligible(item) {
    return isAgedBrie(item);
  }

  function applyTo(item) {
    item.sellIn = item.sellIn - 1;

    item.quality = item.quality.increaseByIfLessThanFifty(1);
    if (item.sellIn < 0) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
  }

  return {
    isEligible,
    applyTo,
  };
};
