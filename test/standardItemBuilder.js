export const aStandardItem = () => {
  let sellIn = 0,
    quality = 0;

  function withSellIn(givenSellIn) {
    sellIn = givenSellIn;
    return this;
  }

  function thatPassedOut(daysBeforeConcert) {
    expect(daysBeforeConcert).toBeLessThan(0);
    withSellIn(daysBeforeConcert);
    return this;
  }

  function withQuality(givenQuality) {
    quality = givenQuality;
    return this;
  }

  function getInstance() {
    return {
      name: "Standard item",
      sellIn: sellIn,
      quality: quality,
      updateQuality: jest.fn(),
    };
  }

  return {
    getInstance,
    withQuality,
    withSellIn,
    thatPassedOut,
  };
};
