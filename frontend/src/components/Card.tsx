import { forwardRef } from "react";
import clsx from "clsx";

interface CardProps {
  name: string;
  title: string;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ name, title, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "border min-w-30 border-solid inline-block border-zinc-400 p-2 rounded cursor-pointer",
          className
        )}
      >
        <h3 className="text-2xl">{name}</h3>
        <p className="italic">{title}</p>
      </div>
    );
  }
);
