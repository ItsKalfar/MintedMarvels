import React from "react";
import Balance from "react-wrap-balancer";

export const Heading: React.FC<{ mainHeading: string; subHeading: string }> = ({
  mainHeading,
  subHeading,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center leading-tight tracking-tighter mb-2 md:text-3xl lg:text-3xl lg:leading-[1.1]">
        {mainHeading}
      </h2>
      <Balance className="max-w-[46rem] text-center text-sm lg:text-lg text-muted-foreground sm:text-xl">
        {subHeading}
      </Balance>
    </>
  );
};
