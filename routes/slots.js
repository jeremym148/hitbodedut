var router = require('express-promise-router')();
const controllers = require('../controllers');


router.post('/', controllers.slots.createSlot);
router.get('/', controllers.slots.getAllSlots);
router.get('/:slotId', controllers.slots.getSlotById);
router.put('/:slotId', controllers.slots.updateSlot);
router.delete('/:slotId', controllers.slots.deleteSlot);


  module.exports = router