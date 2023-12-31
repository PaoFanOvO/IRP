import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

function Header() {
  const t = useTranslations("Header");
  return (
    <>
      <div
        className="h-48 md:h-52 bg-slate-300 bg-cover
    flex flex-col justify-center text-black dark:bg-slate-700 relative rounded-2xl m-2 "
      >
        <div className="absolute top-8 right-8">
        </div>
        <div className="px-8 md:px-16 dark:text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-left ">
            {t("title")}
          </h1>
          <h2 className="font-sans text-1xl md:pt-2 text-left">
            Independent Research Program 
          </h2>
        </div>
      </div>
    </>
  );
}

export default Header;
