let kIsUpdated = false;
let kUpdateId = "";
const clearUpdates= ()=>{
    kIsUpdated=false;
    kUpdateId="";
}
const setIsUpdated= (value)=>{kIsUpdated=value};
const setUpdateId= (id)=>{kUpdateId = id}
export {kUpdateId,kIsUpdated,setIsUpdated,setUpdateId,clearUpdates}