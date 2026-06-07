import { Schema, model, Document } from 'mongoose';

export interface IInvitation extends Document {
  serviceType: 'wedding' | 'birthday' | 'anniversary' | 'housewarming' | 'babyshower' | 'engagement' | 'savethedate';
  slug: string;
  userData: Record<string, any>;
  image?: string;
  createdAt: Date;
  expiresAt: Date;
}

const InvitationSchema = new Schema<IInvitation>({
  serviceType: {
    type: String,
    required: true,
    enum: ['wedding', 'birthday', 'anniversary', 'housewarming', 'babyshower', 'engagement', 'savethedate']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userData: {
    type: Schema.Types.Mixed,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0
  }
});

export const Invitation = model<IInvitation>('Invitation', InvitationSchema);
