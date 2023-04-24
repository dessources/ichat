import React from "react";

interface ChatInfoProps {
  name: string;
}

export default function ChatInfo({ name }: ChatInfoProps) {
  return <div>{name}</div>;
}
