export const standardPolicy = () => {
  function updateQuality(sellIn, quality) {
    let newQuality = quality.decreaseByIfGreaterThanZero(1);
    if (sellIn.isLessThan(0)) {
      newQuality = newQuality.decreaseByIfGreaterThanZero(1);
    }

    return newQuality;
  }

  return {
    updateQuality,
  };
};
