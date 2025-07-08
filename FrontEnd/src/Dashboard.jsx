import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const ticketStats = [
    { name: "Mon", tickets: 40 },
    { name: "Tue", tickets: 80 },
    { name: "Wed", tickets: 55 },
    { name: "Thur", tickets: 90 },
    { name: "Fri", tickets: 95 },
    { name: "Sat", tickets: 60 },
  ];

  const ticketLine = [
    { name: "Jan", created: 20, solved: 15 },
    { name: "Feb", created: 35, solved: 25 },
    { name: "Mar", created: 45, solved: 40 },
    { name: "Apr", created: 68, solved: 55 },
    { name: "May", created: 60, solved: 68 },
    { name: "Jun", created: 55, solved: 45 },
    { name: "Jul", created: 70, solved: 60 },
  ];

  const ticketType = [
    { name: "Sales", value: 25 },
    { name: "Setup", value: 12 },
    { name: "Bug", value: 19 },
    { name: "Features", value: 44 },
  ];

  const newVsReturned = [
    { name: "New Tickets", value: 38.2 },
    { name: "Returned Tickets", value: 61.8 },
  ];

  const COLORS = ["#00C49F", "#FF00FF", "#0088FE", "#FFBB28"];

  return (
    <div className="min-h-screen bg-[#1E1F2F] text-white p-6 font-sans">
      <div className="flex">
        <aside className="w-64 bg-[#151627] rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">CRM Dashboard</h2>
          <nav className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400">PROFILE</h3>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">REPORT</h3>
              <ul className="pl-2">
                <li className="text-purple-400">Graphs</li>
                <li>Texts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">CHANNELS</h3>
              <ul className="pl-2">
                <li>Email</li>
                <li>Phone Call</li>
                <li>Online Chat</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-gray-400">TICKETS STATUS</h3>
              <ul className="pl-2">
                <li>Created</li>
                <li>Open</li>
                <li>Responded</li>
                <li>Solved</li>
                <li>Other</li>
                <li>Deleted</li>
              </ul>
            </div>
          </nav>
          <button className="mt-8 bg-purple-500 px-4 py-2 rounded-lg w-full">
            Download
          </button>
        </aside>

        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl">
              <p className="text-sm">Avg First Reply Time</p>
              <h1 className="text-3xl font-bold">30h 15min</h1>
            </div>
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-xl">
              <p className="text-sm">Avg Full Resolve Time</p>
              <h1 className="text-3xl font-bold">22h 40min</h1>
            </div>
            <div className="flex flex-col justify-around">
              <p className="text-pink-300">
                Messages <span className="float-right">20%</span>
              </p>
              <p className="text-cyan-300">
                Emails <span className="float-right">+33%</span>
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#151627] p-4 rounded-xl">
              <h3 className="mb-4">Tickets Created vs Tickets Solved</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={ticketLine}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="created"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="solved"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#151627] p-4 rounded-xl">
              <h3 className="mb-4">First Reply and Full Resolve Time</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={ticketLine}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="created"
                    stroke="#00FFFF"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#151627] p-4 rounded-xl">
              <h3 className="mb-4">Tickets By Type</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={ticketType} dataKey="value" outerRadius={80}>
                    {ticketType.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#151627] p-4 rounded-xl">
              <h3 className="mb-4">New Tickets vs Returned Tickets</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={newVsReturned}
                    innerRadius={50}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {newVsReturned.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#151627] p-4 rounded-xl">
              <h3 className="mb-4">Number of Tickets / Week Day</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ticketStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tickets" fill="#00FFFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
