const { Client } = require("discord.js");
const client = new Client();
require("dotenv").config();
const sendPlanMessage = require("./sendPlanMessage");

const emojis = require("./emoji.json");

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
	if (msg.content === "testplan") {
		constructTestPlan(msg);
	}
});

const constructTestPlan = (msg) => {
	const planDetails = {
		message: "Chill with the boys",
		author: msg.author,
		channel: msg.channel,
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

	sendPlanMessage(planDetails, options);
};

client.login(process.env.DISCORD_TOKEN);
