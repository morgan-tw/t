export const aBackstagePass = () => {
  let sellIn = 0,
    quality = 0;

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
      name: "Backstage pass",
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
