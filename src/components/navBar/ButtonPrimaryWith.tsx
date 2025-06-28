import React from "react";

interface Props {
  className?: string;
  divClassName?: string;
  hasIcon?: boolean;
  text: string;
}

export const ButtonPrimaryWith: React.FC<Props> = ({
  className,
  divClassName,
  text,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 ${className}`}
    >
      <div className={`relative w-fit text-white text-lg text-center ${divClassName}`}>
        {text}
      </div>
    </div>
  );
};
