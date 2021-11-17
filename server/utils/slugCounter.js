const db = require('../db/index')

const counter = async (slug) => {
    const { rows } = await db.query(`INSERT INTO counters (slug, counter) VALUES ($1, 0)
    ON CONFLICT (slug)
    DO UPDATE SET counter = counters.counter + 1 RETURNING counter;
    `, [slug]);

    rows[0].counter > 0 ? slug = slug.concat('-', rows[0].counter): null;
    return slug;
}

module.exports = { counter }