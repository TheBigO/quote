import Contact from '~/server/models/Contact.model';
import Employee from '~/server/models/Employee.model';
import Product from '~/server/models/Product.model';
import Quote from '~/server/models/Quote.model';

export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;

		const quote = await Quote.findById(id).populate([
			{
				path: 'contact',
				model: Contact,
			},
			{
				path: 'salesPerson',
				model: Employee,
			},
			{
				path: 'products',
				model: Product,
			},
		]);

		return quote;
	} catch (error) {
		console.log(error);
	}
});
