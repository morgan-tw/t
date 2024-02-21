import { AgedBriePolicy } from "./policies/AgedBriePolicy";
import { BackstagePassPolicy } from "./policies/BackstagePassPolicy";
import { StandardPolicy } from "./policies/StandardPolicy";
import { LegendaryPolicy } from "./policies/LegendaryPolicy";

const convertDtoToItem = (dto) => {
  let policy;
  let sellIn = dto.sellIn;
  let quality = dto.quality;

  switch (dto.name) {
    case "AgedBrie":
      policy = AgedBriePolicy();
      break;
    case "Backstage pass":
      policy = BackstagePassPolicy();
      break;
    case "Legendary":
      policy = LegendaryPolicy();
      break;
    default:
      policy = StandardPolicy();
      break;
  }

  function updateQuality() {
    sellIn = policy.updateSellIn(sellIn);
    quality = policy.updateQuality(sellIn, quality);
  }

  return {
    name: dto.name,
    getSellIn: () => sellIn,
    getQuality: () => quality,
    updateQuality,
  };
};

const convertItemToDto = (item) => {
  return {
    name: item.name,
    sellIn: item.getSellIn(),
    quality: item.getQuality(),
  };
};

export const createGildedRose = (originalItems) => {
  const itemsDtos = originalItems;
  const items = itemsDtos.map((dto) => convertDtoToItem(dto));

  function UpdateQuality() {
    for (let i = 0; i < items.length; i++) {
      items[i].updateQuality();
    }

    return items.map((item) => convertItemToDto(item));
  }

  return {
    updateQuality: UpdateQuality,
  };
};
