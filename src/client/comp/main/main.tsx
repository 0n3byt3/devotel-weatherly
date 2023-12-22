//external dependencies
import { memo, useEffect, useState } from "react";
//external types dependencies
//internal dependencies
import SpinnerSvg from '@public/img/icon/spinner.svg'
import { useGetCurrWeatherMutation, useGetIpLocQuery } from "./main.api";
import { useAppDispatch } from "@client/store";
import { setLocation } from "./main.slic";
import { useLocation } from "./main.hook";
import { $log } from "@shared/util";
//internal types dependencies

export const MainView = memo(() => {
  const dispatch = useAppDispatch();
  const [ip, setIp] = useState<undefined | string>(undefined);
  const {data:ipLoc, isLoading, isError} = useGetIpLocQuery();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 120000,
      timeout: 5000,
    };
    function success(pos: GeolocationPosition) {
      dispatch(setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      }));
    }
  
    function error() {
      //show text "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      //do nothing
    } else {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    // const g = navigator.geolocation.getCurrentPosition(console.log);

  }, []);

  useEffect(() => {
    $log(ipLoc);
    if(ipLoc)
      dispatch(setLocation({lat: ipLoc.lat, lon: ipLoc.lon}));
  }, [ipLoc]);

  return (
    <div className="w-1/2 flex flex-row items-start gap-4 mx-auto pt-5">
      <Weather/>
      <Forecast/>
    </div>
  );
});

const Weather = memo(({}) => {
  const loc = useLocation();
  const [getCurrWeather, {isLoading}] = useGetCurrWeatherMutation();
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getCurrWeather(loc).unwrap();
        $log(res);
      } catch (err) {
        $log(err);
      }
    };

    setDate(new Date());
    $log(loc);
    if(loc)
      init();

  }, [loc]);

  return (
    <div className="w-full flex flex-row items-center justify-center max-w-[180rem] p-3">
      <div className="w-full h-full flex flex-col">
        <span className="text-3xl font-bold">locating...</span>
        <span className="text-2xl font-bold opacity-65">{date? date.toString() : ''}</span>
      </div>
      <SpinnerSvg className="w-[100px]"/>
    </div>
  );
});

const Forecast = memo(() => {
  return (
    <div className="w-full bg-sky-700/70 px-3 py-2 rounded-lg">
      <span>7-Day Forecast</span>
    </div>
  );
});