import React, { useState } from "react";
import PropTypes from "prop-types";

const LacakPermohonanForm = ({ onSearch, loading, error }) => {
  const [no_reg, setNoReg] = useState("");

  const handleInputChange = (e) => {
    setNoReg(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    onSearch(no_reg);
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg shadow-lg p-8 max-w-xl mx-auto mt-12 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Lacak Permohonan Layanan
        </h1>
        <p className="text-m text-gray-600 mb-6">
          Masukkan No. Registrasi untuk melacak Permohonan
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error message if any */}
        <form
          onSubmit={handleFormSubmit}
          className="space-y-4 bg-white shadow-md rounded-lg p-6"
        >
          <input
            type="text"
            value={no_reg}
            onChange={handleInputChange}
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-green-600 focus:border-green-600 rounded-lg"
            placeholder="Masukkan No. Registrasi"
          />
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none transition duration-200"
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <span className="animate-spin inline-block w-5 h-5 border-4 border-t-transparent border-white rounded-full"></span>
            ) : (
              "Lacak Permohonan"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

LacakPermohonanForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default LacakPermohonanForm;
