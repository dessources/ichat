import React from "react";

//ensure that the context is being used inside it's provider
export default function useAppContext<T = any>(context: React.Context<T>): T {
  const value = React.useContext(context);

  if (!value) {
    throw new Error(
      `${context?.displayName} must be used within ${context?.displayName}Provider`
    );
  }

  return value;
}
