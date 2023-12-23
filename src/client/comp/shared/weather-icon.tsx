//external dependencies
import { memo } from "react";
//external types dependencies
//internal dependencies
import { FA } from "@client/comp/core";
//internal types dependencies

//return weather icon based on weatherbit.io doc weather's code
export const WeatherIcon = memo(
  ({
    code = 900,
    pod = "d",
    className = "",
  }: {
    code?: number;
    pod?: "d" | "n";
    size?: string;
    className?: string;
  }) => {
    if (code <= 233)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `cloud-bolt-sun` : `cloud-bolt-moon`}
        />
      );
    else if(code <= 522)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `cloud-sun-rain` : `cloud-moon-rain`}
        />
      );
    else if(code <= 623)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `cloud-snow` : `cloud-snow`}
        />
      );
    else if(code <= 751)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `cloud-fog` : `cloud-fog`}
        />
      );
    else if(code <= 800)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `sun` : `moon-stars`}
        />
      );
    else if(code <= 801)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `sun-cloud` : `moon-cloud`}
        />
      );
    else if(code <= 802)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `cloud-sun` : `cloud-moon`}
        />
      );
    else if(code <= 803)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `clouds-sun` : `clouds-moon`}
        />
      );
    else if(code <= 804)
      return (
        <FA
          className={className}
          icon={pod === "d" ? `clouds` : `clouds`}
        />
      );
    else return <FA className={className} icon="cloud-exclamation" />;
  }
);