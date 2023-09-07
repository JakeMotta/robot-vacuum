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

    let lowestWeight = 999999;
    let lowestPermutation = null;

    for (const batch of instructions) {
      let permutations = getPermutations(batch);
      
      for (const permutation of permutations) {
        let weight = 0;
        for(let i = 0; i < permutation.length; i++) {
          if(i === 0) {
            weight += Math.abs(currentRoom - permutation[i]);
          } else {
            weight += Math.abs(permutation[i - 1] - permutation[i]);
          }
        }

        if(weight < lowestWeight) {
          lowestWeight = weight;
          lowestPermutation = permutation;
        }
      }
    }

    function getPermutations(batch) {
      // Base case
      if (batch.length <= 1) return batch;
  
      let allPermutations = [];
  
      for (let i = 0; i < batch.length; i++) {
          const currentNumber = batch[i];
          
          // Get a new array that doesn't contain the current number.
          const remainingNumbers = batch.slice(0, i).concat(batch.slice(i + 1));
          
          // Recursively get all permutations of the remaining numbers.
          const permutationsForRemainingNumbers = getPermutations(remainingNumbers);
          
          // Combine the current number with each permutation of the remaining numbers.
          for (const permutation of permutationsForRemainingNumbers) {
            allPermutations.push([currentNumber].concat(permutation));
          }
      }
  
      return allPermutations;
  }
  
    return helper.sendResponse(res, messages.SUCCESS, null, configs.serviceName);
  } catch (err) {
    return helper.sendResponse(res, messages.INTERNAL_SERVER_ERROR, null, configs.serviceName);
  }
};

module.exports = {
  helloWorld,
  calculateJobPriority,
};