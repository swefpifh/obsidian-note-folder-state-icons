# Note & Folder State Icons *for Obsidian*

**Note & Folder State Icons** is an open-source plugin for Obsidian that lets you assign a **visual state** to notes/folders using **icons displayed directly in the File Explorer**.

The purpose of this plugin is to provide **clear, immediate visual feedback** about the role, category, or status of a note and folder — without modifying the note content itself.

---

## ✨ Features

- Assign an **icon-based state** to any note or folder title
- Icons are displayed **only in the File Explorer**
- No tags, no frontmatter, no text injection inside notes
- States are **persistent** across Obsidian restarts
- Works efficiently with large vaults
- Lightweight and unobtrusive
- Fully desktop-focused UI behavior

---

## 🧠 How It Works

1. Right-click a note or a folder in the File Explorer
2. In the **State** menu, select a icon from the list
4. The selected icon appears **next to the note/folder title**

To remove a state, choose **None**.

All states are stored internally and restored automatically when Obsidian is restarted.

![](preview.png)

---

## 🗂 Available States (default)

States are currently defined directly in the plugin code.  
Each state includes:
- an icon
- a label
- a color (currently uniform)

Examples of available states include:

### Validation & Status
- ✔ Validated  
- ❌ Refused  
- ⚠️ Warning  
- 🚧 In Progress  
- 👁 Review  
- 🚩 Red Flag  

### Books & Documents
- 📚 Piles of books  
- 📔 Notebook  
- 📕 Red Book  
- 📙 Orange Book  
- 📗 Green Book  
- 📘 Blue Book  

### Visual Markers
- 🟥 Red Square  
- 🟧 Orange Square  
- 🟨 Yellow Square  
- 🟩 Green Square  
- 🟦 Blue Square  
- 🟪 Purple Square  
- ⬛ Black Square  

### Species
- 🙍 Human
- 🧝 Elf
- 🧞 Djinn
- 🧛 Vampire
- 🧚 Fairy
- 🧙 Magician
- 🧟️ Zombie

### Miscellaneous
- ❄️ Frozen  
- 🔥 Hot  
- 💥 Explode  
- ❤️ Love
- 🔰 Arrow
- 🎖️ Medal
- 💡 Light
- ⚔️ 2 Swords
- 🌐 Globe  
- 🔅 Sun  
- ⭐ Star  

The list can be freely modified or extended by editing the plugin source.

---

## 🌍 Language

- 🇬🇧 English
- 🇫🇷 Français

---

## 🖥 Compatibility

| Platform | Supported |
|--------|-----------|
| Windows | ✅ |
| macOS | ✅ |
| Linux | ✅ |
| Android | ❌ |
| iOS | ❌ |

This plugin is **desktop-only**.

### Why desktop-only?
It relies on the desktop File Explorer UI and context menu system, which are not available on Obsidian Mobile.

---

## 🔒 Data & Privacy

- No network access
- No telemetry
- No external services
- All data is stored locally in Obsidian’s plugin data store

---

## 📦 Installation

### Manual Installation

1. Download or clone this repository
2. Copy the folder into: `<YourVault>/.obsidian/plugins/obsidian-note-state-icons`
3. Restart Obsidian
4. Enable **Note & Folder State Icons** in `Settings → Community plugins`

---

## 🛠 Development

- Written in JavaScript
- Uses Obsidian’s official Plugin API
- Injects icons into the File Explorer DOM
- Designed to be simple, readable, and easily customizable

---

## 📜 License

This project is released under the **MIT License**.

You are free to use, modify, redistribute, or integrate it into other projects.

---

## 🤝 Contributing

Contributions, forks, and improvements are welcome.

This project is intentionally permissive and open.

---

## ✍️ Author

Initial implementation generated with the assistance of AI and refined manually. Maintained by **swefpifh**.  

---

## 🛠 Updates

### v0.1.5 | *2026/01/12*
> - Plugin renamed
> - [QOL] Fixed state icons refresh on plugin enable/disable

### v0.1.4 | *2026/01/02*
> - State icons can added to folder too
> - New states icons added (*Human*)
> - [QOL] Species and Misc icons added in submenu named "Misc"

### v0.1.3 | *2026/01/01*
> - New states icons added (*Elf, djinn, Vampire, Magician, Zombie, Arrow, Medal, 2 Swords*)

### v0.1.2 | *2025/12/30*
> - Separators added to separate states icons

### v0.1.1 | *2025/12/30*
> - French and English supported

### v0.1.0 | *2025/12/29*
> - State system for note title
