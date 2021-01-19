const argsHelp = (message, args) => {
	if (args.length) {
		message.channel.send(args);
	}
};
module.exports = argsHelp;
