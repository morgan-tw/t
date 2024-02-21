export const ComposedPolicy = (givenPolicies) => {
  const policies = givenPolicies;

  function applyTo(item) {
    for (let i = 0; i < policies.length; ++i) {
      if (policies[i].isEligible(item.name)) {
        policies[i].updateSellIn(item);
        policies[i].updateQuality(item);
        return;
      }
    }
  }

  return {
    applyTo,
  };
};
