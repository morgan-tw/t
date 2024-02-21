import { agedBriePolicy } from "./policies/agedBriePolicy";
import { backstagePassPolicy } from "./policies/backstagePassPolicy";
import { standardPolicy } from "./policies/standardPolicy";
import { legendaryPolicy } from "./policies/legendaryPolicy";
import { regularDecreasePolicy } from "./policies/regularDecreasePolicy";
import { unchangedPolicy } from "./policies/unchangedPolicy";

const convertDtoToItem = (dto) => {
  let sellInPolicy;
  let qualityPolicy;
  let sellIn = dto.sellIn;
  let quality = dto.quality;

  switch (dto.name) {
    case "AgedBrie":
      sellInPolicy = regularDecreasePolicy(1);
      qualityPolicy = agedBriePolicy();
      break;
    case "Backstage pass":
      sellInPolicy = regularDecreasePolicy(1);
      qualityPolicy = backstagePassPolicy();
      break;
    case "Legendary":
      sellInPolicy = unchangedPolicy();
      qualityPolicy = legendaryPolicy();
      break;
    default:
      sellInPolicy = regularDecreasePolicy(1);
      qualityPolicy = standardPolicy();
      break;
  }

  function updateQuality() {
    sellIn = sellInPolicy.updateSellIn(sellIn);
    quality = qualityPolicy.updateQuality(sellIn, quality);
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
