"use client";
import { IUserDTO } from "@/interfaces/usersDTO";
import Modal from "./Modal";
import { useCallback, useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import api from "@/app/utils/api";
import { UserSettingsContext } from "@/stores/UserSettingsProvider";

interface IUserModalProps {
  isOpen: boolean;
  setIsOpen: (_value: boolean) => void;
  userId: number;
}

const UserModal = ({ userId, isOpen, setIsOpen }: IUserModalProps) => {
  const userSettings = useContext(UserSettingsContext);

  console.log(userSettings?.users);

  const user = useCallback(() => {
    return userSettings?.users.find((user) => user.id === userId)!;
  }, [userSettings?.users]);

  if (user()?.id === undefined) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <>
        <header className="flex gap-4">
          <img
            className="h-8 w-8 rounded-lg"
            src={user().avatar_url}
            alt="User imag"
          />
          <h2 className="text-2xl font-medium flex items-center gap-2">
            {user().firstName} {user().lastName}{" "}
            <span className="italic text-lg">({user().id})</span>
          </h2>
        </header>
        <div className="flex flex-col gap-2">
          <div>
            <span>Email: </span>
            <a
              href={`mailto:${user().email}`}
              className="text-zinc-300 hover:text-zinc-400 transition-colors"
            >
              {user().email}
            </a>
          </div>
          <div className="flex gap-1">
            <span>Gender: </span>
            <div className="flex items-center gap-[2px] text-zinc-300 capitalize">
              <span>{user().gender}</span>
              {user().gender === "male" ? (
                <Icon icon="ic:round-male" />
              ) : user().gender === "female" ? (
                <Icon icon="ic:round-female" />
              ) : (
                <Icon icon="tabler:gender-agender" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 rounded-lg bg-slate-700">
          <header className="flex justify-between">
            <h2 className="text-lg font-medium">Posts:</h2>
            <span className="flex items-center justify-center bg-gray-900 text-xs text-zinc-300 rounded-lg h-6 px-2">
              {user().posts.length}
            </span>
          </header>
          <ul className="flex flex-wrap gap-4">
            {user().posts.map((post) => {
              return (
                <li key={post.id}>
                  <button className="h-8 rounded-lg px-4 rounded-btn bg-gray-900 hover:bg-gray-800 active:scale-90 transition-all">
                    {post.title} - {post.id}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 rounded-lg bg-slate-700">
          <header className="flex justify-between">
            <h2 className="text-lg font-medium">Comments:</h2>
            <span className="flex items-center justify-center bg-gray-900 text-xs text-zinc-300 rounded-lg h-6 px-2">
              {user().comments.length}
            </span>
          </header>
          <ul className="flex flex-wrap gap-4">
            {user().comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <button className="h-8 rounded-lg px-4 rounded-btn bg-gray-900 hover:bg-gray-800 active:scale-90 transition-all">
                    {comment.content}
                  </button>
                </li>
              );
            })}
            {user().comments.length === 0 && (
              <span className="text-zinc-300">No comments were found</span>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 rounded-lg bg-slate-700">
          <header className="flex justify-between">
            <h2 className="text-lg font-medium">Followers:</h2>
            <span className="flex items-center justify-center bg-gray-900 text-xs text-zinc-300 rounded-lg h-6 px-2">
              {user().followers.length}
            </span>
          </header>
          <ul className="flex flex-wrap gap-4">
            {user().followers.map((follower) => {
              return (
                <li key={follower.id}>
                  <button className="h-8 rounded-lg px-4 rounded-btn bg-gray-900 hover:bg-gray-800 active:scale-90 transition-all">
                    {follower.follower.firstName}
                  </button>
                </li>
              );
            })}
            {user().comments.length === 0 && (
              <span className="text-zinc-300">No followers were found</span>
            )}
          </ul>
        </div>
      </>
    </Modal>
  );
};

export default UserModal;
