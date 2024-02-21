export const agedBriePolicy = () => {
  function updateQuality(sellIn, quality) {
    let newQuality = quality.increaseByIfLessThanFifty(1);
    if (sellIn.isLessThan(0)) {
      newQuality = newQuality.increaseByIfLessThanFifty(1);
    }

    return newQuality;
  }

  return {
    updateQuality,
  };
};
