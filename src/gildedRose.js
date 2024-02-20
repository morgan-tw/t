export const createGildedRose = (originalItems) => {
  const items = originalItems;

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.updateQuality();
      if (item.name != "AgedBrie" && item.name != "Backstage pass") {
        if (item.quality > 0) {
          if (item.name != "Legendary") {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == "Backstage pass") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != "Legendary") {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != "AgedBrie") {
          if (item.name != "Backstage pass") {
            if (item.quality > 0) {
              if (item.name != "Legendary") {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
