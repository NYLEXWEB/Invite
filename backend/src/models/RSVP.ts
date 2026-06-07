import { Schema, model, Document } from 'mongoose';

export interface IRSVP extends Document {
  invitationId: Schema.Types.ObjectId;
  name: string;
  attending: boolean;
  guests: number;
  message?: string;
  createdAt: Date;
  expiresAt: Date;
}

const RSVPSchema = new Schema<IRSVP>({
  invitationId: {
    type: Schema.Types.ObjectId,
    ref: 'Invitation',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  attending: {
    type: Boolean,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    default: 1
  },
  message: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0 // Expire exactly at the expiresAt date
  }
});

export const RSVP = model<IRSVP>('RSVP', RSVPSchema);
