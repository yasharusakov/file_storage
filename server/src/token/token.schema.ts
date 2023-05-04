import {Prop, Schema as MongooseSchema, SchemaFactory} from '@nestjs/mongoose'
import {HydratedDocument, Schema} from 'mongoose'

export type TokenDocument = HydratedDocument<Token>

@MongooseSchema()
export class Token {
    @Prop({type: Schema.Types.ObjectId, required: true, unique: true, ref: 'Users'})
    user: string

    @Prop({required: true, unique: true})
    refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)