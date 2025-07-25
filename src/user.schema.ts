import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true }) nombre: string;
  @Prop({ required: true }) correo: string;
  @Prop({ required: true }) edad: string;
  @Prop({ required: true }) comida: string;
  @Prop({ required: true }) direccion: string;
  @Prop({ required: true }) esFeliz: string; // 'si' o 'no'
  @Prop({ required: true }) horasSueno: string;
  @Prop({ required: true }) selfie: string; // base64
  @Prop({ default: Date.now }) fecha: Date;
}

export const UserSchema = SchemaFactory.createForClass(User); 