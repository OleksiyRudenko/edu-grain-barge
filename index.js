/* https://docs.google.com/document/d/1CEdyInW0AdaVY5053DgNrgKdePlEKUKhjiSySX96Lmc/edit
   Fill a barge with grain.
   Input contains heights of boxes per unit of barge width. 0 = bottom of the barge.
   Grain may only fill spaces between boxes. Grain spills.
*/

function loadGrain(levels) {
  let cisterns = 0, grain = 0;
  let [left, right] = [0, 0]
  do {
    [left, right] = findCistern(levels, right);
    if (left !== undefined) {
      ++cisterns;
      grain += countGrain(levels.slice(left + 1, right), Math.min(levels[left], levels[right]));
    }
  } while (left !== undefined);

  return [cisterns, grain];
}

function findCistern(barge, leftWall) {
  if (leftWall >= barge.length - 1) return [undefined, undefined];
  let wallCandidateIndex = leftWall + 1;
  for (let i = leftWall + 1; i < barge.length; i++) {
    if (barge[i] >= barge[leftWall]) return [leftWall, i];
    if (barge[i] > barge[wallCandidateIndex]) wallCandidateIndex = i;
  }
  return [leftWall, wallCandidateIndex];
}

function countGrain(cistern, maxLevel) {
  return cistern.reduce((sum, level) => sum + maxLevel - level, 0);
}

[
  {
    barge: [4, 1, 3],
    cisterns: 1,
    grain: 2,
  },
  {
    barge: [2, 1, 5, 2, 7, 4, 10],
    cisterns: 3,
    grain: 7,
  },
  {
    barge: [2, 0, 1, 5, 2, 7],
    cisterns: 2,
    grain: 6,
  },
  {
    barge: [2, 4, 2],
    cisterns: 2,
    grain: 0,
  },
  {
    barge: [7, 4],
    cisterns: 1,
    grain: 0,
  },
  {
    barge: [],
    cisterns: 0,
    grain: 0,
  },
  {
    barge: [1, 5, 2, 0, 1, 0, 4, 4, 0, 2, 3, 1],
    cisterns: 5,
    grain: 0+13+0+4+0,
  },
  {
    barge: [5,0,1,0,0,2],
    cisterns: 1,
    grain: 7,
  },
].forEach(({barge, cisterns, grain}) => {
  const expectedGrain = grain;
  const expectedCisterns = cisterns;
  const [actualCisterns, actualGrain] = loadGrain(barge);
  console.log(`Grain - expected ${expectedGrain}, received ${actualGrain}; Cisterns - expected ${expectedCisterns}, received ${actualCisterns};  from [${barge}]`);
})
