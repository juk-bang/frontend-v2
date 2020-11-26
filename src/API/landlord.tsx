import { AxiosError, AxiosResponse } from "axios";
import { RSA_NO_PADDING } from "constants";
import { ILandlordRoom } from "../pages/landlord/interface";
import baseApi from "./baseApi";

export interface room_info {
  univId : number,
  roomInfo : {
      roomName : string,
      scale : number,
      floor : number,
      layout :number
  }
  ,
  price :{
    monthlyLease :number,
    adminExpenses :number,
    deposit : number
  }
,
option:{
  elevator : boolean,
  park :boolean,
  cctv :boolean,
  autoDoor : boolean,
  washingMachine :boolean,
  gasrange : boolean,
  refrigerator :boolean,
  airconditioner :boolean
}
,
location : {
    address: string,
    lng : number,
    lat : number
},
description : string
};

export const landlord_upload = async(param:room_info) => {
  const response = await baseApi.post(`/landlord/rooms`, 
    param
  )
  const {roomId} = response.data; 
  return roomId;
};

export const landlord_update = (roomId : number, param:room_info)=>{
  baseApi.put(`/landlord/rooms/${roomId}`, param);
}

export const landlord_list= async(page:number)=>{
  const list = await baseApi.get(`/landlord/rooms?page=${page}&size=10`);
  return list.data;
}