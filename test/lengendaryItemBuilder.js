import { quality } from "../src/quality";
import { sellIn } from "../src/sellIn";

export const aLegendaryItem = () => {
  let aSellIn = 0,
    aQuality = 0;

  function withSellIn(givenSellIn) {
    aSellIn = givenSellIn;
    return this;
  }

  function withQuality(givenQuality) {
    aQuality = givenQuality;
    return this;
  }

  function getInstance() {
    return {
      name: "Legendary",
      sellIn: sellIn(aSellIn),
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
