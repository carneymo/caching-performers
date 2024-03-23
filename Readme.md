# Redis vs Garnet Performance Comparison App

This Node.js application is designed to benchmark and compare the performance of two popular caching solutions: Redis and Garnet. Garnet, a new caching technology from Microsoft, boasts improvements in throughput, scalability, and latency over traditional caching solutions. This app runs a series of performance tests to evaluate these claims by comparing Garnet directly against Redis.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v14 or newer recommended)
- Docker and Docker Compose
- Access to terminal or command prompt

## Setting Up

1. **Clone the Repository**

   Clone this repository to your local machine using Git:

   ```bash
   git clone <repository-url>
   cd redis-vs-garnet-performance
   ```

2. **Start Redis and Garnet Instances**

   Use shell script `startup.sh` to start the Redis and Garnet instances:

   ```bash
   ./startup.sh
   ```

   This script uses the `docker-compose` to start each docker image.
   This will start Redis on port 6379 and Garnet on port 3278 by default. Ensure these ports are available on your system or adjust the Docker Compose configuration accordingly.

3. **Install Node.js Dependencies**

   Install the required Node.js packages:

   ```bash
   npm install
   ```

## Running the Tests

To execute the performance tests, run:

```bash
node index.js
```

The application performs a series of operations on both Redis and Garnet, including basic key-value operations, list operations, set operations, and more complex transactions. After completion, it outputs the average execution time for each operation side-by-side for easy comparison.

## Understanding the Tests

The tests are designed to cover a broad spectrum of caching operations, including:

- **Key-Value Operations:** Tests the basic `SET` and `GET` operations.
- **List Operations:** Benchmarks operations like `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, and `LRANGE`.
- **Set Operations:** Evaluates the performance of `SADD`, `SMEMBERS`, and `SISMEMBER`.
- **Sorted Set Operations:** Measures the execution time of sorted set commands such as `ZADD`, `ZRANGE`, and `ZREM`.
- **Transactions:** Assesses the performance of multi-key transactions using `MULTI` and `EXEC`.

## Analyzing the Results

The output is presented in a tabulated format showing the average execution time for each operation across both Redis and Garnet. This format aids in quickly identifying performance differences and can be used to assess whether Garnet's performance enhancements align with your specific use cases.

## Extending the Tests

To add more tests or modify existing ones, edit the `index.js` file. The test framework is modular, allowing for easy addition of new operations or modification of existing tests to include more complex scenarios.

## Contributions

We welcome contributions to this project! If you have suggestions for additional tests, performance optimizations, or encounter any issues, please open an issue or submit a pull request.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details.

---
