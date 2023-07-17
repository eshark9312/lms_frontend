import Sidebar from "../components/main/Sidebar";
import Layout from "../components/main/Layout";
import Dashboard from "../components/main/dashboard/Dashboard";

export default function Main() {
  return <Layout title="Dashboard" Sidebar={Sidebar} Content={Dashboard}/>;
}
