const redis = require("redis");
require("dotenv").config();

// Replace with your ElastiCache endpoint and port
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
console.log(`Host: ${redisHost}; Port: ${redisPort}`);

// Create a Redis client
const client = redis.createClient({
  host: redisHost,
  port: redisPort
});

async function connectToRedis() {
  try {
    // Connect to Redis
    await client.connect();

    // Set a value for a key
    const key = "myKey";
    const value = "Hello from Node.js!";
    await client.set(key, value);
    console.log(`Successfully set key: ${key} with value: ${value}`);

    // Retrieve the value
    const retrievedValue = await client.get(key);
    console.log(`Retrieved value for key: ${key} is: ${retrievedValue}`);
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect from Redis
    await client.quit();
  }
}

connectToRedis();
