const RestaurantSnapshot = require("../models/restaurantSnapshot");

class Report {
    constructor(brandId, competitorId, startRangeDate, endRangeDate) {
        this.brandId = brandId;
        this.competitorId = competitorId;
        this.startRangeDate = startRangeDate;
        this.endRangeDate = endRangeDate;
    }

    async getSnapshots() {
        this.brandSnapshotArray = await RestaurantSnapshot.find({
            id: this.brandId,
            date: { $lte: this.endRangeDate, $gte: this.startRangeDate },
        }).sort({ date: 1 });

        this.competitorSnapshotArray = await RestaurantSnapshot.find({
            id: this.competitorId,
            date: { $lte: this.endRangeDate, $gte: this.startRangeDate },
        }).sort({ date: 1 });

        this.brandLast = this.brandSnapshotArray[
            this.brandSnapshotArray.length - 1
        ];

        this.competitorLast = this.competitorSnapshotArray[
            this.competitorSnapshotArray.length - 1
        ];
    }

    getIsCompetitorOnline() {
        return !!this.competitorLast.hasOnlineOrder;
    }

    getNoOfDaysData() {
        return this.competitorSnapshotArray.length;
    }

    getRating() {
        return { b: this.brandLast.rating, c: this.competitorLast.rating };
    }

    dataAvailable() {
        return !!(
            this.brandSnapshotArray.length &&
            this.competitorSnapshotArray.length
        );
    }

    getVotes() {
        return {
            b: this.brandLast.votesCount,
            c: this.competitorLast.votesCount,
        };
    }

    getBestSeller() {
        return {
            b: this.brandLast.bestSeller,
            c: this.competitorLast.bestSeller,
        };
    }

    getAverageOrderValue() {
        return {
            b: parseFloat(this.brandLast.averageOrderValue * 0.7).toFixed(2),
            c: parseFloat(this.competitorLast.averageOrderValue * 0.7).toFixed(
                2
            ),
        };
    }

    getNoOfItems() {
        if (!this.brandLast.totalItems || !this.competitorLast.totalItems)
            return false;
        return {
            b: this.brandLast.totalItems,
            c: this.competitorLast.totalItems,
        };
    }

    getCuisinesType() {
        return { b: this.brandLast.cuisines, c: this.competitorLast.cuisines };
    }

    getDiscount() {
        if (
            !this.brandLast.newUserDiscount[0] ||
            !this.competitorLast.newUserDiscount[0]
        )
            return false;
        return {
            b: `${this.brandLast.newUserDiscount[0].off}%`,
            c: `${this.competitorLast.newUserDiscount[0].off}%`,
        };
    }

    getDiscountGap() {
        if (
            !this.brandLast.newUserDiscount[0] ||
            !this.competitorLast.newUserDiscount[0]
        )
            return false;
        return (
            this.competitorLast.newUserDiscount[0].off -
            this.brandLast.newUserDiscount[0].off
        );
    }

    async getSalesTrend() {
        const restaurantArray = await RestaurantSnapshot.find(
            {
                id: this.competitorId,
            },
            { votesCount: 1, date: 1 }
        ).sort({ date: 1 });
        if (restaurantArray.length < 4) return false;
        const data = [];
        // console.log(
        //     restaurantArray.map(({ votesCount, date }) => ({
        //         votesCount,
        //         date,
        //     }))
        // );
        for (let i = 1; i < restaurantArray.length; i += 1) {
            const date1 = new Date(restaurantArray[i].date);
            const date2 = new Date(restaurantArray[i - 1].date);
            const diffTime = Math.abs(date1 - date2);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const salesTrend =
                (restaurantArray[i].votesCount -
                    restaurantArray[i - 1].votesCount) /
                (0.35 * diffDays);
            const temp = {
                sales: parseFloat(salesTrend).toFixed(2),
                date: date1.toLocaleDateString(),
            };
            data.push(temp);
        }
        return data;
    }

    getCompetitorAverageBurn() {
        if (!this.competitorLast.newUserDiscount[0]) return false;
        const lastSnapshot = this.competitorLast;
        const aov = lastSnapshot.averageOrderValue * 0.7;
        const discount = lastSnapshot.newUserDiscount[0];
        const off = discount.off;
        const maxCap = discount.maxCap;
        const burn = (off - ((aov * (off / 100) - maxCap) / aov) * 100) * 0.8;
        return parseFloat(burn).toFixed(2);
    }
}

module.exports = Report;
