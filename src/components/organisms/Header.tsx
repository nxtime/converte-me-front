"use client";
import { IUserDTO } from "@/interfaces/usersDTO";
import { UserSettingsContext } from "@/stores/UserSettingsProvider";
import { Icon } from "@iconify/react";
import { useCallback, useContext, useEffect, useState } from "react";

const Header = ({ users }: { users: IUserDTO[] }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userSettings = useContext(UserSettingsContext);

  useEffect(() => {
    if (users.length > 0) {
      userSettings?.setUsers(users);
    }
  }, []);

  const currentUser = useCallback(() => {
    return users?.find((user) => user.id === userSettings?.currentUserId)!;
  }, [users, userSettings?.currentUserId]);

  // if (isLoading)
  //   return (
  //     <div className="flex justify-between items-center">
  //       <h2 className="text-2xl font-bold h-16 flex items-center">
  //         ConverteMe
  //       </h2>
  //       <span>Loading...</span>
  //     </div>
  //   );

  if (!currentUser()?.id)
    return (
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold h-16 felx items-center">
          ConverteMe
        </h2>
      </div>
    );

  return (
    <header className="flex justify-between items-center">
      <h2 className="text-2xl font-bold h-16 flex items-center">ConverteMe</h2>
      <div className="relative flex flex-col items-center gap-2">
        <button
          onClick={() => {
            setIsUserMenuOpen((s) => !s);
          }}
          className="h-8 flex gap-4 items-center px-4 rounded-lg bg-gray-800 hover:bg-fuchsia-500 transition-all active:scale-90"
        >
          <span>
            {currentUser().firstName} {currentUser().lastName}
          </span>
          <Icon
            icon="bxs:down-arrow"
            className="text-sm"
            vFlip={isUserMenuOpen}
          />
        </button>
        {isUserMenuOpen && (
          <ul className="w-full absolute top-[calc(100%+0.5rem)] flex flex-col gap-1 bg-gray-900 shadow-md p-1 rounded-lg">
            {users?.map((user) => {
              return (
                <li key={user.id} className="w-full">
                  <button
                    onClick={() => {
                      userSettings?.setCurrentUserId(user.id);
                      setIsUserMenuOpen(false);
                    }}
                    className="hover:bg-gray-800 w-full rounded-lg h-8"
                  >
                    {user.firstName} {user.lastName}
                  </button>
                </li>
              );
            })}
            <button className="flex gap-1 items-center justify-center bg-gray-800 hover:bg-fuchsia-500 transition-colors w-full rounded-lg h-8">
              <Icon icon="lucide:plus" />
              <span>New</span>
            </button>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
