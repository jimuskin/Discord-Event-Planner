require("dotenv").config();

const { Client, Collection } = require("discord.js");
const client = new Client();

const globals = require("./globals");
const commandPlan = require("./commands/commandPlan");

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
	const prefix = globals.commandPrefix;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(` `);
	const commandName = args.shift().toLowerCase();

	if (commandName === "plan") {
		commandPlan(message, args);
	}
});

client.login(process.env.DISCORD_TOKEN);
