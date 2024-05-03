import React, { useEffect, useState } from 'react';
import axios from 'axios';


//  export const DriverData  = ({citySource,regionFilter,carType,smoking,filterWord}) => {
  export const DriverData  = ({ filters , isClicked }) => {

    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [FilteredDrivers1, setFilteredDrivers1] = useState([]);

    useEffect(() => {
        const fetchAllDrivers = async () => {
          try {
            const response = await axios.get(process.env.REACT_APP_API + "/Admin/getAllDriver");
            setDrivers(response.data);
            setIsLoading(false);
          } catch (err) {
            setError(err);
            setIsLoading(false);
          }
        };
    
        fetchAllDrivers();
        // console.log(drivers);
      }, []); 
    //   return null;

    // useEffect(() => {
      console.log("Drivers state changed:", drivers);
    // }, [drivers]); // Log when 'drivers' state changes
  
    // if (isLoading) {
    //   return <p>Loading...</p>;
    // }
  
    // if (error) {
    //   return <p>Error: {error.message}</p>;
    // }


    const filterDrivers = () => {
        return drivers.filter(
          (driver) => driver.availability && !driver.blocked
        );
      //   return ava.filter((driver) => !driver.blocked)
      };
    // console.log(filterDrivers())
    // const filterDriversByFilters = () => {
    //   let filtered = filterDrivers(); // Base filter (available and not blocked)
    //     console.log(filtered)
        
    //   if(filterWord === null) {
    //     return filtered;

    //   } 
    //   if (citySource === filterWord) {
    //     filtered = filtered.filter((driver) => driver.city === citySource);
    //     console.log(filtered)
    //     return filtered;
    //   }
  
    //   if (regionFilter === filterWord) {
    //     filtered = filtered.filter((driver) => driver.region === regionFilter);
    //     console.log(filtered)
    //     return filtered;
    //   }
  
    //   if (carType === filterWord) {
    //     filtered = filtered.filter((driver) => driver.carType === carType);
    //     console.log(filtered)
    //     return filtered;
    //   }
  
    //   if (smoking === filterWord) {
    //     filtered = filtered.filter((driver) => driver.smoking === smoking);
    //     console.log(filtered)
    //     return filtered;
    //   }
      
    // };



    const applyFilters = () => {
      let result = filterDrivers();
  
      if (filters.city) {
        result = result.filter((driver) => driver.city === filters.city);
      }

      // if(isClicked){
          if (filters.region) {
            result = result.filter((driver) => driver.region === filters.region);
          }
      
          if (filters.carType) {
            result = result.filter((driver) => driver.carType === filters.carType);
          }

        
          if (filters.smoking !== undefined) { // Check if it's defined (could be true or false)
            result = result.filter((driver) => driver.smoking === filters.smoking);
          }
          // return result;
        // }

      if (filters.search) {
        result = result.filter((driver) => driver.username === filters.search);
      }
  
      // setFilteredDrivers1(result);
      return result;
    };

  //   useEffect(() => {
  //     filterDriversByFilters(); // Apply filters to update the filtered list
  // }, [filters]);// Dependencies ensure re-evaluation

  
      return {
        isLoading,
        error,
        // filterDriversByFilters: filterDriversByFilters(),
        filterDriversByFilters: applyFilters(),
      };
    // const filterDrivers = () => {
    //     return drivers.filter(
    //       (driver) =>  driver.availability && !driver.blocked);
    //   };  
    
     

    //   const filterDriversByCity = (city) => {
    //     return drivers.filter(
    //       (driver) => driver.city === city);
    //   };  

 
  
    //   const filterDriversByRegion = (region) => {
    //     return drivers.filter((driver) => driver.region === region);
   
    //   };
  
    //   const filterDriversByCar = (car) => {
    //     return drivers.filter((driver) => driver.car === car);
    //   };

    //   const filterDriversBySmoking = (smoke) => { 
    //     return drivers.filter((driver) => driver.smoking=== smoke);
    //   }; 

    // return {
        
    //     filteredDrivers: filterDrivers(),
    //     filterDriversByCity: filterDriversByCity(city),
    //     filterDriversByRegion: filterDriversByRegion(region),
    //     filterDriversByCar: filterDriversByCar(car),
    //     filterDriversBySmoking: filterDriversBySmoking(smoke),
    //   }; 
}

