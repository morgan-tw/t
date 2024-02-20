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

  function parseExpectedPath(expectedPathExpression) {
    return expectedPathExpression
      .split(" -> ")
      .map((sellInExpression) => parseInt(sellInExpression));
  }

  function itsSellInShouldFollowThisPath(expectedSellInExpression) {
    const expectedSellIn = parseExpectedPath(expectedSellInExpression);
    item.sellIn = expectedSellIn[0];
    for (let i = 1; i < expectedSellIn.length; ++i) {
      weUpdateItsQuality();
      itsSellInShouldBe(expectedSellIn[i]);
    }
    return this;
  }

  function itsQualityShouldFollowThisPath(expectedQualityExpression) {
    const expectedQuality = parseExpectedPath(expectedQualityExpression);
    item.quality = expectedQuality[0];
    for (let i = 1; i < expectedQuality.length; ++i) {
      weUpdateItsQuality();
      itsQualityShouldBe(expectedQuality[i]);
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
    itsQualityShouldFollowThisPath,
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

    describe("it increases the quality over time", () => {
      it(`by one as long as the brie is not mature, like 40 -> 41 -> 42 -> 43`, () => {
        Given()
          .anItem(anAgedBrie().withSellIn(50).getInstance())
          .then()
          .itsQualityShouldFollowThisPath("40 -> 41 -> 42 -> 43");
      });

      it(`by two once the brie is mature, like 10 -> 12 -> 14 -> 16`, () => {
        Given()
          .anItem(anAgedBrie().withSellIn(-10).getInstance())
          .then()
          .itsQualityShouldFollowThisPath("10 -> 12 -> 14 -> 16");
      });

      it(`by two only if is mature already and not about to`, () => {
        Given()
          .anItem(anAgedBrie().withSellIn(1).getInstance())
          .then()
          .itsQualityShouldFollowThisPath("10 -> 11 -> 13 -> 15");
      });

      describe("but never over 50", () => {
        it(`when its quality was already 50, like 50 -> 50`, () => {
          Given()
            .anItem(anAgedBrie().withSellIn(0).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("50 -> 50");
        });

        it(`when the brie is young, like 48 -> 49 -> 50 -> 50`, () => {
          Given()
            .anItem(anAgedBrie().withSellIn(15).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("48 -> 49 -> 50 -> 50");
        });

        it(`even when the brie is mature, like 47 -> 49 -> 50 -> 50`, () => {
          Given()
            .anItem(anAgedBrie().withSellIn(0).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("47 -> 49 -> 50 -> 50");
        });
      });
    });
  });
});
