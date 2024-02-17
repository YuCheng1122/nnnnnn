const { app, BrowserWindow, dialog } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("close", (e) => {
    e.preventDefault();
    dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "Cannot Close",
      message: "Just kidding, you cannot close this window!",
      buttons: ["OK"],
    });
  });
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

app.on("before-quit", function () {
  app.isQuitting = true;
});

app.on("window-all-closed", (event) => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
