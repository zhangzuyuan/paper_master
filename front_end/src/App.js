import './App.css';
import SignIn from "./main/SignIn/SignIn";

import {Route,Routes,Navigate} from "react-router-dom";
import HomePage from "./main/HomePage/HomePage";
import SignUp from "./main/SignUp/SignUp";
import TableAll from "./main/HomePage/PaperBaseInformation/TableAll/TableAll";
import TableType from "./main/HomePage/PaperBaseInformation/TableType/TableType";
import UpdateUserBaseInformation from "./main/HomePage/UserInformation/UserBaseInformation/UpdateUserBaseInformation";
import UserBaseInformation from "./main/HomePage/UserInformation/UserBaseInformation/UserBaseInformation";
import PaperSurvey from "./main/HomePage/PaperAnalyse/PaperSurvey/PaperSurvey";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<SignIn/>}></Route>
            <Route path="/SingIn" element={<SignIn/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path='/HomePage' element = {<HomePage/>}>
                <Route index element={<TableAll/>}/>
                <Route path="/HomePage/UserBaseInformation" element = {<UserBaseInformation/>}/>
                <Route path="/HomePage/UpdateUserBaseInformation" element={<UpdateUserBaseInformation/>}/>
                <Route path="/HomePage/TableAll" element={<TableAll/>}/>
                <Route path="/HomePage/TableType" element={<TableType/>}/>

                <Route path="/HomePage/PaperSurvey" element={<PaperSurvey/>}/>
            </Route>
            <Route path='*' element = {<Navigate 　to='/SingIn'/>}/>
        </Routes>
    </div>
  );
}

export default App;
