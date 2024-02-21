export const LegendaryPolicy = () => {
  function isEligible(name) {
    return name == "Legendary";
  }

  function updateSellIn(item) {}

  function updateQuality(item) {}

  return {
    isEligible,
    updateSellIn,
    updateQuality,
  };
};
