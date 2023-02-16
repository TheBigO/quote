import sgMail from '@sendgrid/mail';
const config = useRuntimeConfig();

sgMail.setApiKey(config.sendgridAPI);

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const templateId = 'd-be991bfc9bbb4204ac56a4401b88ced3';
		const templateData = {
			firstName: body.contact.firstName,
			lastName: body.contact.lastName,
		};

		console.log(body.contact.email);

		const msg = {
			to: body.contact.email,
			from: {
				email: 'michael.cayes@mooringtech.com',
				name: 'Michael Cayes',
			},
			templateId: templateId,
			dynamic_template_data: templateData,
		};

		console.log(body);

		await sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent');
			})
			.catch((error) => {
				console.error(error);
			});

		return 'quote sent';
	} catch (error) {
		console.log(error);
	}
});
