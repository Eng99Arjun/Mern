import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";



export const SendMoney = () =>{

    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [amount, setAmount] = useState(0);
    const id = searchParams.get('id');

    const [number, setNumber] = useState(10);


    return <div className="flex justify-center h-screen bg-gray-100">

        

        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>          
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white ">{name ? name[0].toUpperCase(): 'H'}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                   
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"  htmlFor="amount">Amount(in Rs.)</label>
                            <input 
                            type="number"
                            onChange={(e) => {setAmount(e.target.value); }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            id="amount"
                            placeholder="Enter Amount"
                             />
                        </div>
                        <button
                                onClick={() => {
                                    // Convert amount to number and validate
                                    const numericAmount = Number(amount);
                                    
                                    // Frontend validation
                                    if (!id || id === "undefined") {
                                        alert("Invalid recipient selected");
                                        return;
                                    }
                                    if (isNaN(numericAmount)) {
                                        alert("Please enter a valid amount");
                                        return;
                                    }
                                    if (numericAmount <= 0) {
                                        alert("Amount must be greater than 0");
                                        return;
                                    }
                            
                                    axios.post("http://localhost:3000/api/v1/account/transfer", {
                                        to: id,
                                        amount: numericAmount
                                    }, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    })
                                    .then(response => {
                                        alert("Transfer successful!");
                                        // Optional: Redirect or clear form
                                    })
                                    .catch(error => {
                                        console.error("Transfer error:", error.response?.data);
                                        const errorMessage = error.response?.data?.message || 
                                                          "Transfer failed. Please try again.";
                                        alert(errorMessage);
                                    });
                                }} 
                            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                        >Initiate Transfer</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
}