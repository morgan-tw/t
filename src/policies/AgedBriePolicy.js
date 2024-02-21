export const agedBriePolicy = () => {
  function update(sellIn, aQuality, aValue) {
    let newValue = aValue.increaseBy(1);
    if (sellIn.isLessThan(0)) {
      newValue = newValue.increaseBy(1);
    }

    return newValue.value;
  }

  return {
    update,
  };
};
