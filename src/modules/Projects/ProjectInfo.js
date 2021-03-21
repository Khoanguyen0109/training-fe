import { AppBar, makeStyles, Paper, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Form from "../../components/Form/Form";
import Layout from "../../layout/Layout";
import { GET_USERS_LIST } from "../Users/store/user.actions";
import columns from "./columns";
import {
  GET_PROJECT_INFO,
  SET_PROJECT_INFO,
  UPDATE_PROJECT_INFO,
} from "./store/projects.actions";
import Tasks from "./Tasks/Tasks";
const useStyles = makeStyles({
  root: {},
});
function ProjectInfo() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const params = useParams();
  const { projectId } = params;
  const projectInfo = useSelector((state) => state.projects.projectInfo);
  const dispatch = useDispatch();
  const users = useSelector((state) =>
    state.users.users?.filter((user) => user.role === "EMPLOY")
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: GET_PROJECT_INFO, payload: projectId });
    if (!users) {
      dispatch({ type: GET_USERS_LIST });
    }
    return () => {
      return dispatch({
        type: SET_PROJECT_INFO,
        payload: null,
      });
    };
  }, [projectId]);

  function saveProject(data) {
    dispatch({
      type: UPDATE_PROJECT_INFO,
      payload: { id: projectInfo.id, data },
    });
  }

  if (!projectInfo || !users) return <div>Loading</div>;
  return (
    <Layout>
      <Paper square className={classes.root}>
        <TabContext value={value}>
          {/* <AppBar position="static"> */}
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Info" value={1} />
            <Tab label="Tasks" value={2} />
          </TabList>
          {/* </AppBar> */}
          <TabPanel value={1}>
            <Form
              values={projectInfo}
              columns={columns}
              value={projectInfo}
              saveAction={saveProject}
              users={users}
            />{" "}
          </TabPanel>
          <TabPanel value={2}>
            <Tasks />
          </TabPanel>
        </TabContext>
      </Paper>
    </Layout>
  );
}

export default ProjectInfo;
