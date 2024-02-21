export const standardPolicy = () => {
  function update(sellIn, quality, aValue) {
    let newValue = aValue.decreaseBy(1);
    if (sellIn.isLessThan(0)) {
      newValue = newValue.decreaseBy(1);
    }

    return newValue.value;
  }

  return {
    update,
  };
};
