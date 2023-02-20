import mongoose from 'mongoose';
const { Schema } = mongoose;

const accessorySchema = new Schema(
	{
		toughbooks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Toughbook',
			},
		],
		modelName: {
			type: String,
			trim: true,
		},
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

// accessorySchema.virtual('totalPrice').get(function () {
// 	return this.price * this.quantity;
// });

export default mongoose.model('Accessory', accessorySchema);
