import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Room from "../pages/room";
import UpdateUserDetail from "../pages/updateUserDetail";
import AddOrders from "../pages/addOrders";
import Test from "../pages/test";
import Users from "../pages/users";
import Bookings from "../pages/bookings";
import CreateGroupRoom from "../pages/createGruopRoom";
import BookingDetail from "../pages/bookingDetail";
import UserDetail from "../pages/userDetail";
import RoomDetail from "../pages/roomDetail";
import Analytics from "../pages/analytics";
import EditUserDetail from "../pages/editUserDetail";
import EditBookingDetail from "../pages/editBookingDetail";
import EditRoomDetail from "../pages/editRoomDetail";

// import Subscription from "../pages/subscription";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/room" element={<Room />} />
      <Route path="/updateUserDetail" element={<UpdateUserDetail />} />
      <Route path="/addOrders" element={<AddOrders />} />
      <Route path="/test" element={<Test />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/users" element={<Users />} />
      <Route path="/userDetail" element={<UserDetail />} />
      <Route path="/createGroupRoom" element={<CreateGroupRoom />} />
      <Route path="/bookingDetail" element={<BookingDetail />} />
      <Route path="/roomDetail" element={<RoomDetail />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/editUserDetail" element={<EditUserDetail />} />
      <Route path="/editBookingDetail" element={<EditBookingDetail />} />
      <Route path="/editRoomDetail" element={<EditRoomDetail />} />

      {/* <Route path="/subscription" element={<Subscription />} /> */}
    </Routes>
  );
}

export default RoutesComponent;
