export const createGildedRose = (originalItems) => {
  const items = originalItems;

  function UpdateQuality() {
    items.forEach((item) => {
      item.updateQuality();

      item.sellIn -= 1;
      if (item.name === "Legendary") {
        item.sellIn += 1;
      }

      if (item.name !== "Legendary") {
        if (item.quality < 50) {
          item.quality += 1;

          if (item.sellIn < 0) {
            if (item.quality < 50) {
              item.quality += 1;
            }
          }
        }
      }
    });
    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
