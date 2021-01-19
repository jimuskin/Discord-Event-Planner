const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use("/", (req, res) => {
	res.status(200).json({
		message: "Event planner is running.",
	});
});

app.listen(port, () => {
	console.log(`Express site is being listened to.`);
});
