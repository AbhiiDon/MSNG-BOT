//@Prem-babu3608
////////////////////////////////////////////////////////
/////// WARNING => JO CREDIT NAME CHANGE KREGA USKA ID BAN KAR DIYA JAYEGA + THIS BOT IS MADE BT PREM BABU
const fs = require("fs");
module.exports.config = {
	name: "haha",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "PREM BABU", //////@prem-babu3608
	description: "THIS BOT IS MADE BY ABHI DON",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("haha") ||
     react.includes("😹") || react.includes("😹😹😹") || react.includes("खाना") ||
react.includes("🤣🤣🤣") ||
react.includes("😸")) {
		var msg = {
				body: `🙂 Haste Haste Pet Dard Hone Laga🤣🥰🙈😘 🙂`,attachment: fs.createReadStream(__dirname + `/noprefix/hasna.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍲", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

	}
