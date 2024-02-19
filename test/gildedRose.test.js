const { createGildedRose } = require("../src/gildedRose");

describe("Gilded Rose", () => {
  it("update the quality of all items", () => {
    const guildedRose = createGildedRose();
    guildedRose.updateQuality();
    expect().toHaveBeenCalled(2);
  });
});
