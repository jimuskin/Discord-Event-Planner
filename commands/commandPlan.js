const argsHelp = require("./commandPlan/argsHelp");
const argsOptions = require("./commandPlan/argsOptions");
const globals = require("../globals");

const commandPlan = (message, args) => {
	const { author, channel } = message;
	if (!args.length) {
		channel.send(
			`${author} You did not provide any arguments. Type ${globals.commandPrefix}plan help for more details.`
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
			`Unknown/invalid options. Type ${globals.commandPrefix}plan help for more details.`
		);
	}
};

module.exports = commandPlan;
