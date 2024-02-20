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

  function farFromConcertDate(daysBeforeConcert) {
    expect(daysBeforeConcert).toBeGreaterThan(10);
    withSellIn(daysBeforeConcert);
    return this;
  }

  function closeToConcertDate(daysBeforeConcert) {
    expect(daysBeforeConcert).toBeGreaterThan(5);
    expect(daysBeforeConcert).toBeLessThan(11);
    withSellIn(daysBeforeConcert);
    return this;
  }

  function veryCloseToConcertDate(daysBeforeConcert) {
    expect(daysBeforeConcert).toBeLessThan(6);
    withSellIn(daysBeforeConcert);
    return this;
  }

  return {
    getInstance,
    withQuality,
    withSellIn,
    farFromConcertDate,
    closeToConcertDate,
    veryCloseToConcertDate,
  };
};
