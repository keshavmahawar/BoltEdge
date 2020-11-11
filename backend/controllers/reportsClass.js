const RestaurantSnapshot = require("../models/restaurantSnapshot");
class Report {
    constructor(brandId, competitorId, startRangeDate, endRangeDate) {
        this.brandId = brandId;
        this.competitorId = competitorId;
        this.startRangeDate = startRangeDate;
        this.endRangeDate = endRangeDate;
    }

    async getBrandSnapshots() {
        this.brandSnapshotArray = await RestaurantSnapshot.find({
            id: this.brandId,
            date: { $lte: this.endRangeDate, $gte: this.startRangeDate },
        });
    }
}
