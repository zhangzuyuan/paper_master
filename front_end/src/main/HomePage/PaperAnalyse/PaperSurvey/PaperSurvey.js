import {Button, Modal} from "antd";
import {useState} from "react";
import UploadPaperInformation from "./UploadPaperInformation/UploadPaperInformation";
import PaperSurveyAnalyse from "./PaperSurveyAnalyse/PaperSurveyAnalyse";
import Graph from "./PaperSurveyAnalyse/Graph/Graph";


const PaperSurvey =() =>{
    const [Model1,setModel1] = useState(false);
    const [Model2,setModel2] = useState(false);
    const [currentComponent,add_currentComponent] = useState(null);
    return (
        <div>
            <Button type="primary" onClick={()=>{
                setModel1(true);
            }}>
                增添文章
            </Button>
            <Button type="primary" onClick={()=>{
                setModel2(true);
            }}>
                分析
            </Button>

            <Modal
                visible={Model1}
                closable={false}
                onCancel={()=>{
                    setModel1(false);
                }}
                cancelText="关闭"
            >
                <UploadPaperInformation/>
            </Modal>

            <Modal
                visible={Model2}
                closable={false}
                onCancel={()=>{
                    setModel2(false);
                    add_currentComponent(<Graph/>)
                }}
                cancelText="分析"
            >
                <PaperSurveyAnalyse/>
            </Modal>
            {currentComponent}
        </div>
    )
};

export default PaperSurvey;