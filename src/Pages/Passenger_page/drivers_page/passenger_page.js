import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { citiesMap,setMap } from "../../../data/citiesMap";
import { DriverData } from './driverData';
import { DriverCard } from './driver_card/driver_card';
import './style.css'
import'bootstrap/dist/css/bootstrap.min.css'
import'bootstrap/dist/js/bootstrap.bundle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCarOn, faSearch,  faStreetView } from '@fortawesome/free-solid-svg-icons'

export const PassengerPage = () => {

  const [filters, setFilters] = useState({
    city: '',
    region: '',
    carType: '',
    smoking: undefined,
    search: '',
  });

  const [citySource, setCitySource] = useState(''); // Default value
  const [regionSource, setregionSource] = useState(''); // Default value
  const [cityDest, setCityDest] = useState(''); // Default value
  const [regionDest, setregionDest] = useState('');
  const [lat1 , setLat1]= useState('');
  const [lat2 , setLat2]= useState('');
  const [long1 , setLong1]= useState();
  const [long2 , setLong2]= useState();
  const [smoking, setSmoking] = useState();
  const [msg,setMsg] = useState('');
  const [isClicked,setisClicked]=useState(false);
  const {  filterDriversByFilters } = DriverData({ filters ,isClicked,setisClicked});

    const handleCityChange = (selectedCity) => {
      setFilters({ ...filters, city: selectedCity });
    };

    const handleRegionChange = (region) => {
      setFilters({ ...filters, region: region });
      setisClicked(true);
    };

    const handleCarChange = (car) => {
      setFilters({ ...filters, carType: car });
      setisClicked(true);
      
    };

    const handleSmokeChange = (Smoking) => {
      setFilters({ ...filters, smoking: Smoking });
      setisClicked(true);
    };

    const handleSearchChange = (search) => {
      setFilters({ ...filters, search: search });
    };


    const resetIsClicked = () => {
      setisClicked(false); // Reset when modal is closed
    };

    const resetFilters = () => {
      setFilters({
        ...filters, // Preserve other filters like 'city' and 'search'
        region: '', // Reset region
        carType: '', // Reset car type
        smoking: undefined, // Reset smoking status
      });
    };

    useEffect(() => {
      axios.get("https://localhost:7115/getCities").then((r)=>{
        setMap(r.data["map"]);
        setMsg('') 
    })
      if (citySource && regionSource) {
        
        const selectedRegion = citiesMap[citySource].find(
          (region) => region.region === regionSource
        );
        if (selectedRegion) {
          setLat1(selectedRegion.latitude);
          setLong1(selectedRegion.longitude);
        }
      }
      if (cityDest && regionDest) {
        const selectedRegion = citiesMap[cityDest].find(
          (region) => region.region === regionDest
        );
        if (selectedRegion) {
          setLat2(selectedRegion.latitude);
          setLong2(selectedRegion.longitude);
        }
      }
    }, [citySource, regionSource,cityDest, regionDest]);
  
  

 function SourDes(){
  return (
    < > 
    <div className="mt-3">
      <FontAwesomeIcon icon={faStreetView} className='fa-solid fa-2xl'></FontAwesomeIcon>
      <select
          name="select"
          className="border border-3 border-black rounded-3"
          style={{ width: "300px", height: "45px" }}
          onChange={(event) => {
            const selectedSource = event.target.value.split(',');
            setCitySource(selectedSource[1]);
            setregionSource(selectedSource[0]);
            handleCityChange(selectedSource[1]);
            
          }}
        >
            <optgroup defaultValue="">
                <option value="" className="fs-5">Leaving from</option>
            </optgroup>
            <optgroup label="Leaving from">
              {Object.keys(citiesMap).map((city) => (
                citiesMap[city].map((regionData) => (
                  <option key={`${regionData.region},${city}`} value={`${regionData.region},${city}`}>
                    {regionData.region}, {city}
                  </option>
                ))
              ))}
            </optgroup>
        </select>
      </div>

      <div className="mt-3 ms-5">
        <FontAwesomeIcon icon={ faCarOn} className='fa-solid fa-2xl'/>
        <select
        name="select"
        className="border border-3 border-black rounded-3"
        style={{ width: "300px", height: "45px" }}
        onChange={(event) => {
          const selectedSource = event.target.value.split(',');
          setCityDest(selectedSource[1]);
          setregionDest(selectedSource[0]);}}>

            <optgroup defaultValue="">
                <option value="" className="fs-5">Going To</option>
            </optgroup>
            <optgroup label="Going To">
              {Object.keys(citiesMap).map((city) => (
                citiesMap[city].map((regionData) => (
                  <option key={`${regionData.region},${city}`} value={`${regionData.region},${city}`}>
                    {regionData.region}, {city}
                  </option>
                ))
              ))}
            </optgroup>
        </select>
      </div>
    </> 

  );
 } 

 const updateMainButtonTitle =  (newTitle) => {
  // Update the main button title based on car type and smoker status
  
};

 function filterBy() {
  return(<>
      <button type="button" className="btn btn-white text-info fw-bold w-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Filter
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Your Filter :</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mt-2">
                  {citySource ? (
                    <select
                      name="select"
                      className="w-50 h-25 border border-3 border-black rounded-3"
                      value={filters['region']}
                      onChange={(event) => {
                      const selectedRegion = event.target.value;
                      updateMainButtonTitle(`Region -- ${selectedRegion}`);
                      handleRegionChange(selectedRegion);
                      }}>
                        <optgroup label="Region">
                        {citiesMap[citySource].map((regionData) => (
                            <option key={regionData.region} value={regionData.region}>
                            {regionData.region}
                            </option>
                        ))}
                        </optgroup>
                    </select>
                    ) : (
                    <select
                        name="select"
                        className="w-50 h-25 border border-3 border-black rounded-3"
                        disabled={true}>
                        <optgroup label="Region">
                          <option value="" className="fs-5">Regions</option>
                        </optgroup>
                    </select>
                    )}
              </div>
              <div className="d-flex flex-nowrap mt-3">
                <p className="fw-bold fs-5">Smoker:</p>
                <span className="ms-4 mt-2">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      defaultChecked={smoking} // assuming `smoking` is a state variable that holds the smoking status
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        if (isChecked) {
                          updateMainButtonTitle('Smoking -- Yes');
                          handleSmokeChange(true);
                        } else {
                          updateMainButtonTitle('Smoking -- No');
                          handleSmokeChange(false);
                        }
                        setSmoking(isChecked);
                        
                      }}
                    />
                    <label className="form-check-label fw-bold text-danger ms-1" htmlFor="flexSwitchCheckChecked">Yes</label>
                  </div>
                </span>
              </div>
              <div className="mt-2">
                <select
                  name="select"
                  value={filters['carType']}
                  className="w-50 h-25 border border-3 border-black rounded-3"
                  onChange={(event) => {
                    const selectedCarType = event.target.value;
                    
                    updateMainButtonTitle(`Car type -- ${selectedCarType}`);
                    handleCarChange(selectedCarType);
                    }}>

                  <optgroup label="Car Type">
                    <option value="" className="fs-5">Car Type</option>
                    <option value="SUV">SUV</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div className="modal-footer" >
              <button type="button" className="btn btn-secondary" 
              onClick={()=>{resetIsClicked();resetFilters()}}>Clear</button>
  
            </div>
          </div>
        </div>
      </div>
   </>
  )
 }

  return (
    <div className="container">
    <p className="pt-3 fs-3 fw-bold text-center">Where are you going ?</p>
    
    <div className="d-flex justify-content-center">
    {SourDes()}
    {filterBy()}
    </div>
    <div className="input-group rounded mt-4 w-75 mx-auto">
      <input type="search" className="form-control rounded border border-3 border-black rounded-3" 
      style={{ height: "50px" }} placeholder="Search" aria-label="Search" 
      aria-describedby="search-addon" 
      onChange={(event)=>handleSearchChange(event.target.value)}/>
      <span className="input-group-text border-0 bg-info" id="search-addon" style={{height:"50px"}}>
       <FontAwesomeIcon icon={faSearch} className='fas'></FontAwesomeIcon>
      </span>
    </div>

    <div className="mx-auto mt-4 scroll-container">

    {DriverCard({filterDriversByFilters,citySource,cityDest,regionSource,regionDest,lat1,lat2,long1,long2})}

    </div>
  </div>
  );
};

