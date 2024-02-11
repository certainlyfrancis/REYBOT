let antiAddEnabled = true; // Flag to enable/disable anti-add feature
let approvedThreadID = "7200585553382526"; // Variable to store the approved thread ID

module.exports.config = {
   name: "antiadd",
   version: "1.0",
   credits: "francis",
   hasPermission: 0,
   description: "Enable or disable anti-add feature.",
   commandCategory: "system",
   usages: "[on/off]",
   usePrefix: false,
   cooldown: 0
};

module.exports.run = ({ api, args }) => {
    const [action] = args;

    if (action === "on") {
        antiAddEnabled = true;
        api.sendMessage("Anti-add feature enabled.");
    } else if (action === "off") {
        antiAddEnabled = false;
        api.sendMessage("Anti-add feature disabled.");
    } else {
        api.sendMessage("Invalid action. Please use 'on' or 'off' to enable or disable the anti-add feature.");
    }

    // Listen for group added events
    if (antiAddEnabled) {
        api.listenMqtt("ChatProxy", (event) => {
            if (event.type === "chatproxy:thread-create") {
                const threadID = event.payload.thread_id;
                if (threadID !== approvedThreadID) {
                    // If not approved, leave the group
                    api.sendMessage("I'm sorry, I cannot join other groups.");
                    api.leaveGroup(threadID);
                }
            }
        });
    }
};
