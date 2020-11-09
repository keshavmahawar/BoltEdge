const axios = require("axios");
// const flatten = require("flat");
// const cheerio = require("cheerio");
// const request = require("reques");
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

        const pageJsonData = findTextAndReturnRemainder(
            data,
            'window.__PRELOADED_STATE__ = JSON.parse("'
        );
        return pageJsonData;
    } catch (err) {
        console.log(err);
        return err;
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

const getNoFromString = (string) => string.match(/\d/g).join("");

const orderPageDataSelector = async (url) => {
    const data = await zomatoOrderPageScraper(url);
    // console.log(flatten(data));
    const { resId } = data.pages.current;

    const restaurant = data.pages.restaurant[resId];
    const promosOnMenu = restaurant.order.menuList.promosOnMenu.promos;
    const menus = restaurant.order.menuList.menus;
    const bestSeller = [];
    const discounts = [];
    const newUserDiscount = [];
    let totalItems = 0;

    for (let i = 0; i < promosOnMenu.length; i += 1) {
        // console.log(promosOnMenu[i]);
        const off = getNoFromString(promosOnMenu[i].title1.text);
        const voucher = promosOnMenu[i].voucher_code;
        let discount = { off, voucher };
        const terms = promosOnMenu[i].terms;
        if (promosOnMenu[i].sub_title.includes("above")) {
            discount = {
                ...discount,
                minCap: getNoFromString(promosOnMenu[i].sub_title),
            };
        }
        if (promosOnMenu[i].title.includes("up to")) {
            discount = {
                ...discount,
                maxCap: getNoFromString(
                    promosOnMenu[i].title.split("up to")[1]
                ),
            };
        }
        for (let j = 0; j < terms.length; j += 1) {
            if (terms[j].includes("Maximum")) {
                discount = { ...discount, maxCap: getNoFromString(terms[j]) };
            }
        }
        if (voucher.includes("WELCOME")) newUserDiscount.push(discount);
        discounts.push(discount);
    }
    for (let i = 1; i < menus.length; i += 1) {
        const items = menus[i].menu.categories[0].category.items;
        totalItems += items.length;

        for (let j = 0; j < items.length; j += 1) {
            if (items[j].item.tag_slugs.includes("bestseller")) {
                bestSeller.push(items[j].item.name);
            }
        }
    }

    return { totalItems, bestSeller, discounts, newUserDiscount };
};

module.exports = { orderPageDataSelector };
