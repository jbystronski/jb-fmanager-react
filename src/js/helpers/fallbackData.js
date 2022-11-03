export const fallbackData = {
  root: {
    id: "root",
    original_id: "root",
    parent_id: null,
    dir: true,
    info: {},

    children: [
      {
        id: "root/public",
        dir: true,
        parant_id: "root",
        info: {
          info: {
            mb: (2345 / 1024 ** 2).toFixed(2),
            bytes: 2345,
            created: "n/a",
          },
        },
        children: [
          {
            id: "root/public/file1.json",
            parent_id: "root/public",
            dir: false,
            children: [],
            info: {
              mb: (64372 / 1024 ** 2).toFixed(2),
              bytes: 64372,
              created: "n/a",
            },
          },
        ],
      },
    ],
  },
};
