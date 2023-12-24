//external dependencies
import { memo, useEffect, useReducer, useState } from "react";
//external types dependencies
//internal dependencies
import { FA } from "@client/comp/core";
import { WeatherIcon } from "@client/comp/shared";
import { $log } from "@shared/util";
import { _FakeForecast7 } from "./forecast-7.mock";
import { useGetForecast7Mutation } from ".";
import { useLocation, useMock } from "@client/comp/main";
//internal types dependencies
import type { TDayForecast } from ".";

export const Forecast7 = memo(() => {
  const mock = useMock();
  const loc = useLocation();
  const [expand, toggExpand] = useReducer((s) => !s, false);
  const [days, setDays] = useState<TDayForecast[]>([]);
  const [getForecast7, { isLoading }] = useGetForecast7Mutation();

  useEffect(() => {
    const init = async () => {
      try {
        const res = mock? _FakeForecast7 : await getForecast7(loc).unwrap();
        if (res?.data?.length) setDays(res.data);
        $log("7 days forecast:", res);
      } catch (err) {
        $log.err("7 days forecast error:", err);
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
          <FA icon="temperature-quarter"/>
          <span className="font-light">7-Day Forecast</span>
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
        } w-full flex-wrap md:flex-nowrap md:overflow-x-auto md:justify-start lg:justify-center flex-row justify-center items-stretch gap-4`}
      >
        {days.length ? (
          days.map((v) => <ForecastDay key={v.datetime} {...v} />)
        ) : (
          <span className="italic text-center">
            {isLoading ? "Loading..." : "No data found"}
          </span>
        )}
      </div>
    </div>
  );
});

const ForecastDay = memo(
  ({ ts, datetime, temp, max_temp, min_temp, pod, weather }: TDayForecast) => {
    return (
      <div className="w-full flex flex-row md:flex-col items-center justify-between xl:justify-start text-center bg-slate-500 rounded-xl px-3 py-2 gap-4">
        <span className="text-lg">
          {datetime
            ? new Date(datetime).toLocaleString("defult", { month: "short" }) +
              " " +
              new Date(datetime).getDate()
            : ""}
        </span>
        <div className="flex flex-col items-center">
          <span className="text-[60px] leading-none">
            <WeatherIcon code={weather?.code} pod={pod} />
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center relative gap-1">
            <FA icon="temperature-arrow-down" />
            <span className="text-sm">min:</span>
            <span className="text-[1rem] font-black whitespace-nowrap">
              {min_temp || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-center relative gap-1">
            <FA icon="temperature-arrow-up" />
            <span className="text-sm">max:</span>
            <span className="text-[1rem] font-black whitespace-nowrap">
              {max_temp || "N/A"}
            </span>
          </div>
          <span className="text-md opacity-80">
            {weather?.description || ""}
          </span>
        </div>
      </div>
    );
  }
);
