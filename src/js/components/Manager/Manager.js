import React, { useState } from "react";

import { ControlBar } from "../ControlBar";
import { NavigationTree } from "../NavigationTree";
import { SearchBar } from "../SearchBar";
import { ViewResolver } from "../ViewResolver";
import { FilePath } from "../FilePath";
import { Dock } from "../Dock";

import { mediaWidth } from "@helpers";
import styled from "styled-components";
import { InteractiveIcon } from "@ui";
import { useApp } from "@utils";
import { SearchProvider } from "@providers";

const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.surface1};

  font-size: 16px;

  font-family: ${({ theme }) => theme.fontFamily};

  @media ${mediaWidth("min", 1280)} {
    width: ${({ theme }) => theme.container_box.width + "px" || "auto"};
    height: ${({ theme }) => theme.container_box.height + "px" || "auto"};
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${({ theme }) => theme.palette.shadow1};
    border-radius: 24px;
    overflow: hidden;
    border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
  }

  @media ${mediaWidth("max", 998)} {
    max-height: 100%;

    width: 100%;
    height: 100%;
  }

  @media ${mediaWidth("min", 100)} {
    position: fixed;
    z-index: ${({ theme }) => theme.stackIndex};
    justify-content: start;

    align-items: center;
  }
`;

const NavigationPanel = styled.div`
  @media ${mediaWidth("min", 768)} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
  
    borderRight: 1px solid ${({ theme }) =>
      theme.palette.divider || "transparent"};
    boxSizing: "border-box",
    width: ${({ theme }) => theme.nav_box.width + "px" || "auto"};
    height: ${({ theme }) => theme.nav_box.height + "px" || "100%"};
  }

  @media ${mediaWidth("max", 768)} {
    display: none;
  }
`;

const MainPanel = styled.div`
  display: flex;
  flex-direction: column;

  @media ${mediaWidth("min", 999)} {
    margin-left: 20px;
    margin-right: 20px;
  }

  @media ${mediaWidth("min", 200)} {
    align-items: center;
    justify-content: space-between;
  }
`;

const MainUpperPanel = styled.div`
  overflow: auto;
  display: flex;
  box-sizing: border-box;

  // padding: 16px 16px 0px 16px;
  padding: ${({ theme }) => theme.base + "px"};
  padding-bottom: ${({ theme }) => theme.base / 2 + "px"};

  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: ${({ theme }) => theme.top_box.height + "px" || "auto"};
  width: ${({ theme }) => theme.top_box.width + "px" || "auto"};

  @media ${mediaWidth("min", 999)} {
    padding-left: 0px;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.base + "px"};
  align-items: center;
`;

const MenuButton = styled(InteractiveIcon)`
  display: none;
  @media ${mediaWidth("max", 998)} {
    display: block;
  }
`;

const BottomRow = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-contetn: flex-start;
`;

const MainLowerPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${mediaWidth("min", 200)} {
    width: 100%;
  }
`;

export const Manager = ({ onClose, revokePortal }) => {
  const { fileTree } = useApp();

  const [dockOpen, setDockOpen] = useState(false);

  return (
    <Container>
      <NavigationPanel>
        <NavigationTree fileTree={fileTree} />
      </NavigationPanel>
      <SearchProvider>
        <MainPanel>
          <MainUpperPanel>
            <TopRow>
              <SearchBar />
              <MenuButton
                symbol="dot_menu"
                events={{
                  onClick: () => setDockOpen(!dockOpen),
                }}
              />
            </TopRow>

            <BottomRow>
              <FilePath />
            </BottomRow>
          </MainUpperPanel>
          <MainLowerPanel>
            <ViewResolver />
          </MainLowerPanel>
        </MainPanel>
      </SearchProvider>

      <Dock isOpen={dockOpen} onClose={() => setDockOpen(false)}>
        <div>
          <ControlBar
            onClose={() => {
              onClose();
              revokePortal();
            }}
          />
        </div>
      </Dock>
    </Container>
  );
};
