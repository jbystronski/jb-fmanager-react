import React, { useState } from "react";

import { EmptyDisplay } from "../EmptyDisplay";
import { Display } from "../Display";
import { BottomBar } from "../BottomBar";
import { GridView } from "../GridView";
import { useApp, useFileshare } from "@utils";
import { getGridSize } from "@helpers";

export const SharedFiles = () => {
  const { shared } = useFileshare();
  const { syncShared, getNode } = useApp();
  const [gridSize, setGridSize] = useState(getGridSize["m"]);

  const btns = [
    {
      symbol: "sync",
      tooltip_title: "Resync files",
      events: {
        onClick: syncShared,
      },
    },
  ];

  return (
    <>
      <Display>
        {!shared.length ? (
          <EmptyDisplay
            icon="share"
            message={"Your are not sharing any files now"}
          />
        ) : (
          <GridView
            gridSize={gridSize}
            data={shared.map((s) => getNode(s.key))}
          />
        )}
      </Display>
      <BottomBar>{btns}</BottomBar>
    </>
  );
};
