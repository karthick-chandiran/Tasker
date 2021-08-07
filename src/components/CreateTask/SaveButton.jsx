import { Button, makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  saveButton: {
    backgroundColor: "rgb(71, 187, 127)",
    color: "white",
    borderRadius: "3px"
  }
});
export default function SaveButton(props) {
  const classes = useStyles();
  const { disabled } = props;

  return (
    <Button
      disabled={disabled}
      type="submit"
      variant="contained"
      className={classes.saveButton}
    >
      Save
    </Button>
  );
}
