/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const DEFAULT_SETTINGS = {
    regex: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i,
    lineRegex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig,
    linkRegex: /^\[([^\[\]]*)\]\((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\)$/i,
    linkLineRegex: /\[([^\[\]]*)\]\((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\)/ig,
    imageRegex: /\.(gif|jpe?g|tiff?|png|webp|bmp|tga|psd|ai)/i
};

class EditorExtensions {
    static getSelectedText(editor) {
        if (!editor.somethingSelected()) {
            let wordBoundaries = this.getWordBoundaries(editor);
            editor.setSelection(wordBoundaries.start, wordBoundaries.end);
        }
        return editor.getSelection();
    }
    static cursorWithinBoundaries(cursor, match) {
        let startIndex = match.index;
        let endIndex = match.index + match[0].length;
        return startIndex <= cursor.ch && cursor.ch <= endIndex;
    }
    static getWordBoundaries(editor) {
        let cursor = editor.getCursor();
        // If its a normal URL token this is not a markdown link
        // In this case we can simply overwrite the link boundaries as-is
        let lineText = editor.getLine(cursor.line);
        // First check if we're in a link
        let linksInLine = lineText.matchAll(DEFAULT_SETTINGS.linkLineRegex);
        for (let match of linksInLine) {
            if (this.cursorWithinBoundaries(cursor, match)) {
                return {
                    start: { line: cursor.line, ch: match.index },
                    end: { line: cursor.line, ch: match.index + match[0].length },
                };
            }
        }
        // If not, check if we're in just a standard ol' URL.
        let urlsInLine = lineText.matchAll(DEFAULT_SETTINGS.lineRegex);
        for (let match of urlsInLine) {
            if (this.cursorWithinBoundaries(cursor, match)) {
                return {
                    start: { line: cursor.line, ch: match.index },
                    end: { line: cursor.line, ch: match.index + match[0].length },
                };
            }
        }
        return {
            start: cursor,
            end: cursor,
        };
    }
    static getEditorPositionFromIndex(content, index) {
        let substr = content.substr(0, index);
        let l = 0;
        let offset = -1;
        let r = -1;
        for (; (r = substr.indexOf("\n", r + 1)) !== -1; l++, offset = r)
            ;
        offset += 1;
        let ch = content.substr(offset, index - offset).length;
        return { line: l, ch: ch };
    }
}

class CheckIf {
    static isMarkdownLinkAlready(editor) {
        let cursor = editor.getCursor();
        // Check if the characters before the url are ]( to indicate a markdown link
        var titleEnd = editor.getRange({ ch: cursor.ch - 2, line: cursor.line }, { ch: cursor.ch, line: cursor.line });
        return titleEnd == "](";
    }
    static isAfterQuote(editor) {
        let cursor = editor.getCursor();
        // Check if the characters before the url are " or ' to indicate we want the url directly
        // This is common in elements like <a href="linkhere"></a>
        var beforeChar = editor.getRange({ ch: cursor.ch - 1, line: cursor.line }, { ch: cursor.ch, line: cursor.line });
        return beforeChar == "\"" || beforeChar == "'";
    }
    static isUrl(text) {
        let urlRegex = new RegExp(DEFAULT_SETTINGS.regex);
        return urlRegex.test(text);
    }
    static isImage(text) {
        let imageRegex = new RegExp(DEFAULT_SETTINGS.imageRegex);
        return imageRegex.test(text);
    }
    static isLinkedUrl(text) {
        let urlRegex = new RegExp(DEFAULT_SETTINGS.linkRegex);
        return urlRegex.test(text);
    }
}

const electronPkg = require("electron");
function getPageTitle(url) {
    // If we're on Desktop use the Electron scraper
    if (electronPkg != null) {
        const { remote, ipcRenderer } = electronPkg;
        const { BrowserWindow, ipcMain } = remote;
        return new Promise((resolve) => {
            try {
                const window = new BrowserWindow({
                    width: 1000,
                    height: 600,
                    webPreferences: {
                        webSecurity: false,
                        nodeIntegration: true,
                        images: false,
                    },
                    show: false,
                });
                // After page finishes loading send the title via a pageloaded event
                window.webContents.on("did-finish-load", () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        ipcRenderer.send('pageloaded', window.webContents.getTitle());
                    }
                    catch (ex) {
                        resolve("Title Unknown");
                    }
                }));
                window.loadURL(url);
                // Clean up the title and remove the BrowserWindow
                ipcMain.on("pageloaded", (_event, title) => {
                    window.destroy();
                    if (title != null && title != '') {
                        resolve(title);
                    }
                    else {
                        resolve("Title Unknown");
                    }
                });
            }
            catch (ex) {
                resolve("Site Unreachable");
            }
        });
        // Otherwise if we're on mobile use a CORS proxy
    }
    else {
        return new Promise((resolve) => {
            // console.log(`Fetching ${text} for title`);
            //Because of CORS you can't fetch the site directly
            var corsed = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            fetch(corsed)
                .then((response) => {
                return response.text();
            })
                .then((html) => {
                const doc = new DOMParser().parseFromString(html, "text/html");
                const title = doc.querySelectorAll("title")[0];
                if (title == null || title.innerText.length == 0) {
                    // If site is javascript based and has a no-title attribute when unloaded, use it.
                    var noTitle = title.getAttr("no-title");
                    if (noTitle != null)
                        return noTitle;
                    // Otherwise if the site has no title/requires javascript simply return Title Unknown
                    return resolve("Title Unknown");
                }
                return resolve(title.innerText);
            })
                .catch((error) => {
                console.error(error);
                return resolve("Site Unreachable");
            });
        });
    }
}

