const isStandard = (item) =>
  item.name != "AgedBrie" &&
  item.name != "Backstage pass" &&
  item.name != "Legendary";

export const StandardPolicy = () => {
  function isEligible(item) {
    return true;
  }

  function applyTo(item) {
    item.sellIn = item.sellIn - 1;

    if (item.quality.isGreaterThan(0)) {
      item.quality = item.quality.decreaseByIfGreaterThanZero(1);
    }
    if (item.sellIn < 0) {
      item.quality = item.quality.decreaseByIfGreaterThanZero(1);
    }
  }

  return {
    isEligible,
    applyTo,
  };
};
