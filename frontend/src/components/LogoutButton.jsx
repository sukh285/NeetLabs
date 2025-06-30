import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const LogoutButton = ({children, className = ""}) => {
    const { logout } = useAuthStore()

    const onLogout = async () => {
        await logout()
    }

    return (
        <button 
            className={`group/btn relative overflow-hidden btn btn-sm btn-error px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${className}`} 
            onClick={onLogout}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-error/20 to-error/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
                {children}
            </div>
        </button>
    )
}

export default LogoutButton