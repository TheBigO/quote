import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const toughbooks = await Toughbook.find().sort([
			['name', 1],
			['cpu', 1],
			['ram', 1],
			['gps', -1],
		]);

		return toughbooks;
	} catch (error) {
		console.log(error);
	}
});
