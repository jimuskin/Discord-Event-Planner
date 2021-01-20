require("dotenv").config();

const { Client, Collection } = require("discord.js");
const client = new Client();

const commandPlan = require("./commands/commandPlan");

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
	const prefix = process.env.COMMAND_PREFIX || "!";
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(` `);
	const commandName = args.shift().toLowerCase();

	if (commandName === "testplan") {
		constructTestPlan(message);
	} else if (commandName === "plan") {
		commandPlan(message, args);
	}
});

const constructTestPlan = ({ author, channel }) => {
	const planDetails = {
		message: "Chill with the boys",
		author: author,
		channel: channel,
	};

	const options = [
		{
			emoji: "🇦",
			option: "Item 1",
		},
		{
			emoji: "🇧",
			option: "Item 2",
		},
	];

	require("./setupPlan")(planDetails, options);
};

client.login(process.env.DISCORD_TOKEN);
