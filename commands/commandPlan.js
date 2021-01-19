const argsHelp = require("./commandPlan/argsHelp");
const argsOptions = require("./commandPlan/argsOptions");

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

	if (!argsOptions(message, keyArg, args)) {
		channel.send(
			`Unknown/invalid options. Type ${process.env.COMMAND_PREFIX}plan help for more details.`
		);
	}
};

module.exports = commandPlan;
