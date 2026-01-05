# Facade Pattern

## Pattern Type
**Structural Pattern**

## Problem

Complex subsystems with many interdependent classes make client code complicated and tightly coupled. Clients need to understand and interact with multiple subsystem classes, leading to:
- High complexity in client code
- Tight coupling between clients and subsystems
- Difficulty in changing or upgrading subsystems
- Code duplication across clients

**Real-world scenario**: An e-commerce order processing system involves multiple complex subsystems: inventory management, payment processing, shipping coordination, and customer notifications. Each subsystem has its own complex API. Clients having to interact with all of these directly creates unmaintainable code.

## Solution

The Facade Pattern provides a unified, simplified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes the subsystem easier to use by wrapping a complicated subsystem with a simpler interface.

**Key participants**:
1. **Facade** - Provides simple methods that delegate to subsystem classes
2. **Subsystems** - Implement functionality and handle work assigned by Facade
3. **Client** - Uses the Facade instead of subsystem classes directly

## Structure

```
┌──────────────┐
│   Client     │
└──────┬───────┘
       │ uses
       ▼
┌──────────────────────────┐
│   OrderFacade            │ ◄─── Simplified Interface
│   ──────────────────     │
│   + placeOrder()         │
│   + cancelOrder()        │
└────────┬─────────────────┘
         │ coordinates
         │
    ┌────┼─────┬──────────┬──────────┐
    ▼    ▼     ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Inventory│ │Payment │ │Shipping│ │Notify  │
│Subsystem│ │Subsystem│ │Subsystem│ │Subsystem│
└────────┘ └────────┘ └────────┘ └────────┘
    Complex Subsystems (hidden from client)
```

## Implementation in This Project

### Business Use Case
**E-Commerce Order Processing** that orchestrates:
1. **Inventory Subsystem** - Check stock, reserve items, release on failure
2. **Payment Subsystem** - Validate, authorize, capture payments
3. **Shipping Subsystem** - Calculate costs, create shipments, schedule pickup
4. **Notification Subsystem** - Send confirmations via email, SMS, push

Without Facade, client would need 15+ method calls across 4 subsystems. With Facade, client makes just 1 call.

### Code Example

**WITHOUT Facade** (Complex):
```typescript
// Client has to manage all this complexity
const stockAvailable = await inventory.checkStock(productId, qty);
if (!stockAvailable) throw new Error('Out of stock');

const reservationId = await inventory.reserveStock(productId, qty);

const shippingCost = await shipping.calculateCost(address);
const totalAmount = price * qty + shippingCost;

await payment.validatePaymentMethod(token);
const authId = await payment.authorizePayment(totalAmount, token);
const paymentId = await payment.capturePayment(authId);

const orderId = generateOrderId();
const shipmentId = await shipping.createShipment(orderId, address);
await shipping.schedulePickup(shipmentId);

await notification.sendOrderConfirmation(email, orderId);
await notification.sendPaymentNotification(email, totalAmount);
await notification.sendShippingNotification(email, shipmentId);

// Error handling, rollbacks, cleanup... even more complex!
```

**WITH Facade** (Simple):
```typescript
// Facade handles all complexity internally
const result = await orderFacade.placeOrder({
  productId: 'PROD-123',
  quantity: 2,
  price: 49.99,
  customerEmail: 'customer@example.com',
  paymentToken: 'tok_visa',
  shippingAddress: { /* ... */ }
});
```

### API Endpoints

**POST** `/api/patterns/facade/place-order`
- Simplified order placement (orchestrates all subsystems)

Request:
```json
{
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
}
```

Response:
```json
{
  "pattern": "Facade",
  "description": "Orchestrated 4 complex subsystems",
  "subsystemsOrchestrated": [
    "InventorySubsystem",
    "PaymentSubsystem",
    "ShippingSubsystem",
    "NotificationSubsystem"
  ],
  "stepsExecuted": 13,
  "result": {
    "success": true,
    "orderId": "ORD-1234567890",
    "totalAmount": 109.97,
    "shippingCost": 9.99,
    "paymentId": "PAY-1234567890",
    "shipmentId": "SHIP-1234567890",
    "steps": [
      "Checking inventory availability",
      "Reserved inventory: RES-1234567890",
      "Calculating shipping cost",
      "Calculated total: $109.97",
      "Validating payment method",
      "Authorizing payment",
      "Capturing payment",
      "Payment captured: PAY-1234567890",
      "Creating shipment",
      "Scheduling pickup",
      "Sending order confirmation",
      "Sending payment notification",
      "Sending shipping notification"
    ]
  }
}
```

