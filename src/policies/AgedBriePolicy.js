export const AgedBriePolicy = () => {
  function isEligible(name) {
    return name == "AgedBrie";
  }

  function updateSellIn(sellIn) {
    return sellIn.decreaseBy(1);
  }

  function updateQuality(item) {
    item.quality = item.quality.increaseByIfLessThanFifty(1);
    if (item.sellIn.isLessThan(0)) {
      item.quality = item.quality.increaseByIfLessThanFifty(1);
    }
  }

  return {
    isEligible,
    updateSellIn,
    updateQuality,
  };
};
