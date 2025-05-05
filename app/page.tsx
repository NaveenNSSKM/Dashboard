"use client";
import { useState } from 'react';
import { LineChart, BarChart, PieChart, Cell, Pie, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TooltipProps } from 'recharts';

// Sample data for the dashboard
const campaignMetrics = {
  impressionsServed: 560354,
  impressionsRemaining: 440646,
  campaignCompletion: 56,
  clicks: 1341,
  ctr: 0.586
};

interface LegendEntry {
  name: string;
  color: string;
}

const monthlyData = [
  { month: 'jan', investment: 300, cost: 200, revenue: 400 },
  { month: 'feb', investment: 250, cost: 150, revenue: 230 },
  { month: 'mar', investment: 200, cost: 120, revenue: 80 },
  { month: 'apr', investment: 180, cost: 100, revenue: 250 },
  { month: 'may', investment: 220, cost: 180, revenue: 350 },
  { month: 'jun', investment: 150, cost: 120, revenue: 150 },
  { month: 'jul', investment: 280, cost: 220, revenue: 650 },
  { month: 'aug', investment: 220, cost: 180, revenue: 320 },
  { month: 'sep', investment: 580, cost: 400, revenue: 820 },
  { month: 'oct', investment: 180, cost: 150, revenue: 100 },
  { month: 'nov', investment: 260, cost: 180, revenue: 280 },
  { month: 'dec', investment: 340, cost: 220, revenue: 580 }
];

const accountData = [
  { name: 'DHL EXPRESS (INDIA) PRIVATE LIMITED', identified: 3, engaged: 2, converted: 95 },
  { name: 'TORRENT INVESTMENTS PRIVATE LIMITED', identified: 2, engaged: 3, converted: 95 },
  { name: 'SECURITIES & EXCHANGE BOARD OF INDIA', identified: 2, engaged: 1, converted: 97 },
  { name: 'SVC CO-OPERATIVE BANK LIMITED', identified: 3, engaged: 2, converted: 95 },
  { name: 'POONAWALLA GROUP', identified: 2, engaged: 1, converted: 97 },
  { name: 'ABHYUDAYA CO-OPERATIVE BANK LIMITED', identified: 2, engaged: 1, converted: 97 },
  { name: 'EQUIFAX CREDIT INFORMATION SERVICES PRIVATE LIMITED', identified: 3, engaged: 2, converted: 95 },
  { name: 'TRENT LIMITED', identified: 8, engaged: 7, converted: 85 },
  { name: 'WISTRON CORPORATION', identified: 2, engaged: 1, converted: 97 },
  { name: 'PIRAMAL ENTERPRISES LIMITED', identified: 2, engaged: 1, converted: 97 },
  { name: 'SOLAR INDUSTRIES INDIA LIMITED', identified: 2, engaged: 1, converted: 97 },
  { name: 'FIRST DATA (INDIA) PRIVATE LIMITED', identified: 2, engaged: 1, converted: 97 },
  { name: 'THE HERO GROUP COMPANIES', identified: 2, engaged: 1, converted: 97 },
  { name: 'HERO MOTOCORP LIMITED', identified: 2, engaged: 1, converted: 97 },
  { name: 'PINE LABS PRIVATE LIMITED', identified: 2, engaged: 1, converted: 97 },
  { name: 'PAYTM E-COMMERCE PRIVATE LIMITED', identified: 8, engaged: 7, converted: 85 },
  { name: 'STAR INDIA PRIVATE LIMITED', identified: 2, engaged: 1, converted: 97 },
  { name: 'NEWGEN SOFTWARE TECHNOLOGIES LIMITED', identified: 8, engaged: 7, converted: 85 },
  { name: 'NTPC LIMITED', identified: 8, engaged: 7, converted: 85 },
  { name: 'EICHER MOTORS LIMITED', identified: 8, engaged: 7, converted: 85 },
  { name: 'Other (120)', identified: 15, engaged: 5, converted: 80 }
];

// Data for Company Size chart
const companySizeData = [
  { name: '1-10: 15%', value: 15, color: '#1a365d' },
  { name: '51-200: 25%', value: 25, color: '#3b82f6' },
  { name: '201-500: 15%', value: 15, color: '#0d9488' },
  { name: '501-1000: 10%', value: 10, color: '#1e293b' },
  { name: '1001-3000: 8%', value: 8, color: '#6b7280' },
  { name: '5000+: 7%', value: 7, color: '#be185d' }
];

// Data for Job Level chart
const jobLevelData = [
  { name: 'C-Suite: 10%', value: 10, color: '#1a365d' },
  { name: 'Director: 15%', value: 15, color: '#2563eb' },
  { name: 'Manager: 40%', value: 40, color: '#3b82f6' },
  { name: 'VP: 15%', value: 15, color: '#1e293b' },
  { name: 'Other: 20%', value: 20, color: '#0d9488' }
];

