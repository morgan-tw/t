import { createGildedRose } from "../src/gildedRose";

describe("Gilded Rose", () => {
  describe("update the quality", () => {
    const createItem = () => {
      return {
        updateQuality: jest.fn(),
      };
    };

    it("of a single item when there is only one", () => {
      const anItem = createItem();
      const guildedRose = createGildedRose([anItem]);
      guildedRose.updateQuality();
      expect(anItem.updateQuality).toHaveBeenCalledTimes(1);
    });

    it("of all items when there are several", () => {
      const anItem = createItem();
      const anotherItem = createItem();
      const guildedRose = createGildedRose([anItem, anotherItem]);
      guildedRose.updateQuality();
      expect(anItem.updateQuality).toHaveBeenCalledTimes(1);
      expect(anotherItem.updateQuality).toHaveBeenCalledTimes(1);
    });
  });

  describe("for an AgedBrie", () => {
    const itDecreasesTheSellInByOne = (originalSellIn, expectedSellIn) =>
      it(`decreases the sell in by one, like from ${originalSellIn} to ${expectedSellIn}`, () => {
        const agedBrie = {
          name: "AgedBrie",
          sellIn: originalSellIn,
          quality: 15,
          updateQuality: jest.fn(),
        };
        const guildedRose = createGildedRose([agedBrie]);
        guildedRose.updateQuality();
        expect(agedBrie.sellIn).toEqual(expectedSellIn);
      });

    itDecreasesTheSellInByOne(5, 4);
    itDecreasesTheSellInByOne(2, 1);
  });
});
