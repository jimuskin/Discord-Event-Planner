const { MessageEmbed } = require("discord.js");

const setupPlan = async (planDetails, options) => {
	const { author, channel, message } = planDetails;

	const PLAN_ANNOUNCEMENT_MESSAGE = `Plan started by ${author}. Make sure to react.`;

	const emojiList = [];

	for (let key in options) {
		let emoji = options[key].emoji;
		emojiList.push(emoji);
	}

	const responses = generateResponses(null, channel, options);

	const messageEmbed = constructEmbedMessasge(message, options, responses);

	channel.send(PLAN_ANNOUNCEMENT_MESSAGE);

	const planMessage = await channel.send(messageEmbed);

	reactOptions(planMessage, emojiList);
	handleUserReactions(planMessage, message, emojiList, options);
};

const generateResponses = (message, channel, options) => {
	const reactedUsers = [];
	const responses = [];

	if (message) {
		//Get all reactions of available users.
		for (let key in options) {
			responses[options[key].option] = [];

			const reactions = message.reactions.cache.get(options[key].emoji);

			if (reactions) {
				reactions.users.cache.map((user) => {
					if (user.bot) return;

					if (!reactedUsers.includes(user.id)) {
						reactedUsers.push(user.id);
					}

					responses[options[key].option].push(user.username);
				});
			}
		}
	} else {
		for (let key in options) {
			responses[options[key].option] = [];
		}
	}

	responses["Unavailable"] = [];

	channel.guild.members.cache.map((member) => {
		if (member.user.bot) return;

		if (!reactedUsers.includes(member.user.id)) {
			responses["Unavailable"].push(member.user.username);
		}
	});

	return responses;
};

const handleUserReactions = (message, messageDetails, emojiList, options) => {
	const filter = (reaction, user) => {
		return emojiList.includes(reaction.emoji.name) && !user.bot;
	};

	let collector = message.createReactionCollector(filter, {
		maxUsers: 20,
		dispose: true,
	});

	const onCollectorUpdate = (reaction, user) => {
		const responses = generateResponses(message, message.channel, options);

		const messageEmbed = constructEmbedMessasge(
			messageDetails,
			options,
			responses
		);

		message.edit(messageEmbed);
	};

	collector.on("collect", onCollectorUpdate);

	collector.on("remove", onCollectorUpdate);
};

const reactOptions = (message, emojiList) => {
	emojiList.map((emoji) => message.react(emoji));
};

const constructEmbedMessasge = (message, options, responses) => {
	const messageEmbed = new MessageEmbed()
		.setTitle("Event Planner")
		.setColor(0x1167b1)
		.setTimestamp();

	messageEmbed.addField("Details", message);

	messageEmbed.addField("Options", constructOptionsMessage(options));

	addResponsesField(messageEmbed, responses);

	return messageEmbed;
};

const constructOptionsMessage = (options) => {
	let optionsMessage = "";
	options.map(({ emoji, option }) => {
		optionsMessage += `${emoji} - ${option} \n`;
	});

	return optionsMessage;
};

const addResponsesField = (messageEmbed, responses) => {
	for (let key in responses) {
		if (Array.isArray(responses[key]) && responses[key].length) {
			let message = "";

			responses[key].map((response) => (message += `${response}, `));
			message = message.replace(/,\s*$/, "");

			messageEmbed.addField(key, message);
		}
	}
};

module.exports = setupPlan;
