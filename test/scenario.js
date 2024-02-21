import { createGildedRose } from "../src/gildedRose";
import { quality } from "../src/quality";
import { sellIn } from "../src/sellIn";

export const Given = () => {
  let originalItem;
  let savedItems = [];

  function self() {
    return this;
  }

  function anItem(givenItem) {
    originalItem = givenItem;
    return this;
  }

  function weUpdateItsQuality(items) {
    const guildedRose = createGildedRose(items);
    savedItems = guildedRose.updateQuality();
    return this;
  }

  function itsSellInShouldBe(expectedSellIn) {
    expect(originalItem.sellIn.isEqualsTo(expectedSellIn)).toBeTruthy();
    return this;
  }

  function parseExpectedPath(expectedPathExpression) {
    return expectedPathExpression
      .split(" -> ")
      .map((sellInExpression) => parseInt(sellInExpression));
  }

  function itsSellInShouldFollowThisPath(expectedSellInExpression) {
    const expectedSellIn = parseExpectedPath(expectedSellInExpression);
    originalItem.sellIn = sellIn(expectedSellIn[0]);

    weUpdateItsQuality([originalItem]);
    itsSellInShouldBe(expectedSellIn[1]);
    for (let i = 2; i < expectedSellIn.length; ++i) {
      weUpdateItsQuality(savedItems);
      itsSellInShouldBe(expectedSellIn[i]);
    }
    return this;
  }

  function itsQualityShouldFollowThisPath(expectedQualityExpression) {
    const expectedQuality = parseExpectedPath(expectedQualityExpression);
    originalItem.quality = quality(expectedQuality[0]);

    weUpdateItsQuality([originalItem]);
    itsQualityShouldBe(expectedQuality[1]);
    for (let i = 2; i < expectedQuality.length; ++i) {
      weUpdateItsQuality(savedItems);
      itsQualityShouldBe(expectedQuality[i]);
    }
    return this;
  }

  function itsQualityShouldBe(expectedQuality) {
    expect(originalItem.quality.isEqualsTo(expectedQuality)).toBeTruthy();
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
