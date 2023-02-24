import Accessory from '~/server/models/Accessory.model';
import Contact from '~/server/models/Contact.model';
import Employee from '~/server/models/Employee.model';
import Quote from '~/server/models/Quote.model';
import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const { id } = event.context.params;

		const quote = await Quote.findOneAndUpdate(
			{ _id: id },
			{
				$push: { accessories: body },
			},
			{ new: true }
		).populate([
			{
				path: 'contact',
				model: Contact,
			},
			{
				path: 'salesPerson',
				model: Employee,
			},
			{
				path: 'toughbooks',
				model: Toughbook,
			},
			{
				path: 'accessories',
				model: Accessory,
			},
		]);

		return quote;
	} catch (error) {
		console.log(error);
	}
});
