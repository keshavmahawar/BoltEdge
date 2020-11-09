const fs = require("fs");
const axios = require("axios");
const flatten = require("flat");
// const cheerio = require("cheerio");
// const request = require("reques");

const zomatoOrderPageScraper = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
            },
        });
        function findTextAndReturnRemainder(target, variable) {
            const chopFront = target.substring(
                target.indexOf(variable) + variable.length,
                target.length
            );

            let jsonData = chopFront.substring(0, chopFront.indexOf('")'));

            let replaceString;
            replaceString = `\\\\"`;

            let replacer = new RegExp(replaceString, "g");
            jsonData = jsonData.replace(replacer, '"');
            replaceString = `\\\\\\\\`;
            replacer = new RegExp(replaceString, "g");
            jsonData = jsonData.replace(replacer, "\\");

            const result = JSON.parse(jsonData);
            return result;
        }

        const pageJsonData = findTextAndReturnRemainder(
            data,
            'window.__PRELOADED_STATE__ = JSON.parse("'
        );
        return pageJsonData;
    } catch (err) {
        console.log(err);
    }

    // console.log(response.headers);
    // console.log(data, "abc");
    // const $ = cheerio.load(response.data);

    // $("script").each((i, elem) => {
    //     console.log(i);
    //     console.log($(this).text());
    // });
    // console.log(text);

    // console.log(findAndClean);
    // const result = JSON.parse(findAndClean);
    // console.log(result);
    // console.log(
    //     JSON.parse(JSON.stringify(JSON.stringify({ abc: "xyz fdsf j" })))
    // );
    // var text = fs.readFileSync("./test.txt", "utf8");
    // var text = fs.readFileSync("./test.txt", "utf8");
    // var text = `\\"fsadfa lkj\\"`
    // let string = `\\\\"`
    // console.log(string)

    // let replacer = new RegExp(string, 'g')
    // text = text.replace(replacer, '"');
    // string = `\\\\\\\\`

    // console.log(replacer)
    // replacer = new RegExp(string, 'g')
    // text = text.replace(replacer, "\\");
    // let data = JSON.parse(text)
    // console.log(flatten(data))

    // console.log(JSON.parse(text));
    // console.log("xyz");
    // console.log($(".sc-78ir1h-0 bUUmtn").html());

    // fs.writeFileSync("./parsedData.txt", JSON.stringify(data), "utf-8");
    // console.log("test")
};

const orderPageDataSelector = async (url) => {
    const data = await zomatoOrderPageScraper(url);
    // console.log(flatten(data));
    const { resId } = data.pages.current;

    const restaurant = data.pages.restaurant[resId];
    const promosOnMenu = restaurant.order.menuList.promosOnMenu.promos;
    const menus = restaurant.order.menuList.menus;
    const bestSeller = [];
    const discounts = [];
    let totalItems = 0;

    for (let i = 0; i < promosOnMenu.length; i++) {
        const off = promosOnMenu[i].title1.text;
        const voucher = promosOnMenu[i].voucher_code;
        let discount = { off, voucher };
        const terms = promosOnMenu[i].terms;
        for (let i = 0; i < terms.length; i++) {
            if (terms[i].includes("Maximum")) {
                discount = { ...discount, max: terms[i] };
            }
        }
        discounts.push(discount);
    }
    for (let i = 1; i < menus.length; i++) {
        const items = menus[i].menu.categories[0].category.items;
        totalItems += items.length;

        for (let j = 0; j < items.length; j++) {
            if (items[j].item.tag_slugs.includes("bestseller")) {
                bestSeller.push(items[j].item.name);
            }
        }
    }

    return { totalItems, bestSeller, discounts };
};

module.exports = { orderPageDataSelector };
