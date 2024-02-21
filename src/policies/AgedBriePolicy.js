export const AgedBriePolicy = () => {
  function isEligible(name) {
    return name == "AgedBrie";
  }

  function updateSellIn(sellIn) {
    return sellIn.decreaseBy(1);
  }

  function updateQuality(sellIn, quality) {
    let newQuality = quality.increaseByIfLessThanFifty(1);
    if (sellIn.isLessThan(0)) {
      newQuality = newQuality.increaseByIfLessThanFifty(1);
    }

    return newQuality;
  }

  return {
    isEligible,
    updateSellIn,
    updateQuality,
  };
};
