import { quality } from "../src/quality";

export const aBackstagePass = () => {
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
      name: "Backstage pass",
      sellIn: aSellIn,
      quality: quality(aQuality),
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
