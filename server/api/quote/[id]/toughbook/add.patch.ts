import Accessory from '~/server/models/Accessory.model';
import Contact from '~/server/models/Contact.model';
import Employee from '~/server/models/Employee.model';
import Quote from '~/server/models/Quote.model';
import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;
		const body = await readBody(event);

		const newTotal = body.quote.quoteTotal + body.toughbook.price;
		const newProduct = {
			model: body.toughbook._id,
			qty: 1,
			total: body.toughbook.price,
		};

		const quote = await Quote.findByIdAndUpdate(
			id,
			{
				$push: { toughbooks: newProduct },
				quoteTotal: newTotal,
			},
			{
				new: true,
			}
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
				path: 'toughbooks.model',
				model: Toughbook,
			},
			{
				path: 'accessories.model',
				model: Accessory,
			},
		]);

		return quote;
	} catch (error) {
		console.log(error);
	}
});
