# NestJS Design Patterns - Production-Style Demo

A comprehensive, production-ready NestJS application demonstrating **23 Design Patterns** with real-world business use cases.

## 🎯 Project Overview

This project showcases all major software design patterns organized into three categories:
- **5 Creational Patterns** - Object creation mechanisms
- **7 Structural Patterns** - Object composition and relationships
- **11 Behavioral Patterns** - Communication between objects

Each pattern is implemented as a separate NestJS module with realistic business scenarios, not toy examples.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run start:dev

# Server will run on http://localhost:3000
# API Documentation available at http://localhost:3000/api/docs
```

## 📚 Design Patterns Implemented

### Creational Patterns

| Pattern | Business Use Case | Endpoint |
|---------|------------------|----------|
| **Singleton** | Application Configuration Manager | `/api/patterns/singleton` |
| **Factory** | Multi-channel Notification System | `/api/patterns/factory` |
| **Abstract Factory** | Payment Gateway Integration | `/api/patterns/abstract-factory` |
| **Builder** | Complex Report Generation | `/api/patterns/builder` |
| **Prototype** | Product Template Cloning | `/api/patterns/prototype` |

### Structural Patterns

| Pattern | Business Use Case | Endpoint |
|---------|------------------|----------|
| **Adapter** | Legacy Payment System Integration | `/api/patterns/adapter` |
| **Facade** | Simplified Order Processing | `/api/patterns/facade` |
| **Decorator** | User Service with Dynamic Features | `/api/patterns/decorator` |
| **Proxy** | Lazy Loading Document System | `/api/patterns/proxy` |
| **Flyweight** | Shared Icon System | `/api/patterns/flyweight` |
| **Composite** | File System Hierarchy | `/api/patterns/composite` |
| **Bridge** | Message Sending Abstraction | `/api/patterns/bridge` |

### Behavioral Patterns

| Pattern | Business Use Case | Endpoint |
|---------|------------------|----------|
| **Chain of Responsibility** | Loan Approval Workflow | `/api/patterns/chain-of-responsibility` |
| **Observer** | Stock Market Notifications | `/api/patterns/observer` |
| **Command** | Database Operations with Undo | `/api/patterns/command` |
| **Interpreter** | Custom Query Language | `/api/patterns/interpreter` |
| **Iterator** | Product Collection Traversal | `/api/patterns/iterator` |
| **Mediator** | Chat Room Communication | `/api/patterns/mediator` |
| **Memento** | Text Editor State Management | `/api/patterns/memento` |
| **State** | Order State Machine | `/api/patterns/state` |
| **Strategy** | Dynamic Shipping Calculation | `/api/patterns/strategy` |
| **Template Method** | Data Processing Pipeline | `/api/patterns/template-method` |
| **Visitor** | Product Tax and Shipping Calculator | `/api/patterns/visitor` |

## 🧪 Testing Examples

### Example 1: Singleton Pattern (Configuration)

```bash
# Get all configuration
curl -X GET http://localhost:3000/api/patterns/singleton/config

# Set a configuration value
curl -X POST http://localhost:3000/api/patterns/singleton/config \
  -H "Content-Type: application/json" \
  -d '{"key": "features.newFeature", "value": true}'

# Verify singleton instance
curl -X GET http://localhost:3000/api/patterns/singleton/instance-info
```

### Example 2: Factory Pattern (Notifications)

```bash
# Send email notification
curl -X POST http://localhost:3000/api/patterns/factory/send \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email",
    "recipient": "user@example.com",
    "message": "Your order has been confirmed",
    "metadata": {"subject": "Order Confirmation"}
  }'

# Send multi-channel notification
curl -X POST http://localhost:3000/api/patterns/factory/send-multiple \
  -H "Content-Type: application/json" \
  -d '{
    "types": ["email", "sms", "push"],
    "recipient": "user@example.com",
    "message": "Urgent: Your package is arriving today!"
  }'
```

### Example 3: Facade Pattern (Order Processing)

```bash
# Place order (orchestrates inventory, payment, shipping, notifications)
curl -X POST http://localhost:3000/api/patterns/facade/place-order \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PROD-123",
    "quantity": 2,
    "price": 49.99,
    "customerEmail": "customer@example.com",
    "paymentToken": "tok_visa_4242",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    }
  }'
```

### Example 4: Observer Pattern (Stock Notifications)

```bash
# Update stock price (notifies all observers)
curl -X POST http://localhost:3000/api/patterns/observer/update-price \
  -H "Content-Type: application/json" \
  -d '{"stock": "AAPL", "price": 185.50}'
```

### Example 5: Strategy Pattern (Shipping Calculation)

```bash
# Calculate shipping with different strategies
curl -X POST http://localhost:3000/api/patterns/strategy/calculate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "express", "weight": 5, "distance": 100}'

curl -X POST http://localhost:3000/api/patterns/strategy/calculate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "overnight", "weight": 5, "distance": 100}'
```

### Example 6: State Pattern (Order Lifecycle)

```bash
# Create order
curl -X POST http://localhost:3000/api/patterns/state/create \
  -H "Content-Type: application/json" \
  -d '{"orderId": "ORD-12345"}'

