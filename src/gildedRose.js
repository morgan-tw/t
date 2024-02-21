import { AgedBriePolicy } from "./policies/AgedBriePolicy";
import { BackstagePassPolicy } from "./policies/BackstagePassPolicy";
import { StandardPolicy } from "./policies/StandardPolicy";
import { ComposedPolicy } from "./policies/ComposedPolicy";
import { LegendaryPolicy } from "./policies/LegendaryPolicy";

const composedPolicy = ComposedPolicy([
  AgedBriePolicy(),
  BackstagePassPolicy(),
  LegendaryPolicy(),
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

    return items;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
