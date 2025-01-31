const axios = require("axios");
const fs = require("fs");
const path = require("path");
const os = require("os");

module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "Abhi Don",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};

module.exports.onLoad = function () {
    return;
};

module.exports.run = async function({ api, event }) {
    const { threadID } = event;

    async function aayushaMedia(url) {
        const tempFilePath = path.join(os.tmpdir(), `tempfile-${Date.now()}.mp4`);
        
        const response = await axios({
            method: "get",
            url: url,
            responseType: "stream",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });

        const writer = fs.createWriteStream(tempFilePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => resolve(tempFilePath));
            writer.on("error", reject);
        });
    }

    if (event.logMessageData.addedParticipants.some(i => i.userFbId === api.getCurrentUserID())) {
        api.changeNickname(
            `[ ${global.config.PREFIX} ] • ${global.config.BOTNAME || " "}`,
            threadID,
            api.getCurrentUserID()
        );

        try {
            const videoURL = "https://i.imgur.com/ClARKTY.mp4";
            const videoPath = await aayushaMedia(videoURL);

            return api.sendMessage(
                {
                    body: "Bot successfully connected! thanks for adding me in your group my prefix [ . ] Bot Name Abhi's Botwa 🐥💜",
                    attachment: fs.createReadStream(videoPath)
                },
                threadID,
                () => fs.unlinkSync(videoPath) 
            );
        } catch (e) {
            console.error(e);
        }
    } else {
        try {
            const { threadName, participantIDs } = await api.getThreadInfo(threadID);

            const threadData = global.data.threadData.get(parseInt(threadID)) || {};

            let mentions = [];
            let nameArray = [];
            let memLength = [];
            let i = 0;

            for (const id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);

            let msg = threadData.customJoin || 
                `Welcome ${nameArray.join(", ")}! You are now a member of ${threadName}. Enjoy your stay! my Prefix [ . ]`;

            const gifOrVideoLink = "https://i.imgur.com/YkhwFAH.mp4";
            const mediaPath = await aayushaMedia(gifOrVideoLink);

            return api.sendMessage(
                {
                    body: msg,
                    attachment: fs.createReadStream(mediaPath),
                    mentions
                },
                threadID,
                () => fs.unlinkSync(mediaPath) 
            );
        } catch (e) {
            return console.log(e);
        }
    }
};
