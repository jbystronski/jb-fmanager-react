export const mediaWidth = (operator, value) => {
  if (!["min", "max"].includes(operator)) throw new Error("invalid operand");

  return `(${operator}-width: ${value}px)`;
};

const baseLineHeight = 16;

export const mediaHeight = (operator, value) => {
  if (!["min", "max"].includes(operator)) throw new Error("invalid operand");

  return `(${operator}-height: ${value}px)`;
};

export const getGridSize = {
  xs: {
    name: "xs",
    tile: 7,

    font: 0.7,
  },

  s: {
    name: "s",
    tile: 9,

    font: 0.7,
  },

  m: {
    name: "m",
    tile: 12,

    font: 1,
  },

  l: {
    name: "l",
    tile: 14,

    font: 1.1,
  },

  // TODO : add other font sizes
  xl: {
    name: "xl",
    tile: 16,

    font: 1.1,
  },
  xxl: {
    name: "xxl",
    tile: 18,

    font: 1.2,
  },
  xxxl: {
    name: "xxxl",
    tile: 20,

    font: 1.2,
  },
};

export const getGridConfiguration = (displayWidth, size, count) => {
  let columns = Math.floor(displayWidth / size);
  let tileSize = displayWidth / columns;
  let rows = Math.ceil(count / columns);

  return [columns, rows, tileSize];
};

export const calculateDisplay = ({ width: windowX, height: windowY }) => {
  const baseHeight = Math.floor(0.015 * windowY);

  const base = baseHeight >= 16 ? 16 : Math.floor(0.017 * windowY);

  const heights = {
    xxs: windowY >= 0 && windowY <= 350,
    xs: windowY >= 351 && windowY <= 450,
    s: windowY >= 451 && windowY <= 788,
    md: windowY >= 789 && windowY <= 999,
    l: windowY >= 1000 && windowY <= 1200,
    xl: windowY >= 1201,
  };

  const md = windowX >= 768;
  const lg = windowX >= 999;
  const xl = windowX >= 1280;
  const xxl = windowX >= 1980;
  const xxxl = windowX >= 2400;
  const gap = 20;
  const cnt = {
    width: xxxl
      ? windowX * 0.5
      : xl
      ? windowX * 0.85
      : lg
      ? windowX - 40
      : windowX,
    height: xxxl ? windowY * 0.5 : xl ? windowY * 0.87 : windowY,
  };

  // const font = Math.floor(windowY * 0.015);

  const font = Math.floor((windowY * base) / 100);

  const controls = { width: xl ? 75 + 40 : lg ? 75 : 0, height: cnt.height };

  const nav = {
    width: xxxl ? cnt.width * 0.22 : lg ? cnt.width * 0.25 : 0,
    height: lg ? cnt.height : 0,
  };

  const bottom = {
    width: cnt.width - nav.width - controls.width,
    // height: xxxl ? 60 : cnt.height * 0.08,
    height: base * 5.5,
  };

  const top = {
    width: cnt.width - nav.width - controls.width,
    // height: cnt.height * 0.13,
    height: base * 7,
  };

  const navGutter = {
    height: xl ? bottom.height / 2 : 0,
    width: nav.width,
  };

  const sizes = {
    nav_box: nav,

    display_box: {
      height: cnt.height - bottom.height - top.height,
      width: cnt.width - controls.width - nav.width,
    },
    top_box: top,
    bottom_box: bottom,

    controls_box: controls,
    container_box: cnt,
    navGutter: navGutter,

    base: base,
  };

  return sizes;
};
