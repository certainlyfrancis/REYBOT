module.exports.config = {
  name: "restart",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝙼𝙰𝚁𝙹𝙷𝚄𝙽 𝙱𝙰𝚈𝙻𝙾𝙽",
  description: "𝗥𝗲𝘀𝘁𝗮𝗿𝘁 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝗉𝖺𝗋𝗍 𝗈𝖿 𝖺 𝗌𝗒𝗌𝗍𝖾𝗆 𝗈𝖿 𝖳 𝖮 𝖩 𝖨 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖬𝖺𝗋𝗃𝗁𝗎𝗇 𝖡𝖺𝗒𝗅𝗈𝗇 𝗍𝗈 𝗉𝗋𝖾𝗏𝖾𝗇𝗍 𝖳𝖮𝖩𝖨 𝗈𝗇 𝗁𝖺𝗏𝗂𝗇𝗀 𝖺 𝖾𝗋𝗋𝗈𝗋𝗌.",
  usePrefix: false,
  commandCategory: "𝗦𝗬𝗦𝗧𝗘𝗠",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;

  const threadList = await api.getThreadList(25, null, ["INBOX"]);
  let sentCount = 0;

  async function sendMessage(thread) {
    try {
      await api.sendMessage(`🦊 | 𝗧𝗢𝗝𝗜𝗕𝗢𝗧 𝗦𝗬𝗦𝗧𝗘𝗠\n━━━━━━━━━━━━━━━━\n𝗧𝗢𝗝𝗜 𝗕𝗢𝗧 𝗐𝗂𝗅𝗅 𝗌𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝗍𝗈 𝗋𝖾𝗌𝗍𝖺𝗋𝗍 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆, 𝗍𝗁𝗂𝗌 𝗆𝖺𝗒 𝗍𝖺𝗄𝖾 𝖺 𝖿𝖾𝗐 𝗆𝗂𝗇𝗎𝗍𝖾𝗌 𝗈𝗋 𝖺 𝖿𝖾𝗐 𝗁𝗈𝗎𝗋𝗌 𝗍𝗈 𝗀𝗈 𝖻𝖺𝖼𝗄 𝗈𝗇𝗅𝗂𝗇𝖾, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝗉𝖺𝗍𝗂𝖾𝗇𝗍𝗅𝗒.\n━━━━━━━━━━━━━━━━\nℹ️ | 𝖥𝗈𝗋 𝖾𝖽𝗎𝖼𝖺𝗍𝗂𝗈𝗇𝖺𝗅 𝗉𝗎𝗋𝗉𝗈𝗌𝖾𝗌 𝗈𝗇𝗅𝗒, 𝖭𝗈𝗍 𝗋𝖾𝗅𝖺𝗍𝖾𝖽 𝗍𝗈 𝗌𝖾𝗑𝗎𝖺𝗅 𝖺𝖼𝗍𝗂𝗏𝗂𝖾𝗌. `, thread.threadID);
      sentCount++;
    } catch (error) {
      console.error(`Error sending message to thread ${thread.threadID}: ${error}`);
    }
  }

  for (const thread of threadList) {
    const threadInfo = await api.getThreadInfo(thread.threadID);
    if (threadInfo.isGroup) {
      await sendMessage(thread);
    }
  }

  process.exit(1);
};
