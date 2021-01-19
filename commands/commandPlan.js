const argsHelp = require("./commandPlan/argsHelp");

const planOptions = require("../planOptions.json");

const commandPlan = (message, args) => {
	if (!args.length) {
		message.channel.send(
			`${message.author} You did not provide any arguments. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
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
			message.channel.send(
				`Unknown/invalid options. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
			);
			return;
		}

		message.channel.send(`\`${JSON.stringify(options)}\``);
	} catch (error) {
		message.channel.send(
			`Unknown/invalid options. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
		);
	}
};

module.exports = commandPlan;
