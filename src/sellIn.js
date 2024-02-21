export const sellIn = (value) => {
  return {
    isGreaterThan: (comparedValue) => value > comparedValue,
    isLessThan: (comparedValue) => value < comparedValue,
    isEqualsTo: (comparedValue) => value === comparedValue,
    increaseBy: (increment) => sellIn(value + increment),
    decreaseBy: (increment) => sellIn(value - increment),
  };
};
