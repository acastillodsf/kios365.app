import { useSelector } from "react-redux";
import Register1 from "./RegisterQuisqueya";
import Register0 from "./Register_Default";
 
const Register = ({ match }) => {
  const { settingApp,inicializado } = useSelector((state) => state.appSetting);

  if(settingApp.homepage === undefined){
    return <></>
  }
  if (
    settingApp.homepage === "https://www.coopquisqueya.com/"
  ) {
    return <Register1 match={match} />;
  } else {
    return <Register0 match={match} />;
  }
};

export default Register;
