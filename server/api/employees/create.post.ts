import Employee from '~/server/models/Employee.model';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		await Employee.create(body);
		return { message: 'Employee added' };
	} catch (error) {
		console.log(error);
	}
});
