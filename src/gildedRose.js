export const createGildedRose = (originalItems) => {
  const items = originalItems;

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      items[i].updateQuality();
      if (items[i].name != "AgedBrie" && items[i].name != "Backstage pass") {
        if (items[i].quality > 0) {
          if (items[i].name != "Legendary") {
            items[i].quality = items[i].quality - 1;
          }
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
          if (items[i].name == "Backstage pass") {
            if (items[i].sellIn < 11) {
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1;
              }
            }
            if (items[i].sellIn < 6) {
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1;
              }
            }
          }
        }
      }
      if (items[i].name != "Legendary") {
        items[i].sellIn = items[i].sellIn - 1;
      }
      if (items[i].sellIn < 0) {
        if (items[i].name != "AgedBrie") {
          if (items[i].name != "Backstage pass") {
            if (items[i].quality > 0) {
              if (items[i].name != "Legendary") {
                items[i].quality = items[i].quality - 1;
              }
            }
          } else {
            items[i].quality = items[i].quality - items[i].quality;
          }
        } else {
          if (items[i].quality < 50) {
            items[i].quality = items[i].quality + 1;
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
