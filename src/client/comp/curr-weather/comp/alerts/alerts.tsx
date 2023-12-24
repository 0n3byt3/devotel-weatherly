//external dependencies
import { memo, useEffect, useReducer, useState } from "react";
//external types dependencies
//internal dependencies
import { FA } from "@client/comp/core";
import { WeatherIcon } from "@client/comp/shared";
import { $log } from "@shared/util";
import { useLocation, useMock } from "@client/comp/main";
//import { _FakeAlerts } from "./alerts.mock";
import { useGetAlertsMutation } from ".";
import { _FakeAlerts } from "./alerts.mock";
//internal types dependencies
import type { TAlert } from ".";


export const Alerts = memo(({}) => {
  const mock = useMock();
  const loc = useLocation();
  const [expand, toggExpand] = useReducer((s) => !s, false);
  const [alerts, setAlerts] = useState<TAlert[]>([]);
  const [getAlerts, {isLoading}] = useGetAlertsMutation();

  useEffect(() => {
    const init = async () => {
      try {
        const res = mock? _FakeAlerts : await getAlerts(loc).unwrap();
        if (res?.alerts?.length) setAlerts(res.alerts);
        $log("weather alerts:", res);
      } catch (err) {
        $log.err("weather alerts error:", err);
      }
    };
    loc && init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc]);

  return (
    <div className="w-full bg-slate-700/70 px-3 pt-2 pb-4 rounded-lg transition-all ease-linear">
      <div
        className="w-full py-2 px-1 flex flex-row items-center justify-between cursor-pointer"
        onClick={toggExpand}
      >
        <div className="flex flex-row items-center gap-1">
          <FA icon="circle-exclamation"/>
          <span className="font-light">Weather Alerts</span>
        </div>
        <FA
          className={`transition-transform ease-linear ${
            expand ? "rotate-180" : ""
          }`}
          icon="caret-down"
        />
      </div>
      <div
        className={`${
          expand ? "flex" : "hidden"
        } w-full flex-col justify-center items-center gap-4`}
      >
        {alerts.length ? (
          alerts.map((v) => <AlertItem key={v.uri} {...v} />)
        ) : (
          <span className="italic text-center">
            {isLoading ? "Loading..." : "No Alert found"}
          </span>
        )}
      </div>
    </div>
  );
});

const AlertItem = memo(
  ({ title, description, severity }: TAlert) => {
    return (
      <div className={`w-full rounded-xl px-3 py-2 ${severity === 'Warning'? 'bg-red-700' : severity === 'Watch'? 'bg-yellow-700' : 'bg-blue-700'}`}>
        <span className="font-md text-md md:text-lg">
          {title}
        </span>
      </div>
    );
  }
);