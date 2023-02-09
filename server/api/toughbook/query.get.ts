import Accessory from '~/server/models/Accessory.model';
import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);

		const toughbook = await Toughbook.findOne({
			name: query.name,
			cpu: query.cpu,
			gps: query.gps,
			screen: query.screen,
		}).populate({
			path: 'accessories',
			model: Accessory,
		});

		return toughbook;
	} catch (error) {
		console.log(error);
	}
});
