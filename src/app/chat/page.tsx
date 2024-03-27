"use client";

import { UserButton } from "@clerk/nextjs";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

const userId = "user_2dk0diJvNownhqelku5OAkr3p8a";

const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yZGswZGlKdk5vd25ocWVsa3U1T0FrcjNwOGEifQ.towAJdgMKTpYm7vGzzLSa1sYvSF2tepW2r6abGs94uQ";

chatClient.connectUser(
  {
    id: userId,
    name: "PEraPeric",
  },
  token
);

const channel = chatClient.channel("messaging", "channel_1", {
  name: "Channel #1",
  members: [userId],
});

export default function ChatPage() {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
