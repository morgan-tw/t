export const StandardPolicy = () => {
  function isEligible(item) {
    return true;
  }

  function updateSellIn(sellIn) {
    return sellIn.decreaseBy(1);
  }

  function updateQuality(item) {
    if (item.quality.isGreaterThan(0)) {
      item.quality = item.quality.decreaseByIfGreaterThanZero(1);
    }
    if (item.sellIn.isLessThan(0)) {
      item.quality = item.quality.decreaseByIfGreaterThanZero(1);
    }
  }

  return {
    isEligible,
    updateSellIn,
    updateQuality,
  };
};
