import Accessory from '~/server/models/Accessory.model';

export default defineEventHandler(async (event) => {
	try {
		const accessories = await Accessory.find();

		return accessories;
	} catch (error) {
		console.log(error);
	}
});
