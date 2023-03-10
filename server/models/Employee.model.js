import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema(
	{
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
		phone: {
			type: String,
			trim: true,
		},
		logo: {
			type: String,
		},
		active: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

employeeSchema.virtual('fullName').get(function () {
	return this.firstName + ' ' + this.lastName;
});

export default mongoose.model('Employee', employeeSchema);
