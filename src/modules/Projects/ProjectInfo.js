import { AppBar, makeStyles, Paper, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Form from "../../components/Form/Form";
import Layout from "../../layout/Layout";
import columns from "./columns";
import Tasks from "./Tasks/Tasks";
const useStyles = makeStyles({
  root: {},
});
function ProjectInfo() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const params = useParams()
  const {projectId} = params
  const projectInfo = useSelector(state => state.projects.projectInfo)

  const users = useSelector(state=> state.users.usersList)
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    ///Fetch Info

    return()=>{
      //remove task
    }
  },[projectId])


  function saveProject(){
  }

  console.log(`columns`, columns)
  return (
    <Layout>
      <Paper square className={classes.root}>
        <TabContext value={value}>
          {/* <AppBar position="static"> */}
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Info" value={1} />
            <Tab label="Tasks" value={2} />
            <Tab label="Item Three" value={3} />
          </TabList>
          {/* </AppBar> */}
          <TabPanel value={1}><Form columns={columns} value={projectInfo} saveAction={saveProject} users={users} /> </TabPanel>
          <TabPanel value={2}><Tasks /></TabPanel>
        </TabContext>
      </Paper>
    </Layout>
  );
}

export default ProjectInfo;
