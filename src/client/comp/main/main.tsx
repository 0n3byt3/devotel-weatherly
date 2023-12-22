//external dependencies
import { memo, useEffect, useState } from "react";
//external types dependencies
//internal dependencies
//internal types dependencies

export const MainView = memo(() => {
  const [ip, setIp] = useState<undefined | string>(undefined);

  useEffect(() => {
    const g = navigator.geolocation.getCurrentPosition(console.log);
  }, []);

  return (
    <div className="bg-red-500 text-blue-400">
      hello world
    </div>
  );
});