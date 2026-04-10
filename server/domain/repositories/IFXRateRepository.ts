import { FXRate } from '../entities/FXRate'

export interface IFXRateRepository {
  findAll(): Promise<FXRate[]>
  findById(id: string): Promise<FXRate | null>
  findCurrent(): Promise<FXRate | null>
  create(rate: Omit<FXRate, 'id' | 'createdAt'>): Promise<FXRate>
  update(id: string, rate: Partial<Omit<FXRate, 'id' | 'createdAt'>>): Promise<FXRate | null>
  delete(id: string): Promise<boolean>
}