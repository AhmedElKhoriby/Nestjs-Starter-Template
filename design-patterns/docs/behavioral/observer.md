# Observer Pattern

## Pattern Type
**Behavioral Pattern**

## Problem

In many applications, objects need to be notified when the state of another object changes. Implementing this with direct references creates tight coupling - the subject must know about all its dependents, and adding/removing dependents requires modifying the subject class.

**Real-world scenario**: A stock trading application where multiple displays (mobile app, web dashboard, email alerts, SMS notifications) need to be updated whenever a stock price changes. Hardcoding each notification mechanism is inflexible and hard to maintain.

## Solution

The Observer Pattern defines a one-to-many dependency between objects so that when one object (Subject) changes state, all its dependents (Observers) are notified and updated automatically. Observers register themselves with the subject and get notified of changes without the subject knowing their concrete types.

**Key participants**:
1. **Subject** (Observable) - Maintains list of observers and notifies them of state changes
2. **Observer** (Interface) - Defines update interface for objects that should be notified
3. **Concrete Observers** - Implement the Observer interface and react to notifications
4. **Client** - Creates and registers observers with subjects

## Structure

```
┌──────────────────────┐
│  Subject (Stock)     │
│  ──────────────────  │
│  - observers[]       │
│  + subscribe()       │
│  + unsubscribe()     │
│  + notify()          │
│  + setState()        │
└──────────────────────┘
          │
          │ notifies all
          ▼
┌──────────────────────┐
│  Observer            │ (Interface)
│  ──────────────────  │
│  + update(state)     │
└──────────────────────┘
          △
          │ implements
    ┌─────┼─────┬─────────────┐
    │           │             │
┌───┴────┐ ┌───┴────┐ ┌──────┴────────┐
│Email   │ │SMS     │ │Dashboard      │
│Notifier│ │Notifier│ │Display        │
└────────┘ └────────┘ └───────────────┘
```

## Implementation in This Project

### Business Use Case
**Stock Market Notification System** that:
- Monitors stock prices in real-time
- Notifies multiple observers when prices change
- Supports different notification channels (email, SMS, dashboard)
- Allows dynamic subscription/unsubscription
- Scales to thousands of subscribers

### Code Example

```typescript
// Create subject (stock market)
const stockMarket = new StockMarketService();

// Create and register observers
const emailNotifier = new EmailNotifier('investor@example.com');
const smsNotifier = new SmsNotifier('+1234567890');
const dashboardDisplay = new DashboardDisplay();

stockMarket.subscribe('AAPL', emailNotifier);
stockMarket.subscribe('AAPL', smsNotifier);
stockMarket.subscribe('AAPL', dashboardDisplay);

// Update state - all observers get notified automatically
stockMarket.updatePrice('AAPL', 185.50);

// Output:
// 📧 [EmailNotifier] Sending to investor@example.com: AAPL is now $185.50
// 📱 [SmsNotifier] Sending to +1234567890: AAPL is now $185.50
// 📊 [DashboardDisplay] Updating dashboard: AAPL = $185.50
```

### API Endpoints

**POST** `/api/patterns/observer/update-price`
- Update stock price and notify all observers

Request:
```json
{
  "stock": "AAPL",
  "price": 185.50
}
```

Response:
```json
{
  "pattern": "Observer",
  "description": "Multiple observers notified of stock price change",
  "observersCount": 3,
  "result": "AAPL updated to $185.50"
}
```

## When to Use

✅ **Use Observer Pattern when:**
- One object changing state requires updating other objects (and you don't know how many)
- Objects should be loosely coupled
- You need to broadcast changes to multiple objects
- You want to add/remove observers dynamically
- You're implementing event handling systems
- You need pub/sub architecture

## When NOT to Use

❌ **Avoid Observer Pattern when:**
- Only one or two objects need notification (simple callback is enough)
- You need guaranteed execution order (observers are notified in unpredictable order)
- You need transactions or rollback (observer pattern doesn't support this)
- The overhead of observer management outweighs benefits

## Benefits

1. **Loose Coupling**: Subject and observers are loosely coupled
2. **Dynamic Relationships**: Can add/remove observers at runtime
3. **Broadcast Communication**: Subject doesn't need to know who's listening
4. **Open/Closed Principle**: Can add new observers without modifying subject
5. **Reusability**: Observers can be reused with different subjects

## Drawbacks

1. **Memory Leaks**: Observers might not be garbage collected if not unsubscribed
2. **Unexpected Updates**: Cascading updates can be hard to track
3. **No Order Guarantee**: Can't guarantee observer notification order
4. **Performance**: Notifying many observers can be slow

## Real-World Examples

1. **Event Systems**: GUI events (click, hover, scroll)
2. **Messaging Systems**: Pub/Sub architectures (Redis, Kafka, RabbitMQ)
3. **Social Media**: Notification systems for likes, comments, follows
4. **Stock Trading**: Real-time price updates to multiple clients
5. **Monitoring Systems**: Alerting when metrics cross thresholds
6. **Model-View Architecture**: MVC, MVVM patterns

## Testing Example

```bash
# Update AAPL stock price
curl -X POST http://localhost:3000/api/patterns/observer/update-price \
  -H "Content-Type: application/json" \
  -d '{"stock": "AAPL", "price": 185.50}'

# Update GOOGL stock price
curl -X POST http://localhost:3000/api/patterns/observer/update-price \
  -H "Content-Type: application/json" \
  -d '{"stock": "GOOGL", "price": 140.25}'

# Check console logs to see all observers being notified
```

## Variations

### Push Model
Subject pushes detailed data to observers (used in this implementation):
```typescript
observer.update(stock, price, timestamp, volume);
```

### Pull Model
Subject just notifies, observers pull data they need:
```typescript
observer.update(subject);
// Observer calls subject.getPrice(), subject.getVolume(), etc.
```

## Related Patterns

- **Mediator**: Centralized communication vs. distributed (Observer)
- **Singleton**: Subject often implemented as singleton
- **Command**: Can be used to implement undo in observer notifications
- **Event Sourcing**: Advanced form of observer for distributed systems

## Modern Alternatives

- **RxJS Observables**: Reactive programming library
- **Event Emitters**: Node.js EventEmitter
- **Message Queues**: Redis Pub/Sub, Apache Kafka
- **WebSockets**: Real-time bidirectional communication

## Best Practices

1. **Always Unsubscribe**: Prevent memory leaks by unsubscribing when done
2. **Weak References**: Use weak references to observers when possible
3. **Thread Safety**: Consider thread-safety in multi-threaded environments
4. **Error Handling**: One observer's error shouldn't affect others
5. **Performance**: Batch notifications when possible
6. **Testing**: Mock observers for unit testing subjects

## Notes

- This implementation uses the "push" model where subject pushes data to observers
- In production, consider using RxJS for more powerful observable features
- NestJS has built-in EventEmitter which is essentially the Observer pattern
- Consider message queues (Redis, RabbitMQ) for distributed observer patterns

---

**Key Takeaway**: Observer Pattern enables one-to-many communication where dependents are automatically notified of state changes, enabling reactive and event-driven architectures.
