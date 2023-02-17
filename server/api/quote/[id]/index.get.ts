import Accessory from '~/server/models/Accessory.model';
import Contact from '~/server/models/Contact.model';
import Quote from '~/server/models/Quote.model';
import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;

		const quote = await Quote.findById(id).populate([
			{
				path: 'contact',
				model: Contact,
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
