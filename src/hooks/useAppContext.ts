import React from "react";
import { Context } from "@/models";

//ensure that the context is being used inside it's provider
export default function useAppContext<T = any>(
  context: React.Context<Context<any>>,
  text?: string
): Context<T> | any {
  const value = React.useContext(context);

  if (!value) {
    console.log(text);
    throw new Error(
      `${context?.displayName} must be used within ${context?.displayName}Provider`
    );
  }

  return value;
}
