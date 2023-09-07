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

    // These would be handled and sent via a client
    let roomsCleaned = 0;
    let roomsPassed = 0;

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

      roomsCleaned += tempArr.length;

      newInstructions.push(tempArr);
  });

  // Convert the 2D array into an array
  let flattenedArr = newInstructions.flat();

  // Add the current room to the front
  flattenedArr.unshift(currentRoom);

  // Calculate distances
  for (let i = 0; i < flattenedArr.length - 1; i++) {
    let distance = Math.abs(flattenedArr[i] - flattenedArr[i + 1]);
    roomsPassed += (distance - 1);
  }

  /**
   *  a. The actual path the vacuum took as arrays of rooms (An array of arrays showcasing its actual traversal of rooms)
      b. How many rooms it cleaned in total
      c. How many batches it processed
      d. How many rooms it passed without cleaning either going left or right
      e. The final (current) room the vacuum cleaner is in
   */

  let detailedOutput = {
    actualPath: newInstructions,
    batchesProcessed: newInstructions.length,
    roomsCleaned,
    roomsPassed,
    currentRoom: newInstructions[newInstructions.length - 1][newInstructions[newInstructions.length - 1].length - 1]
  };
   
    return helper.sendResponse(res, messages.SUCCESS, detailedOutput, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

module.exports = {
  helloWorld,
  calculateJobPriority,
};