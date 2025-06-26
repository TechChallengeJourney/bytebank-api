import { model, Schema } from 'mongoose'
import { TransactionType } from '../enums/TransactionType'

interface IExtract {
    userId: string
    date: Date
    type: TransactionType
    value: number
}

const extractSchema = new Schema<IExtract>({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true, enum: Object.values(TransactionType) },
    value : { type: Number, required: true }
})

const Extract = model<IExtract>('Extract', extractSchema)

export default Extract
