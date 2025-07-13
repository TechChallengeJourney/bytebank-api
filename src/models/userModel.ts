import { model, Schema } from 'mongoose'
import { WidgetKey } from '../enums/widgets'

interface IUser {
    name: string
    email: string
    password: string
    document: string
    image: string
    address: string
    city: string
    state: string
    code: number
    complement: string
    selectedWidgets: WidgetKey[]
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    document: { type: String, unique: true },
    image: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    code: { type: Number },
    complement: { type: String },
    selectedWidgets: {
        type: [String],
        enum: Object.values(WidgetKey),
        default: [],
    },
})

const User = model<IUser>('User', userSchema)

export default User