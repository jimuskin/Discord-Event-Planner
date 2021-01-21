const { MessageEmbed } = require("discord.js");
const globals = require("./globals");

const setupPlan = async (planDetails, options) => {
	const { author, channel, message } = planDetails;

	const planRole = channel.guild.roles.cache.find(
		(role) => role.name === globals.planRole
	);

	let planPing = planRole;

	if (!planRole) {
		planPing = "";
		console.log(
			`Unable to find a role with the name ${globals.planRole}. Make sure you defined it in the ENV or made a role for it.`
		);
	}

	const PLAN_ANNOUNCEMENT_MESSAGE = `${planPing} Plan started by ${author}. Make sure to react.`;

	const emojiList = [];

	for (let key in options) {
		let emoji = options[key].emoji;
		emojiList.push(emoji);
	}

	const responses = await generateResponses(null, channel, options);

	const messageEmbed = constructEmbedMessasge(message, options, responses);

	channel.send(PLAN_ANNOUNCEMENT_MESSAGE);

	const planMessage = await channel.send(messageEmbed);

	reactOptions(planMessage, emojiList);
	handleUserReactions(planMessage, message, emojiList, options);
};

const generateResponses = async (message, channel, options) => {
	return new Promise((resolve, reject) => {
		const reactedUsers = [];
		const responses = [];

		if (message) {
			//Get all reactions of available users.
			for (let key in options) {
				responses[options[key].option] = [];

				const reactions = message.reactions.cache.get(
					options[key].emoji
				);

				if (reactions) {
					reactions.users.cache.map((user) => {
						if (user.bot) return;
						if (!channel.guild.members.cache.has(user.id)) return;

						let member = channel.guild.members.cache.get(user.id);
						if (
							!member.roles.cache.find(
								(role) => role.name === globals.planRole
							)
						)
							return;

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

		channel.guild.members.fetch().then((members) => {
			members.map((member) => {
				if (member.user.bot) return;
				if (
					!member.roles.cache.find(
						(role) => role.name === globals.planRole
					)
				)
					return;

				if (!reactedUsers.includes(member.user.id)) {
					responses["Unavailable"].push(member.user.username);
				}
			});
			resolve(responses);
		});
	});
};

const handleUserReactions = (message, messageDetails, emojiList, options) => {
	const filter = (reaction, user) => {
		return emojiList.includes(reaction.emoji.name) && !user.bot;
	};

	let collector = message.createReactionCollector(filter, {
		maxUsers: 20,
		dispose: true,
	});

	const onCollectorUpdate = async (reaction, user) => {
		const responses = await generateResponses(
			message,
			message.channel,
			options
		);

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
