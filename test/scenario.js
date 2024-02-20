import { createGildedRose } from "../src/gildedRose";

export const Given = () => {
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
