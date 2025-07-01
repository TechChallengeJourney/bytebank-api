import { model, Schema } from 'mongoose'
import { TransactionType } from '../enums/transactionType'

interface ITransaction {
    userId: string
    date: Date
    type: TransactionType
    value: number
}

const transactionSchema = new Schema<ITransaction>({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true, enum: Object.values(TransactionType) },
    value : { type: Number, required: true }
})

const Transaction = model<ITransaction>('Transaction', transactionSchema)

export default Transaction
