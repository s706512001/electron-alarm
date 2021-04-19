const { contextBridge } = require("electron");
// const { ipcMain, BrowserWindow } = require("electron");
const moment = require("moment");

// 這個作法是在 preload.js 裡面 require 這個檔案
contextBridge.exposeInMainWorld(
    "moment", {
        fullTime: () => {
            return moment().format();
        },
        time: (fullTimeStr) => {
            return fullTimeStr ? moment(fullTimeStr).format("HH:mm:ss") : moment().format("HH:mm:ss");
        },
        add: (second) => {
            return moment().add(second, "second").format("HH:mm:ss");
        },
    }
);

// 這個作法是在 main.js 裡面 require 這個檔案
// ipcMain.on("toMoment-fulltime", (event, ...args) => {
//     BrowserWindow.getFocusedWindow().webContents.send("fromMoment-fulltime", moment().format());
// });
