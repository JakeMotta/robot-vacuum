const configs = require('../configs');
const helper = require("../../../shared/utils")(configs);
const messages = require("../../../shared/messages");

// Basic Route Testing
const helloWorld = async (req, res) => {
  try {
    return helper.sendResponse(res, messages.SUCCESS, null, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

// Creates a new vacuum
const getVacuumById = async (req, res) => {
  try {
    const { vacuumId } = req.params;

     // Lookup the vacuum by id
     const foundVacuum = await req.app.models("vacuum").findOne({_id: vacuumId})

     if(foundVacuum) {
       return helper.sendResponse(res, messages.SUCCESS, foundVacuum, configs.serviceName);
     } else {
       return helper.sendResponse(res, messages.DATA_NOT_FOUND, null, configs.serviceName);
     }   
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

// Creates a new vacuum
const createVacuum = async (req, res) => {
  try {
    const newVacuum = new req.app.models("vacuum")({});
    await newVacuum.save();
    return helper.sendResponse(res, messages.SUCCESS, newVacuum, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

module.exports = {
  helloWorld,
  getVacuumById,
  createVacuum,
};