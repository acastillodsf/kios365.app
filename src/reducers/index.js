import { combineReducers } from "redux";
import changeReducer from "./changeReducer";
import usuarioReducer from "./usuarioReducer";
import wsReduce from "./wsoketReduce";
import md from "./md";

export default combineReducers({
  usuario: usuarioReducer,
  changes: changeReducer,
  ws: wsReduce,
  md: md
});
