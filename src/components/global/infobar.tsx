"use client";
import { NotificationWithUser } from "@/lib/types";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Bell } from "lucide-react";
import { Role } from "@prisma/client";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./mode-toggle";

type Props = {
  notification: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
};

const InfoBar = ({ notification, subAccountId, className, role }: Props) => {
  const [allNotification, setAllNotification] = useState(notification);
  const [showAll, setShowAll] = useState(true);

  const handleClick = () => {
    if (!showAll) {
      setAllNotification(notification);
    } else {
      if (notification?.length !== 0) {
        setAllNotification(
          notification?.filter((item) => item.subAccountId === subAccountId) ??
            []
        );
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ",
          className
        )}
      >
        <div className="flex items-center gap-2 ml-auto">
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
                <Bell size={17} />
              </div>
            </SheetTrigger>
            <SheetContent className="mt-4 mr-4 pr-4 flex flex-col">
              <SheetHeader className="text-left">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {(role === "AGENCY_OWNER" || role === "AGENCY_ADMIN") && (
                    <Card className="flex items-center justify-between p-4">
                      Current Subaccount
                      <Switch onChangeCapture={handleClick} />
                    </Card>
                  )}
                </SheetDescription>
              </SheetHeader>
              {allNotification?.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-2 overflow-x-scroll text-ellipsis flex flex-col gap-y-2"
                >
                  <div>
                    <Avatar>
                      <AvatarImage
                        src={notification.User.avatarUrl}
                        alt="Profile Picture"
                      />
                      <AvatarFallback className="bg-primary">
                        {notification.User.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ">
                      <p>
                        <span className="font-bold ">
                          {notification.notification.split("|")[0]}
                        </span>
                        <span className="text-muted-foreground ">
                          {notification.notification.split("|")[1]}
                        </span>
                        <span className="font-bold ">
                          {notification.notification.split("|")[2]}
                        </span>
                      </p>
                      <small className="text-xs text-muted-foreground ">
                        {new Date(notification.createdAt).toDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
              {
                allNotification?.length === 0 && (
                    <div className="flex items-center justify-center mb-4 text-muted-foreground">
                        You Have No Notifications
                    </div>
                )
              }
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default InfoBar;