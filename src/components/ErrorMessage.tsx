import React from "react";

export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-3 my-4 text-sm font-bold text-center text-red-600 uppercase bg-red-100">
      {children}
    </div>
  );
}
