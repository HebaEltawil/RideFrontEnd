import { useState } from "react";
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";

const calculateTotalIncome = (moneyMap) => {
    let total = 0;
    Object.values(moneyMap).forEach((item) => { total += item; });
    return total;
}

export const Profile = ({ driverData, monthMoney }) => {
    let [localDriverData, setLocalDriverData] = useState(driverData);

    const toggleAvailability = (isAvailable,type) => {
        if(type === 'availability') {
            setLocalDriverData({...localDriverData, availability: !isAvailable});
            axios.patch(process.env.REACT_APP_API + "/Driver/updateDriver", null, {
                params: {
                    email: driverData.email,
                    fieldToUpdate: 'availability',
                    newValue: !isAvailable
                }
            }).then(response => {
                // Handle response if needed
            }).catch(error => {
                // Handle error if needed
            });
        }else if(type === 'smoking') {
            setLocalDriverData({...localDriverData, smoking: !isAvailable});
            axios.patch(process.env.REACT_APP_API + "/Driver/updateDriver", null, {
                params: {
                    email: driverData.email,
                    fieldToUpdate: 'smoking',
                    newValue: !isAvailable
                }
            }).then(response => {
                // Handle response if needed
            }).catch(error => {
                // Handle error if needed
            });
        }
    }

    return (
        <div>
            <div>
                <div className="border rounded-4 px-2 py-3 shadow w-100"
                     style={{ backgroundColor: '#d9d9d9', textAlign: 'left' }}>
                    <div className="d-flex flex-nowrap">
                        <p className="fw-bold fs-4">{localDriverData.username}</p>
                        <span className="ms-4 mt-2">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch"
                                       id="flexSwitchCheckChecked1"
                                       checked={localDriverData.availability}
                                       onChange={() => toggleAvailability(localDriverData.availability,'availability')}
                                />
                                <label
                                    className={`form-check-label fw-bold ${localDriverData.availability ? 'text-success' : 'text-danger'}`}
                                    htmlFor="flexSwitchCheckChecked1"
                                >
                                    {localDriverData.availability ? 'Available' : 'Unavailable'}
                                </label>
                            </div>
                        </span>
                    </div>
                    <div className="d-flex flex-nowrap">
                        <p className="fw-bold fs-5 mb-1 ms-2">Smoker: </p>
                        <span className="ms-4 mt-2">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckChecked2"
                                    checked={localDriverData.smoking}
                                    onChange={() => toggleAvailability(localDriverData.smoking,'smoking')}
                                />
                                <label className={`form-check-label fw-bold ${localDriverData.smoking ? 'text-danger' : 'text-success'} ms-2`}
                                       htmlFor="flexSwitchCheckChecked2"
                                >
                                    {localDriverData.smoking ? (
                                        <>Yes <i className="fa-solid fa-skull-crossbones ms-1"></i></>
                                    ) : (
                                        <>No <i className="fa-regular fa-face-smile"></i></>
                                    )}
                                </label>
                            </div>
                        </span>
                    </div>
                    <p className="fw-bolder fs-5 mb-1 ms-2">{localDriverData.email}</p>
                    <p className="fw-bolder fs-5 mb-1 ms-2">Rating: {localDriverData.rating} <i
                        className="fa-solid fa-star" style={{ color: '#FFD43B' }}></i></p>
                    <p className="fw-bolder fs-5 mb-1 ms-2"><i className="fa-solid fa-car"></i> Car
                        Model: {localDriverData.carType}</p>
                    <p className="fw-bolder fs-5 mb-1 ms-2"><i></i> City: {localDriverData.city}</p>
                    <p className="fw-bolder fs-5 mb-1 ms-2">Total income
                        : {Object.keys(monthMoney).length === 0 ? 0 : calculateTotalIncome(monthMoney).toFixed(2)} L.E </p>
                </div>
            </div>
        </div>
    );
};
