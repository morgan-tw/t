export const quality = (givenValue) => {
  const downLimit = 0;
  const upLimit = 50;

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

  function increaseByIfLessThanFifty(increment) {
    return value + increment < upLimit
      ? quality(value + increment)
      : quality(50);
  }

  function decreaseBy(increment) {
    return quality(value - increment);
  }

  function decreaseByIfGreaterThanZero(increment) {
    return value - increment > downLimit
      ? quality(value - increment)
      : quality(0);
  }

  return {
    isGreaterThan,
    isLessThan,
    isEqualsTo,
    increaseBy,
    increaseByIfLessThanFifty,
    decreaseBy,
    decreaseByIfGreaterThanZero,
  };
};
