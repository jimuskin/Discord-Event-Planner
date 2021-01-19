const argsHelp = require("./commandPlan/argsHelp");

const planOptions = require("../planOptions.json");
const sendPlanMessage = require("../sendPlanMessage");

const commandPlan = (message, args) => {
	const { author, channel } = message;
	if (!args.length) {
		channel.send(
			`${author} You did not provide any arguments. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
		);
		return;
	}

	const keyArg = args.shift();

	if (keyArg === "help") {
		argsHelp(message, args);
		return;
	}

	try {
		const options = planOptions[keyArg];

		if (!options) {
			channel.send(
				`Unknown/invalid options. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
			);
			return;
		}

		const messageDetails = args.join(" ");

		const planDetails = {
			author: author,
			channel: channel,
			message: messageDetails,
		};

		sendPlanMessage(planDetails, options);

		try {
			message.delete();
		} catch (error) {
			console.log(`${error}`);
		}
	} catch (error) {
		channel.send(
			`Unknown/invalid options. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
		);
	}
};

module.exports = commandPlan;
