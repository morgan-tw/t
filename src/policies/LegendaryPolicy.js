export const LegendaryPolicy = () => {
  function isEligible(item) {
    return item.name == "Legendary";
  }

  function applyTo(item) {}

  return {
    isEligible,
    applyTo,
  };
};
