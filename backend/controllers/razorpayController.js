const placeOrders = async (req, res) => {
    try {
        const options = {
            amount: 10 * 100,
            currency: "INR",
            receipt: uuidv4(),
            payment_capture: 0,
        };
        instance.orders.create(options, (err, order) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Something Went Wrong!" });
            }
            return res.status(200).json(order);
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong Again!",
        });
    }
};

const captureOrders = (req, res) => {
    try {
        return request(
            {
                method: "POST",
                url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
                form: {
                    amount: 10 * 100,
                    currency: "INR",
                },
            },
            async function (err, body) {
                if (err) {
                    return res.status(500).json({
                        message: "Something Went Wrong!",
                    });
                }
                return res.status(200).json(body);
            }
        );
    } catch (err) {
        return res.status(500).json({
            message: "Something Went wrong Again!",
        });
    }
};
export { getOrders, captureOrders };
