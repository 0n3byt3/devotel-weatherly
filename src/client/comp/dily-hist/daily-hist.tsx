//external dependencies
import { memo, useCallback, useState } from "react";
//external types dependencies
import type { ChangeEvent, FormEvent } from "react";
//internal dependencies
import { useLocation } from "@client/comp/main";
import { $log } from "@shared/util";
import { FA } from "@client/comp/core";
import {
  useGetDailyHistMutation,
} from ".";
import { _FakeDailyHist } from "./daily-hist.mock";
//internal types dependencies
import type { THistDay } from ".";

export const DailyHist = memo(() => {
  const loc = useLocation();
  const [days, setDays] = useState<THistDay[]>([]);
  const [getDailyHist, { isLoading }] = useGetDailyHistMutation();
  const [start, setStart] = useState(
    formatDate(new Date(new Date().setDate(new Date().getDate() - 2)))
  );
  const [end, setEnd] = useState(
    formatDate(new Date(new Date().setDate(new Date().getDate() - 1)))
  );

  const onStartDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
  }, []);
  const onEndDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEnd(e.target.value);
  }, []);

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const init = async () => {
      try {
        const res = await getDailyHist({...loc, start, end}).unwrap();
        //const res = _FakeDailyHist;
        if (res?.data?.length) setDays(res.data);
        $log("daily history:", res);
      } catch (err) {
        $log.err("daily history error:", err);
      }
    };

    loc && init();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc, start, end]);

  return (
    <div className="w-full md:max-w-[25rem] flex flex-col items-center bg-slate-700/70 rounded-xl px-4 pt-2 pb-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <FA icon="clock-rotate-left"/>
        <span className="text-lg">Search weather history</span>
      </div>
      <form className="flex flex-row items-end justify-center gap-2 mt-4" onSubmit={onSubmit}>
        <label className="text-xs font-light opacity-75">
          Start date
          <input
            className="bg-slate-500 border border-slate-100 rounded-lg px-3 py-1"
            name="start_date"
            type="date"
            value={start}
            onChange={onStartDate}
            min="2000-01-01"
            max={end}
            required
          />
        </label>
        <label className="text-xs font-light opacity-75">
          End date
          <input
            className="bg-slate-500 border border-slate-100 rounded-lg px-3 py-1"
            name="end_date"
            type="date"
            value={end}
            onChange={onEndDate}
            min={start}
            max={formatDate(new Date(new Date().setDate(new Date().getDate() - 1)))}
            required
          />
        </label>
        <button className="px-2 py-1 bg-slate-600 rounded-lg transition-all ease-linear hover:bg-slate-500 disabled:opacity-25" disabled={isLoading}>
          <FA icon="magnifying-glass"/>
        </button>
      </form>
      <div className="w-full flex flex-col items-stretch justify-start pt-4 gap-4">
        {
          days.length?
            days.map(v => (
              <HistDay key={v.datetime}
                {...v}
              />
            ))
          : (<span className="italic text-center">{isLoading? 'Loading...' : 'No data found'}</span>)
        }
      </div>
    </div>
  );
});

const HistDay = memo(({datetime, max_temp, min_temp}: THistDay) => {
  return (
    <div className="flex flex-row items-center justify-between bg-slate-500 rounded-xl gap-2 px-3 py-2">
      <div className="flex flex-row items-center justify-center gap-1">
        <FA icon="calendar-day"/>
        <span className="font-bold leading-none">{datetime? datetime.replaceAll('-', '/') : 'N/A'}</span>
      </div>
      <div className="flex flex-row items-center justify-center gap-1">
        <FA icon="temperature-low"/>
        <span className="font-bold leading-none">{min_temp || 'N/A'}</span>
        <span>/</span>
        <span className="font-bold leading-none">{max_temp || 'N/A'}</span>
      </div>
    </div>
  );
});

//format date as YYYY-MM-DD with Timezone considration
const formatDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const resDate = new Date(date.getTime() - offset * 60 * 1000);
  return resDate.toISOString().split("T")[0];
};
