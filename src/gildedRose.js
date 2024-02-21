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

const convertDtoToItem = (dto) => dto;
const convertItemToDto = (item) => item;

export const createGildedRose = (originalItems) => {
  const itemsDtos = originalItems;
  const items = itemsDtos.map((dto) => convertDtoToItem(dto));

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.updateQuality();

      composedPolicy.applyTo(item);
    }

    return items.map((item) => convertItemToDto(item));
  }

  return {
    updateQuality: UpdateQuality,
  };
};
