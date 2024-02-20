export const quality = (givenValue) => {
  let value = givenValue;

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
  }

  return {
    getValue,
    setValue,
  };
};
