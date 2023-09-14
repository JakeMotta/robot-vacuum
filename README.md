# robot-vacuum

# Links

- [Postman collection](https://drive.google.com/file/d/1KHEKkFOsq93vV4gLbg0DYb8Q2vOtkSN9/view?usp=sharing)
- [Github](https://github.com/JakeMotta/robot-vacuum)
- [API Documentation](https://documenter.getpostman.com/view/1888991/2s9YBz3b3V)

# How To Run

## Via Docker

1. Make sure you have `docker` installed
2. Run `docker-compose up`
3. Access the microservices via the specified ports in `docker-compose.yml` file

## Via Manual

- **Note:** Do for each microservice (3 in total)

1. Open a terminal to the microservice (ex: `/robot-vacuum/event_service`)
2. Run `npm install` to install node modules
3. Run `npm run start` to start the microservice
4. Create a `.env` file in the microservice room directory (ex: `/robot-vacuum/event_service/.env`)
5. Put the following variable in: (attached in email)
6. Save

---

7. After you've done the above steps for the 3 microservices, use Postman or another service to start making API calls.

# Architecture

- This project was setup with a MERN architecture in mind, utilizing Mongo, Express, and NodeJS for the backend.

- Commands were tested via [Postman](https://drive.google.com/file/d/1KHEKkFOsq93vV4gLbg0DYb8Q2vOtkSN9/view?usp=sharing)

- Each microservice is currently setup to run on it's own port locally. These ports can be configured in `microservice/src/configs/index.js`, and or each microservice's respective `package.json`.

# Methodology

- A lot of my time was spent setting up the project architecture. Seeing as it needed to be written as scalable microservices, I wanted to spend extra time to ensure that my microservices had intuitive structures, could easily communicate between each other, and made enough (though not perfect) sense for theoretical scalability.

- I chose to use MERN architecture as it's both comfortable/familiar, it allows me to easily build for full-stack (which I was initially planning for on this project), has great community support and libraries, and is scalable.

- My algorithm for the vacuum is very basic. Check if we have priority rooms in our batch, and if so, make sure they are first. Then, sort the 'low priority'. There is much room for improvement here, however this at least keeps us going in as much as a straight line as we can, minimizing back-and-forth motions.

# Assumptions

- Since we want to optimize room travel, I am allowed to rearrange numbers within the cleaning batch sub-arrays. ex: `[[1,2,3],[4,5,6]]` -> `[[2,1,3],[6,5,4]]`

- Duplicate rooms in a single batch can be merged if they are next to each other, so you're not cleaning the same room twice in a row. ex: `[1,2,2,3]` -> `[1,2,3]`. This does not extend between batches though, so in `[[1,2],[2,3]]`, room 2 would get cleaned twice since it's in a different batch.

- Priority rooms are a set 'lookup' list, rather than a real-time re-calculation.

# Improvements

- In terms of the algorithm, I'd be curious to see if I'd be able to use a variation of something like the Bellman-Ford or Dijkstra’s algorithm to solve this, since it's a linear version of the Traveling Salesman problem. I initially tried to solve this by finding all batch permutations and calculating by the lowest weight, but this seemed overly complex, especially since I wasn't following an existing algorithm.

- If I had more time to implement a front-end, it would have made for a much better showcase of creating vacuums, inputting jobs per vacuum, queuing jobs, managing vacuum state, etc. However, much of this is just 'pasted' to the console and assumed.

- It would have been fun to build a system to dockerize and spin up additional microservices as needed, then run a script to simulate heavy traffic.

- Adding eslint/typescript would have been nice. I started doing this, however it started getting more complicated once I wanted to start linking rulesets between microservices, and decided I better not waste all my time on setting that up, so I scrapped it.

# Results

## Test 1

**Input**

```JSON
{
    "instructions": [[3,2,4],[2,8,4],[4,6,4,9]],
    "currentRoom": 1,
    "priorityRooms": [2,3,5]
}
```

**Result**

```JSON
{
    "actualPath": [
        [2, 3, 4],
        [2, 4, 8],
        [4, 6, 9]
    ],
    "batchesProcessed": 3,
    "roomsCleaned": 9,
    "roomsPassed": 11,
    "currentRoom": 9
}
```

## Test 2

**Input**

```JSON
{
    "instructions": [[3,6,9],[6,12,1],[6,9,5],[8],[3,2,1]],
    "currentRoom": 9,
    "priorityRooms": [1,5,9]
}
```

**Result**

```JSON
{
    "actualPath": [
        [9, 6, 3],
        [1, 6, 12],
        [9, 5, 6],
        [8],
        [1, 3, 2]
    ],
    "batchesProcessed": 5,
    "roomsCleaned": 13,
    "roomsPassed": 26,
    "currentRoom": 2
}
```

# Reflections

- I focused more on the structure of this project than the algorithm. I think when I first read through the requirements, the algorithm seemed a lot more straight-forward, and the main focus (though smaller in the PDF) was that we had some type of scalable microservice architecture in place. My initial thoughts on this were more along the lines of: If we have 1M vacuums, and 10M requests come in at once, how do we handle this?

- Initially, I over-complicated my algorithm thinking that priority rooms were a request that could come in at any time during an active cleaning job, and would require real-time route re-calculation. This added a lot of complexity, especially since we'd need to know the current position of the vacuum at any given time, which rooms have already been completed within a batch, etc, which is a lot for this challenge. It wasn't until towards the end of my time that I decided it made more sense for priority rooms to be a set list, which makes way more sense.

- If I had more time, I'd have implemented a front-end to connect to these services, which would have made for better continuity on vacuum creation, status, and job queue.

# Rough Work

![Backend Architecture Diagram](https://i.gyazo.com/74f91f6c8a6aeaf167e72adc10183eb4.png)
