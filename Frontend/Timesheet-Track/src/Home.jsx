import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="font-sans text-gray-900 bg-white p-0 m-0">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-gray-100 border-b-2 border-indigo-700">
        <h1 className="text-2xl font-bold text-indigo-700">Alferix Timesheet</h1>
        <div>
          <Link to="/login">
            <button className="px-4 py-2 font-semibold border-2 border-indigo-700 text-indigo-700 rounded-md transition-colors duration-300 hover:bg-indigo-700 hover:text-white">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-8 bg-gray-200">
        <h1 className="text-4xl mb-4 text-indigo-700">Empowering Productivity with Precision</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-700">
          A comprehensive timesheet tracking tool for Alferix teams to log, manage, and analyze work hours.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl text-center text-indigo-700 mb-8">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl text-indigo-700 mb-2">Daily Logs</h3>
            <p className="text-gray-600">
              Enter your work hours, breaks, and comments in an intuitive interface.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl text-indigo-700 mb-2">Project-Based Tracking</h3>
            <p className="text-gray-600">
              Assign hours to specific projects or tasks for accurate accountability.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl text-indigo-700 mb-2">Approval Workflow</h3>
            <p className="text-gray-600">
              Managers can review, approve, or reject entries in real-time.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl text-indigo-700 mb-2">Detailed Reports</h3>
            <p className="text-gray-600">
              Export timesheets in Excel/PDF with breakdowns by day, project, or team.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl text-indigo-700 mb-2">Secure Access</h3>
            <p className="text-gray-600">
              Role-based login system with secure data encryption and backups.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl text-indigo-700 mb-2">Integration Ready</h3>
            <p className="text-gray-600">
              Future-ready to connect with HRMS, payroll, and attendance systems.
            </p>
          </div>
        </div>
      </section>

      {/* Timesheet Overview */}
      <section className="text-center py-12 px-8 bg-gray-100">
        <h2 className="text-3xl mb-4 text-indigo-700">Why Use Alferix Timesheet Tool?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600">
          Designed specifically for Alferix teams across North America and Asia, our tool enhances transparency,
          accountability, and efficiency—whether you're on-site or remote.
        </p>
        <ul className="list-none text-lg text-gray-700 mx-auto">
          <li className="mb-2">✔ Align work hours with project goals</li>
          <li className="mb-2">✔ Reduce manual reporting</li>
          <li className="mb-2">✔ Easy review and approval system</li>
          <li className="mb-2">✔ Centralized for company-wide analytics</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16 px-8 border-t-2 border-indigo-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl text-indigo-700 mb-2">North America</h4>
            <p><strong>Alferix Inc</strong></p>
            <p>8300 Cypress Creek Pkwy Ste 450, Houston, TX 77070</p>
            <p>contact@alferix.com</p>
            <p>(+1) 346 336 9373</p>
          </div>
          <div>
            <h4 className="text-xl text-indigo-700 mb-2">Asia</h4>
            <p><strong>Alferix Infotech Private Limited</strong></p>
            <p>5/3, Sri Radha Towers, 2nd floor, Namachivaya Nagar Extn, Saravanampatti,</p>
            <p>Coimbatore, Tamil Nadu – 641035</p>
            <p>contact@alferix.com</p>
            <p>(+1) 346 336 9373</p>
          </div>
          <div>
            <h4 className="text-xl text-indigo-700 mb-2">Quick Links</h4>
            <p><Link to="/privacy">Privacy</Link></p>
            <p><Link to="/cookies">Cookies</Link></p>
            <p><Link to="/terms">Terms of Use</Link></p>
          </div>
        </div>
        <div className="text-center border-t border-gray-300 pt-4 text-sm text-gray-500">
          <p>© 2025 Alferix. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
