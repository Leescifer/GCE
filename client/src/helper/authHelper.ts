import type { AuthUser } from "../context/AuthContext";

export const getAuthUser = (): AuthUser | null => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
}