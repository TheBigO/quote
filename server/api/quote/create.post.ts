import Contact from '~/server/models/Contact.model';
import Employee from '~/server/models/Employee.model';
import Quote from '~/server/models/Quote.model';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const contact = await Contact.create(body);

		// Get the last recorded quote number
		const lastQuote = await Quote.findOne()
			.sort({ createdAt: -1 })
			.select({ quoteNumber: 1, _id: 0 });

		let newNumber = lastQuote?.quoteNumber;

		const newQuote = await Quote.create({
			contact: contact._id,
			quoteNumber: newNumber ? newNumber + 1 : 200000,
			salesPerson: body.salesRep._id,
			brand: body.salesRep.company,
		});

		const quote = await newQuote.populate([
			{
				path: 'contact',
				model: Contact,
			},
			{
				path: 'salesPerson',
				model: Employee,
			},
		]);

		return quote;
	} catch (error) {
		console.log(error);
	}
});
