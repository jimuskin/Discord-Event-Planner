const { MessageEmbed } = require("discord.js");
const planOptions = require("../../planOptions.json");
const globals = require("../../globals");

const argsHelp = (message, args) => {
	const messageEmbed = new MessageEmbed()
		.setTitle("Event Planner Help")
		.setColor(0x1167b1)
		.setFooter("Yikes");

	const commands = [
		{
			command: "plan <option> <details>",
			description: "Sets up a plan message to react to.",
		},
	];

	messageEmbed.addField("Commands", getCommandsMessage(commands));

	messageEmbed.addField("Plan Options", getPlanOptions());

	message.channel.send(`${message.author} - here are the list of commands.`);
	message.channel.send(messageEmbed);
};

const getPlanOptions = () => {
	let options = Object.keys(planOptions);
	let optionMessage = "";
	options.map((option) => {
		optionMessage += `\`${option}\`, `;
	});

	optionMessage = optionMessage.replace(/,\s*$/, "");
	return optionMessage;
};

const getCommandsMessage = (commands) => {
	let commandsMessage = "";
	commands.map(({ command, description }) => {
		commandsMessage += `\`${globals.commandPrefix}${command}\`: ${description}\n`;
	});

	return commandsMessage;
};
module.exports = argsHelp;
