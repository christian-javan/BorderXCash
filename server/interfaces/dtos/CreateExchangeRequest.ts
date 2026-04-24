export class CreateExchangeRequest {
  constructor(
    public readonly customerId: string,
    public readonly amountUsd: number,
    public readonly amountMxn: number,
    public readonly rate: number
  ) {}
}

export class CreateExchangeResponse {
  constructor(
    public readonly remittanceId: string,
    public readonly success: boolean
  ) {}
}