## When to Use

✅ **Use Facade Pattern when:**
- You want to provide a simple interface to a complex subsystem
- There are many dependencies between clients and subsystem classes
- You want to layer your subsystems
- You need to decouple subsystems from clients and other subsystems
- You want to define entry points to subsystem layers

## When NOT to Use

❌ **Avoid Facade Pattern when:**
- The subsystem is already simple
- Clients need fine-grained control over subsystem features
- The facade would become too complex itself
- You're just wrapping a single class (not a subsystem)

## Benefits

1. **Simplicity**: Shields clients from subsystem complexity
2. **Loose Coupling**: Reduces dependencies between clients and subsystems
3. **Layering**: Helps define clear layers in architecture
4. **Flexibility**: Can change subsystems without affecting clients
5. **Testing**: Easier to mock a facade than multiple subsystems

## Drawbacks

1. **Over-Simplification**: Might hide useful functionality
2. **God Object Risk**: Facade can become too large if not careful
3. **Extra Layer**: Adds another layer of abstraction
4. **Not a Replacement**: Clients can still access subsystems directly

## Real-World Examples

1. **Compiler**: High-level compile() method hides lexing, parsing, optimization, code generation
2. **Operating System**: File system APIs hide disk access, caching, permissions
3. **Web Frameworks**: Router facades hide complex routing logic
4. **ORMs**: Simple query methods hide SQL generation and execution
5. **Payment SDKs**: Simple charge() method hides token validation, API calls, error handling

## Testing Example

```bash
# Place a complete order with one simple API call
curl -X POST http://localhost:3000/api/patterns/facade/place-order \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "LAPTOP-001",
    "quantity": 1,
    "price": 1299.99,
    "customerEmail": "john@example.com",
    "paymentToken": "tok_visa_test",
    "shippingAddress": {
      "street": "456 Tech Avenue",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94105",
      "country": "USA"
    }
  }'

# Check console output to see all subsystem operations
# Each subsystem logs its operations showing the complex workflow
```

## Design Considerations

### Error Handling
The Facade must handle errors from any subsystem and roll back operations:
```typescript
try {
  // Reserve inventory
  // Process payment
  // Create shipment
} catch (error) {
  // Roll back inventory
  // Refund payment
  throw error;
}
```

### Transaction Management
For operations spanning multiple subsystems, consider:
- Implementing compensation transactions
- Using saga pattern for distributed transactions
- Maintaining operation history for rollbacks

### Logging
Facade should log:
- Entry and exit of operations
- Steps executed
- Errors and recovery attempts
- Performance metrics

## Related Patterns

- **Adapter**: Changes interface of existing class; Facade simplifies interface of subsystem
- **Mediator**: Centralizes communication; Facade simplifies access
- **Abstract Factory**: Can be used by Facade to create subsystem objects
- **Singleton**: Facade is often implemented as Singleton

## Best Practices

1. **Keep It Simple**: Facade should be simpler than subsystems combined
2. **Don't Limit Access**: Allow direct subsystem access for power users
3. **Layer Your Facades**: Create multiple facades for different client needs
4. **Document Well**: Clearly show what facade handles internally
5. **Error Handling**: Provide clear error messages that hide subsystem details

## Modern Alternatives

- **API Gateway**: Microservices equivalent of Facade
- **Backend for Frontend (BFF)**: Specialized facades for different clients
- **GraphQL**: Query language that acts as a facade for multiple data sources

## Notes

- This implementation shows transactional behavior with rollback support
- In production, consider using actual databases with transaction support
- The facade doesn't prevent direct subsystem access (which is intentional)
- Could be enhanced with caching, circuit breakers, and retry logic

---

**Key Takeaway**: Facade Pattern makes complex subsystems easier to use by providing a simple, unified interface while keeping the full power of subsystems available when needed.
