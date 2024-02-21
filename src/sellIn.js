export const sellIn = (aValue, policy) => {
  return {
    value: aValue.value,
    isGreaterThan: (comparedValue) => aValue.isGreaterThan(comparedValue),
    isLessThan: (comparedValue) => aValue.isLessThan(comparedValue),
    isEqualsTo: (comparedValue) => aValue.isEqualsTo(comparedValue),
    update: () => sellIn(policy.update(aValue), policy),
  };
};
