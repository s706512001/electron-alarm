const { contextBridge } = require("electron");
const nodeNotifier = require("node-notifier");
const path = require("path");

contextBridge.exposeInMainWorld(
    "notifier", {
        notice: (msg) => {
            nodeNotifier.notify({
                title: "Alarm Clock",
                message: msg,
                icon: path.join(__dirname, "clock.png"),
                sound: true,
            })
        }
    }
)