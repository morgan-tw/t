import { quality } from "../src/quality";

export const aStandardItem = () => {
  let sellIn = 0,
    aQuality = 0;

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
    aQuality = givenQuality;
    return this;
  }

  function getInstance() {
    return {
      name: "Standard item",
      sellIn: sellIn,
      quality: quality(aQuality),
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
