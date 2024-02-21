export const ComposedPolicy = (givenPolicies) => {
  const policies = givenPolicies;

  function applyTo(item) {
    for (let i = 0; i < policies.length; ++i) {
      if (policies[i].isEligible(item.name)) {
        item.sellIn = policies[i].updateSellIn(item.sellIn);
        item.quality = policies[i].updateQuality(item.sellIn, item.quality);
        return;
      }
    }
  }

  return {
    applyTo,
  };
};
