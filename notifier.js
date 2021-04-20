const { contextBridge, ipcRenderer } = require("electron");
const nodeNotifier = require("node-notifier");
const path = require("path");

contextBridge.exposeInMainWorld(
    "notifier", {
        notice: (msg) => {
            ipcRenderer.send("showWindow");

            nodeNotifier.notify({
                title: "Alarm Clock",
                message: msg,
                icon: path.join(__dirname, "clock.png"),
                sound: true,
            })
        }
    }
)