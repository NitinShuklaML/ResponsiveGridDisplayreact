import React, { useState } from "react";


const SearchComponent = ({ onSubmit }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchCriteria, setSearchCriteria] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ searchTerm, searchCriteria });
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-60">
                    <input
                        style={{width:"100%", height:"80%"}}
                        type="text"
                        value={searchTerm}
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-25">
                    <select className="dropdown"
                        value={searchCriteria}
                        onChange={(e) => setSearchCriteria(e.target.value)}>
                        <option value="1">Contains</option>
                        <option value="2">Equals</option>
                    </select>
               </div>
                <div className="col-10">
                    <button className="button" type="submit">Search</button>
                </div>
            </div>                    
        </form>

    );
}

export default SearchComponent;