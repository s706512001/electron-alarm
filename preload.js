// All of the Node.js APIs are available in the preload process.

const { ipcRenderer, contextBridge } = require("electron");
require("./moment.js");
require("./notifier.js");

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ["chrome", "node", "electron"]) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, ...args) => {
            let validChannels = ["toMain", "toMoment-fulltime"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "fromMoment-fulltime"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => {
                    func(args);
                });
            }
        }
    }
);