class AutoLinkTitle extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("loading obsidian-auto-link-title");
            yield this.loadSettings();
            // Listen to paste event
            this.pasteFunction = this.pasteUrlWithTitle.bind(this);
            this.app.workspace.containerEl.addEventListener("paste", this.pasteFunction, true);
            this.addCommand({
                id: "enhance-url-with-title",
                name: "Enhance existing URL with link and title",
                callback: () => this.addTitleToLink(),
                hotkeys: [
                    {
                        modifiers: ["Mod", "Shift"],
                        key: "e",
                    },
                ],
            });
        });
    }
    addTitleToLink() {
        // Only attempt fetch if online
        if (!navigator.onLine)
            return;
        let editor = this.getEditor();
        if (editor == null)
            return;
        let selectedText = (EditorExtensions.getSelectedText(editor) || "").trim();
        // If the cursor is on a raw html link, convert to a markdown link and fetch title
        if (CheckIf.isUrl(selectedText)) {
            this.convertUrlToTitledLink(editor, selectedText);
        }
        // If the cursor is on the URL part of a markdown link, fetch title and replace existing link title
        else if (CheckIf.isLinkedUrl(selectedText)) {
            var link = this.getUrlFromLink(selectedText);
            this.convertUrlToTitledLink(editor, link);
        }
    }
    pasteUrlWithTitle(clipboard) {
        // Only attempt fetch if online
        if (!navigator.onLine)
            return;
        let editor = this.getEditor();
        let clipboardText = clipboard.clipboardData.getData("text/plain");
        if (clipboardText == null || clipboardText == "")
            return;
        // If its not a URL, we return false to allow the default paste handler to take care of it.
        // Similarly, image urls don't have a meaningful <title> attribute so downloading it
        // to fetch the title is a waste of bandwidth.
        if (!CheckIf.isUrl(clipboardText) || CheckIf.isImage(clipboardText)) {
            return;
        }
        // We've decided to handle the paste, stop propagation to the default handler.
        clipboard.stopPropagation();
        clipboard.preventDefault();
        // If it looks like we're pasting the url into a markdown link already, don't fetch title
        // as the user has already probably put a meaningful title, also it would lead to the title
        // being inside the link.
        if (CheckIf.isMarkdownLinkAlready(editor) || CheckIf.isAfterQuote(editor)) {
            editor.replaceSelection(clipboardText);
            return;
        }
        // At this point we're just pasting a link in a normal fashion, fetch its title.
        this.convertUrlToTitledLink(editor, clipboardText);
        return;
    }
    convertUrlToTitledLink(editor, text) {
        // Generate a unique id for find/replace operations for the title.
        let pasteId = `Fetching Title#${this.createBlockHash()}`;
        // Instantly paste so you don't wonder if paste is broken
        editor.replaceSelection(`[${pasteId}](${text})`);
        // Fetch title from site, replace Fetching Title with actual title
        this.fetchUrlTitle(text).then((title) => {
            let text = editor.getValue();
            let start = text.indexOf(pasteId);
            let end = start + pasteId.length;
            let startPos = EditorExtensions.getEditorPositionFromIndex(text, start);
            let endPos = EditorExtensions.getEditorPositionFromIndex(text, end);
            editor.replaceRange(title, startPos, endPos);
        });
    }
    fetchUrlTitle(text) {
        return getPageTitle(text).then(title => {
            if (title == null || title == "") {
                return "Title Unknown";
            }
            return title.trim();
        }).catch((error) => {
            // console.error(error)
            return "Site Unreachable";
        });
    }
    getEditor() {
        let activeLeaf = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (activeLeaf == null)
            return;
        return activeLeaf.editor;
    }
    getUrlFromLink(text) {
        let urlRegex = new RegExp(DEFAULT_SETTINGS.linkRegex);
        return urlRegex.exec(text)[2];
    }
    // Custom hashid by @shabegom
    createBlockHash() {
        let result = "";
        var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    onunload() {
        console.log("unloading obsidian-auto-link-title");
        this.app.workspace.containerEl.removeEventListener("paste", this.pasteFunction, true);
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}

module.exports = AutoLinkTitle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNldHRpbmdzLnRzIiwiZWRpdG9yLWVuaGFuY2VtZW50cy50cyIsImNoZWNraWYudHMiLCJzY3JhcGVyLnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiUGx1Z2luIiwiTWFya2Rvd25WaWV3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVB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
