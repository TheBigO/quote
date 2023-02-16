import Accessory from '~/server/models/Accessory.model';
import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const { id } = event.context.params;

		const toughbook = await Toughbook.findOneAndUpdate({ _id: id }, body, {
			new: true,
		}).populate({
			path: 'accessories',
			model: Accessory,
		});

		return toughbook;
	} catch (error) {
		console.log(error);
	}
});
