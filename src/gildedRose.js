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
        if (item.name === "AgedBrie") {
          if (item.quality < 50) {
            item.quality += 1;

            if (item.sellIn < 0) {
              if (item.quality < 50) {
                item.quality += 1;
              }
            }
          }
        } else {
          item.quality -= 1;
          if (item.name === "Backstage pass") {
            if (item.sellIn < 11) {
              item.quality -= 1;
            }
            if (item.sellIn < 6) {
              item.quality -= 1;
            }
          }

          if (item.sellIn < 0) {
            item.quality -= 1;
            if (item.name === "Backstage pass") {
              item.quality = 0;
            }
          }
        }

        if (item.quality < 0) {
          item.quality = 0;
        }
      }
    });

    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
