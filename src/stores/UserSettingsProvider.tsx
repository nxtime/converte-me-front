"use client";
import { IUserDTO } from "@/interfaces/usersDTO";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from "react";

export const UserSettingsContext = createContext<{
  currentUserId: number;
  currentPostId: number | null;
  users: IUserDTO[];
  setUsers: Dispatch<SetStateAction<IUserDTO[]>>;
  setCurrentPostId: Dispatch<SetStateAction<number | null>>;
  setCurrentUserId: Dispatch<SetStateAction<number>>;
} | null>(null);

const UserSettings = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  return (
    <UserSettingsContext.Provider
      value={{
        currentUserId,
        users,
        setUsers,
        currentPostId,
        setCurrentPostId,
        setCurrentUserId
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export default UserSettings;
