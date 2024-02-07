const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'ai',
  version: '1.1.0',
  hasPermssion: 0,
  credits: 'Yan Maglinte',
  description: '𝗔𝗜 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖸𝖺𝗇 𝖬𝖺𝗀𝗅𝗂𝗇𝗍𝖾 𝗂𝗌 𝗎𝗌𝖾 𝗍𝗈 𝗁𝖾𝗅𝗉𝗂𝗇𝗀 𝗒𝗈𝗎 𝗂𝗇 𝗒𝗈𝗎𝗋 𝖺𝗌𝗌𝗂𝗀𝗇𝗆𝖾𝗇𝗍𝗌',
  usePrefix: false,
  commandCategory: '𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡𝗔𝗟',
  usages: 'Ai [prompt]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(' ');

  try {
    // Available Models: "v3", "v3-32k", "turbo", "turbo-16k", "gemini"
    if (!prompt) {
      api.sendMessage('ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾!', event.threadID, event.messageID);
      api.setMessageReaction('ℹ️', event.messageID, () => {}, true);
    } else {
      api.setMessageReaction('⏱️', event.messageID, () => {}, true);
      api.sendMessage("🔎 | 𝗔𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍..", event.threadID, event.messageID, () => {}, true);
      const response = await herc.question({ model: 'v3-32k', content: prompt });
      api.sendMessage(response.reply, event.threadID, event.messageID);
      api.setMessageReaction('✅', event.messageID, () => {}, true);
    }
  } catch (error) {
    api.sendMessage('🔴 | 𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋\n\n ' + error, event.threadID, event.messageID);
    api.setMessageReaction('🔴', event.messageID, () => {}, true);
  }
};
