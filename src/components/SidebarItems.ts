import DashboardIcon from "../assets/sidebarIcons/dashboardIcon.png";
import ContentIcon from "../assets/sidebarIcons/contentIcon.png";
import ManagementIcon from "../assets/sidebarIcons/managementIcon.png";
import Analytics from "../pages/dashboard";
import AnalyticIcon from "../assets/analysis.png"
import RoomIcon from "../assets/room1.png"
import BookingIcon from "../assets/sidebarIcons/bookingsIcon.png"

const AdminItems = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Users",
    route: "/users",
    icon: ContentIcon,
  },
  {
    name: "Room",
    route: "/room",
    icon: RoomIcon,
  },
  {
    name: "Bookings",
    route: "/bookings",
    icon: BookingIcon,
  },
  {
    name: "Analytics",
    route: "/analytics",
    icon: AnalyticIcon,
  },
];
export default { AdminItems };
