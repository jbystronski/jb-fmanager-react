import { useCancellablePromises } from "./useCancellablePromises";
import { cancellablePromise } from "@helpers/cancellablePromise";

const delay = (n) => new Promise((resolve) => setTimeout(resolve, n));

export const useClickPreventionOnDoubleClick = (onClick, onDoubleClick) => {
  const api = useCancellablePromises();

  const handleClick = (args) => {
    args.event.preventDefault();
    args.event.stopPropagation();
    api.clearPendingPromises();
    const waitForClick = cancellablePromise(delay(200));
    api.appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick);
        onClick(args);
      })
      .catch((errorInfo) => {
        api.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = (args) => {
    api.clearPendingPromises();
    onDoubleClick(args);
  };

  return [handleClick, handleDoubleClick];
};
