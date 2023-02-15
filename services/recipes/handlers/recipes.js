const recipes = require('../../../pkg/recipes');

const getAll = async (req, res) => {
    try {
        let rs = await recipes.getAll();
        const fn = rs.reverse((a, b) => {
            if(Date(a.published_on) < Date(b.published_on)) {
                return 1;
            } else if(Date(a.published_on) > Date(b.published_on)) {
                return -1;
            }
            return 0;
        }).slice(0, 3);
        const mpr = rs.sort((a, b) => {
            if(Number(a.stars) < Number(b.stars)) {
                return 1;
            } else if(Number(a.stars) > Number(b.stars)) {
                return -1;
            }
            return 0;
        }).slice(0, 6);
        res.status(200).send({fn: fn, mpr: mpr});
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
};

const getRecipesByCategory = async (req, res) => {
    try {
        let rs = await recipes.getAll();
        res.status(200).send({rs});
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
};

const getMine = async (req, res) => {
    try {
        let rs = await recipes.getUserRecipes(req.auth.uid);
        const mr = rs.reverse((a, b) => {
            if(Date(a.published_on) < Date(b.published_on)) {
                return 1;
            } else if(Date(a.published_on) > Date(b.published_on)) {
                return -1;
            }
            return 0;
        });
        res.status(200).send({mr: mr});
    } catch (er) {
        return res.status(500).send("Internal Server Error!");   
    }
};

const create = async (req, res) => {
    try {
        let date = new Date();
        let str = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        let payload = {
            ...req.body,
            created_by: req.auth.email,
            author_id: req.auth.uid,
            published_on: str 
        };
        let c = await recipes.create(payload);
        return res.status(201).send(c);
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
};

const update = async (req, res) => {
    try {
        let date = new Date();
        let str = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        let payload = {
            ...req.body,
            published_on: str
        };
        await recipes.update(req.params.id, req.auth.uid, payload);
        return res.status(204).send('');
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
};

const remove = async (req, res) => {
    try {
        await recipes.remove(req.params.id, req.auth.uid);
        return res.status(204).send('');
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
};

module.exports = {
    getAll,
    getRecipesByCategory,
    getMine,
    create,
    update,
    remove
};