// Data for Revenue chart
const geographyData = [
  { name: 'America', value: 30, color: '#1a365d' },
  { name: 'India', value: 30, color: '#2563eb' },
  { name: 'South Africa', value: 10, color: '#6b7280' },
  { name: 'Australia', value: 20, color: '#1e293b' },
  { name: 'Europe', value: 10, color: '#0d9488' },
  
];


const COLORS = [
  '#282c72', // dark blue
  '#3c4ec9', // blue
  '#36a2eb', // light blue
  '#4bc0c0', // teal
  '#212121', // black
  '#757575', // gray
];



// Custom Legend component
const renderLegend = (data: LegendEntry[]) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {data.map((entry: LegendEntry, index: number) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-5 h-5 rounded-sm mr-2"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs text-gray-600">{entry.name}</span>
        </div>
      ))}
    </div>
  );
};

// Custom Tooltip component
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
        <p className="text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {

  const formatValue = (value: number): string => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
  };
  
  return (
    <div className="bg-gray-100 min-h-screen ">
      <header className="bg-white shadow ">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-semibold text-gray-900">Marketing Analytics Dashboard</h1>
        </div>
      </header>

     


        {/* OverView tab First tab  */}

      <main className="max-w-7xl mx-auto py-6 px-4">
       
          <>
            {/* Campaign Metrics */}
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/5 p-4 bg-[#005A9C] text-white rounded-l-lg md:border-b-0 md:border-r">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <div>
                      <p className="text-xs">IMPRESSIONS SERVED</p>
                      <p className="font-bold text-lg">{formatValue(campaignMetrics.impressionsServed)}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-[#00A6C6] text-white md:border-b-0 md:border-r">
                  <div className="flex items-center">
                  <svg  className="w-5 h-5 mr-2 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z"/>
    <circle cx="12" cy="12" r="3"/>
    <path d="M17 7l-1.5 1.5"/>
  </g>
</svg>
                    <div>
                      <p className="text-xs">IMPRESSIONS REMAINING</p>
                      <p className="font-bold text-lg">{formatValue(campaignMetrics.impressionsRemaining)}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-[#0094F0] text-white md:border-b-0 md:border-r">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="text-xs">CAMPAIGN COMPLETION</p>
                      <p className="font-bold text-lg">{campaignMetrics.campaignCompletion}%</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-[#5C28C0] text-white md:border-b-0 md:border-r">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                    </svg>
                    <div>
                      <p className="text-xs">CLICKS</p>
                      <p className="font-bold text-lg">{formatValue(campaignMetrics.clicks)}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-[#00C7C7] text-white rounded-r-lg md:border-b-0 md:border-r">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <div>
                      <p className="text-xs">CTR</p>
                      <p className="font-bold text-lg">{campaignMetrics.ctr}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Cost & Revenue Chart */}
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-gray-500 text-center mb-4">Custos & Receitas</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value}`, '']} />
                    <Line type="monotone" dataKey="investment" name="Investimento Ads" stroke="#384152" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="cost" name="Custo de Vendas" stroke="#5B9BD5" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="revenue" name="Receita Vendas" stroke="#00B0F0" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Results Chart */}
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-gray-500 text-center mb-4">Resultado</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value}`, '']} />
                    <Bar dataKey="revenue" fill="#1E90FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
       



          {/* accounts tab Second tab  */}

        
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-gray-700 text-xl font-semibold mb-4">Redhat Report - Modified</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
                <span className="text-sm text-gray-600">Identified</span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                <span className="text-sm text-gray-600">Engaged</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-lime-500 mr-2"></div>
                <span className="text-sm text-gray-600">Converted</span>
              </div>
            </div>
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full">
                <tbody>
                  {accountData.map((account, index) => (
                    <tr key={index}>
                      <td className="py-2 pr-8 text-sm font-medium text-gray-700" style={{ width: '30%' }}>
                        {account.name}
                      </td>
                      <td className="py-2" style={{ width: '70%' }}>
                        <div className="flex h-6 rounded-xs overflow-hidden">
                          <div className="bg-indigo-400" style={{ width: `${account.identified}%` }}></div>
                          <div className="bg-orange-400" style={{ width: `${account.engaged}%` }}></div>
                          <div className="bg-lime-500" style={{ width: `${account.converted}%` }}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      



        {/* demographics tab last tab  */}
        
        <div className="bg-gray-100 mt-4">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Company Size */}
              <div className="flex flex-col items-center">
                <h3 className="text-gray-500 mb-2 font-semibold">COMPANY SIZE</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={companySizeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {companySizeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {renderLegend(companySizeData)}
              </div>
              
              {/* Job Level */}
              <div className="flex flex-col items-center">
                <h3 className="text-gray-500 mb-2 font-semibold">JOB LEVEL</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={jobLevelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {jobLevelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {renderLegend(jobLevelData)}
              </div>
              
              {/* Revenue */}
              <div className="flex flex-col items-center">
                <h3 className="text-gray-500 mb-2 font-semibold">Geographic</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={geographyData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {geographyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {renderLegend(geographyData)}
              </div>
            </div>
          </div>
        </div>
     

      </main>
    </div>
  );
}
