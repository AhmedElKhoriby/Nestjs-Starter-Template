# Factory Pattern

## Pattern Type
**Creational Pattern**

## Problem

In software development, we often need to create different types of objects based on certain conditions or configurations. Directly instantiating concrete classes makes the code tightly coupled and difficult to extend. When you need to add a new type, you have to modify existing code in multiple places.

**Real-world scenario**: An e-commerce notification system needs to send notifications through different channels (email, SMS, push notifications) based on user preferences, urgency, or A/B testing requirements. Creating notification objects directly would create tight coupling.

## Solution

The Factory Pattern provides an interface for creating objects, but lets subclasses or implementing classes decide which class to instantiate. The factory encapsulates the object creation logic, making the code more maintainable and flexible.

**Key participants**:
1. **Product Interface** (`INotificationService`) - Common interface for all products
2. **Concrete Products** (`EmailNotificationService`, `SmsNotificationService`, `PushNotificationService`) - Actual implementations
3. **Factory** (`NotificationFactory`) - Creates and returns appropriate product instances

## Structure

```
┌─────────────────────────┐
│  NotificationFactory    │
│  ─────────────────────  │
│  + create(type)         │──────┐
│  + createBestFor(...)   │      │
└─────────────────────────┘      │ creates
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │ INotificationService   │ (Interface)
                    │ ───────────────────    │
                    │ + send()               │
                    │ + getType()            │
                    └────────────────────────┘
                                 △
                    ┌────────────┼────────────┐
                    │            │            │
        ┌───────────┴────┐  ┌───┴─────┐  ┌──┴────────┐
        │ EmailService   │  │SmsService│  │PushService│
        └────────────────┘  └──────────┘  └───────────┘
```

## Implementation in This Project

### Business Use Case
**Multi-Channel Notification System** for an e-commerce platform that needs to:
- Send order confirmations via email
- Send urgent alerts via SMS
- Send real-time updates via push notifications
- Support A/B testing of notification channels
- Provide fallback mechanisms

### Code Example

```typescript
// Factory creates the appropriate notification service
const notificationService = notificationFactory.create('email');

// Client code uses the service without knowing concrete type
await notificationService.send(
  'customer@example.com',
  'Your order has been shipped!',
  { subject: 'Order Update' }
);

// Smart factory can select best option
const urgentService = notificationFactory.createBestForScenario('urgent');
// Returns SMS service for immediate delivery
```

### API Endpoints

1. **GET** `/api/patterns/factory/types`
   - Lists available notification types

2. **POST** `/api/patterns/factory/send`
   - Send notification using specific type
   ```json
   {
     "type": "email",
     "recipient": "user@example.com",
     "message": "Your order has been confirmed"
   }
   ```

3. **POST** `/api/patterns/factory/send-multiple`
   - Send via multiple channels simultaneously
   ```json
   {
     "types": ["email", "sms", "push"],
     "recipient": "user@example.com",
     "message": "Urgent update!"
   }
   ```

4. **POST** `/api/patterns/factory/send-smart`
   - Intelligently select best channel based on scenario
   ```json
   {
     "scenario": "urgent",
     "recipient": "user@example.com",
     "message": "Critical alert!"
   }
   ```

## When to Use

✅ **Use Factory Pattern when:**
- You don't know beforehand the exact types of objects you need to create
- You want to centralize object creation logic
- You need to add new types without modifying existing code
- Object creation involves complex logic or dependencies
- You want to provide a library of objects that hides implementation details

## When NOT to Use

❌ **Avoid Factory Pattern when:**
- You only have one or two types that rarely change
- Object creation is simple and straightforward
- The added abstraction layer makes code harder to understand
- You're over-engineering a simple problem

## Benefits

1. **Loose Coupling**: Client code doesn't depend on concrete classes
2. **Single Responsibility**: Creation logic is centralized
3. **Open/Closed Principle**: Can add new types without modifying existing code
4. **Flexibility**: Easy to switch implementations at runtime
5. **Testability**: Easy to mock factories in tests

## Real-World Examples

1. **UI Frameworks**: Creating different button types (primary, secondary, danger)
2. **Database Connections**: Creating connections for different databases (MySQL, PostgreSQL, MongoDB)
3. **Document Parsers**: Creating parsers based on file type (PDF, Word, Excel)
4. **Logging Systems**: Creating loggers for different outputs (file, console, cloud)
5. **Payment Gateways**: Creating payment processors for different providers

## Testing Example

```bash
# Test email notification
curl -X POST http://localhost:3000/api/patterns/factory/send \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email",
    "recipient": "test@example.com",
    "message": "Test notification",
    "metadata": {"subject": "Test"}
  }'

# Test smart selection (for urgent scenario, factory chooses SMS)
curl -X POST http://localhost:3000/api/patterns/factory/send-smart \
  -H "Content-Type: application/json" \
  -d '{
    "scenario": "urgent",
    "recipient": "emergency@example.com",
    "message": "Urgent system alert!"
  }'
```

## Related Patterns

- **Abstract Factory**: Creates families of related objects
- **Prototype**: Alternative creation method through cloning
- **Singleton**: Factory itself might be a singleton
- **Strategy**: Similar runtime selection, but for algorithms not objects

## Notes

- In our NestJS implementation, the factory itself is injectable as a service
- All concrete notification services are also injectable (Dependency Injection)
- The factory demonstrates both Simple Factory and Factory Method patterns
- Real-world integration would connect to actual email/SMS/push services (SendGrid, Twilio, Firebase)

---

**Key Takeaway**: Factory Pattern is about delegating object creation to a central place, making your code more flexible and maintainable.
