import mongoose from 'mongoose';
const { Schema } = mongoose;

const quoteSchema = new Schema(
	{
		contact: {
			type: Schema.Types.ObjectId,
			ref: 'Contact',
		},
		toughbooks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Toughbook',
			},
		],
		accessories: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Accessory',
			},
		],
		salesPerson: {
			type: Schema.Types.ObjectId,
			ref: 'Employee',
		},
		validUntil: {
			type: String,
			trim: true,
		},
		quoteNumber: {
			type: Number,
			trim: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Quote', quoteSchema);
