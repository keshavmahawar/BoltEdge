const Admin = require("../models/adminModel");

exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await admin.generateAuthToken();

        res.send({ admin, token });
    } catch (e) {
        res.status(400).send();
    }
};

exports.addAdmin = async (req, res) => {
    const admin = new Admin(req.body);
    console.log(admin);
    try {
        await admin.save();
        const token = await admin.generateAuthToken();
        console.log(token);
        res.status(201).send({ admin, token });
    } catch (e) {
        res.status(400).send(e);
    }
};
