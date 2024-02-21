export const AgedBriePolicy = () => {
  function isEligible(item) {
    return item.name == "AgedBrie";
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
