export const quality = (givenValue) => {
  let value = givenValue;

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
  }

  function isGreaterThan(comparedValue) {
    return value > comparedValue;
  }

  function isLessThan(comparedValue) {
    return value < comparedValue;
  }

  return {
    getValue,
    setValue,
    isGreaterThan,
    isLessThan,
  };
};