# Process order (changes state)
curl -X POST http://localhost:3000/api/patterns/state/process \
  -H "Content-Type: application/json" \
  -d '{"orderId": "ORD-12345"}'

# Try to cancel (state determines if allowed)
curl -X POST http://localhost:3000/api/patterns/state/cancel \
  -H "Content-Type: application/json" \
  -d '{"orderId": "ORD-12345"}'
```

## 📖 Documentation

Detailed documentation for each pattern is available in the `/docs` folder:

- `/docs/creational/` - Creational patterns documentation
- `/docs/structural/` - Structural patterns documentation
- `/docs/behavioral/` - Behavioral patterns documentation

Each document includes:
- Problem statement
- Solution approach
- UML-like structure
- Real-world use case explanation
- Code examples
- When to use / When not to use

## 🏗️ Project Structure

```
design-patterns/
├── src/
│   ├── core/                      # Shared infrastructure
│   │   ├── services/
│   │   │   └── logger.service.ts
│   │   ├── interfaces/
│   │   └── core.module.ts
│   ├── patterns/
│   │   ├── creational/            # 5 Creational patterns
│   │   │   ├── singleton/
│   │   │   ├── factory/
│   │   │   ├── abstract-factory/
│   │   │   ├── builder/
│   │   │   └── prototype/
│   │   ├── structural/            # 7 Structural patterns
│   │   │   ├── adapter/
│   │   │   ├── facade/
│   │   │   ├── decorator/
│   │   │   ├── proxy/
│   │   │   ├── flyweight/
│   │   │   ├── composite/
│   │   │   └── bridge/
│   │   └── behavioral/            # 11 Behavioral patterns
│   │       ├── chain-of-responsibility/
│   │       ├── observer/
│   │       ├── command/
│   │       ├── interpreter/
│   │       ├── iterator/
│   │       ├── mediator/
│   │       ├── memento/
│   │       ├── state/
│   │       ├── strategy/
│   │       ├── template-method/
│   │       └── visitor/
│   ├── app.module.ts
│   └── main.ts
├── docs/                          # Pattern documentation
├── package.json
├── tsconfig.json
└── README.md
```

## 🎓 Learning Path

### For Beginners
1. Start with **Singleton** - Simplest pattern
2. Move to **Factory** - Understand object creation
3. Try **Strategy** - Learn behavioral flexibility
4. Explore **Decorator** - See how to extend functionality
5. Study **Observer** - Understand event-driven design

### For Intermediate
1. **Abstract Factory** - Complex object families
2. **Builder** - Complex object construction
3. **Facade** - Simplifying complex subsystems
4. **Chain of Responsibility** - Request handling chains
5. **State** - State machine implementations

### For Advanced
1. **Prototype** - Deep cloning patterns
2. **Adapter** - Legacy system integration
3. **Command** - Transaction and undo systems
4. **Visitor** - Operations on object structures
5. **Interpreter** - Domain-specific languages

## 🔧 Key Features

- ✅ **Production-Ready Code** - Not academic examples
- ✅ **Real Business Use Cases** - E-commerce, payments, notifications, etc.
- ✅ **Fully Testable** - All patterns exposed via HTTP APIs
- ✅ **Swagger Documentation** - Interactive API docs at `/api/docs`
- ✅ **Clean Architecture** - Modular, maintainable structure
- ✅ **TypeScript** - Full type safety
- ✅ **Dependency Injection** - NestJS best practices
- ✅ **Comprehensive Comments** - Learn by reading code

## 🎯 Use Cases by Domain

### E-Commerce Platform
- **Singleton**: Application configuration
- **Factory**: Multi-channel notifications
- **Prototype**: Product templates
- **Facade**: Order processing
- **Strategy**: Shipping calculation
- **State**: Order lifecycle

### Payment Processing
- **Abstract Factory**: Multiple payment providers
- **Adapter**: Legacy payment integration
- **Command**: Transaction with rollback

### Content Management
- **Builder**: Complex report generation
- **Composite**: File system hierarchy
- **Memento**: Document versioning

### Real-Time Systems
- **Observer**: Stock market updates
- **Mediator**: Chat systems
- **Chain of Responsibility**: Request validation

## 📝 Notes

- All patterns use NestJS dependency injection
- Each module is independent and can be studied separately
- Console logs show pattern behavior in action
- Errors are properly handled and returned as JSON
- The project demonstrates SOLID principles

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more realistic use cases
- Improve documentation
- Add unit tests
- Create additional examples

## 📄 License

MIT License - Feel free to use this for learning and teaching.

## 🙏 Acknowledgments

Built with:
- NestJS - Progressive Node.js framework
- TypeScript - Typed JavaScript
- Swagger - API documentation

---

**Happy Learning! 🚀**

*Remember: Design patterns are tools, not rules. Use them when they solve a problem, not because they exist.*
