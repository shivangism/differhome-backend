const { Op } = require("sequelize");
var db = require('../models');
const projects = db.projects;
const projectDetails = db.projectDetails;
const extraDetails = db.extraDetails;
const images = db.images;


var addProject = async (req, res) => {
    console.log(req.details.email);
    if (req.details.email != "admin") {
        res.status(401).json({
            error: 'not allowed'
        })
    }
    else {
        let data = await projects.create({
            name: req.body.name,
            type: req.body.type,
            state: req.body.state,
            city: req.body.city
        })
        let data2 = await projectDetails.create({
            area: req.body.area,
            budget: req.body.budget,
            type2: req.body.type2,
            bhk: req.body.bhk,
            age: req.body.age,
            status: req.body.status,
            furnished: req.body.furnished,
            projectID: data.id
        })
        let data3 = await extraDetails.create({
            carpetArea: req.body.carpetArea,
            priceSqft: req.body.priceSqft,
            reraRegistered: req.body.reraRegistered,
            parking: req.body.parking,
            balcony: req.body.balcony,
            security: req.body.security,
            about: req.body.about,
            projectID: data.id,
            xc: req.body.xc,
            yc: req.body.yc
        })
        req.body.images.forEach(image => {
            let data4 = images.create({
                image: image,
                projectID: data.id
            })
        });

        res.status(200).json({ ok: 'ok' });
    }
}

var filter1 = async (req, res) => {
    if (!req.body.type || !req.body.city) {
        res.status(403).json({ error: "value missing" })
    } else {
        let data = await projects.findAndCountAll({
            distinct: true,
            where: {
                type: req.body.type,
                city: req.body.city
            },
            include: [projectDetails, images]
        })
        res.status(200).json({ data })
    }
}

var filter2 = async (req, res) => {
    if (!req.body.type || !req.body.city || !req.body.areaMin || !req.body.furnished || !req.body.status || !req.body.areaMax || !req.body.age || !req.body.budgetMin || !req.body.bhk || !req.body.budgetMax) {
        res.status(403).json({ error: "value missing" });
    }
    else {
        let age = Math.max(req.body.age) + 1;

        let data = await projects.findAndCountAll({
            distinct: true,
            where: {
                type: req.body.type,
                city: req.body.city
            }, include: [{
                model: projectDetails,
                where: {
                    area: { [Op.between]: [req.body.areaMin, req.body.areaMax] },
                    budget: { [Op.between]: [req.body.budgetMin, req.body.budgetMax] },
                    bhk: req.body.bhk,
                    age: { [Op.lt]: age },
                    status: req.body.status,
                    furnished: req.body.furnished
                }
            }, images]
        })
        res.status(200).json({ data })
    }
}

var page3 = async (req, res) => {
    if (!req.body.id) {
        res.status(403).json({ error: "value missing" })
    }
    else {
        let data = await projects.findOne({
            where: { id: req.body.id },
            include: [projectDetails, extraDetails, images]
        })
        res.status(200).json({ data })
    }
}

module.exports = {
    addProject,
    filter1,
    filter2,
    page3
}