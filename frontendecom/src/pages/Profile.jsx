// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {

//   const navigate = useNavigate();

//   const showMyOrders = () => {
//     console.log("show my orders");
//     navigate('/my-orders');
//   }

//   return (
//     <div className="container p-5 d-flex justify-content-center align-items-center">
//       <div className="row w-100 justify-content-center">
//         <div className="col-sm d-flex justify-content-center">
//           <Card  onClick={showMyOrders} style={{ cursor: 'pointer', width: '18rem', backgroundColor: '#0d6efd', color: 'white' }}>
//             <Card.Body>
//               <Card.Title>My Orders</Card.Title>
//               <Card.Text>
//                 Track, Return and Buy again
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-sm d-flex justify-content-center">
//           <Card style={{ cursor: 'pointer', width: '18rem', backgroundColor: '#0d6efd', color: 'white' }} >
//             <Card.Body>
//               <Card.Title>Account Settings</Card.Title>
//               <Card.Text>
//                 Track, Return and Buy again
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-sm d-flex justify-content-center">
//           <Card style={{ cursor: 'pointer', width: '18rem', backgroundColor: '#0d6efd', color: 'white' }}>
//             <Card.Body>
//               <Card.Title>Payment Options</Card.Title>
//               <Card.Text>
//                 Add, Edit and Remove Payment Methods
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile;



import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import MyOrders from './MyOrders';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flex: 1, padding: '1rem' }}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', height: 'fit-content' }}
    >
      {/* Vertical Tabs */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Profile options"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 180, justifyContent: 'center' }}
      >
        <Tab label="My Orders" {...a11yProps(0)} />
        <Tab label="Account Settings" {...a11yProps(1)} />
        <Tab label="Payment Options" {...a11yProps(2)} />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={value} index={0}>
        <h3>My Orders</h3>
        <MyOrders />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3>Account Settings</h3>
        {/* <AccountDetails/> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h3>Payment Options</h3>
        <p>Add, Edit and Remove Payment Methods</p>
      </TabPanel>
    </Box>
  );
}
