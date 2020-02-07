const db = require('../data/db-config');

function find() {
    return db('schemes');
}


function findById(id) {
    return db('schemes')
    .where({ id })
    .first();
}

function findSteps(schemeId) {
    return db('schemes')
    .join('steps', 'steps.scheme_id', '=', 'schemes.id')
    .where('schemes.id', schemeId)
    .select('schemes.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .orderBy('steps.step_number');
}

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(([id]) => {
        return findById(id);
    });
}

function update(changes, id) {
    return db('schemes')
    .where('id', id)
    .update(changes);
}

function remove(id) {
    return db('schemes')
    .where('id', id)
    .del()
    .then(deleted => {
        return deleted;
    })
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}