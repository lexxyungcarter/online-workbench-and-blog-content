"use client";

import { useModal } from "@/hooks/use-modal-store";
import { MemberRole, Server } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  Plus,
  PlusCircle,
  Settings,
  Trash,
  Users,
} from "lucide-react";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  server: Server;
  role?: MemberRole;
}

const ServerHeader: FC<Props> = ({ server, role }) => {
  const { onOpen } = useModal();
  const isAdmin = role == MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            className="text-indigo-600 dark:text-indigo-400 px-3 py-3 text-sm cursor-pointer"
            onClick={() => onOpen("invite", { server })}
          >
            Invite People
            <Plus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-3 text-sm cursor-pointer"
            onClick={() => onOpen("editServer", { server })}
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-3 text-sm cursor-pointer"
            onClick={() => onOpen("members", { server })}
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-3 text-sm cursor-pointer"
            onClick={() => onOpen("createChannel", { server })}
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            className="text-rose-500 hover:text-rose-500 hover:dark:text-rose-500 px-3 py-3 text-sm cursor-pointer"
            onClick={() => onOpen("deleteServer", { server })}
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            className="text-rose-500 px-3 py-3 text-sm cursor-pointer"
            onClick={() => onOpen("leaveServer", { server })}
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
