export const LegendaryPolicy = () => {
  function isEligible(name) {
    return name == "Legendary";
  }

  function updateSellIn(sellIn) {
    return sellIn;
  }

  function updateQuality(item) {}

  return {
    isEligible,
    updateSellIn,
    updateQuality,
  };
};
