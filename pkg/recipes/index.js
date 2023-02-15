const mongoose = require('mongoose');

const Recipe = mongoose.model(
    'recipe',
    {
        title: String,
        category: String,
        preparation_time: Number,
        num_of_people: Number,
        description: String,
        full_recipe: String,
        stars: Number,
        published_on: String,
        created_by: String,
        author_id: String
    },
    'recipes'
);

const getAll = async () => {
    return Recipe.find({});
};

const getUserRecipes = async (uid) => {
    return Recipe.find({author_id: uid});
};

const create = async (data) => {
    const r = new Recipe(data);
    return r.save();
};

const update = async (id, uid, data) => {
    return Recipe.updateOne({_id: id, author_id: uid}, data);
};

const remove = async (id, uid) => {
    return Recipe.deleteOne({_id: id, author_id: uid});
};

module.exports = {
    getAll,
    getUserRecipes,
    create,
    update,
    remove
};