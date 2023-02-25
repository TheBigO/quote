import Quote from '~/server/models/Quote.model';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const { id } = event.context.params;

		const quote = await Quote.findByIdAndUpdate(id, body);

		return quote;
	} catch (error) {
		console.log(error);
	}
});
