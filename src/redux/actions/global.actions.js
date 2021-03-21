import { Button } from "@material-ui/core";

export const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";

export const enqueueSnackbar = (notification) => {
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: notification?.options?.key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});

export const enqueueFailedSnackbar = (error) => {
  console.log("erorr :>> ", error);

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      key: new Date().getTime() + Math.random(),
      message: error,
      options: {
        variant: "error",
        // action: (key) => (
        //   <Button
        //     onClick={() => {
        //       console.log(`key`, key);
        //       return dispatch(removeSnackbar)(key);
        //     }}
        //   >
        //     dismiss me
        //   </Button>
        // ),
      },
    },
  };
};
