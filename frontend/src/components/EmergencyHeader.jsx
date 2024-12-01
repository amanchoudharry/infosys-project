import * as React from "react";

function EmergencyHeader() {
  return (
    <header className="flex overflow-hidden flex-col items-center px-20 pt-6 pb-28 font-bold text-white bg-green-400 max-md:px-5 max-md:pb-24 max-md:text-4xl">
      <section className="flex flex-col w-full max-w-[1512px] max-md:max-w-full">
        <h1 className="self-center ml-8 max-md:max-w-full text-4xl">
          EMERGENCY AND MENTAL-WELL BEING
        </h1>
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f56bc743c966bc90861eabd677a99a89bc6150d0a7970897c29d25fa2f8a552?placeholderIfAbsent=true&apiKey=ee2b05a1b4fb470485852e4a897cb916" 
          alt="Emergency and Mental Well-being Services"
          className="object-contain mt-5 w-[81.5%] justify-center pt-5 flex pl-[250px]" 
        />
        
      </section>
    </header>
  );
}

export default EmergencyHeader;