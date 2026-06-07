import { Schema, model, Document, Types } from 'mongoose';

export interface IAnalytics extends Document {
  invitationId: Types.ObjectId;
  views: number;
  deviceType: string;
  country: string;
  createdAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>({
  invitationId: {
    type: Schema.Types.ObjectId,
    ref: 'Invitation',
    required: true,
    index: true
  },
  views: {
    type: Number,
    default: 1,
    required: true
  },
  deviceType: {
    type: String,
    required: true,
    default: 'unknown'
  },
  country: {
    type: String,
    required: true,
    default: 'unknown'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Create index for fast lookups on aggregation queries
AnalyticsSchema.index({ invitationId: 1, createdAt: -1 });

export const Analytics = model<IAnalytics>('Analytics', AnalyticsSchema);
