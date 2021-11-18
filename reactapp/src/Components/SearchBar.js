import React, { useState } from "react";
import { ArrowLeftOutlined, StopOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./SearchBar.css";
import { Redirect } from "react-router-dom";

function SearchBar({ placeholder, data }) {

    const[filteredData, setFilteredData] = useState([]);
    const[wordEntered, setWordEntered] = useState("");
    const[id, setId] = useState();
    const[redir, setRedir] = useState(false)

    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = data.filter((value) => {
            return value.titre.toLowerCase().includes(searchWord.toLowerCase());
        });


        if (searchWord === "") {
            setFilteredData([]);
        } else {
        setFilteredData(newFilter);
        }
    }

    const Erase = () => {
        setFilteredData([])
        setWordEntered("");

    }

    // const cetteID = useRef()

    const versPublication = (elem) => {
        console.log("que vaut cet key?", elem)
        if(!redir){
            setId(elem)
            setRedir(true)}
    }

    if (id) {
        console.log("id", id);
        return <Redirect to={`/publication/${id}`} />;
      }


    return (
        <div className="searchBar">
            <div className="search">
                <div className="searchInputs flex-container">
                    <input style={{width:"300px"}} type="text" placeholder={placeholder} onChange={handleFilter} value={wordEntered}></input>
                    <div className="searchIcon">
                        {filteredData.length === 0 ? "" : <StopOutlined id="clearBtn" onClick={Erase}/>}
                        
                    </div>

                </div>
                {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return <div className="dataItem" target="_blank" value={wordEntered}  key={key} id={value._id} onClick={() => {versPublication(value._id)}}><p>{value.titre}</p> </div> 
                    })}
                </div>)}
            </div>
        </div>

    )
}

export default SearchBar;