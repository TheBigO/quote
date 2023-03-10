import Quote from '~/server/models/Quote.model';

export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;
		const body = await readBody(event);

		const quote = await Quote.findByIdAndUpdate(
			id,
			{
				$pull: { toughbooks: { _id: body.toughbook._id } },
				quoteTotal: body.total,
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
