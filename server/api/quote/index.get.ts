import Contact from '~/server/models/Contact.model';
import Employee from '~/server/models/Employee.model';
import Quote from '~/server/models/Quote.model';

export default defineEventHandler(async (event) => {
	try {
		const quotes = await Quote.find({ completed: true }).populate([
			{
				path: 'contact',
				model: Contact,
			},
			{
				path: 'salesPerson',
				model: Employee,
			},
		]);

		return quotes;
	} catch (error) {
		console.log(error);
	}
});
