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

const calculateJobPriority = async (req, res) => {
  try {
    const { instructions, currentRoom, priorityRooms } = req.body;

    let newInstructions = [];

    instructions.forEach(batch => {
      // Extract priority rooms from the current batch
      const highPriorityRooms = batch.filter(room => priorityRooms.includes(room));
      const lowPriorityRooms = batch.filter(room => !highPriorityRooms.includes(room));

      // Sort
      highPriorityRooms.sort((a, b) => Math.abs(a - currentRoom) - Math.abs(b - currentRoom));
      lowPriorityRooms.sort((a, b) => Math.abs(a - currentRoom) - Math.abs(b - currentRoom));

      // Combine the prioritized & non-prioritized arrays
      let tempArr = [...highPriorityRooms, ...lowPriorityRooms];

      // Remove any neighboring duplicates (no need to clean the same room twice in a row)
      for (let i = 0; i < tempArr.length - 1; i++) {
        while (tempArr[i] === tempArr[i + 1]) {
          tempArr.splice(i + 1, 1);
        }
      }

      newInstructions.push(tempArr);
  });
   
    return helper.sendResponse(res, messages.SUCCESS, newInstructions, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

module.exports = {
  helloWorld,
  calculateJobPriority,
};