export const createGildedRose = (originalItems) => {
  const items = originalItems;

  function UpdateQuality() {
    items.forEach((item) => {
      item.updateQuality();

      if (item.name === "AgedBrie") {
        item.sellIn -= 1;
      }
    });
    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
