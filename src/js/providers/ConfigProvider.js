import React from "react";

import { ConfigContext } from "./ConfigContext";

export const ConfigProvider = ({
  host,
  browserOnly,
  mountAlias,
  namespace,
  maxUploadSize,
  ...props
}) => {
  return (
    <ConfigContext.Provider
      value={React.useMemo(
        () => ({
          host,
          browserOnly,
          mountAlias,
          namespace,
          maxUploadSize,
        }),
        []
      )}
    >
      {props.children}
    </ConfigContext.Provider>
  );
};
