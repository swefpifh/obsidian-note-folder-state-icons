const { Plugin } = require("obsidian");

module.exports = class SwefNoteStateIconsPlugin extends Plugin {

  async onload() {
    console.log("SWEF NOTE STATE ICONS LOADED");

    this.states = {
      "validated":   	{ icon: "✔", color: "#000000", label: "Validated" },
      "refused":   		{ icon: "❌", color: "#000000", label: "Refused" },
	  "warning":      	{ icon: "⚠️", color: "#000000", label: "Warning" },
	  
	  "bookpiles":   	{ icon: "📚", color: "#000000", label: "Piles of books" },
      "notebook":   	{ icon: "📔", color: "#000000", label: "NoteBook" },
      "bookred":   		{ icon: "📕", color: "#000000", label: "Red Book" },
      "bookorange":   	{ icon: "📙", color: "#000000", label: "Orange Book" },
      "bookgreen":   	{ icon: "📗", color: "#000000", label: "Green Book" },
      "bookblue":   	{ icon: "📘", color: "#000000", label: "Blue Book" },
	  
      "squarered":   	{ icon: "🟥", color: "#000000", label: "Red Square" },
      "squareorange":   { icon: "🟧", color: "#000000", label: "Orange Square" },
      "squareyellow":   { icon: "🟨", color: "#000000", label: "Yellow Square" },
      "squaregreen":   	{ icon: "🟩", color: "#000000", label: "Green Square" },
      "squareblue":   	{ icon: "🟦", color: "#000000", label: "Blue Square" },
      "squarepurple":   { icon: "🟪", color: "#000000", label: "Purple Square" },
      "squareblack":   	{ icon: "⬛", color: "#000000", label: "Black Square" },
	  
	  "in-progress": 	{ icon: "🚧", color: "#000000", label: "In Progress" },
      "review":      	{ icon: "👁", color: "#000000", label: "Review" },
      "redflag":      	{ icon: "🚩", color: "#000000", label: "Red Flag" },
      
      "frozen":      	{ icon: "❄️", color: "#000000", label: "Frozen" },
      "hot":      		{ icon: "🔥", color: "#000000", label: "Hot" },
      "explode":      	{ icon: "💥", color: "#000000", label: "Explode" },
      "love":			{ icon: "❤️", color: "#000000", label: "Love" },
      "light":			{ icon: "💡", color: "#000000", label: "Light" },
      "globe":			{ icon: "🌐", color: "#000000", label: "Globe" },
      "sun":			{ icon: "🔅", color: "#000000", label: "Sun" },
      "star":			{ icon: "⭐", color: "#000000", label: "Star" }
    };

    this.stateMap = (await this.loadData()) || {};

    // Menu clic droit
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!file || file.extension !== "md") return;

        menu.addItem(item => {
          item.setTitle("State").setIcon("tag").setSubmenu();
        });

        const stateMenu = menu.items[menu.items.length - 1].submenu;

        // AUCUN
        stateMenu.addItem(sub => {
          sub
            .setTitle("None") // Aucun
            .setIcon("x")
            .onClick(async () => {
              if (this.stateMap[file.path]) {
                delete this.stateMap[file.path];
                await this.saveData(this.stateMap);
              }
              this.refreshFileExplorer();
            });
        });

        stateMenu.addSeparator?.();

        // États avec icône visible dans le menu
        Object.values(this.states).forEach(state => {
          stateMenu.addItem(sub => {
            sub
              .setTitle(`${state.icon} ${state.label}`)
              .onClick(async () => {
                this.stateMap[file.path] = Object.keys(this.states)
                  .find(k => this.states[k] === state);
                await this.saveData(this.stateMap);
                this.refreshFileExplorer();
              });
          });
        });
      })
    );

    // Rafraîchissements fiables
    this.registerEvent(
      this.app.workspace.on("layout-ready", () => this.refreshFileExplorer())
    );

    this.registerEvent(
      this.app.vault.on("rename", async (file, oldPath) => {
        if (this.stateMap[oldPath]) {
          this.stateMap[file.path] = this.stateMap[oldPath];
          delete this.stateMap[oldPath];
          await this.saveData(this.stateMap);
        }
        this.refreshFileExplorer();
      })
    );

    this.registerEvent(
      this.app.vault.on("delete", async (file) => {
        if (this.stateMap[file.path]) {
          delete this.stateMap[file.path];
          await this.saveData(this.stateMap);
        }
        this.refreshFileExplorer();
      })
    );

    setTimeout(() => this.refreshFileExplorer(), 1000);
  }

  refreshFileExplorer() {
    const leaves = this.app.workspace.getLeavesOfType("file-explorer");

    leaves.forEach(leaf => {
      const view = leaf.view;
      if (!view?.fileItems) return;

      Object.values(view.fileItems).forEach(item => {
        const file = item.file;
        if (!file || file.extension !== "md") return;

        const stateId = this.stateMap[file.path];
        const state = this.states[stateId];

        const el = item.el;
        if (!el) return;

        const title = el.querySelector(".tree-item-inner");
        if (!title) return;

        const old = title.querySelector(".swef-state-icon");
        if (old) old.remove();

        if (!state) return;

        const icon = document.createElement("span");
        icon.className = "swef-state-icon";
        icon.textContent = state.icon;
        icon.style.color = state.color;
        icon.style.marginRight = "6px";
        icon.style.fontWeight = "bold";

        title.prepend(icon);
      });
    });
  }

  onunload() {
    console.log("SWEF NOTE STATE ICONS UNLOADED");
  }
};
