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

const convertDtoToItem = (dto) => {
  const policy = composedPolicy;

  function updateQuality() {
    policy.applyTo(this);
  }

  return {
    name: dto.name,
    sellIn: dto.sellIn,
    quality: dto.quality,
    updateQuality,
  };
};

const convertItemToDto = (item) => {
  return {
    name: item.name,
    sellIn: item.sellIn,
    quality: item.quality,
    updateQuality: item.updateQuality,
  };
};

export const createGildedRose = (originalItems) => {
  const itemsDtos = originalItems;
  const items = itemsDtos.map((dto) => convertDtoToItem(dto));

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.updateQuality();
    }

    return items.map((item) => convertItemToDto(item));
  }

  return {
    updateQuality: UpdateQuality,
  };
};
