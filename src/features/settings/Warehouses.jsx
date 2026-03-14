import { useState, useEffect } from "react";
import AppTextField from "../../components/AppTextField";
import AppButton from "../../components/AppButton";

import "./Warehouses.css";

export default function Warehouses(){

  const [name,setName] = useState("");
  const [warehouses,setWarehouses] = useState([]);

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("warehouses")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWarehouses(data);
  },[]);

  const addWarehouse = () => {

    if(!name.trim()) return;

    const newWarehouse = {
      id: Date.now(),
      name
    };

    const updated = [...warehouses,newWarehouse];

    setWarehouses(updated);
    localStorage.setItem("warehouses",JSON.stringify(updated));

    setName("");
  };

  const deleteWarehouse = (id) => {

    const updated = warehouses.filter(w => w.id !== id);

    setWarehouses(updated);
    localStorage.setItem("warehouses",JSON.stringify(updated));

  };

  return(

    <div className="warehouse-page">

      <h2>Warehouse Settings</h2>

      <div className="warehouse-form">

        <AppTextField
          label="Warehouse Name"
          placeholder="Enter warehouse"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <AppButton
          text="Add Warehouse"
          onClick={addWarehouse}
          width="200px"
        />

      </div>

      <table className="warehouse-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {warehouses.map(w => (

            <tr key={w.id}>
              <td>{w.name}</td>

              <td>
                <AppButton
                  text="Delete"
                  width="90px"
                  backgroundColor="#dc2626"
                  hoverColor="#b91c1c"
                  onClick={()=>deleteWarehouse(w.id)}
                />
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}