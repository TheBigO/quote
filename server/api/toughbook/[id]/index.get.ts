import Accessory from '~/server/models/Accessory.model';
import Product from '~/server/models/Product.model';
import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;

		const toughbook = await Toughbook.findOne({ _id: id }).populate([
			{
				path: 'product',
				model: Product,
			},
			{
				path: 'accessories',
				model: Accessory,
			},
		]);

		return toughbook;
	} catch (error) {
		return error;
	}
});
