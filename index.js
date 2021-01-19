const {
	Client,
	MessageEmbed,
	Message,
} = require("discord.js");
const client = new Client();
require("dotenv").config();

const emojis = require("./emoji.json");

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
	if (msg.content === "ping") {
		msg.reply("pong!");
	}
});

client.login(process.env.DISCORD_TOKEN);
