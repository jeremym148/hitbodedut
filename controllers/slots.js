const models = require("../database/models");
const sequelize = require("sequelize");
const moment = require('moment');

const createSlot = async (req, res) => {
  try {
    const slot = await models.Slot.create(req.body);
    let newSlot = mappToSite(slot);
    return res.status(201).json(newSlot);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllSlots = async (req, res) => {
  try {
    var whereCondition = {};
      if (req.query.activityDate){
          whereCondition.startDatetime = {
            [sequelize.Op.between]: [req.query.activityDate, req.query.activityDate],
         }        
      }
      // if(req.query.isNow == "true"){
      //   whereCondition[sequelize.fn"NOW()"] = {
      //     [sequelize.Op.between]: ["startDatetime", "endDatetime"],
      //  } 
      // }
      
    const slots = await models.Slot.findAll({
        // group: [sequelize.fn('date_trunc', 'day', sequelize.col('startDatetime'))],
        where: whereCondition,
        logging: console.log,
        raw: true,
        order: [['startDatetime', 'ASC']],
        // limit: count,
      });
      let slotsMapped = slots.map( (item) => {
        return mappToSite(item)
    })
    return res.status(200).json({ slots: slotsMapped });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getSlotById = async (req, res) => {
  try {
    const { slotId } = req.params;
    const slot = await models.Slot.findOne({
      where: { id: slotId }
    });
    if (slot) {
      return res.status(200).json({ slot });
    }
    return res.status(404).send("Slot with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const [updated] = await migrations.Slot.update(req.body, {
      where: { id: slotId }
    });
    if (updated) {
      const updatedSlot = await models.Slot.findOne({ where: { id: slotId } });
      return res.status(200).json({ slot: updatedSlot });
    }
    throw new Error("Slot not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const deleted = await models.Slot.destroy({
      where: { id: slotId }
    });
    if (deleted) {
      return res.status(204).send("Slot deleted");
    }
    throw new Error("Slot not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const mappToSite = (slot) => {
  let newitem = {}
    newitem.start = moment(slot.startDatetime).format('YYYY-MM-DD hh:mm');
    newitem.end = moment(slot.endDatetime).format('YYYY-MM-DD hh:mm');
    newitem.activityDate = moment(slot.activityDate).format('YYYY-MM-DD');
    newitem.name = slot.username;
  return newitem
}



module.exports = {
  createSlot,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot
};