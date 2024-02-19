export const createGildedRose = (originalItems) => {
  const items = originalItems;

  function UpdateQuality() {
    items.forEach((item) => {
      item.updateQuality();
    });
    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
