const configs = require('../configs');
const constants = require('../../../shared/constants');
const helper = require("../../../shared/utils")(configs);
const messages = require("../../../shared/messages");
const axios = require('axios');

// Basic Route Testing
const helloWorld = async (req, res) => {
  try {
    return helper.sendResponse(res, messages.SUCCESS, null, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

// Finds jobs based on a vacuum's id
const getJobsById = async (req, res) => {
  try {
    const { vacuumId } = req.params;

    const findJobsById = await req.app.models("jobs").find({vacuumId})

    return helper.sendResponse(res, messages.SUCCESS, findJobsById, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

// Finds priority rooms based on a vacuum's id
const getPriorityRoomsById = async (req, res) => {
  try {
    const { vacuumId } = req.params;

    const findPriorityRoomsById = await req.app.models("priorityRooms").findOne({vacuumId})

    return helper.sendResponse(res, messages.SUCCESS, findPriorityRoomsById, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};


// Sets priority rooms based on vacuum id
const setPriorityRooms = async (req, res) => {
  try {
    const { vacuumId } = req.params;
    const { priorityRooms } = req.body;

    const findPriorityRooms = await req.app.models("priorityRooms").findOne({vacuumId})

    if(findPriorityRooms?._id) {
      // Priority room already exists, so override it with the incoming list
      await req.app.models("priorityRooms").findOneAndUpdate({ vacuumId }, { priorityRooms }, { new: true });
    } else {
      // Priority room doesn't yet exist for this vacuum
      const newPriorityRoom = new req.app.models("priorityRooms")({ vacuumId, priorityRooms });
      await newPriorityRoom.save();
    }

    return helper.sendResponse(res, messages.SUCCESS, priorityRooms, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

// Finds all jobs based on a vacuum's id
const createJob = async (req, res) => {
  try {
    const { vacuumId } = req.params;
    const { instructions } = req.body;

    // Lookup the vacuum by id  
    const foundVacuum = helper.parseHTTPResponse(await axios.get(`http://localhost:4000/vacuum/${vacuumId}`));

    if(foundVacuum?._id) {
      // Vacuum found
      let obj = { vacuumId, instructions, status: constants.jobStatus.TO_DO }
      const newJob = new req.app.models("jobs")(obj);
      await newJob.save();

      const findJobs = await req.app.models("jobs").find({vacuumId, status: constants.jobStatus.TO_DO }).sort({ createdAt: 1 })

      if(foundVacuum?.status === constants.vacuumStatus.IDLE && findJobs && findJobs.length > 0) {

        const foundPriorityRooms = await req.app.models("priorityRooms").findOne({vacuumId});

        let outgoingData =  {
          instructions: findJobs[0]?.instructions,
          currentRoom: foundVacuum?.currentRoom, 
        }

        if(foundPriorityRooms && foundPriorityRooms.priorityRooms) outgoingData["priorityRooms"] = foundPriorityRooms.priorityRooms;

        // If vacuum isn't currently busy, and we have at least one job
        const calculateRoute = helper.parseHTTPResponse(await axios.post('http://localhost:6000/calculate/', outgoingData));
        return helper.sendResponse(res, messages.SUCCESS, calculateRoute, configs.serviceName);
      }

      return helper.sendResponse(res, messages.SUCCESS, null, configs.serviceName);
    } else {
      // No vacuum found
      return helper.sendResponse(res, messages.DATA_NOT_FOUND, null, configs.serviceName);
    }   
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

module.exports = {
  helloWorld,
  getJobsById,
  createJob,
  getPriorityRoomsById,
  setPriorityRooms
};