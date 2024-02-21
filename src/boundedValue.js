export const boundedValue = (aValue, downLimit, upLimit) => {
  return {
    value: aValue,
    isGreaterThan: (comparedValue) => aValue > comparedValue,
    isLessThan: (comparedValue) => aValue < comparedValue,
    isEqualsTo: (comparedValue) => aValue === comparedValue,
    increaseBy: (increment) => {
      return aValue + increment < upLimit
        ? boundedValue(aValue + increment, downLimit, upLimit)
        : boundedValue(upLimit, downLimit, upLimit);
    },
    decreaseBy: (increment) => {
      return aValue - increment > downLimit
        ? boundedValue(aValue - increment, downLimit, upLimit)
        : boundedValue(downLimit, downLimit, upLimit);
    },
  };
};
