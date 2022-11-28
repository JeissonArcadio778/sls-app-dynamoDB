const {Router} = require('express'); 
const {testDB, selectSimCardController, saveSimCardController} = require('../controllers/bodega.controller'); 
const { generateSimCard } = require('../utils/generate-sims-test');

const router = Router(); 

router.post('/', testDB); 
router.get('/bodega/sim-card/select-sim-card', selectSimCardController); 
router.post('/bodega/sim-card/save', saveSimCardController); 

//Test - local
router.get('/generate-sim', generateSimCard)


module.exports = router; 