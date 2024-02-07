module.exports.config = {
 name: "approve",
 version: "1.0.2",
 hasPermssion: 2,
 credits: "Cliff",//dont change the credits 
 description: "approve list/del/pending",
 commandCategory: "𝗦𝗬𝗦𝗧𝗘𝗠",
 usePrefix: false,
 usages: "approve list/del/pending",
 cooldowns: 5
};


const dataPath = __dirname + "/cache/approvedThreads.json";
const pendingPath = __dirname + "/cache/pendingThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
 if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
 if (!fs.existsSync(pendingPath)) fs.writeFileSync(pendingPath, JSON.stringify([]));
}

module.exports.run = async ({ event, api, args }) => {
 const { threadID, messageID, senderID } = event;
 let data = JSON.parse(fs.readFileSync(dataPath));
 let pending = JSON.parse(fs.readFileSync(pendingPath));
 let msg = "";
 let idBox = (args[0]) ? args[0] : threadID;
 if (args[0] == "list") {
	 msg = "𝗟𝗜𝗦𝗧 𝗢𝗙 𝗔𝗣𝗣𝗥𝗢𝗩𝗘 𝗕𝗢𝗫\n━━━━━━━━━━━━━━━━━━\n ";
	 let count = 0;
	 for (e of data) {
		 msg += `\n${count += 1}. ID: ${e}`;
	 }
	 api.sendMessage(msg, threadID, messageID);
 }
 else if (args[0] == "del") {
	 idBox = (args[1]) ? args[1] : event.threadID;
	 if (isNaN(parseInt(idBox))) return api.sendMessage("𝖳𝗁𝖺𝗍 𝗂𝗌 𝗇𝗈𝗍 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋.", threadID, messageID);
	 if (!data.includes(idBox)) return api.sendMessage("𝖳𝗁𝗂𝗌 𝗐𝖺𝗌 𝗇𝗈𝗍 𝖻𝖾𝖾𝗇 𝖺𝗉𝗉𝗋𝗈𝗏𝖾 𝖻𝗒 𝗍𝗁𝖾 𝗧𝗢𝗝𝗜 𝖻𝗈𝗍 𝖺𝖽𝗆𝗂𝗇𝗌 𝖺𝗇𝖽 𝗈𝗐𝗇𝖾𝗋𝗌 𝖻𝖾𝖿𝗈𝗋𝖾! 𝖴𝗌𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝖿𝗈𝗋 𝖺𝗉𝗉𝗋𝗈𝗏𝖺𝗅.", threadID, messageID);
	 api.sendMessage(`ℹ️ | 𝖳𝗁𝗂𝗌 𝖡𝗈𝗑 ${idBox} 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗋𝖾𝗆𝗈𝗏𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖳𝖮𝖩𝖨 𝖻𝗈𝗍 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗅𝗂𝗌𝗍, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗍𝗈 𝗋𝖾 𝖺𝗉𝗉𝗋𝗈𝗏𝖾 𝖺𝗀𝖺𝗂𝗇 `, threadID, () => {
		 if (!pending.includes(idBox)) pending.push(idBox);
		 data.splice(data.indexOf(idBox), 1);
		 fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
		 fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
	 }, messageID)
 }
 else if (args[0] == "pending") {
	 msg = "𝗟𝗜𝗦𝗧 𝗢𝗙 𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗕𝗢𝗫\n━━━━━━━━━━━━━━━━━━\n";
	 let count = 0;
	 for (e of pending) {
		 let name = (await api.getThreadInfo(e)).name || "Group Chat";
		 msg += `\n${count += 1}. ${name}\nID: ${e}`;
	 }
	 api.sendMessage(msg, threadID, messageID);
 }
 else if (isNaN(parseInt(idBox))) api.sendMessage("𝖳𝗁𝖾 𝖨𝖣 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽", threadID, messageID);
 else if (data.includes(idBox)) api.sendMessage(`𝖳𝗁𝗂𝗌 𝖳𝗁𝗋𝖾𝖺𝖽 𝖡𝗈𝗑 𝖨𝖣 ${idBox} 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖺𝗉𝗉𝗋𝗈𝗏𝖾 𝖻𝗒 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇 𝖺𝗇𝖽 𝗈𝗐𝗇𝖾𝗋 𝗂𝗇 𝖺𝖽𝗏𝖺𝗇𝖼𝖾! `, threadID, messageID);
 else api.sendMessage("✅ | 𝖳𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝗐𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝗉𝗉𝗋𝗈𝗏𝖾 𝖻𝗒 𝗍𝗁𝖾𝖾 𝗈𝗐𝗇𝖾𝗋 𝖺𝗇𝖽 𝖺𝖽𝗆𝗂𝗇 𝖻𝗈𝗍.\n\n𝖸𝗈𝗎 𝗆𝖺𝗒 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗇𝖺𝗆𝖾𝖽 𝗅𝗂𝗌𝗍 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌.", idBox, (error, info) => {
	 if (error) return api.sendMessage("🔴 | 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽, 𝖬𝖺𝗄𝖾 𝗌𝗎𝗋𝖾 𝗍𝗁𝖺𝗍 𝗍𝗁𝖾 𝖨𝖣 𝗒𝗈𝗎 𝖾𝗇𝗍𝖾𝗋 𝗂𝗌 𝗏𝖺𝗅𝗂𝖽 𝖺𝗇𝖽 𝗍𝗁𝖾 𝖻𝗈𝗍 𝗂𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖻𝗈𝗑! ", threadID, messageID);
	 else {
		 data.push(idBox);
		 pending.splice(pending.indexOf(idBox), 1);
		 fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
		 fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));
		 api.sendMessage(`✅ | 𝖳𝗁𝗂𝗌 𝖻𝗈𝗑 | 𝗍𝗁𝗋𝖾𝖺𝖽 𝗐𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖼𝖼𝖾𝗉𝗍𝖾𝖽 𝖻𝗒 𝗍𝗁𝖾 𝗈𝗐𝗇𝖾𝗋 𝖺𝗇𝖽 𝗍𝗁𝖾 𝖺𝖽𝗆𝗂𝗇𝗌:\n\n𝗧𝗛𝗥𝗘𝗔𝗗 𝗜𝗗: ${idBox}\n\n𝖧𝖺𝗏𝖾 𝖿𝗎𝗇 𝖺𝗇𝖽 𝖾𝗇𝗃𝗈𝗒 𝗎𝗌𝗂𝗇𝗀 𝗧𝗢𝗝𝗜 𝖻𝗈𝗍, 𝖣𝗈𝗇𝗍 𝗌𝗉𝖺𝗆 𝗍𝗁𝖾 𝖻𝗈𝗍`, threadID, messageID);
	 }
 });
				}
