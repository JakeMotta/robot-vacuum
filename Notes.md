

Input = [[3,2,4],[2,8,4],[4,6,4,9]]

Assumptions:
- Duplicate rooms in a single batch can be merged (unique rooms only)
- 

Weight Calculation:
1 -> 3 = 2
3 -> 2 = 1
2 -> 4 = 2

Take current state of the vacuum, then calculate the weight of all permutations of the next batch.

((weight of current room to next room) + batch weight)

[2,3,4] = (1 + 1 + 1) = 3  -----> Lowest Weight
[2,4,3] = (1 + 2 + 1) = 4 
[3,2,4] = (2 + 1 + 2) = 5
[3,4,2] = (2 + 1 + 2) = 5
[4,3,2] = (3 + 1 + 1) = 5
[4,2,3] = (3 + 2 + 1) = 6

Route History: 1,2,3,4

[2,4,8] = (2 + 2 + 4) = 8 -----> Lowest Weight
[2,8,4] = (2 + 6 + 4) = 12
[4,8,2] = (0 + 4 + 6) = 10
[4,2,8] = (0 + 2 + 6) = 8 -----> Lowest Weight
[8,2,4] = (4 + 6 + 2) = 12
[8,4,2] = (4 + 4 + 2) = 10

Best Algo: Calculate weight based on all batch inputs
Current Algo: Calculate weight based on individual batch inputs