export const AgedBriePolicy = () => {
  function isEligible(item) {
    return item.name == "AgedBrie";
  }

  function applyTo(item) {
    item.sellIn = item.sellIn.decreaseBy(1);

    item.quality = item.quality.increaseByIfLessThanFifty(1);
    if (item.sellIn.isLessThan(0)) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
  }

  return {
    isEligible,
    applyTo,
  };
};
