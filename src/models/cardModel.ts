import { model, Schema } from 'mongoose'

interface ICard {
    userId: string
    cardNumber: string
    name: string
    functions: [string]
    variant: string
}

const cardSchema = new Schema<ICard>({
    userId: { type: String, required: true },
    cardNumber: { type: String, required: true },
    name: { type: String, required: true },
    functions: { type: [String], required: true, enum: ['credito', 'debito'] },
    variant: { type: String, required: true }
})

const Card = model<ICard>('Card', cardSchema)

export default Card