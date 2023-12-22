//external dependencies
import { useMemo } from "react";
//external types dependencies
//internal dependencies
import { useTypedSelector } from "@client/store";
//internal types dependencies

/**use user loaction hook */
export const useLocation = () => {
  const state = useTypedSelector((state) => state.main.location);

  return useMemo(() => state, [state]);
};