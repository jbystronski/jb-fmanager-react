import React from "react";

import { ConfigContext } from "./ConfigContext";

export const ConfigProvider = ({
  host,
  browserOnly,
  mount,
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
          mount,
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
