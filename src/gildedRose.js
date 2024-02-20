import { quality } from "./quality";

export const createGildedRose = (originalItems) => {
  const items = originalItems;

  const isAgedBrie = (item) => item.name == "AgedBrie";
  const isBackstagePass = (item) => item.name == "Backstage pass";
  const isStandard = (item) =>
    item.name != "AgedBrie" &&
    item.name != "Backstage pass" &&
    item.name != "Legendary";

  const AgedBriePolicy = () => {
    function isEligible(item) {
      return isAgedBrie(item);
    }

    function applyTo(item) {
      if (item.quality.isLessThan(50)) {
        item.quality = item.quality.increaseBy(1);
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (item.quality.isLessThan(50)) {
          item.quality = item.quality.increaseBy(1);
        }
      }
    }

    return {
      isEligible,
      applyTo,
    };
  };

  const BackstagePassPolicy = () => {
    function isEligible(item) {
      return isBackstagePass(item);
    }

    function applyTo(item) {
      if (item.quality.isLessThan(50)) {
        item.quality = item.quality.increaseBy(1);
      }
      if (item.sellIn < 11) {
        if (item.quality.isLessThan(50)) {
          item.quality = item.quality.increaseBy(1);
        }
      }
      if (item.sellIn < 6) {
        if (item.quality.isLessThan(50)) {
          item.quality = item.quality.increaseBy(1);
        }
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        item.quality = quality(0);
      }
    }

    return {
      isEligible,
      applyTo,
    };
  };

  const StandardPolicy = () => {
    function isEligible(item) {
      return isStandard(item);
    }

    function applyTo(item) {
      if (item.quality.isGreaterThan(0)) {
        item.quality = item.quality.decreaseBy(1);
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (item.quality.isGreaterThan(0)) {
          item.quality = item.quality.decreaseBy(1);
        }
      }
    }

    return {
      isEligible,
      applyTo,
    };
  };

  const ComposedPolicy = (givenPolicies) => {
    const policies = givenPolicies;

    function applyTo(item) {
      for (let i = 0; i < policies.length; ++i) {
        if (policies[i].isEligible(item)) {
          return policies[i].applyTo(item);
        }
      }
    }

    return {
      applyTo,
    };
  };

  const agedBriePolicy = AgedBriePolicy();
  const backstagePolicy = BackstagePassPolicy();
  const standardPolicy = StandardPolicy();
  const composedPolicy = ComposedPolicy([
    agedBriePolicy,
    backstagePolicy,
    standardPolicy,
  ]);

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.updateQuality();

      composedPolicy.applyTo(item);
    }

    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
