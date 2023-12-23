//external dependencies
import { memo, useEffect } from "react";
//external types dependencies
//internal dependencies
import { CurrWeather } from "@client/comp/curr-weather";
import { DailyHist } from "@client/comp/dily-hist";
import { Forecast7 } from "@client/comp/forecast-7";
import { useAppDispatch } from "@client/store";
import { $log } from "@shared/util";
import {
  useGetIpLocQuery
} from "./main.api";
import { useLocation, setLocation } from ".";
//internal types dependencies

export const MainView = memo(() => {
  const loc = useLocation();
  const dispatch = useAppDispatch();
  //const [ipLoc, setIpLoc] = useState(_FakeIpLoc);
  const {data:ipLoc, isLoading, isError} = useGetIpLocQuery();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 120000,
      timeout: 20000,
    };
    function success(pos: GeolocationPosition) {
      const coords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      $log('gps loc:', coords);
      dispatch(
        setLocation(coords)
      );
    }

    function error(err: any) {
      $log.err('gps loc error:', err);
    }

    if (!navigator.geolocation) {
      //do nothing
    } else {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    $log("ip loction:", ipLoc);
    //prefer gps location if exist
    if (ipLoc && !loc) dispatch(setLocation({ lat: ipLoc.lat, lon: ipLoc.lon }));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc, ipLoc]);

  return (
    <div className="w-full h-full md:w-full 2xl:w-3/4 flex flex-col xl:flex-row items-start gap-4 mx-auto px-3 py-5 overflow-auto">
      <div className="w-full flex flex-col justify-start items-center gap-4">
        <CurrWeather />
        <Forecast7 />
      </div>
      <DailyHist />
    </div>
  );
});