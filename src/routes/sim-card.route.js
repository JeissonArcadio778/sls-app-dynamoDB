const {Router} = require('express'); 
const {testDB, selectSimCardController} = require('../controllers/bodega.controller'); 
const { generateSimCard } = require('../utils/generate-sims-test');

const router = Router(); 

router.post('/', testDB)
router.get('/bodega/sim-card/select-sim-card', selectSimCardController); 
router.get('/generate-sim', generateSimCard)


module.exports = router; 