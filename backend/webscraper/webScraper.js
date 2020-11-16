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
                // cookie:
                // 'G_AUTHUSER_H=0; fre=0; rd=1380000; zl=en; fbtrack=5c2a24d561019d0534af11cc1cc53169; _ga=GA1.2.1690651909.1604305715; _gcl_au=1.1.661798948.1604305715; _fbp=fb.1.1604305715049.1378701046; dpr=1; fbm_288523881080=base_domain=.zomato.com; zhli=1; G_ENABLED_IDPS=google; __gads=ID=32ac2d19aca9e1c5:T=1604334608:S=ALNI_MalbE5q6w8rz7wTTeOB6CHXJYjAtA; expab=3; al=0; zone=4; SL_C_23361dd035530_KEY=05a4e27ac591b9ca633a4fe9b5fdc3875e22560f; ltv=172787; lty=subzone; locus=%7B%22addressId%22%3A0%2C%22lat%22%3A27.5529907%2C%22lng%22%3A76.6345735%2C%22cityId%22%3A11380%2C%22ltv%22%3A172787%2C%22lty%22%3A%22subzone%22%2C%22fetchFromGoogle%22%3Atrue%2C%22dszId%22%3A26675%2C%22fen%22%3A%22Alwar%2C+Rajasthan%2C+India%2C+India%22%7D; G_AUTHUSER_H=0; g_state={"i_p":1605696970921,"i_l":3}; orange=3108143; csrf=acb985042ac22393e7e4a22b823695df; PHPSESSID=c4d3650d9cd4c0b6cffea4d129470a04; squeeze=b84fa1ce967f8cef81b5ad6e47ec8452; ak_bmsc=4F4897418964221903C5D8F7CA02CDF61703461F167F00007C42B15F1A2FFB3E~plNg/zh+8ER96cLsKUTT76mveBhnjTX4qRgIG+gbCyX/oMNoq2Zwd+IRYok5bvVf7YDnGsKX6/zsqkxGUfDNdgOpseZg8RDmnG9m3GPzBYVqHkH2TTtOE1i+b/AV8x4pdbvv0eN1lZu+qsDwZc/Grxslkd8fPU0uPLhdzcWOKJld6OlV9vTE6NF+ObPHtvebGxyBdJI4ptiIc7dLitycynVtEJ9b0lFl3w9QrRVQC7lIQ=; LEL_JS=true; _gid=GA1.2.1621592319.1605452414; session_id=76d54524e5363-00d6-4824-a157-181f570848e2; fbsr_288523881080=-SndAnyqmn3iyr8W36375X1zUZmhbXes2nmKV2uV4aQ.eyJ1c2VyX2lkIjoiMTk0MzMwMTYxMjQxNDI1NyIsImNvZGUiOiJBUUJDUC16Q1UtT1VEcWJPN1lGa1VtMktySWE1dS1BczFWc2tvYXJQWXFsNUZ6Q2ltZ05VWGJ2OWRpbVpZdHRtdnlaUldITWNWQnhacHRvXzMyU2N5RnZzelRReFdRQkc2ejY4NUdfcXJNZkFSZW5GazZ1Y1FHOEhDeW9TX2pTTFNPVmxlUE5LMG9ySk5kakozYzM0aTJhQUNJUUlxMEhCTjZ5cnFYRkhqcEtoWENURW0yazBWeDJKYmJWVTlfN0c3UnEtZ1lMMEZoOVFCUGpBdmtNQkhNaUF0OUh1djlaQ1AwYl9idld5dF9xTnlpS0o1NUx4bVlhelBYZERZSjB4NWlNd0htSlVkTzRjZXFHbFo0QW5ZR2l5bWJpbl85YkFaOERZVmFweTZaUTlBb1djX2hRTC1SVFRqYmdweXNoakpxeUJ1S3JIcERfUC00VWFXUW1PdEd3UCIsIm9hdXRoX3Rva2VuIjoiRUFBQUFReTFkQ25nQkFNQ2xFWkFVM1BlelpDSXNvUFpCZUZ5Rjc3NmZwR0I5RjFTeUYxVEtQUk1jaGJwakI2WEtVNXVsYWhyVksyYWFidFBQWkNaQk1CRzd3S0J2QUhOVnZCbnR3R011aUNLTWNIaWNWbVBDZlh5TzJVTmhhVzNmZjNqOXB0RDZNWVpBUGVmZjZFa3JlZkpNcUM2UFpCblpCSzNjWkJ4azBXTkt2YUE2R21tVVB1cmhjeER6cXhZM281aFhaQXM2b0t0aFd0WkJBWkRaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjA1NDUyNDE5fQ; fbcity=11380; selectedDeliveryPlace=%7B%22entity_id%22%3A26624%2C%22entity_type%22%3A%22DSZ%22%2C%22place_name%22%3A%22Home%20-%20j-3/46%20apna%20ghar%20shalimar%2Cnear%20telco%20chowk%2C%20Bhagwanpura%2C%20Alwar%22%7D; selectedAddressId=61881990; _uetsid=45980ed0275311ebb897653405a4020e; _uetvid=68ca07201ce511eb9594bb01203d70b2; AWSALBTG=Uj3gQ5AGKeE1Vq9JX3pInn7CnAxt34HEOsB3x8Wt4sLEByFprw7R42gQJLs3Fyrsd4B3yKQPoKtrTx7J6ncwWYo0f0fFPZmVSARMMC2YM/9+NCEurloUZn75ME4FS8LexV254aYmqDHpauCRtP/JdUoFM0eSdmvseVFFk+NfpFxp; AWSALBTGCORS=Uj3gQ5AGKeE1Vq9JX3pInn7CnAxt34HEOsB3x8Wt4sLEByFprw7R42gQJLs3Fyrsd4B3yKQPoKtrTx7J6ncwWYo0f0fFPZmVSARMMC2YM/9+NCEurloUZn75ME4FS8LexV254aYmqDHpauCRtP/JdUoFM0eSdmvseVFFk+NfpFxp',
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

        for (let j = 0; j < items.length; j += 1) {
            if (items[j].item.tag_slugs.includes("bestseller")) {
                bestSeller.push(items[j].item.name);
            }
        }
    }

    return { totalItems, bestSeller, discounts, newUserDiscount };
};

module.exports = { orderPageDataSelector };
