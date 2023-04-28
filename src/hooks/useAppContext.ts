import React from "react";
import { Context } from "@/models";
export default function useAppContext(context: React.Context<Context<any>>) {
  const value = React.useContext(context);

  if (!value) {
    throw new Error(
      `${context?.displayName} must be used within ${context?.displayName}Provider`
    );
  }

  return value;
}
