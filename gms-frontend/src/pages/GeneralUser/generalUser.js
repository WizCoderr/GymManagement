import React,{useEffect,useState} from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import Member from "../Member/member";
import MemberCard from "../../components/MemberCard/membercard";
import { getMonthyJoined,threeDayExpire,fourToSevenDaysExpire,expired,inActiveMembers } from "./data";



const GeneralUser = ()  => {
    const [header,setHeader] = useState("");
    const [data,setData] = useState([]);

    useEffect(()=>{
        const func = sessionStorage.getItem('func');
        functionCall(func)

    },[])
    const functionCall = async(func)=>{
        switch (func) {

            case "monthlyJoined":

            setHeader("Monthly Joined Members")
            var datas =  await getMonthyJoined();
             setData(datas.members);
            break;

            case "threeDayExpire":

            setHeader("Expiring In 3 Days Members")
            var datas = await threeDayExpire();
            setData(datas.members);
            break;

            case "fourToSevenDaysExpire":
                setHeader("Expiring In 4-7 Days")
                var datas = await fourToSevenDaysExpire();
                setData(datas.members);
                break;

             case "expired":
                setHeader("Expired Members")
                var datas = await expired();
                setData(datas.members);
                break;

             case"inActiveMembers":
             setHeader("InActive Members") 
             var datas = await inActiveMembers();
             setData(datas.members);     
        }

    }

    return(
        <div className="text-black p-5 w-3/4 flex-col">

            <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
                <Link to={'/dashboard'} className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black">
                    <ArrowBackIcon /> Back To Dashboard

                </Link>
             </div>

             <div className="mt-5 tex-xl text-slate-900">
                {header}
             </div>

             <div className="bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto h-[80%]">
               
               {
                data.map((item,index)=>{
                    return(
                        <MemberCard item ={item}/>
                    );
                })
               }
             </div>
        </div>
    )
}
export default GeneralUser