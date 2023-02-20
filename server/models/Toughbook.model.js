import mongoose from 'mongoose';
const { Schema } = mongoose;

const toughbookSchema = new Schema(
	{
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
		accessories: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Accessory',
			},
		],
		sku: {
			type: String,
			trim: true,
		},
		name: {
			type: String,
			trim: true,
		},
		image: {
			type: String,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		inventory: {
			type: Boolean,
			trim: true,
		},
		cpu: {
			type: String,
			trim: true,
		},
		screen: {
			type: String,
			trim: true,
		},
		gps: {
			type: String,
			trim: true,
		},
		ram: {
			type: String,
			trim: true,
		},
		price: {
			type: Number,
			trim: true,
			default: 0,
		},
		qty: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// toughbookSchema.virtual('totalPrice').get(function () {
// 	return this.price * this.quantity;
// });

export default mongoose.model('Toughbook', toughbookSchema);
