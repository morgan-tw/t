import { quality } from "../src/quality";

export const aLegendaryItem = () => {
  let sellIn = 0,
    aQuality = 0;

  function withSellIn(givenSellIn) {
    sellIn = givenSellIn;
    return this;
  }

  function withQuality(givenQuality) {
    aQuality = givenQuality;
    return this;
  }

  function getInstance() {
    return {
      name: "Legendary",
      sellIn: sellIn,
      quality: quality(aQuality),
      updateQuality: jest.fn(),
    };
  }

  return {
    getInstance,
    withQuality,
    withSellIn,
  };
};
