import { useState } from "react";
import { Layout } from "../layout/Layout";
import { TeamModal } from "../components/team/TeamModal";
import { toast } from "react-hot-toast";

export const Teams = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" or "join"

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setShowModal(true);
  };

  return (
    <div>
      <Layout>
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="w-[45%] flex items-start justify-between flex-row">
            <button
              onClick={() => handleOpenModal("create")}
              className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
            >
              Create a Team
            </button>
            <button
              onClick={() => handleOpenModal("join")}
              className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-green-500 hover:before:[box-shadow:_20px_20px_20px_30px_#2ecc71] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-green-500 relative bg-indigo-800 h-16 w-64 border text-left p-3 text-indigo-200 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-orange-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-pink-500 after:right-8 after:top-3 after:rounded-full after:blur-lg"
            >
              Join a Team
            </button>
          </div>
        </div>

        {showModal && (
          <TeamModal 
            onClose={() => setShowModal(false)}
            initialMode={modalMode}
            onCreate={(team) => {
              toast.success(modalMode === "create" ? "Team created successfully!" : "Joined team successfully!");
              setShowModal(false);
              // Optionally redirect to team page or refresh teams list
            }}
          />
        )}
      </Layout>
    </div>
  );
};
