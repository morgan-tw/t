export const regularDecreasePolicy = (givenIncrement) => {
  return {
    update: (value) => value.decreaseBy(givenIncrement),
  };
};
