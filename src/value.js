export const value = (aValue) => {
  return {
    value: aValue,
    isGreaterThan: (comparedValue) => aValue > comparedValue,
    isLessThan: (comparedValue) => aValue < comparedValue,
    isEqualsTo: (comparedValue) => aValue === comparedValue,
    increaseBy: (increment) => value(aValue + increment),
    decreaseBy: (increment) => value(aValue - increment),
  };
};
