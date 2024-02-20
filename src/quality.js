export const quality = (givenValue) => {
  let value = givenValue;

  function isGreaterThan(comparedValue) {
    return value > comparedValue;
  }

  function isLessThan(comparedValue) {
    return value < comparedValue;
  }

  function isEqualsTo(comparedValue) {
    return value === comparedValue;
  }

  function increaseBy(increment) {
    return quality(value + increment);
  }

  function decreaseBy(increment) {
    return quality(value - increment);
  }

  return {
    isGreaterThan,
    isLessThan,
    isEqualsTo,
    increaseBy,
    decreaseBy,
  };
};
