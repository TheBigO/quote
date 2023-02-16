import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema(
	{
		quotes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Quote',
			},
		],
		firstName: {
			type: String,
			trim: true,
		},
		lastName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
		},
		company: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
);

contactSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model('Contact', contactSchema);
