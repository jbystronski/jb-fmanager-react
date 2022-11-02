export const defaultLightTheme = {
  mode: "light",
  fontFamily: "inherit",
  palette: {
    input: {
      background: "#e5e5e5",
      border: "#e5e5e5",
    },

    overlay: "rgba(0,0,0,0.12)",
    surface1: "#ffffff",
    surface2: "#efefef",
    surface3: "#212327",
    surface4: "#ffffff",
    surface5: "#ffffff",
    surface6: "#ffffff",
    surface7: "#ffffff",

    divider: "#e0e0e0",

    font1: "#191d20",
    font2: "#788795",
    font3: "#d9d9d9",
    font4: "#ffffff",

    syntax1: "#ffc414", // folders on display
    syntax2: "#fff", // folders in navigation
    syntax3: "#ababab", // files on display
    syntax4: "#fff", // files in navigation
    syntaxFocus: "violet",

    primary: "#0080e5",

    secondary: "#ababab",
    highlight: "violet",

    shadow1: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", // main shadow
    shadow2: "-5px 4px 12px -10px rgba(0, 0, 0, 1)", // dock shadow
    shadow3:
      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px", // menu
    shadow4:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
};

export const defaultDarkTheme = {
  mode: "dark",
  fontFamily: "inherit",
  palette: {
    overlay: "rgba(255,255,255,0.5)",

    input: {
      background: "transparent",
      border: "#08acff",
    },

    surface1: "#101010", // main background
    surface2: "#6c6c6c", // file display
    surface3: "#030303", // navigation tree
    surface4: "#393939", // img wrapper
    surface5: "#393939", // row wrapper
    surface6: "#141414", // menu
    surface7: "#141414", // tooltip

    divider: "#3a3a3a",

    font1: "#fff", // main font

    font2: "#c4c4c4", // secondary font
    font3: "#fff", // navigation font
    font4: "#fff", // contrast font

    syntax1: "yellow", // folders on display
    syntax2: "yellow", // folders in navigation
    syntax3: "#fff", // files on display
    syntax4: "#fff", // files in navigation
    syntaxFocus: "#08acff",

    primary: "#08acff",

    secondary: "#c4c4c4",

    highlight: "rgba(255, 255, 255, 0.09)",

    shadow1: "0px 8px 13px -10px rgba(0, 0, 0, 0.25)", // main shadow
    shadow2: "-5px 4px 12px -10px rgba(0, 0, 0, 1)", // dock shadow
    shadow3:
      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px", // menu
    shadow4:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
};
