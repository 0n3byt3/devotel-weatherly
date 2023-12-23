//external dependencies
import { memo } from "react";
//external types dependencies
//internal dependencies
//internal types dependencies

export interface FAProps {
  className?: string;
  iconStyle?: 'fad';
  icon: string;
  wrap?: boolean;
}

//loading spinner
export const Spinner = ({className = '', color = '#0556ad', size = '20'}) => {
    return (
        <span className={"flex justify-center " + className} style={{color}}>
            <svg className="animate-spin" height={size} width={size} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </span>
    );
}

//fontawsome icons
export const FA = memo(({
  className = '', 
  iconStyle = "fad", 
  icon = "", 
  wrap = false,
}: FAProps) => {

	return (
		wrap? (
      <span className={className}>
        <i className={`${iconStyle} fa-${icon} fa-fw`}></i>
      </span>
    ) : (
      <i className={`${iconStyle} fa-${icon} fa-fw ${className}`}></i>
    )
	);
});

/**No data msg; if provided list is undefined or empty then => null */
export const NoItemMsg = memo(({
  list
}: {
  list?: any[];
}) => {
  if(list && list.length)
    return null;

  return (
    <div tw="w-full pt-4 pb-2">
      <div tw="w-full flex items-center justify-center bg-yellow-100/70 text-yellow-800/70 rounded-md py-2">
        <FA icon="file-slash"/>
        <i className=" mr-2">
          No data has been found
        </i>
      </div>
    </div>
  );
});