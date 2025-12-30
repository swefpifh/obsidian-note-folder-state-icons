const { Plugin } = require("obsidian");

module.exports = class SwefNoteStateIconsPlugin extends Plugin {

  async onload() {
    console.log("SWEF NOTE STATE ICONS LOADED");

    // ===== I18N =====
    await this.loadI18n();

    this.states = {
      "validated":    { icon: "✔", color: "#000000", labelKey: "state.validated" },
      "refused":      { icon: "❌", color: "#000000", labelKey: "state.refused" },
      "warning":      { icon: "⚠️", color: "#000000", labelKey: "state.warning" },

      "bookpiles":    { icon: "📚", color: "#000000", labelKey: "state.bookpiles" },
      "notebook":     { icon: "📔", color: "#000000", labelKey: "state.notebook" },
      "bookred":      { icon: "📕", color: "#000000", labelKey: "state.bookred" },
      "bookorange":   { icon: "📙", color: "#000000", labelKey: "state.bookorange" },
      "bookgreen":    { icon: "📗", color: "#000000", labelKey: "state.bookgreen" },
      "bookblue":     { icon: "📘", color: "#000000", labelKey: "state.bookblue" },

      "squarered":    { icon: "🟥", color: "#000000", labelKey: "state.squarered" },
      "squareorange": { icon: "🟧", color: "#000000", labelKey: "state.squareorange" },
      "squareyellow": { icon: "🟨", color: "#000000", labelKey: "state.squareyellow" },
      "squaregreen":  { icon: "🟩", color: "#000000", labelKey: "state.squaregreen" },
      "squareblue":   { icon: "🟦", color: "#000000", labelKey: "state.squareblue" },
      "squarepurple": { icon: "🟪", color: "#000000", labelKey: "state.squarepurple" },
      "squareblack":  { icon: "⬛", color: "#000000", labelKey: "state.squareblack" },

      "in-progress":  { icon: "🚧", color: "#000000", labelKey: "state.inprogress" },
      "review":       { icon: "👁", color: "#000000", labelKey: "state.review" },
      "redflag":      { icon: "🚩", color: "#000000", labelKey: "state.redflag" },

      "frozen":       { icon: "❄️", color: "#000000", labelKey: "state.frozen" },
      "hot":          { icon: "🔥", color: "#000000", labelKey: "state.hot" },
      "explode":      { icon: "💥", color: "#000000", labelKey: "state.explode" },
      "love":         { icon: "❤️", color: "#000000", labelKey: "state.love" },
      "light":        { icon: "💡", color: "#000000", labelKey: "state.light" },
      "globe":        { icon: "🌐", color: "#000000", labelKey: "state.globe" },
      "sun":          { icon: "🔅", color: "#000000", labelKey: "state.sun" },
      "star":         { icon: "⭐", color: "#000000", labelKey: "state.star" }
    };

    this.stateMap = (await this.loadData()) || {};

    // ===== Menu clic droit =====
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!file || file.extension !== "md") return;

        menu.addItem(item => {
          item.setTitle(this.t("menu.state")).setIcon("tag").setSubmenu();
        });

        const stateMenu = menu.items[menu.items.length - 1].submenu;

        // NONE / AUCUN
        stateMenu.addItem(sub => {
          sub
            .setTitle(this.t("menu.none"))
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

        Object.entries(this.states).forEach(([stateId, state]) => {
          stateMenu.addItem(sub => {
            sub
              .setTitle(`${state.icon} ${this.t(state.labelKey)}`)
              .onClick(async () => {
                this.stateMap[file.path] = stateId;
                await this.saveData(this.stateMap);
                this.refreshFileExplorer();
              });
          });
        });
      })
    );

    // ===== Rafraîchissements =====
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

  // ===== I18N =====
  async loadI18n() {
    const lang = document.documentElement.lang?.startsWith("fr") ? "fr" : "en";
    const path = `${this.manifest.dir}/i18n/${lang}.json`;

    try {
      const res = await fetch(this.app.vault.adapter.getResourcePath(path));
      this.i18n = await res.json();
    } catch {
      const fallback = `${this.manifest.dir}/i18n/en.json`;
      const res = await fetch(this.app.vault.adapter.getResourcePath(fallback));
      this.i18n = await res.json();
    }
  }

  t(key) {
    return this.i18n?.[key] ?? key;
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
