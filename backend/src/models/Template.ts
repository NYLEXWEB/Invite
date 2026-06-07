import { Schema, model, Document } from 'mongoose';

export interface ITemplate extends Document {
  templateName: string;
  serviceType: 'wedding' | 'birthday' | 'anniversary' | 'housewarming' | 'babyshower' | 'engagement' | 'savethedate' | 'all';
  previewImage?: string;
  templateConfig: Record<string, any>;
  activeStatus: boolean;
  createdAt: Date;
}

const TemplateSchema = new Schema<ITemplate>({
  templateName: {
    type: String,
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['wedding', 'birthday', 'anniversary', 'housewarming', 'babyshower', 'engagement', 'savethedate', 'all']
  },
  previewImage: {
    type: String
  },
  templateConfig: {
    type: Schema.Types.Mixed,
    required: true,
    default: {}
  },
  activeStatus: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Template = model<ITemplate>('Template', TemplateSchema);
