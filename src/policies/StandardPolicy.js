export const StandardPolicy = () => {
  function isEligible(item) {
    return true;
  }

  function updateSellIn(sellIn) {
    return sellIn.decreaseBy(1);
  }

  function updateQuality(sellIn, quality) {
    let newQuality = quality.decreaseByIfGreaterThanZero(1);
    if (sellIn.isLessThan(0)) {
      newQuality = newQuality.decreaseByIfGreaterThanZero(1);
    }

    return newQuality;
  }

  return {
    isEligible,
    updateSellIn,
    updateQuality,
  };
};
