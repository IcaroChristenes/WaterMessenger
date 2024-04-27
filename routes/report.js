const router = require('express')['Router']();

router.get('/', (req, res) => {
}).post('/', async (req, res) => {
    const db = req.app.locals.db;
    db.get('reports').push(req.body).write();
    res.send(true);
});

module.exports = router;