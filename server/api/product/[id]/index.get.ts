import Option from '~/server/models/Option.model';
import Product from '~/server/models/Product.model';
import Toughbook from '~/server/models/Toughbook.model';

export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;

		const product = await Product.findOne({ _id: id }).populate([
			{
				path: 'toughbooks',
				model: Toughbook,
			},
			{
				path: 'options',
				model: Option,
				options: { sort: [{ order: 1 }] },
			},
		]);

		return product;
	} catch (error) {
		return error;
	}
});
