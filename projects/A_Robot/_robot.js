const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// runRobot(VillageState.random(), routeRobot, []);
// runRobot(VillageState.random(), goalOrientedRobot, []);

// #1 Measuring a Robot
function compareRobots(robot1, memory1, robot2, memory2) {
  const measurement = 100;
  let result1 = 0;
  let result2 = 0;

  function countSteps(state, robot, memory) {
    for (let turn = 0; ; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }

  for (let i = 1; i <= measurement; i++) {
    let state = VillageState.random(1);
    result1 += countSteps(state, robot1, memory1);
    result2 += countSteps(state, robot2, memory2);
  }

  console.log("first robot average", result1 / measurement);
  console.log("second robot average", result2 / measurement);
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);

// #2 Robot Efficiency
function efficientRobot(state, memory) {
  let { place, parcels } = state;

  if (memory.length == 0) {
    let routes = parcels.map((parcel) => {
      if (parcel.place !== place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
          parcel,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
          parcel,
        };
      }
    });

    routes.sort((a, b) => a.route.length - b.route.length);
    memory = routes[0].route;
  }

  return { direction: memory[0], memory: memory.slice(1) };
}

// runRobot(VillageState.random(5), efficientRobot, []);
// compareRobots(goalOrientedRobot, [], efficientRobot, []);
