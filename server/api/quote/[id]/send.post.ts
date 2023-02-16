import sgMail from '@sendgrid/mail';

// const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
	'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'
);
// const msg = {
// 	to: 'nick@ondrako.com',
// 	from: 'michael.cayes@mooringtech.com',
// 	subject: 'Sending with Twilio SendGrid is Fun',
// 	text: 'and easy to do anywhere, even with Node.js',
// 	html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
//ES8
// (async () => {
// 	try {
// 		await sgMail.send(msg);
// 	} catch (error) {
// 		console.error(error);

// 		if (error.response) {
// 			console.error(error.response.body);
// 		}
// 	}
// })();

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
