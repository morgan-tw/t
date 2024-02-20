import { AgedBriePolicy } from "./policies/AgedBriePolicy";
import { BackstagePassPolicy } from "./policies/BackstagePassPolicy";
import { StandardPolicy } from "./policies/StandardPolicy";
import { ComposedPolicy } from "./policies/ComposedPolicy";

const composedPolicy = ComposedPolicy([
  AgedBriePolicy(),
  BackstagePassPolicy(),
  StandardPolicy(),
]);

export const createGildedRose = (originalItems) => {
  const items = originalItems;

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
