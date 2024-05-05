import {useEffect, useState} from "react";
import axios from "axios";

export const Finance = ({driverData, monthMoney}) => {
    let [dayMoney,setDayMoney] = useState({});
    let [isDaily,setIsDaily] = useState(false);
    let [isDailyHover,setIsDailyHover] = useState(false);
    let [isMonthHover,setIsMonthHover] = useState(false);
    let [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + "/Driver/getAllIncomePerDay/" + driverData.email).then((response) => {
            if (response.status === 200 && Object.keys(response.data).length > 0) {
                setDayMoney(response.data);
                setIsLoading(false);
            }
            setIsLoading(false);
        },[driverData]).catch((e)=>{setIsLoading(false);console.log("Error fetching driver data:", e);})
    },[driverData]);
    if (isLoading) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            
        </div>; // Display loading screen while fetching data
    }
    return (
        <div>
            <div className="d-flex justify-content-center w-100 mt-4">
                <p className="fw-bold fs-2 me-4">Finance</p>
                <div className="btn-group w-50" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary w-50 h-75 fw-bold fs-5 btn-outline-info" onClick={()=> setIsDaily(true)}
                            onMouseEnter={() => setIsDailyHover(true)}
                            onMouseLeave={() => setIsDailyHover(false)}
                            style={{backgroundColor: isDaily || isDailyHover? "#13bcbc" : "#87dddd", color: isDaily || isDailyHover? "white" : "black", transition: 'background-color 0.3s ease'
                    }}>Day
                    </button>
                    <button type="button" className="btn btn-primary w-50 h-75 fw-bold fs-5 btn-outline-info" onClick={()=> setIsDaily(false)}
                            onMouseEnter={() => setIsMonthHover(true)}
                            onMouseLeave={() => setIsMonthHover(false)}
                            style={{backgroundColor: !isDaily || isMonthHover? "#13bcbc" : "#87dddd", color: !isDaily || isMonthHover? "white" : "black", transition: 'background-color 0.3s ease'}}>Month
                    </button>
                </div>
            </div>

            <div className="w-100 text-center ms-4">
                <div className="comment-section">
                    {Object.keys(isDaily? dayMoney : monthMoney).map((key)=> {
                        return (<div className="comment">
                            {key} : {isDaily ? dayMoney[key].toFixed(2) : monthMoney[key].toFixed(2)} L.E
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}
