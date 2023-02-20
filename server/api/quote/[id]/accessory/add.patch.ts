import Quote from '~/server/models/Quote.model';

export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;
		const body = await readBody(event);

		const newTotal = body.quote.quoteTotal + body.accessory.price;
		const newProduct = {
			model: body.accessory._id,
			qty: 1,
			total: body.accessory.price,
		};

		const quote = await Quote.findByIdAndUpdate(
			id,
			{
				$push: { accessories: newProduct },
				quoteTotal: newTotal,
			},
			{
				new: true,
			}
		);

		return quote;
	} catch (error) {
		console.log(error);
	}
});
