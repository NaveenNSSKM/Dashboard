"use client";

import React, { useEffect, useState } from "react";
import { 
  Wallet, 
  Bell, 
  User, 
  BarChart3, 
  Package, 
  Users, 
  FileText, 
  Stamp,
  Barcode,
  Calendar,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { Menu, X } from "lucide-react";
import { FiPackage, FiClock, FiCheckCircle, FiXCircle,FiTrendingUp,FiTrendingDown } from "react-icons/fi";
import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  { name: "Initiated", value: 30, color: "#E0E0E0" }, // Light gray
  { name: "Pending", value: 20, color: "#A855F7" }, // Purple
  { name: "Signed", value: 40, color: "#6B21A8" }, // Dark Purple
  { name: "Expired", value: 10, color: "#D8B4FE" }, // Light Purple
];
// Custom number formatter for Indian currency format
const formatIndianCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  });
  return formatter.format(number);
};

export default function Dashboard() {
  // Format the date consistently
  const [currentDate] = useState(() => {
    return new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'long'
    });
  });
  
  const [currentBalance] = useState(250000);
  const formattedBalance = formatIndianCurrency(currentBalance);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsClient(true); // Ensures this runs only on the client side
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch by rendering onl
  return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Image
              width={75}
              height={25}
              src="https://doqfy.in/assets/header/Logo.svg"
              alt="Logo"
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 text-sm font-semibold">
              <a href="#" className="text-gray-700 hover:text-gray-900">Services</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">User Management</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">My Orders</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Reports</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Stamp Inventory</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Barcode</a>
              <a href="#" className="text-gray-400 hover:text-gray-200">Invoice</a>
              <div className="bg-violet-100 text-violet-800 text-xs px-2 py-0.5 rounded-full ml-2">
                <span>Coming Soon</span>
              </div>
            </nav>
          </div>

          {/* Right Side - Icons & User */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <button className="flex items-center space-x-2">
              <User className="h-6 w-6 text-gray-600" />
              <span className="hidden md:inline text-gray-700">Michael</span>
            </button>

            {/* Hamburger Menu - Mobile Only */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 bg-white shadow-md rounded-lg p-4"
            >
              <nav className="flex flex-col space-y-2 text-sm font-semibold">
                <a href="#" className="text-gray-700 hover:text-gray-900">Services</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">User Management</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">My Orders</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Reports</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Stamp Inventory</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Barcode</a>
                <a href="#" className="text-gray-400 hover:text-gray-200">Invoice</a>
                <div className="bg-violet-100 min-w-[80px] text-center text-violet-800 text-xs px-2 py-0.5 rounded-full">
  <span>Coming Soon</span>
</div>


              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold"> 👏 Welcome back, Michael</h2>
    </div>
    <div className="text-sm text-gray-400">{currentDate}</div>
  </div>



  <div className="bg-white rounded-lg shadow p-6">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-2">
      <h2 className="text-lg font-semibold">My Wallet</h2>
    </div>
    {/* Wallet Icon on the Right Side */}
    <Wallet className="h-5 w-5 text-violet-900" />
  </div>
  <div className="mb-2">
    <div className="text-2xl font-bold">₹ {formattedBalance}</div>
    <div className="text-sm text-gray-400">Current Balance</div>
  </div>
  {/* Underlined Notify Admin Button */}
  <button className="text-sm text-violet-900 hover:text-violet-700 ">
    Running low?<span className="underline">Notify admin</span>  now
  </button>
</div>


            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Pending Actions</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {[1, 2, 3,4,5].map((item) => (
                  <div key={item} className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">#TRD35468</span>
                      <span className="text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-1 rounded-md">
  10 days left
</span>

                    </div>
                    <p className="text-sm text-gray-600">
                      2 files are waiting to be uploaded
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
          <div className="text-left text-lg font-semibold">Frequently Used</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
             
              <div className="bg-white p-6 rounded-lg border-2 border-violet-900 shadow">
                <h3 className="text-sm font-semibold mb-4">Contract Execution Upload</h3>
                <p className="text-gray-600 mb-4 text-xs">Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet</p>
                <button className="text-violet-900 hover:text-blue-700">Get Started →</button>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-violet-900 shadow">
                <h3 className="text-sm font-semibold mb-4">E-Stamp Services</h3>
                <p className="text-gray-600 mb-4  text-xs">Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet</p>
                <button className="text-violet-900 hover:text-blue-700">Get Started →</button>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-violet-900 shadow">
                <h3 className="text-sm font-semibold mb-4">E-Signature Services</h3>
                <p className="text-gray-600 mb-4  text-xs">Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem</p>
                <button className="text-violet-900 hover:text-blue-700 ">Get Started →</button>
              </div>
            </div>
            <div className="text-sm flex flex-col sm:flex-row justify-between items-center w-full px-4 py-2 space-y-2 sm:space-y-0">
  {/* Left: Branch Dropdown (Aligned to Left Corner) */}
  <div className="relative  border border-gray-300 rounded-lg px-6 py-2 w-full sm:w-auto">
    <select className="appearance-none bg-transparent w-full focus:outline-none">
      <option>All Branches</option>
      <option>Branch 1</option>
      <option>Branch 2</option>
    </select>
    <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-500" />
  </div>

  {/* Right Side: Custom Range Dropdown & Calendar (Aligned to Right Corner) */}
  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
    {/* Custom Range Dropdown */}
    <div className="relative border border-gray-300e rounded-lg px-6 py-2 shadow w-full sm:w-auto">
      <select className="appearance-none bg-transparent w-full focus:outline-none">
        <option>Custom Range</option>
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
      </select>
      <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-500" />
    </div>

    {/* Calendar Icon + Date */}
    <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 shadow w-full sm:w-auto">
     
      <span className="text-gray-700 font-medium">March 2020</span>
      <Calendar className="h-5 w-5 text-gray-500" />
    </div>
  </div>
</div>



<div className="bg-white p-6 rounded-lg border border-white shadow">
      {/* Heading & View All Link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Order Details</h2>
        <a href="#" className="text-violet-900 underline text-sm">View All</a>
      </div>

      {/* Order Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Orders */}
        <div className="bg-violet-50 p-6 rounded-lg shadow relative">
          <FiPackage className="text-purple-700 text-4xl absolute top-4 right-4" />
          <div className="text-2xl font-bold text-gray-800">18</div>
          <div className="text-sm text-gray-400 mt-2">Total Orders</div>
          <div className="flex items-center gap-1 text-xs mt-1">
            <FiTrendingUp className="text-green-500" />
            <span className="text-gray-500">+2.4%</span>
          </div>
          
        </div>

        {/* In Progress */}
        <div className="bg-violet-50 p-6 rounded-lg shadow relative">
          <FiClock className="text-purple-700 text-4xl absolute top-4 right-4" />
          <div className="text-2xl font-bold text-gray-800">10</div>
          <div className="text-sm text-gray-400 mt-2">In Progress</div>
          <div className="flex items-center gap-1 text-xs mt-1">
            <FiTrendingUp className="text-green-500" />
            <span className="text-gray-500">+2.4%</span>
          </div>
         
        </div>

        {/* Completed Order */}
        <div className="bg-violet-50 p-6 rounded-lg shadow relative">
          <FiCheckCircle className="text-purple-700 text-4xl absolute top-4 right-4" />
          <div className="text-2xl font-bold text-gray-800">5</div>
          <div className="text-sm text-gray-400 mt-2">Completed Order</div>
          <div className="flex items-center gap-1 text-xs mt-1">
            <FiTrendingUp className="text-green-500" />
            <span className="text-gray-500">+2.4%</span>
          </div>
          
        </div>

        {/* Cancelled Order */}
        <div className="bg-violet-50 p-6 rounded-lg shadow relative">
          <FiXCircle className="text-purple-700 text-4xl absolute top-4 right-4" />
          <div className="text-2xl font-bold text-gray-800">3</div>
          <div className="text-sm text-gray-400 mt-2">Cancelled Order</div>
          <div className="flex items-center gap-1 text-xs mt-1">
            <FiTrendingDown className="text-red-500" />
            <span className="text-gray-500">+2.4%</span>
          </div>
        
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
  {/* E-Sign Count (First Card) */}
  <div className="bg-white p-6 rounded-md shadow-md w-full">
    <h3 className="text-lg font-semibold mb-4 border-b pb-2">E-Sign Count</h3>
    <div className="flex items-center justify-between">
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 inline-block rounded"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-600 text-sm">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Donut Chart */}
      <div className="w-28 h-28 flex justify-center items-center relative">
        <PieChart width={110} height={110}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={45}
            fill="#8884d8"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute text-center">
          <p className="text-xs font-bold">30k</p>
          <p className="text-xs text-gray-600">Initiated</p>
        </div>
      </div>
    </div>
  </div>

  {/* E-Stamp Count (Second Card) */}
  <div className="bg-white p-6 rounded-md shadow-md w-full">
    <h3 className="text-lg font-semibold mb-4 border-b pb-2">E-Stamp Count</h3>
    <div className="flex items-center justify-between">
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 inline-block rounded"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-600 text-sm">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Donut Chart */}
      <div className="w-28 h-28 flex justify-center items-center relative">
        <PieChart width={110} height={110}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={45}
            fill="#8884d8"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute text-center">
          <p className="text-xs font-bold">30k</p>
          <p className="text-xs text-gray-600">Initiated</p>
        </div>
      </div>
    </div>
  </div>



    
    
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}