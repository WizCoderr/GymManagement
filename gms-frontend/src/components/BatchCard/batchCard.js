import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const BatchCard = ({ item }) => {
  const isAvailable = item?.currentMembers < item?.capacity;

  return (
    <Link
      to={`/batch/${item?._id}`}
      className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white cursor-pointer transition duration-300"
    >
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
        <div className="text-center font-bold text-lg">
          <div>{item?.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-300">
            Trainer: {item?.trainer}
          </div>
        </div>
        <CircleIcon
          className="absolute top-0 left-0"
          sx={{ color: isAvailable ? "greenyellow" : "red" }}
        />
      </div>

      <div className="mt-4 text-center space-y-2 font-mono">
        <div className="flex justify-center items-center gap-2 text-xl">
          <AccessTimeIcon fontSize="small" />
          {item?.startTime} - {item?.endTime}
        </div>

        <div className="flex justify-center items-center gap-2 text-xl">
          <GroupIcon fontSize="small" />
          {item?.currentMembers}/{item?.capacity} Members
        </div>

        <div className="flex justify-center items-center gap-2 text-xl">
          <AttachMoneyIcon fontSize="small" />
          ₹{item?.price}
        </div>
      </div>
    </Link>
  );
};

export default BatchCard;