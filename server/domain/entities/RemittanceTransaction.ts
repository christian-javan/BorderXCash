export class RemittanceTransaction {
  constructor(
    public readonly remittanceId: string,
    public readonly customerId: string,
    public readonly fundingEventId: string,
    public readonly spendMxnId: string | null,
    public readonly status: string,
    public readonly settledAt: Date | null,
    public readonly createdAt: Date
  ) {}
}