import { agedBriePolicy } from "./policies/agedBriePolicy";
import { backstagePassPolicy } from "./policies/backstagePassPolicy";
import { standardPolicy } from "./policies/standardPolicy";
import { legendaryPolicy } from "./policies/legendaryPolicy";
import { regularDecreasePolicy } from "./policies/regularDecreasePolicy";
import { unchangedPolicy } from "./policies/unchangedPolicy";
import { sellIn } from "./sellIn";
import { value } from "./value";
import { quality } from "./quality";

const convertDtoToItem = (dto) => {
  let qualityPolicy;
  let aSellIn;
  let aQuality = quality(dto.quality);

  switch (dto.name) {
    case "AgedBrie":
      aSellIn = sellIn(value(dto.sellIn), regularDecreasePolicy(1));
      qualityPolicy = agedBriePolicy();
      break;
    case "Backstage pass":
      aSellIn = sellIn(value(dto.sellIn), regularDecreasePolicy(1));
      qualityPolicy = backstagePassPolicy();
      break;
    case "Legendary":
      aSellIn = sellIn(value(dto.sellIn), unchangedPolicy());
      qualityPolicy = legendaryPolicy();
      break;
    default:
      aSellIn = sellIn(value(dto.sellIn), regularDecreasePolicy(1));
      qualityPolicy = standardPolicy();
      break;
  }

  function updateQuality() {
    aSellIn = aSellIn.update();
    aQuality = quality(
      qualityPolicy.update(aSellIn, aQuality, aQuality.aValue)
    );
  }

  return {
    name: dto.name,
    getSellIn: () => aSellIn.value,
    getQuality: () => aQuality.value,
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
