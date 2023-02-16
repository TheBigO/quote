import Employee from '~/server/models/Employee.model';

export default defineEventHandler(async (event) => {
	try {
		const reps = await Employee.find().sort({ lastName: 'asc' });

		return reps;
	} catch (error) {
		console.log(error);
	}
});
