import React from "react";

export const addProps = (Component, extraProps) => {
  return <Component.type {...Component.props} {...extraProps} />;
};
