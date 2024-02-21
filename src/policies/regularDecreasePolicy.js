export const regularDecreasePolicy = (givenIncrement) => {
  return {
    updateSellIn: (sellIn) => {
      return sellIn.decreaseBy(givenIncrement);
    },
  };
};
