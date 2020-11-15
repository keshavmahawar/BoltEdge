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
                cookie:
                    'G_AUTHUSER_H=0; G_AUTHUSER_H=0; fre=0; rd=1380000; zl=en; fbtrack=5c2a24d561019d0534af11cc1cc53169; _ga=GA1.2.1690651909.1604305715; _gcl_au=1.1.661798948.1604305715; _fbp=fb.1.1604305715049.1378701046; dpr=1; fbm_288523881080=base_domain=.zomato.com; zhli=1; G_ENABLED_IDPS=google; __gads=ID=32ac2d19aca9e1c5:T=1604334608:S=ALNI_MalbE5q6w8rz7wTTeOB6CHXJYjAtA; expab=3; al=0; zone=4; SL_C_23361dd035530_KEY=05a4e27ac591b9ca633a4fe9b5fdc3875e22560f; _gid=GA1.2.615886442.1604851793; ltv=172787; lty=subzone; locus=%7B%22addressId%22%3A0%2C%22lat%22%3A27.5529907%2C%22lng%22%3A76.6345735%2C%22cityId%22%3A11380%2C%22ltv%22%3A172787%2C%22lty%22%3A%22subzone%22%2C%22fetchFromGoogle%22%3Atrue%2C%22dszId%22%3A26675%2C%22fen%22%3A%22Alwar%2C+Rajasthan%2C+India%2C+India%22%7D; fbcity=11380; session_id=null; ak_bmsc=3F040D552ED8E7E66829B1F2737554BD75EF8D77AE46000004C3AB5FDF462E43~pllVsNbYUqOfpmP6m/ntC8AYXlpMtlgZx8buqGxaWCcsr657sklb0nbL9pJROpLMG4NkyvHAyEyCk9r1IwwDwwFPMPWyDQjSttXlPOcSpjxk3FTtsY8bhunRzFS8nVJTK+Gjbdex15ZLlLokIy5V5Zpoupbph7DhVgXLhzVXEIcgM0dEHgg/6enAwvHu3Zc8cvBxAO2qeNoJutpxC3M2vplXCEBSaumR5ct2n5HglYoLU=; LEL_JS=true; G_AUTHUSER_H=0; selectedDeliveryPlace=%7B%22entity_id%22%3A26624%2C%22entity_type%22%3A%22DSZ%22%2C%22place_name%22%3A%22Home%20-%20j-3/46%20apna%20ghar%20shalimar%2Cnear%20telco%20chowk%2C%20Bhagwanpura%2C%20Alwar%22%7D; selectedAddressId=61881990; g_state={"i_p":1605696970921,"i_l":3}; csrf=1a7afc0d0c316855facdc190739b38bd; PHPSESSID=1198f0b7a2d9559cafcd19e358e0207d; squeeze=64ce40ae3720b4d278f8fcf8a462ff28; orange=3108143; fbsr_288523881080=oqgVSO4TQxknrUp1JlRGrjvi1Fo_ijzvRKKP3ZMpf_4.eyJ1c2VyX2lkIjoiMTk0MzMwMTYxMjQxNDI1NyIsImNvZGUiOiJBUUQ3UExkMHl5amVEWVY3eUs3S3ZTTTM2WnBrNGNjUG1DTFc5c1hLUnJ0cXVSMEp1VzVXQ1lmdm0wRkFxNTY2UTktM19xSUM3b3lzNGtrSFZrWFQ3UHlmeXdpLVVnVndYT0E2S0hpRTZPRlpUci05MlVMRGhmaldJcGN3eXF0MGRyNHItXzRFRWZyUUZldThrcVZUNzNfSTlGNjBOY2JnbC1kUm9leTZFanZ2T0JHNDBmU3J4R1Y1UXBsajJ4ekE0TjczeXdxdUhReVhPTTBmOEdvWkdUdE1RQ2FfWll0akRIR2pLVWg2TFlWOTNhSTRraTdPTkdEeVNudno5S0YycFYzRko3TTZLWmxoak1NN1JHeEY2TXJJbVo3VDVYY0tyelVTa0FSTkJEQzFzSkxNa3BpNmJyd2ZEZnQxbUgwRWk1dXRFSG9QVjJNQUp5N1FWX1JFeHRwUCIsIm9hdXRoX3Rva2VuIjoiRUFBQUFReTFkQ25nQkFOWHNTblpCcERVcUdYd0JDeHVaQzVKWkI0TjRlT3hsZG1SVkprUFVJd3o4cTZOYm9aQXFQeVpCMlVJbnFRcXNaQzVSRmRmZkc3cEw5dGVteXRScTdoUkpVakRoakMxQWtwYzgyNFpBRXBWbU9uVktURkNnNjVCa0pEYVVsMWZESTJjWkJJMU5WWkJsQ3JYQnBUN0xaQm51UGtTWG50dXdRVnViRW1ma0JTbk5wd1pDdDVqUk52aFJMV0Y1WkJRbHdJTnJrQVpEWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYwNTA5MjMxM30; selectedDeliverySubzone=26624; _uetsid=6a8caa30224311eb9cd957cd07f9ccc9; _uetvid=68ca07201ce511eb9594bb01203d70b2; AWSALBTG=tnw5CYyLA0kIRSlOz/obYv+FGMPva+nfzB4eDA/4L/rR3fGsoEV2jZ6/j+3YlRHK5gN0eCcgudeXmlVJFZQpCAW7U9ivMux8pPpeAGxf61vHIPn+nb7uQQZQhCqQ7whZzXOQwX498Dvb7Yp6kxJNwCmue2LQa0dwJnWQ2iZb27jZ; AWSALBTGCORS=tnw5CYyLA0kIRSlOz/obYv+FGMPva+nfzB4eDA/4L/rR3fGsoEV2jZ6/j+3YlRHK5gN0eCcgudeXmlVJFZQpCAW7U9ivMux8pPpeAGxf61vHIPn+nb7uQQZQhCqQ7whZzXOQwX498Dvb7Yp6kxJNwCmue2LQa0dwJnWQ2iZb27jZ',
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
        if (voucher.includes("WELCOME") || voucher.includes("NEW"))
            newUserDiscount.push(discount);
        discounts.push(discount);
    }
    for (let i = 1; i < menus.length; i += 1) {
        const items = menus[i].menu.categories[0].category.items;
        totalItems += items.length;

        // for (let j = 0; j < items.length; j += 1) {
        //     if (items[j].item.tag_slugs.includes("bestseller")) {
        //         bestSeller.push(items[j].item.name);
        //     }
        // }
    }

    return { totalItems, bestSeller, discounts, newUserDiscount };
};

module.exports = { orderPageDataSelector };
