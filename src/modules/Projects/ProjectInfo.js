import { AppBar, makeStyles, Paper, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React from "react";
import Layout from "../../layout/Layout";
const useStyles = makeStyles({
  root: {},
});
function ProjectInfo() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          <TabPanel value={1}>Info</TabPanel>
          <TabPanel value={2}>Task</TabPanel>
        </TabContext>
      </Paper>
    </Layout>
  );
}

export default ProjectInfo;
