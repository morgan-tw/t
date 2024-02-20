export const createGildedRose = (originalItems) => {
  const items = originalItems;

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.updateQuality();
      if (item.name != "AgedBrie" && item.name != "Backstage pass") {
        if (item.quality.getValue() > 0) {
          if (item.name != "Legendary") {
            item.quality.setValue(item.quality.getValue() - 1);
          }
        }
      } else {
        if (item.quality.getValue() < 50) {
          item.quality.setValue(item.quality.getValue() + 1);
          if (item.name == "Backstage pass") {
            if (item.sellIn < 11) {
              if (item.quality.getValue() < 50) {
                item.quality.setValue(item.quality.getValue() + 1);
              }
            }
            if (item.sellIn < 6) {
              if (item.quality.getValue() < 50) {
                item.quality.setValue(item.quality.getValue() + 1);
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
            if (item.quality.getValue() > 0) {
              if (item.name != "Legendary") {
                item.quality.setValue(item.quality.getValue() - 1);
              }
            }
          } else {
            item.quality.setValue(
              item.quality.getValue() - item.quality.getValue()
            );
          }
        } else {
          if (item.quality.getValue() < 50) {
            item.quality.setValue(item.quality.getValue() + 1);
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
