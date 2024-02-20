export const quality = (givenValue) => {
  let value = givenValue;
  console.log(`create quality ${givenValue}`);

  function getValue() {
    console.log(`get value ${value}`);
    return value;
  }

  function setValue(newValue) {
    console.log(`set value ${newValue}`);
    value = newValue;
  }

  return {
    getValue,
    setValue,
  };
};
