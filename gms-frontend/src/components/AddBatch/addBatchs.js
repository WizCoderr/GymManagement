import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBatch = ({ handleClose }) => {
  const [inputField, setInputField] = useState({
    batchName: "",
    startTime: "",
    endTime: "",
    trainer: "",
    capacity: "",
    price: ""
  });

  const [batches, setBatches] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fetchBatches = async () => {
    try {
      const res = await axios.get("http://localhost:4000/batches/get-batches", {
        withCredentials: true
      });
      setBatches(res.data.batches);
      toast.success(`${res.data.batches.length} Batches Fetched`);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching batches");
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleAddBatch = async () => {
    try {
      const requestPayload = {
        name: inputField.batchName,
        startTime: inputField.startTime,
        endTime: inputField.endTime,
        trainer: inputField.trainer,
        capacity: Number(inputField.capacity),
        price: Number(inputField.price)
      };

      const response = await axios.post(
        "http://localhost:4000/batches/create-batch",
        requestPayload,
        {
          withCredentials: true
        }
      );
      toast.success(response.data.message);
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="text-black p-4">
      {/* Show Existing Batches */}
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {batches.map((item, index) => (
          <div
            key={index}
            className="text-lg bg-slate-900 text-white border-2 px-4 py-2 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <div>{item.batchName}</div>
            <div>{item.trainer}</div>
            <div>
              {item.startTime} - {item.endTime}
            </div>
            <div>Capacity: {item.capacity}</div>
            <div>Rs {item.price}</div>
          </div>
        ))}
      </div>

      <hr className="mt-10 mb-10" />

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-md font-semibold mb-1">Batch Name</label>
          <input
            value={inputField.batchName}
            onChange={(e) => handleOnChange(e, "batchName")}
            className="border-2 rounded-lg text-lg w-full p-2"
            type="text"
            placeholder="Enter Batch Name"
          />
        </div>

        <div>
          <label className="block text-md font-semibold mb-1">Trainer Name</label>
          <input
            value={inputField.trainer}
            onChange={(e) => handleOnChange(e, "trainer")}
            className="border-2 rounded-lg text-lg w-full p-2"
            type="text"
            placeholder="Enter Trainer Name"
          />
        </div>

        <div>
          <label className="block text-md font-semibold mb-1">Start Time</label>
          <input
            value={inputField.startTime}
            onChange={(e) => handleOnChange(e, "startTime")}
            className="border-2 rounded-lg text-lg w-full p-2"
            type="time"
          />
        </div>

        <div>
          <label className="block text-md font-semibold mb-1">End Time</label>
          <input
            value={inputField.endTime}
            onChange={(e) => handleOnChange(e, "endTime")}
            className="border-2 rounded-lg text-lg w-full p-2"
            type="time"
          />
        </div>

        <div>
          <label className="block text-md font-semibold mb-1">Capacity</label>
          <input
            value={inputField.capacity}
            onChange={(e) => handleOnChange(e, "capacity")}
            className="border-2 rounded-lg text-lg w-full p-2"
            type="number"
            placeholder="Enter Capacity"
          />
        </div>

        <div>
          <label className="block text-md font-semibold mb-1">Price (INR)</label>
          <input
            value={inputField.price}
            onChange={(e) => handleOnChange(e, "price")}
            className="border-2 rounded-lg text-lg w-full p-2"
            type="number"
            placeholder="Enter Price"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div
        onClick={handleAddBatch}
        className="text-lg border-2 px-4 py-2 w-fit rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        Add +
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddBatch;