import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, {HydratedDocument} from 'mongoose'

export type FilesDocument = HydratedDocument<Files>

@Schema()
export class Files {
    @Prop({required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    userId: string

    @Prop()
    files: Array<Express.Multer.File>
}

export const FilesSchema = SchemaFactory.createForClass(Files)