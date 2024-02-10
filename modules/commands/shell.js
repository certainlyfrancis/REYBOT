module.exports.config = {
 name: "shell",
 version: "7.3.1",
 hasPermssion: 2,
 credits: "John Lester",
 description: "𝗦𝗵𝗲𝗹𝗹 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖩𝗈𝗁𝗇 𝖫𝖾𝗌𝗍𝖾𝗋 𝗂𝗌 𝗎𝗌𝖾 𝗍𝗈 𝗋𝗎𝗇 𝖺 𝗌𝗁𝖾𝗅𝗅 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖼𝗈𝗋𝖾 𝗌𝖾𝗋𝗏𝖾𝗋",
 commandCategory: "𝗦𝗬𝗦𝗧𝗘𝗠",
 usages: "[shell]",
 usePrefix: false,
 cooldowns: 5,
 dependencies: {
	 "child_process": ""
 }
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
const god = ["61554222594723"];
 if (!god.includes(event.senderID)) 
return api.sendMessage("ℹ️ | 𝖮𝗇𝗅𝗒 𝗍𝗁𝖾 𝗕𝗢𝗧𝗢𝗪𝗡𝗘𝗥 𝖼𝖺𝗇 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽", event.threadID, event.messageID);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
	 if (error) {
			 api.sendMessage(`error: \n${error.message}`, event.threadID, event.messageID);
			 return;
	 }
	 if (stderr) {
			 api.sendMessage(`stderr:\n ${stderr}`, event.threadID, event.messageID);
			 return;
	 }
	 api.sendMessage(`stdout:\n ${stdout}`, event.threadID, event.messageID);
});
}
