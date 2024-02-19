export const createGildedRose = (originalItems) => {
  const items = originalItems;

  function UpdateQuality() {
    return this;
  }

  return {
    updateQuality: UpdateQuality,
  };
};
