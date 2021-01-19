const { MessageEmbed } = require("discord.js");

const sendPlanMessage = async (planDetails, options) => {
	const { author, channel, message } = planDetails;

	const PLAN_ANNOUNCEMENT_MESSAGE = `@everyone - Plan started by ${author}. Make sure to react.`;

	const messageEmbed = new MessageEmbed()
		.setTitle("Event Planner")
		.setColor(0x1167b1)
		.setTimestamp();

	messageEmbed.addField("Details", message);

	messageEmbed.addField("Options", constructOptionsMessage(options));

	channel.send(PLAN_ANNOUNCEMENT_MESSAGE);

	const sentMessage = await channel.send(messageEmbed);

	reactOptions(sentMessage, options);
};

const reactOptions = (message, options) => {
	options.map(({ emoji }) => message.react(emoji));
};

const constructOptionsMessage = (options) => {
	let optionsMessage = "";
	options.map(({ emoji, option }) => {
		optionsMessage += `${emoji} - ${option} \n`;
	});

	return optionsMessage;
};

module.exports = sendPlanMessage;
