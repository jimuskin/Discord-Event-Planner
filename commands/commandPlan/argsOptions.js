const planOptions = require("../../planOptions.json");
const setupPlan = require("../../setupPlan");

const globals = require("../../globals");

const argsOptions = (message, optionName, args, role) => {
	const { author, channel } = message;

	try {
		const options = planOptions[optionName];

		if (!options) {
			return false;
		}

		const messageDetails = args.join(" ");

		if (messageDetails === "") {
			return false;
		}

		const planDetails = {
			author: author,
			channel: channel,
			message: messageDetails,
			role: role,
		};

		setupPlan(planDetails, options);

		message.delete().catch((error) => console.log(`${error}`));

		return true;
	} catch (error) {
		return false;
	}
};

module.exports = argsOptions;
