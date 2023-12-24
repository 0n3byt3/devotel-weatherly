//external dependencies
import { memo, useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
//external types dependencies
//internal dependencies
import { FA } from "@client/comp/core";
import { WeatherIcon } from "@client/comp/shared";
import { $log } from "@shared/util";
import { setUnit, useLocation, useMock, useUnit } from "@client/comp/main";
import { c2f } from "@client/util";
import { Alerts } from "./comp/alerts";
import { _FakeCurrWeather } from "./curr-weather.mock";
import { useGetCurrWeatherMutation } from ".";
//internal types dependencies
import type { TCurrWeather } from ".";


export const CurrWeather = memo(({}) => {
  const mock = useMock();
  const unit = useUnit();
  const loc = useLocation();
  const dispatch = useDispatch();
  const [refreshFlag, refresh] = useReducer(v => !v, false);
  const [currWeather, setCurrWeather] = useState<undefined | TCurrWeather>();
  const [getCurrWeather, {isLoading}] = useGetCurrWeatherMutation();
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const clearId = setTimeout(() => {
      setTime(new Date());
    }, (60 - time.getSeconds()) * 1000); //update every real sys minute to be more accurate

    return () => {
      clearTimeout(clearId);
    };
  }, [time]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = mock? _FakeCurrWeather : await getCurrWeather({...loc, units: unit === 'c'? 'M' : 'I'}).unwrap();
        if (res?.data?.length) setCurrWeather(res.data[0]);
        $log("current weather:", res);
      } catch (err) {
        $log.err("current weather error:", err);
      }
    };
    loc && init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc, refreshFlag, unit]);

  const toggUnit = useCallback(() => {
    dispatch(setUnit(unit === 'c'? 'f' : 'c'))
  }, [unit]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row items-center justify-between bg-slate-700/70 rounded-xl gap-2 px-3 py-1">
        <button className="self-start bg-transparent p-1 mt-2" onClick={refresh}>
          <FA className={`${isLoading? 'animate-spin' : ''}`} icon="arrows-rotate"/>
          <span className="ml-2 opacity-60">Refresh</span>
        </button>
        <div className="flex flex-row items-center gap-2">
          <span className="font-bold text-lg">°C</span>
          <span className="w-[2rem] h-[1rem] bg-slate-500 rounded-full relative cursor-pointer" onClick={toggUnit}>
            <FA className={`absolute top-0 text-[1rem] transition-all ease-linear ${unit === 'c'? 'left-0' : 'right-0'}`} icon="circle"/>
          </span>
          <span className="font-bold text-lg">°F</span>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-between max-w-[180rem] gap-2 p-3">
        <div className="h-full flex flex-col">
          <div className="flex flex-col md:flex-row items-start lg:items-center justify-center lg:justify-start gap-1">
            <span className="text-xl md:text-3xl font-bold">
              {currWeather?.city_name || "locating..."}
            </span>
            <span className="hidden md:inline text-xl md:text-3xl font-bold">
              ,
            </span>
            <span className="text-xl md:text-3xl font-bold">
              {currWeather?.country_code || ""}
            </span>
          </div>
          <span className="text-lg md:text-2xl font-bold opacity-65">
            {time
              ? time.getHours().toString().padStart(2, "0") +
                ":" +
                time.getMinutes().toString().padStart(2, "0")
              : ""}
          </span>
        </div>
        <div className="flex flex-col flex-grow justify-start items-center">
          <div className="flex items-center justify-center relative">
            <span className="text-[3rem] md:text-[5rem] font-black">
              {currWeather?.temp || "N/A"}
            </span>
            <FA icon={unit === 'c'? "circle-c" : "circle-f"} className="absolute top-2 lg:top-4 -right-6 lg:-right-4" />
          </div>
          <span className="text-lg md:text-xl opacity-80">
            {currWeather?.weather?.description || ""}
          </span>
        </div>
        <div className="flex flex-col items-center justify-start gap-5 px-1">
          <WeatherIcon
            className="text-[80px] md:text-[120px]"
            code={currWeather?.weather?.code}
            pod={currWeather?.pod}
          />
        </div>
      </div>
      
      <Alerts/>
    </div>
  );
});
