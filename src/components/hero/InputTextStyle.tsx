import React from "react";

interface Props {
  className?: string;
  frameClassName?: string;
  divClassName?: string;
  hasDiv?: boolean;
  hasIcon?: boolean;
  text: string;
}

export const InputTextStyle: React.FC<Props> = ({
  className,
  frameClassName,
  divClassName,
  text,
}) => {
  return (
    <div className={`w-[476px] h-[72px] ${className}`}>
      <div
        className={`h-[72px] border border-solid border-gray-400 rounded-[15px] pl-[25px] pr-4 py-[17px] ${frameClassName}`}
      >
        <div className={`relative w-fit text-base text-gray-900 ${divClassName}`}>
          {text}
        </div>
      </div>
    </div>
  );
};
