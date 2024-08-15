import { Button, Stack } from "@mui/material";

const withActions = (actions) => {
  const buttonStyles = {
    small: {
      fontSize: "0.7rem",
      padding: "0.3rem 0.6rem",
      minWidth: "unset",
    },
  };
  const ActionsComponent = (params) => (
    <Stack direction={"row"} spacing={1} sx={{ py: 1.5 }}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant || "contained"}
          size={action?.size || "small"}
          color={action?.color || "primary"}
          sx={action?.size ? buttonStyles[action?.size] : buttonStyles.small}
          onClick={() => action?.onClick(params)}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );

  // set display name for the component
  ActionsComponent.displayName = "ActionsComponent";

  return ActionsComponent;
};

export default withActions;
