export const createGildedRose = (originalItems) => {
  const items = originalItems;

  const getQuality = (item) => item.quality;

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.updateQuality();
      if (item.name != "AgedBrie" && item.name != "Backstage pass") {
        if (getQuality(item) > 0) {
          if (item.name != "Legendary") {
            item.quality = getQuality(item) - 1;
          }
        }
      } else {
        if (getQuality(item) < 50) {
          item.quality = getQuality(item) + 1;
          if (item.name == "Backstage pass") {
            if (item.sellIn < 11) {
              if (getQuality(item) < 50) {
                item.quality = getQuality(item) + 1;
              }
            }
            if (item.sellIn < 6) {
              if (getQuality(item) < 50) {
                item.quality = getQuality(item) + 1;
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
            if (getQuality(item) > 0) {
              if (item.name != "Legendary") {
                item.quality = getQuality(item) - 1;
              }
            }
          } else {
            item.quality = getQuality(item) - getQuality(item);
          }
        } else {
          if (getQuality(item) < 50) {
            item.quality = getQuality(item) + 1;
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
