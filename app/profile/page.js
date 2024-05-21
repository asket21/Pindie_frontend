"use client"
import { Profile } from "../components/Profile/Profile";
import { useStore } from "@/app/store/app-store";



export default function ProfilePage(props){
    const authContext = useStore(); 

    return (
    <main className="main-inner">
   <Profile data="authContext" />
    </main>);
}

