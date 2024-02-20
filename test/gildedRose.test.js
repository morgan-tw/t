import { createGildedRose } from "../src/gildedRose";

const anAgedBrie = () => {
  let sellIn, quality;

  function withSellIn(givenSellIn) {
    sellIn = givenSellIn;
    return this;
  }

  function withQuality(givenQuality) {
    quality = givenQuality;
    return this;
  }

  function getInstance() {
    return {
      name: "AgedBrie",
      sellIn: sellIn,
      quality: quality,
      updateQuality: jest.fn(),
    };
  }

  return {
    getInstance,
    withQuality,
    withSellIn,
  };
};

const Given = () => {
  let item;

  function self() {
    return this;
  }

  function anItem(givenItem) {
    item = givenItem;
    return this;
  }

  function weUpdateItsQuality() {
    const guildedRose = createGildedRose([item]);
    guildedRose.updateQuality();
    return this;
  }

  function itsSellInShouldBe(expectedSellIn) {
    expect(item.sellIn).toEqual(expectedSellIn);
    return this;
  }

  function itsSellInShouldFollowThisPath(expectedSellInArray) {
    const expectedSellIn = expectedSellInArray
      .split(" -> ")
      .map((sellInExpression) => parseInt(sellInExpression));
    item.sellIn = expectedSellIn[0];
    for (let i = 1; i < expectedSellIn.length; ++i) {
      weUpdateItsQuality();
      itsSellInShouldBe(expectedSellIn[i]);
    }
    return this;
  }

  function itsQualityShouldBe(expectedQuality) {
    expect(item.quality).toEqual(expectedQuality);
    return this;
  }

  return {
    given: self,
    when: self,
    then: self,
    and: self,
    but: self,
    anItem,
    weUpdateItsQuality,
    itsSellInShouldBe,
    itsQualityShouldBe,
    itsSellInShouldFollowThisPath,
  };
};

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
    it(`decreases the sell in by one whatever its quality is, like 15 -> 14 -> 13 -> 12 -> 11 -> 10`, () => {
      Given()
        .anItem(anAgedBrie().getInstance())
        .then()
        .itsSellInShouldFollowThisPath("15 -> 14 -> 13 -> 12 -> 11 -> 10");
    });

    it(`decreases the sell in even bellow zero like 1 => 0 => -1 => -2`, () => {
      Given()
        .anItem(anAgedBrie().getInstance())
        .then()
        .itsSellInShouldFollowThisPath("1 => 0 => -1 => -2");
    });

    describe("it decreases the quality", () => {
      const itDecreaseTheQualityByOneWhenSellInIsOver0 = (
        originalSellIn,
        originalQuality,
        expectedQuality
      ) => {
        it(`by one when the sell in is over 0`, () => {
          const agedBrie = {
            name: "AgedBrie",
            sellIn: originalSellIn,
            quality: originalQuality,
            updateQuality: jest.fn(),
          };
          const guildedRose = createGildedRose([agedBrie]);
          guildedRose.updateQuality();
          expect(agedBrie.quality).toEqual(expectedQuality);
        });
      };

      itDecreaseTheQualityByOneWhenSellInIsOver0(4, 15, 14);
      itDecreaseTheQualityByOneWhenSellInIsOver0(4, 14, 13);
    });
  });
});
