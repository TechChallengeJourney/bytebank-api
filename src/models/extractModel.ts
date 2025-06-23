import { model, Schema } from 'mongoose'

interface IExtract {
    userId: string
    date: Date
    type: 'entrada' | 'saida'
    value: number
}

const extractSchema = new Schema<IExtract>({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true, enum: ['entrada', 'saida'] },
    value : { type: Number, required: true }
})

const Extract = model<IExtract>('Extract', extractSchema)

export default Extract
