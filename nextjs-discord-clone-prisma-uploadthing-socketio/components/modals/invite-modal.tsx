"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { CheckIcon, Copy, RefreshCw } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {}

const InviteModal: FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setLoading(true);

      const resp = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", { server: resp.data });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Invite Friends
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server invite link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
              <Input
                className="bg-zinc-300/50 border-0 focus-visible: ring-0 focus-visible:ring-offset-0 text-black"
                value={inviteLink}
                disabled={loading}
                readOnly
              />
              <Button size="icon" disabled={loading} onClick={onCopy}>
                {copied ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-xs text-zinc-500 mt-4"
              disabled={loading}
              onClick={onNew}
            >
              Generate a new link
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteModal;
