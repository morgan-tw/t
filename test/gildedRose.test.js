import { createGildedRose } from "../src/gildedRose";
import { anAgedBrie } from "./agedBrieBuilder";
import { aLegendaryItem } from "./lengendaryItemBuilder";
import { aBackstagePass } from "./backstagePassBuilder";
import { Given } from "./scenario";

describe("Gilded Rose", () => {
  describe("update the quality", () => {
    const createItem = () => {
      return {
        updateQuality: jest.fn(),
      };
    };

    it("of a single item when there is only one", () => {
      const anItem = createItem();
      const guildedRose = createGildedRose([anItem]);
      guildedRose.updateQuality();
      expect(anItem.updateQuality).toHaveBeenCalledTimes(1);
    });

    it("of all items when there are several", () => {
      const anItem = createItem();
      const anotherItem = createItem();
      const guildedRose = createGildedRose([anItem, anotherItem]);
      guildedRose.updateQuality();
      expect(anItem.updateQuality).toHaveBeenCalledTimes(1);
      expect(anotherItem.updateQuality).toHaveBeenCalledTimes(1);
    });
  });

  describe("for an AgedBrie", () => {
    describe("decreases the sell in", () => {
      it(`by one whatever its quality is, like 15 -> 14 -> 13 -> 12 -> 11 -> 10`, () => {
        Given()
          .anItem(anAgedBrie().getInstance())
          .then()
          .itsSellInShouldFollowThisPath("15 -> 14 -> 13 -> 12 -> 11 -> 10");
      });

      it(`even bellow zero like 1 -> 0 -> -1 -> -2`, () => {
        Given()
          .anItem(anAgedBrie().getInstance())
          .then()
          .itsSellInShouldFollowThisPath("1 -> 0 -> -1 -> -2");
      });
    });

    describe("it increases the quality over time", () => {
      it(`by one as long as the brie is not mature, like 40 -> 41 -> 42 -> 43`, () => {
        Given()
          .anItem(anAgedBrie().withSellIn(50).getInstance())
          .then()
          .itsQualityShouldFollowThisPath("40 -> 41 -> 42 -> 43");
      });

      it(`by two once the brie is mature, like 10 -> 12 -> 14 -> 16`, () => {
        Given()
          .anItem(anAgedBrie().thatIsMatureWith(-10).getInstance())
          .then()
          .itsQualityShouldFollowThisPath("10 -> 12 -> 14 -> 16");
      });

      it(`by only one if the brie is about to arrive at maturity but is not mature yet`, () => {
        Given()
          .anItem(anAgedBrie().thatIsAboutToArriveAtMaturity().getInstance())
          .then()
          .itsQualityShouldFollowThisPath("10 -> 11 -> 13 -> 15");
      });

      describe("but never over 50", () => {
        it(`when its quality was already 50, like 50 -> 50`, () => {
          Given()
            .anItem(anAgedBrie().getInstance())
            .then()
            .itsQualityShouldFollowThisPath("50 -> 50");
        });

        it(`when the brie is young, like 48 -> 49 -> 50 -> 50`, () => {
          Given()
            .anItem(anAgedBrie().thatIsYoungWith(15).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("48 -> 49 -> 50 -> 50");
        });

        it(`even when the brie is mature, like 47 -> 49 -> 50 -> 50`, () => {
          Given()
            .anItem(anAgedBrie().thatIsMatureWith(-10).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("47 -> 49 -> 50 -> 50");
        });
      });
    });

    describe("for a legendary item", () => {
      describe("never changes the sellIn over time as it is never pass out", () => {
        it("like 80 -> 80 -> 80 -> 80", () => {
          Given()
            .anItem(aLegendaryItem().getInstance())
            .then()
            .itsSellInShouldFollowThisPath("80 -> 80 -> 80 -> 80");
        });

        it("like -65 -> -65 -> -65 -> -65", () => {
          Given()
            .anItem(aLegendaryItem().getInstance())
            .then()
            .itsSellInShouldFollowThisPath("-65 -> -65 -> -65 -> -65");
        });
      });

      describe("never changes the quality over time as it is never age", () => {
        it("like 80 -> 80 -> 80 -> 80", () => {
          Given()
            .anItem(aLegendaryItem().getInstance())
            .then()
            .itsQualityShouldFollowThisPath("80 -> 80 -> 80 -> 80");
        });

        it("like -65 -> -65 -> -65 -> -65", () => {
          Given()
            .anItem(aLegendaryItem().getInstance())
            .then()
            .itsQualityShouldFollowThisPath("-65 -> -65 -> -65 -> -65");
        });
      });
    });

    describe("for a backstage pass", () => {
      describe("decreases the sell in", () => {
        it(`by one whatever its quality is, like 15 -> 14 -> 13 -> 12 -> 11 -> 10`, () => {
          Given()
            .anItem(aBackstagePass().getInstance())
            .then()
            .itsSellInShouldFollowThisPath("15 -> 14 -> 13 -> 12 -> 11 -> 10");
        });

        it(`even bellow zero like 1 -> 0 -> -1 -> -2`, () => {
          Given()
            .anItem(aBackstagePass().getInstance())
            .then()
            .itsSellInShouldFollowThisPath("1 -> 0 -> -1 -> -2");
        });
      });

      describe("decreases the quality", () => {
        it("by one when the concert is far (more than 10 days ahead), like 25 -> 24 -> 23", () => {
          Given()
            .anItem(aBackstagePass().farFromConcertDate(15).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("25 -> 24 -> 23");
        });

        it("by two as soon as the concert is close, like 25 -> 23 -> 21", () => {
          Given()
            .anItem(aBackstagePass().closeToConcertDate(10).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("25 -> 23 -> 21");
        });

        it("by three as soon as the concert is very close, like 25 -> 22 -> 19", () => {
          Given()
            .anItem(aBackstagePass().veryCloseToConcertDate(5).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("25 -> 22 -> 19");
        });

        it("down to zero once the concert is passed", () => {
          Given()
            .anItem(aBackstagePass().veryCloseToConcertDate(1).getInstance())
            .then()
            .itsQualityShouldFollowThisPath("15 -> 12 -> 0");
        });

        describe("but never bellow 0", () => {
          it(`when its quality was already 0, like 0 -> 0`, () => {
            Given()
              .anItem(aBackstagePass().getInstance())
              .then()
              .itsQualityShouldFollowThisPath("0 -> 0");
          });

          it(`when it is far from the concert date, like 1 -> 0 -> 0`, () => {
            Given()
              .anItem(aBackstagePass().farFromConcertDate(15).getInstance())
              .then()
              .itsQualityShouldFollowThisPath("1 -> 0 -> 0");
          });

          it(`even when it is close to the concert date, like 1 -> 0 -> 0`, () => {
            Given()
              .anItem(aBackstagePass().closeToConcertDate(9).getInstance())
              .then()
              .itsQualityShouldFollowThisPath("1 -> 0 -> 0");
          });

          it(`even when it is very close to the concert date, like 1 -> 0 -> 0`, () => {
            Given()
              .anItem(aBackstagePass().veryCloseToConcertDate(4).getInstance())
              .then()
              .itsQualityShouldFollowThisPath("1 -> 0 -> 0");
          });
        });
      });
    });
  });
});
