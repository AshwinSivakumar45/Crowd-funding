import React, { useState } from 'react';
import ManageUsers from './ManageUser';
import HandleCampaigns from './HandleCampaign';
import VerifyWithdrawals from './Withdrawal';
import ApproveCampaigns from './AdminCampaign';
import DonationTable from './Donation';
import { useEffect } from 'react';
import axios from 'axios';


const ContentArea = ({ selectedOption }) => {

    const[Admin,setAdmin] = useState("")

    useEffect(()=>{
      const Dashboard =  async()=>{
        console.log("hi");
        let data = "hi"
        
          try {
            let result = await axios.get("http://localhost:1000/data",{
              data
            })
            console.log(result);
            
            setAdmin(result.data)

            console.log(Admin);
            
          } catch (error) {
            console.log(error);
            
          }
      }

      Dashboard()
    },[])

    

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">{selectedOption}</h1>

      {selectedOption === 'Dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700">Total Users</h2>
            <p className="text-3xl font-semibold text-green-600">{Admin.UserLength}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700">Active Campaigns</h2>
            <p className="text-3xl font-semibold text-green-600">{Admin.Campaignslength}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700">Total Donations</h2>
            <p className="text-3xl font-semibold text-green-600">{`$ ${Admin.totalAmountRaised}`}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700">Pending Withdrawals</h2>
            <p className="text-3xl font-semibold text-green-600">$5,200</p>
          </div>

          {/* New Section: Quick Overview */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 p-6 bg-white rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-700">Total Campaigns Approved</p>
                <p className="text-lg font-semibold text-green-600">{Admin.Campaignslength}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Users Awaiting Verification</p>
                <p className="text-lg font-semibold text-green-600">{Admin.pendingCount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Pending Withdrawal Requests</p>
                <p className="text-lg font-semibold text-green-600">4</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">New Donations This Week</p>
                <p className="text-lg font-semibold text-green-600">${Admin.totalAmountLast7Days}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'Manage Users' && <ManageUsers/>}
      {selectedOption === 'Approve Campaigns' && <ApproveCampaigns/>}
      {selectedOption === 'Handle Campaigns' && <HandleCampaigns/>}
      {selectedOption === 'Verify Withdrawals' && <VerifyWithdrawals/>}
      {selectedOption === 'Donation Handler' && <DonationTable/>}
    </div>
  );
};

export default ContentArea;
