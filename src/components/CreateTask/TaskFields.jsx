import styled from "styled-components";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import {
  addNewTaskData,
  openTaskDrawerAction,
  removeTask,
  updateTaskData
} from "../../redux/actionCreators";
import DeleteIcon from "../../icons/DeleteIcon";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import InputIcon from "../../icons/InputIcon";
import { getFormattedDate, getTimeZoneOffsetInSeconds } from "../../util";
import TimeDropDown from "./TimeDropDown";
import DateField from "./DateField";
import SaveButton from "./SaveButton";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  cancelButton: {
    background: "none",
    marginLeft: "auto"
  },
  dateField: {
    width: "50%",
    paddingRight: "10px"
  },
  timeField: {
    width: "50%",
    "& select": {
      appearance: "none"
    }
  },
  inputIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-52%)",
    zIndex: 100
  },
  descField: {
    "& .form-control": {
      paddingRight: "30px"
    }
  },
  progressBar: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    zIndex: 1000
  }
});

const VerticalContainer = styled.div`
  display: flex;
`;
const InputField = styled.div`
  margin-bottom: 10px;
`;
const FieldsContaienr = styled.div`
  background-color: rgb(237, 247, 252);
  padding: 10px 10px 15px;
  position: relative;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function TaskFields(props) {
  const [formData, updateFormData] = useState(props.defaultFormData);
  const [disableSave, updateDisableSave] = useState(true);
  const [formSubmitInProgress, setInProgress] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const onValueChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    updateFormData(newFormData);
    updateDisableSave(!checkFormValid(newFormData));
  };
  const checkFormValid = (newFormData) => {
    return (
      newFormData.description &&
      newFormData.taskDate &&
      newFormData.taskTime &&
      newFormData.assignedUser
    );
  };
  const closeDrawer = () => {
    dispatch(openTaskDrawerAction(false));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setInProgress(true);
    const formattedDate = getFormattedDate(formData.taskDate);
    // const taskTime = getTaskTimeInSeconds(formData.taskTime);
    const taskTime = parseInt(formData.taskTime);
    const timeZone = getTimeZoneOffsetInSeconds();

    const payload = {
      assigned_user: formData.assignedUser,
      task_date: formattedDate,
      task_time: taskTime,
      is_completed: 0,
      time_zone: timeZone,
      task_msg: formData.description
    };
    if (props.editMode) {
      dispatch(updateTaskData(payload, formData.taskId));
    } else {
      dispatch(addNewTaskData(payload));
    }
    setInProgress(true);
  };
  const onDeleteClick = () => {
    dispatch(removeTask(formData.taskId));
    setInProgress(true);
  };

  return (
    <FieldsContaienr>
      {formSubmitInProgress && (
        <CircularProgress size={30} className={classes.progressBar} />
      )}
      <form onSubmit={onSubmit} autoComplete="off">
        <InputField>
          <label htmlFor="desc">Task Description</label>
          <InputGroup className={classes.descField + " mb-3"} size="sm">
            <FormControl
              id="desc"
              type="text"
              name="description"
              value={formData.description}
              onChange={onValueChange}
            />
            <InputIcon className={classes.inputIcon} />
          </InputGroup>
        </InputField>
        <VerticalContainer>
          <InputField className={classes.dateField}>
            <DateField
              value={formData.taskDate}
              onValueChange={onValueChange}
            />
          </InputField>
          <InputField className={classes.timeField}>
            <TimeDropDown
              value={formData.taskTime}
              onValueChange={onValueChange}
              timeDropDownValues={props.timeDropDownValues}
            />
          </InputField>
        </VerticalContainer>
        <InputField>
          <label htmlFor="user">Assign User</label>
          <Form.Control
            id="user"
            name="assignedUser"
            value={formData.assignedUser}
            onChange={onValueChange}
            as="select"
            custom
            size="sm"
          >
            {props.users.map((user) => (
              <option key={user.id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </Form.Control>
        </InputField>
        <ButtonsContainer>
          {props.editMode && <DeleteIcon onClick={onDeleteClick} />}
          <Button
            disabled={formSubmitInProgress}
            className={classes.cancelButton}
            onClick={closeDrawer}
          >
            Cancel
          </Button>
          <SaveButton disabled={disableSave || formSubmitInProgress} />
        </ButtonsContainer>
      </form>
    </FieldsContaienr>
  );
}
