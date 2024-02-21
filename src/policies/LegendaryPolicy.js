export const LegendaryPolicy = () => {
  function isEligible(name) {
    return name == "Legendary";
  }

  function updateSellIn(sellIn) {
    return sellIn;
  }

  function updateQuality(sellIn, quality) {
    return quality;
  }

  return {
    isEligible,
    updateSellIn,
    updateQuality,
  };
};
