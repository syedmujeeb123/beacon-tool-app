import { useState, useEffect, useRef } from "react";

export default function RotatingLogo() {
  const [showOperationClients, setShowOperationClients] = useState(false);
  const [showTechClients, setShowTechClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const operationDivRef = useRef(null);
  const techDivRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      operationDivRef.current &&
      !operationDivRef.current.contains(event.target)
    ) {
      setShowOperationClients(false);
    }
    if (techDivRef.current && !techDivRef.current.contains(event.target)) {
      setShowTechClients(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOperationClick = () => {
    setShowOperationClients((prev) => !prev);
    setShowTechClients(false);
  };

  const handleTechClick = () => {
    setShowTechClients((prev) => !prev);
    setShowOperationClients(false);
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-2 left-1 z-50 text-white p-1 rounded-md shadow-lg"
        onClick={toggleSidebar}
      >
        <div className="w-5 h-[3px] bg-red-500 mb-1"></div>
        <div className="w-5  h-[3px] bg-red-500 mb-1"></div>
        <div className="w-5  h-[3px] bg-red-500"></div>

        {/* {isSidebarOpen ? "Close" : "Open"} */}
      </button>

      {/* Sidebar for Mobile View */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40">
          <div className="bg-white h-full w-2/3 max-w-xs shadow-lg p-4">
            <button
              className=" -mt-1 -mr-2 text-red-500 font-bold ml-auto block"
              onClick={toggleSidebar}
            >
              Close
            </button>

            <div className="flex mt-12 justify-center items-center gap-4">
              <div onClick={handleOperationClick}>
                <div className="relative w-14 h-14 rounded-full border-4 border-yellow-500 animate-slow-spin">
                  <div className="absolute inset-2 rounded-full flex justify-center items-center">
                    <span className="text-[10px] font-bold text-yellow-600 text-center">
                      Ops. Clients
                    </span>
                  </div>
                  <div className="absolute w-2 h-2 bg-yellow-500 rounded-full top-1 left-1 animate-bounce"></div>
                  <div className="absolute w-2 h-2 bg-yellow-500 rounded-full bottom-1 right-1 animate-bounce"></div>
                </div>
              </div>
              <div onClick={handleTechClick}>
                <div className="relative w-14 h-14 rounded-full border-4 border-yellow-500 animate-slow-spin">
                  <div className="absolute inset-2 rounded-full flex justify-center items-center">
                    <span className="text-[10px] font-bold text-yellow-600 text-center">
                      Tech. Clients
                    </span>
                  </div>
                  <div className="absolute w-2 h-2 bg-yellow-500 rounded-full top-1 left-1 animate-bounce"></div>
                  <div className="absolute w-2 h-2 bg-yellow-500 rounded-full bottom-1 right-1 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medium and Larger Screens */}
      <div className="md:flex hidden justify-center items-center mb-2 mt-6 gap-4">
        {/* Operation Clients Button */}
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={handleOperationClick}
        >
          <div className="relative w-14 h-14 rounded-full border-4 border-yellow-500 animate-slow-spin">
            <div className="absolute inset-2 rounded-full flex justify-center items-center">
              <span className="text-[10px] font-bold text-yellow-600 text-center">
                Ops. Clients
              </span>
            </div>
            <div className="absolute w-2 h-2 bg-yellow-500 rounded-full top-1 left-1 animate-bounce"></div>
            <div className="absolute w-2 h-2 bg-yellow-500 rounded-full bottom-1 right-1 animate-bounce"></div>
          </div>
        </div>

        {/* Selected Client Details */}
        <div className="px-3 py-2 border-yellow-500 border-4 rounded-md">
          {selectedClient ? (
            <div>
              <p>{selectedClient.name}</p>
            </div>
          ) : (
            <p>No client selected</p>
          )}
        </div>

        {/* Tech Clients Button */}
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={handleTechClick}
        >
          <div className="relative w-14 h-14 rounded-full border-4 border-yellow-500 animate-slow-spin">
            <div className="absolute inset-2 rounded-full flex justify-center items-center">
              <span className="text-[10px] font-bold text-yellow-600 text-center">
                Tech. Clients
              </span>
            </div>
            <div className="absolute w-2 h-2 bg-yellow-500 rounded-full top-1 left-1 animate-bounce"></div>
            <div className="absolute w-2 h-2 bg-yellow-500 rounded-full bottom-1 right-1 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Operation Clients Modal */}
      {showOperationClients && (
        <div ref={operationDivRef} className="modal-class">
          <OperationClients
            setSelectedClient={setSelectedClient}
            onClose={() => setShowOperationClients(false)}
          />
        </div>
      )}

      {/* Tech Clients Modal */}
      {showTechClients && (
        <div ref={techDivRef} className="modal-class">
          <TechClients
            setSelectedClient={setSelectedClient}
            onClose={() => setShowTechClients(false)}
          />
        </div>
      )}
    </div>
  );
}

export function OperationClients({ setSelectedClient, onClose }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    onClose(); // Close the modal after selecting a client
  };

  return (
    <div className="p-4 fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-md z-50">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white p-4 rounded-md shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Company</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="odd:bg-gray-100 cursor-pointer"
                    onClick={() => handleClientClick(client)}
                  >
                    <td className="px-4 py-2 border">{client.id}</td>
                    <td className="px-4 py-2 border">{client.name}</td>
                    <td className="px-4 py-2 border">{client.email}</td>
                    <td className="px-4 py-2 border">{client.phone}</td>
                    <td className="px-4 py-2 border">{client.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function TechClients({ setSelectedClient, onClose }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    onClose(); // Close the modal after selecting a client
  };

  return (
    <div className="p-4 fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-md z-50">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white p-4 rounded-md shadow-md">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Company</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="odd:bg-gray-100 cursor-pointer"
                  onClick={() => handleClientClick(client)}
                >
                  <td className="px-4 py-2 border">{client.id}</td>
                  <td className="px-4 py-2 border">{client.name}</td>
                  <td className="px-4 py-2 border">{client.email}</td>
                  <td className="px-4 py-2 border">{client.phone}</td>
                  <td className="px-4 py-2 border">{client.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
