const serve = require('express');
const router = serve.Router();
const cors = require('cors');

   //router.use(cors);

    router.get('/ping', (req, res) => {
        res.send({desc: 'ping'});
    });
    router.get('/env', (req, res) => {
        console.log(__dirname, 'dir')
        res.sendFile('env.json', {root: './'});
    });

module.exports = router;
