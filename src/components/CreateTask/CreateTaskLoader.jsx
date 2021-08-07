import { useSelector } from "react-redux";
import { getTimeDropdownValues } from "../../util";
import TaskFields from "./TaskFields";

export default function TaskFieldsContainer(props) {
  const { fetchStatus, data } = props;
  const { editData } = useSelector((state) => {
    return state;
  });
  let defaultFormData = {};
  let editMode = false;

  if (fetchStatus === "not_started" || fetchStatus === "inprogress") {
    return <div>Data Loading...</div>;
  } else if (fetchStatus === "error") {
    return <div>Problem in loading data .Please try again later...</div>;
  } else if (data.length === []) {
    return <div>No users to assign the task ... </div>;
  }
  if (Object.keys(editData).length > 0) {
    defaultFormData = {
      assignedUser: editData.assigned_user,
      description: editData.task_msg,
      taskDate: new Date(editData.task_date),
      taskTime: editData.task_time,
      taskId: editData.id
    };
    editMode = true;
  } else {
    defaultFormData = {
      assignedUser: props.data[0].user_id,
      description: "",
      taskDate: new Date(),
      taskTime: ""
    };
  }
  const timeDropDownValues = getTimeDropdownValues();
  return (
    <TaskFields
      {...props}
      timeDropDownValues={timeDropDownValues}
      editMode={editMode}
      users={data}
      defaultFormData={defaultFormData}
    />
  );
}
