export const regularDecreasePolicy = (increment) => {
  return {
    update: (value) => value.decreaseBy(increment),
  };
};
