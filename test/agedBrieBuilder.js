export const anAgedBrie = () => {
  let sellIn = 0,
    quality = 0;

  function withSellIn(givenSellIn) {
    sellIn = givenSellIn;
    return this;
  }

  function thatIsMatureWith(givenSellIn) {
    expect(givenSellIn).toBeLessThan(0);
    withSellIn(givenSellIn);
    return this;
  }

  function thatIsYoungWith(givenSellIn) {
    expect(givenSellIn).toBeGreaterThan(0);
    withSellIn(givenSellIn);
    return this;
  }

  function thatIsAboutToArriveAtMaturity() {
    withSellIn(1);
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
    thatIsMatureWith,
    thatIsYoungWith,
    thatIsAboutToArriveAtMaturity,
  };
};
