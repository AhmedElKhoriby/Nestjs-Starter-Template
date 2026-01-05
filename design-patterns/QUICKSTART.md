# Quick Start Guide

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## API Documentation

Interactive Swagger documentation: `http://localhost:3000/api/docs`

## Quick Test Examples

### 1. Test Singleton Pattern
```bash
# See that configuration is shared (same instance ID)
curl http://localhost:3000/api/patterns/singleton/instance-info
curl http://localhost:3000/api/patterns/singleton/instance-info
# Notice the instanceId is the same in both responses
```

### 2. Test Factory Pattern
```bash
# Factory creates different notification types
curl -X POST http://localhost:3000/api/patterns/factory/send \
  -H "Content-Type: application/json" \
  -d '{"type":"email","recipient":"test@example.com","message":"Hello"}'
```

### 3. Test Observer Pattern
```bash
# Multiple observers get notified of stock price change
curl -X POST http://localhost:3000/api/patterns/observer/update-price \
  -H "Content-Type: application/json" \
  -d '{"stock":"AAPL","price":185.50}'
# Check console logs to see all observers being notified
```

### 4. Test Strategy Pattern
```bash
# Different shipping strategies
curl -X POST http://localhost:3000/api/patterns/strategy/calculate \
  -H "Content-Type: application/json" \
  -d '{"strategy":"standard","weight":5,"distance":100}'

curl -X POST http://localhost:3000/api/patterns/strategy/calculate \
  -H "Content-Type: application/json" \
  -d '{"strategy":"overnight","weight":5,"distance":100}'
```

### 5. Test Facade Pattern
```bash
# Simple interface to complex subsystems
curl -X POST http://localhost:3000/api/patterns/facade/place-order \
  -H "Content-Type: application/json" \
  -d '{
    "productId":"PROD-123",
    "quantity":1,
    "price":99.99,
    "customerEmail":"customer@example.com",
    "paymentToken":"tok_visa",
    "shippingAddress":{
      "street":"123 Main St",
      "city":"New York",
      "state":"NY",
      "zip":"10001",
      "country":"USA"
    }
  }'
```

## Postman Collection

Import `postman_collection.json` into Postman for a complete collection of all API endpoints.

## Project Structure

- `src/core/` - Shared services and interfaces
- `src/patterns/creational/` - 5 Creational patterns
- `src/patterns/structural/` - 7 Structural patterns
- `src/patterns/behavioral/` - 11 Behavioral patterns
- `docs/` - Detailed documentation for each pattern

## Learning Path

1. Start with **Singleton** - Simplest pattern
2. Move to **Factory** and **Strategy** - Core patterns
3. Explore **Observer** and **Command** - Event-driven patterns
4. Study **Facade** and **Adapter** - Integration patterns
5. Master **State** and **Chain of Responsibility** - Workflow patterns

## Console Logs

The application logs pattern behavior to the console. Watch the console while testing to see:
- Factory creating different types
- Observers being notified
- Facade orchestrating subsystems
- Chain of Responsibility handlers executing
- State transitions

## Next Steps

1. Read the detailed docs in `/docs` folder
2. Test all endpoints using Postman or curl
3. Read the source code with inline comments
4. Modify patterns to fit your use cases
5. Build your own patterns following these examples

Happy Learning! 🚀
