import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import * as XLSX  from "xlsx";
import "./CashApprove.css"

function CashApprove() {

    const [listOfPost, setListOfPost] = useState([]);

    const [ searchId, setSearchId ] = useState("");

    // const [total, setTotal] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/cash", { withCredentials: true }).then((response) => {
            if(response.data.error)
            {
                alert(response.data.error);
            }else{
                setListOfPost(response.data);
            }
        });
    }, []);

    const download = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(listOfPost.filter((value) => value.request === true));

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "Cash_Disapprove_Table.xlsx");
    }

    const items = listOfPost.filter((val) => val.request === true );
    const countItems = items.length;


        // useEffect(() => {
        //     let sum = 0;
        //     listOfPost.forEach(item => {
        //         if(item.request === true){
        //             sum += item.amount;
        //         }
        //     });
        //     setTotal(sum);
        // }, [])

return (
    <div>
        <Home/>
        <div className="approve-request-container">
            <p style={{ paddingLeft:"2vw" }} >Approve Requests: { countItems }</p>
        </div>
        <br></br>
        <h2 className="headerTitle">CASH APPROVE</h2>
        <FaSearch className="search-icon"/>
            <input
                type="text"
                placeholder="Search First Name..."
                onChange={(event) => {
                    setSearchId(event.target.value);
                }}
                className="searchDonator"    
            />
        <div style={{ overflow:"scroll", maxHeight:"28vw" }}>
            <table className="tblRequest" style={{ maxWidth:"100%" }}>
                <thead>
                    <tr>
                        <th>Classification</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Status</th>
                        <th>Approve By</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOfPost.filter((value) => {
                            if( searchId === "" ){
                                return value.request === true;
                            }else if (value.firstName.toLowerCase().includes(searchId.toLowerCase().trim())){
                                return value.request === true;
                            }
                        }).map((value, key)=>{
                            return (
                                <tr key={key}>
                                    <td>{value.type}</td>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.transactionID}</td>
                                    <td>{value.request}Approve</td>
                                    <td>{value.username}</td>
                                    <td type='submit' onClick={() => {navigate(`/cashupdaterequest/${value.id}`)}}><BsFillCheckCircleFill type='submit' onClick={() => {navigate(`/cashupdaterequest/${value.id}`)}} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        {/* <p>Total Cash Approve: {total}</p> */}
            <button onClick={download} className="btnDownload">Download</button>
    </div>
)
}

export default CashApprove;
