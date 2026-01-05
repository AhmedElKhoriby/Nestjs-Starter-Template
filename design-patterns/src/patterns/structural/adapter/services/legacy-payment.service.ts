import { ILegacyPaymentSystem } from '../interfaces/payment.interface';

/**
 * Legacy Payment System (Adaptee)
 * 
 * This represents an old payment system with incompatible interface
 * that we cannot modify but need to integrate
 */
export class LegacyPaymentSystem implements ILegacyPaymentSystem {
  private transactions: Map<string, any> = new Map();

  /**
   * Old method: charge
   * Takes raw card details and amount in cents
   * Returns reference number as string
   */
  charge(cardNumber: string, cvv: string, amountCents: number): string {
    console.log(`💳 [Legacy System] Charging ${amountCents} cents to card ****${cardNumber.slice(-4)}`);

    // Simulate legacy processing
    const referenceNumber = `LEG-${Date.now()}`;

    // Store transaction in legacy format
    this.transactions.set(referenceNumber, {
      cardLast4: cardNumber.slice(-4),
      amountCents,
      status: 'APPROVED',
      timestamp: new Date().toISOString(),
    });

    return referenceNumber;
  }

  /**
   * Old method: voidTransaction
   * Returns simple boolean instead of detailed response
   */
  voidTransaction(referenceNumber: string): boolean {
    console.log(`↩️  [Legacy System] Voiding transaction ${referenceNumber}`);

    const transaction = this.transactions.get(referenceNumber);
    if (!transaction) {
      return false;
    }

    transaction.status = 'VOIDED';
    transaction.voidedAt = new Date().toISOString();

    return true;
  }

  /**
   * Old method: checkTransactionStatus
   * Returns status as simple string
   */
  checkTransactionStatus(referenceNumber: string): string {
    const transaction = this.transactions.get(referenceNumber);

    if (!transaction) {
      return 'NOT_FOUND';
    }

    return transaction.status;
  }

  /**
   * Get transaction details (for demonstration purposes)
   */
  getTransaction(referenceNumber: string): any {
    return this.transactions.get(referenceNumber);
  }
}
