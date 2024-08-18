export default App;
import React, { useState, useEffect } from "react";
import "./Style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header/Header";
import { FORM_CONFIG } from "./Shared/Constant/MasterFormConstants";
import Footer from "./Components/Footer/Footer";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardView from "./Layout/Dashboard/DashboardView";
import MastersView from "./Layout/Master/MastersView";
import SideBar from "./Components/SideBar/SideBar";
import MasterTableView from "./Layout/Master/MasterTableView/MasterTableView";
import { MASTER_VIEW_CONFIG } from "./Shared/Constant/MasterViewConstants";
import MasterTypes from "./Shared/Constant/MastersTypes";
import ProfileSetting from "./Layout/Profile/ProfileSetting";
import IECModuleView from "./Layout/IECModule/IECModuleView";
import Changelanguage from "./Layout/ChangeLanguage/Changelanguage";
import { LanguageProvider } from "./Layout/ChangeLanguage/LanguageProvider";
import axiosInstance from "./Shared/Utils/axiosInstance"; // Import your axiosInstance with interceptors
import RefreshTokenPopup from "./Components/RefreshTokenPopup";
import ANMDetailsView from "./Layout/ANMDetails/ANMDetailsView";

export const routes = [
  {
    path: "dashboard",
    headerName: "Dashboard",
    element: <DashboardView />,
  },
  {
    path: "Changelanguage",
    headerName: "Changelanguage",
    element: <Changelanguage />,
  },
  {
    path: "profilesettings",
    headerName: "Profile Setting",
    element: <ProfileSetting />,
  },
  {
    path: "anmdetails",
    headerName: "ANM Details",
    element: <ANMDetailsView />,
  },
  {
    path: "iecmodule",
    headerName: "IEC Module",
    element: <IECModuleView />,
  },
  {
    path: "master",
    children: [
      { path: "", headerName: "All Masters", element: <MastersView /> },
      {
        path: MasterTypes.DISTRICT,
        headerName: "District Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.DISTRICT}
            formConfig={FORM_CONFIG.districtFields}
            viewConfig={MASTER_VIEW_CONFIG.districtMaster}
          />
        ),
      },
      // MasterTableView
      {
        path: MasterTypes.TALUKA,
        headerName: "Taluka Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.TALUKA}
            formConfig={FORM_CONFIG.talukaFields}
            viewConfig={MASTER_VIEW_CONFIG.talukaMaster}
          />
        ),
        // element: <TalukaTableView />,
      },
      {
        path: MasterTypes.AREATYPE,
        headerName: "Area Type Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.AREATYPE}
            formConfig={FORM_CONFIG.areaFields}
            viewConfig={MASTER_VIEW_CONFIG.areaTypeMaster}
          />
        ),
      },
      {
        path: MasterTypes.PHC,
        headerName: "PHC Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.PHC}
            formConfig={FORM_CONFIG.phcFields}
            viewConfig={MASTER_VIEW_CONFIG.phcMaster}
          />
        ),
      },
      {
        path: MasterTypes.SUBCENTER,
        headerName: "Subcenter Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.SUBCENTER}
            formConfig={FORM_CONFIG.subcenterFields}
            viewConfig={MASTER_VIEW_CONFIG.subcenterMaster}
          />
        ),
      },
      {
        path: MasterTypes.VILLAGE,
        headerName: "Village Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.VILLAGE}
            formConfig={FORM_CONFIG.villageFields}
            viewConfig={MASTER_VIEW_CONFIG.villageMaster}
          />
        ),
      },
      {
        path: MasterTypes.BANK,
        headerName: "Bank Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.BANK}
            viewConfig={MASTER_VIEW_CONFIG.bankMaster}
            formConfig={FORM_CONFIG.bankFields}
          />
        ),
      },
      {
        path: MasterTypes.ROLE,
        headerName: "Role Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.ROLE}
            formConfig={FORM_CONFIG.roleFields}
            viewConfig={MASTER_VIEW_CONFIG.roleMaster}
          />
        ),
      },
      {
        path: MasterTypes.USER,
        headerName: "User Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.USER}
            formConfig={FORM_CONFIG.userFields}
            viewConfig={MASTER_VIEW_CONFIG.userMaster}
          />
        ),
      },
      {
        path: MasterTypes.TRAINING,
        headerName: "Training Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.TRAINING}
            formConfig={FORM_CONFIG.trainingFields}
            viewConfig={MASTER_VIEW_CONFIG.trainingMaster}
          />
        ),
      },
      {
        path: MasterTypes.FACULTY,
        headerName: "Faculty Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.FACULTY}
            formConfig={FORM_CONFIG.facultyFields}
            viewConfig={MASTER_VIEW_CONFIG.facultyMaster}
          />
        ),
      },
      {
        path: MasterTypes.TRAINING_CALENDAR,
        headerName: "Training Calendar Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.TRAINING_CALENDAR}
            formConfig={FORM_CONFIG.trainingCalendarFields}
            viewConfig={MASTER_VIEW_CONFIG.trainingCalendarMaster}
          />
        ),
      },
      {
        path: MasterTypes.PROGRAM,
        headerName: "Program Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.PROGRAM}
            formConfig={FORM_CONFIG.programFields}
            viewConfig={MASTER_VIEW_CONFIG.programMaster}
          />
        ),
      },
      {
        path: MasterTypes.SCHEME,
        headerName: "Scheme Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.SCHEME}
            formConfig={FORM_CONFIG.schemeFields}
            viewConfig={MASTER_VIEW_CONFIG.schemeMaster}
          />
        ),
      },
      {
        path: MasterTypes.ACTIVITY,
        headerName: "Activity Master",
        element: (
          <MasterTableView
            masterType={MasterTypes.ACTIVITY}
            formConfig={FORM_CONFIG.activityFields}
            viewConfig={MASTER_VIEW_CONFIG.activityMaster}
          />
        ),
      },
    ],
  },
  { path: "*", element: <Navigate to="/404" replace /> },
];
const AppRoutes = React.memo(() => {
  return useRoutes(routes);
});
const App = () => {
  const [currentElementWidth, setCurrentElementWidth] = useState("100%");
  const [currElMargin, setCurrElMargin] = useState("220px");
  const token = sessionStorage.getItem("userToken");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        const availableWidth = document.body.offsetWidth - 220;
        setCurrentElementWidth(${availableWidth}px);
        setCurrElMargin("220px");
      } else {
        setCurrentElementWidth("100%");
        setCurrElMargin(0);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [visible, setVisible] = useState(false); // Initialize visible state
  // Function to handle the visibility of the dialog
  const handleDialogVisibility = (isVisible) => {
    setVisible(isVisible);
  };
  // Set up interceptor to handle token expiration
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;

        if (
          error &&
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          // Prompt the user to refresh the token or logout
          // You can implement your logic here
          setVisible(true);
        }

        return Promise.reject(error);
      }
    );
    // Clean up the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);
  return (
    <div className="App">
      <RefreshTokenPopup visible={visible} onHide={handleDialogVisibility} />
      {token != null ? (
        <div>
          <LanguageProvider>
            <div className="grid">
              <div className="md:col-fixed" style={{ width: currElMargin }}>
                <SideBar />
              </div>
              <div
                className="layout-wrapper-div"
                style={{
                  width: currentElementWidth,
                  marginLeft: currElMargin,
                }}
              >
                <Header />
                <AppRoutes />
                <Footer footNotes={"NHM Cockpit"} />
              </div>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </LanguageProvider>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
