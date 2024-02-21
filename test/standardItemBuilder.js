import { quality } from "../src/quality";
import { sellIn } from "../src/sellIn";

export const aStandardItem = () => {
  let aSellIn = 0,
    aQuality = 0;

  function withSellIn(givenSellIn) {
    aSellIn = givenSellIn;
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
      sellIn: sellIn(aSellIn),
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
