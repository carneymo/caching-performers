const { performance } = require("perf_hooks");
const Redis = require("ioredis");

async function testPerformance(client, command, args, repeat = 1000) {
  let totalTime = 0;
  for (let i = 0; i < repeat; i++) {
    const start = performance.now();
    await client[command](...args);
    totalTime += performance.now() - start;
  }
  return totalTime / repeat; // Return the average time
}

async function testSortedSetOperations(client, clientName) {
  const key = "sortedSetKey";
  await client.zadd(key, 1, "one");
  await client.zadd(key, 2, "two");
  await client.zadd(key, 3, "three");

  const startTime = performance.now();
  await client.zrange(key, 0, -1); // Get all elements
  const endTime = performance.now();

  console.log(
    `${clientName} ZRANGE operation time: ${(endTime - startTime).toFixed(3)}ms`
  );

  // Cleanup
  await client.del(key);
}

(async () => {
  const redisClient = new Redis({ port: 6379 });
  const garnetClient = new Redis({ port: 3278 });
  const dragonflyClient = new Redis({ port: 6380 });

  const commands = [
    { command: "set", args: ["test_key", "value"] },
    { command: "get", args: ["test_key"] },
    { command: "incr", args: ["test_counter"] },
    { command: "lpush", args: ["test_list", "value"] },
    { command: "rpush", args: ["test_list", "value"] },
    { command: "lpop", args: ["test_list"] },
    { command: "rpop", args: ["test_list"] }
  ];

  let results = {
    Redis: {},
    Garnet: {},
    Dragonfly: {}
  };

  for (const { command, args } of commands) {
    results.Redis[command] = await testPerformance(redisClient, command, args);
    results.Garnet[command] = await testPerformance(
      garnetClient,
      command,
      args
    );
    results.Dragonfly[command] = await testPerformance(
      dragonflyClient,
      command,
      args
    );
  }

  // Include the sorted set operations test
  console.log("Testing Sorted Set Operations");
  await testSortedSetOperations(redisClient, "Redis");
  await testSortedSetOperations(garnetClient, "Garnet");
  await testSortedSetOperations(dragonflyClient, "Dragonfly");

  // Ensure to close clients to prevent hanging the process
  redisClient.quit();
  garnetClient.quit();
  dragonflyClient.quit();

  // Display results side-by-side
  console.log(`Performance Comparison (in ms):\n`);
  console.log(`Command\t\tRedis\t\tGarnet\t\tDragonfly`);
  for (const command of Object.keys(results.Redis)) {
    console.log(
      `${command}\t\t${results.Redis[command].toFixed(3)}\t\t${results.Garnet[
        command
      ].toFixed(3)}\t\t${results.Dragonfly[command].toFixed(3)}`
    );
  }
})();
