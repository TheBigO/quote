import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		await Toughbook.create(body);
		return { message: 'Toughbook added' };
	} catch (error) {
		console.log(error);
	}
});
