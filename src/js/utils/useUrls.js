import { useFileshare } from "./useFileshare";

export const useUrls = () => {
  return useFileshare().urls;
};
