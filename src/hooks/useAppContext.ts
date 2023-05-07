import React from "react";
import { Context } from "@/models";

//ensure that the context is being used inside it's provider
export default function useAppContext<T>(context: React.Context<Context<any>>) {
  const value: Context<T> | any = React.useContext(context);

  if (!value) {
    throw new Error(
      `${context?.displayName} must be used within ${context?.displayName}Provider`
    );
  }

  return value;
}
