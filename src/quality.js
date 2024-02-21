import { boundedValue } from "./boundedValue";

export const quality = (givenValue) => {
  let aValue = boundedValue(givenValue, 0, 50);

  return {
    value: givenValue,
    aValue: aValue,
    isGreaterThan: (comparedValue) => aValue.isGreaterThan(comparedValue),
    isLessThan: (comparedValue) => aValue.isLessThan(comparedValue),
    isEqualsTo: (comparedValue) => aValue.isEqualsTo(comparedValue),
    increaseBy: (increment) => quality(aValue.increaseBy(increment).value),
    decreaseBy: (increment) => quality(aValue.decreaseBy(increment).value),
  };
};
