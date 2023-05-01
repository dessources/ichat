import React from "react";
import { Context } from "@/models";
export default function useAppContext<T>(context: React.Context<Context<any>>) {
  const value: Context<T> = React.useContext(context);

  if (!value) {
    throw new Error(
      `${context?.displayName} must be used within ${context?.displayName}Provider`
    );
  }

  return value;
}
