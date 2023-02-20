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
				model: {
					type: Schema.Types.ObjectId,
					ref: 'Toughbook',
				},
				qty: {
					type: Number,
					default: 0,
				},
				total: {
					type: Number,
					default: 0,
				},
			},
		],
		accessories: [
			{
				model: {
					type: Schema.Types.ObjectId,
					ref: 'Accessory',
				},
				qty: {
					type: Number,
					default: 0,
				},
				total: {
					type: Number,
					default: 0,
				},
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
		quoteTotal: {
			type: Number,
			default: 0,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Quote', quoteSchema);
