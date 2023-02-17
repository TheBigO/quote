import Contact from '~/server/models/Contact.model';
import Quote from '~/server/models/Quote.model';

export default defineEventHandler(async (event) => {
	try {
		const quotes = await Quote.find({ completed: true }).populate([
			{
				path: 'contact',
				model: Contact,
			},
		]);

		return quotes;
	} catch (error) {
		console.log(error);
	}
});
