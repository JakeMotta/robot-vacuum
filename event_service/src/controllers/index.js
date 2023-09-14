const configs = require('../configs');
const constants = require('../shared/constants');
const helper = require("../shared/utils")(configs);
const messages = require("../shared/messages");
const axios = require('axios');

// Finds jobs based on a vacuum's id
const getJobs = async (req, res) => {
  try {
    const { vacuumId } = req.params;

    const findJobs = await req.app.models("jobs").find({vacuumId})

    return helper.sendResponse(res, messages.SUCCESS, findJobs, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

// Finds priority rooms based on a vacuum's id
const getPriorityRooms = async (req, res) => {
  try {
    const { vacuumId } = req.params;

    const findPriorityRooms = await req.app.models("priorityRooms").findOne({vacuumId})

    return helper.sendResponse(res, messages.SUCCESS, findPriorityRooms, configs.serviceName);
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
      
      // Save the job to DB
      const newJob = new req.app.models("jobs")(obj);
      await newJob.save();

      // Get the earliest job available
      const findJobs = await req.app.models("jobs").find({vacuumId, status: constants.jobStatus.TO_DO }).sort({ createdAt: 1 })

      // If vacuum isn't currently busy, and we have at least one job
      if(foundVacuum?.status === constants.vacuumStatus.IDLE && findJobs && findJobs.length > 0) {

        // Check if we have priority rooms
        const foundPriorityRooms = await req.app.models("priorityRooms").findOne({vacuumId});

        // Create data obj for calculation
        let outgoingData =  {
          instructions: findJobs[0]?.instructions,
          currentRoom: foundVacuum?.currentRoom, 
        }

        // Add priority rooms if they were found
        if(foundPriorityRooms && foundPriorityRooms.priorityRooms) outgoingData["priorityRooms"] = foundPriorityRooms.priorityRooms;

        // Calculate via calculation service
        const calculateRoute = helper.parseHTTPResponse(await axios.post('http://localhost:6000/calculate/', outgoingData));
        
        // Return to sender
        return helper.sendResponse(res, messages.SUCCESS, calculateRoute, configs.serviceName);

        /**
         * - From here, client (vacuum) would recieve the rooms to clean, set it's status to 'BUSY', set the job status to "IN_PROGRESS", and beging cleaning.
         * - Once it completed it's job, it would update the job document from "IN_PROGRESS" to "DONE", and check for any additional jobs, before going back to "IDLE".
         */
      }

      // Vacuum is busy, do nothing
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
  getJobs,
  createJob,
  getPriorityRooms,
  setPriorityRooms
};