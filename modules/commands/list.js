const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "list",
  version: "1.0.2", 
  hasPermission: 0,
  credits: "blue//modified by Jonell Magallanes",
  description: "Beginner's Guide",
  usePrefix: "false",
  prefix: false,
  commandCategory: "𝗦𝗬𝗦𝗧𝗘𝗠",
  usages: "[Name module]",
  cooldowns: 1,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 20
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  if (!command) {
    const commandList = Array.from(commands.values());
    const categories = new Set(commandList.map((cmd) => cmd.config.commandCategory.toLowerCase()));
    const categoryCount = categories.size;

    const categoryNames = Array.from(categories);
    const itemsPerPage = 1;
    const totalPages = Math.ceil(categoryNames.length / itemsPerPage);

    let currentPage = 1;
    if (args[0]) {
      const parsedPage = parseInt(args[0]);
      if (
        !isNaN(parsedPage) &&
        parsedPage >= 2 &&
        parsedPage <= totalPages
      ) {
        currentPage = parsedPage;
      } else {
        return api.sendMessage(
          `Oops! You went too far! Please choose a page between 1 and ${totalPages}◗`,
          threadID,
          messageID
        );
      }
    }
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleCategories = categoryNames.slice(startIdx, endIdx);

    let msg = `❖= 𝗕𝗢𝗧 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 =❖\n❖━━━━━━━━━━━━━━━━❖\n╭┈ ❒ 𝗡𝗔𝗠𝗘: 𝖳 𝖮 𝖩 𝖨 𖤍\n╰┈➤ 𝖠𝖨 𝖬𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝖢𝗁𝖺𝗍𝖻𝗈𝗍\n❖━━━━━━━━━━━━━━━━❖\n\n`;
    for (let i = 0; i < visibleCategories.length; i++) {
      const category = visibleCategories[i];
      const categoryCommands = commandList.filter(
        (cmd) =>
          cmd.config.commandCategory.toLowerCase() === category
      );
      msg += `━━━━━━━━━━━━━━━━━━\n╭┈ ❒『 ${i + 1} 』• ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      for (const cmd of categoryCommands) {
        msg += `╰┈➤ 𝗡𝗔𝗠𝗘 : ${cmd.config.name || "No name command available"}\n`;
        msg += `╰┈➤ 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡 : ${cmd.config.description || "No description available"}\n`;
        msg += `╰┈➤ 𝗪𝗔𝗜𝗧𝗜𝗡𝗚 𝗧𝗜𝗠𝗘: ${cmd.config.cooldowns || 0} seconds(s)\n`;
        msg += `╰┈➤ 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${cmd.config.commandCategory}\n`;
        msg += `╰┈➤ 𝗨𝗦𝗔𝗚𝗘: ${prefix}${cmd.config.name} ${cmd.config.usages || ""}\n`;
        msg += `━━━━━━━━━━━━━━━━━━\n`;
      }
    }

    msg += `❖━━━━━━━━━━━━━━━━❖\n╭┈ ❒ 𝖯𝖺𝗀𝖾 ${currentPage} 𝗈𝖿 ${totalPages}\n`;
    msg += `╰┈➤ 𝖸𝗈𝗎 𝗆𝖺𝗒 𝗍𝗒𝗉𝖾 𝗁𝖾𝗅𝗉 [ 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗇𝖺𝗆𝖾 ] 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝗎𝗌𝖺𝗀𝖾 𝗈𝖿 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽\n`;
    msg += `╰┈➤ 𝖳𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 ${commands.size} 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗈𝗇 𝗧𝗢𝗝𝗜𝗕𝗢𝗧\n`;
    msg += `╰┈➤ 𝖴𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗅𝗂𝗌𝗍 [ 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿 𝗉𝖺𝗀𝖾𝗌 ] 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝗈𝗍𝗁𝖾𝗋 𝗉𝖺𝗀𝖾𝗌.\n❖━━━━━━━━━━━━━━━━❖\n     𝗧 𝗢 𝗝 𝗜 𖤍 ᥊  ${global.config.DESIGN.Admin}`;

    const sentMessage = await api.sendMessage(msg, threadID, messageID);

    if (autoUnsend) {
      setTimeout(async () => {
        await api.unsendMessage(sentMessage.messageID);
      }, delayUnsend * 1000);
    }
  } else {
    return api.sendMessage(
      getText(
        "moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${
          command.config.usages ? command.config.usages : ""
        }`,
        command.config.commandCategory,
        command.config.cooldowns,
        command.config.hasPermission === 0
          ? getText("user")
          : command.config.hasPermission === 1
          ? getText("adminGroup")
          : getText("adminBot"),
        command.config.credits
      ),
      threadID,
      messageID
    );
  }
};
