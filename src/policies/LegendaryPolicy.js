export const LegendaryPolicy = () => {
  function isEligible(name) {
    return name == "Legendary";
  }

  function applyTo(item) {}

  return {
    isEligible,
    applyTo,
  };
};
