const planOptions = require("../../planOptions.json");
const setupPlan = require("../../setupPlan");

const argsOptions = (message, optionName, args) => {
	const { author, channel } = message;

	try {
		const options = planOptions[optionName];

		if (!options) {
			return false;
		}

		const messageDetails = args.join(" ");

		const planDetails = {
			author: author,
			channel: channel,
			message: messageDetails,
		};

		setupPlan(planDetails, options);

		message.delete().catch((error) => console.log(`${error}`));

		return true;
	} catch (error) {
		channel.send(
			`Unknown/invalid options. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
		);

		return false;
	}
};

module.exports = argsOptions;
