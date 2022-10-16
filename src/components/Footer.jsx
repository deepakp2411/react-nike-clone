import React from "react";

const Footer = ({ footerAPI: { titles, links } }) => {
  return (
    <>
      <footer className="bg-theme pt-7 pb-5">
        <div className="nike-container text-slate-200">
          <div className="grid items-start grid-cols-3 max-w-2xl w-full m-auto md:max-w-none md:gap-5">
            {titles.map((val, i) => (
              <div key={i} className="grid items-center">
                <h1 className="text-lg lg:text-base md:text-sm uppercase font-semibold">
                  {val.title}
                </h1>
              </div>
            ))}
            {links.map((val, i) => (
              <ul key={i} className="grid items-center gap-1">
                {val.map((value, index) => (
                  <li key={index} className="text-sm sm:text-xs">
                    {value.link}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-5 text-center">
            <p className="text-sm md:text-center">Made With❤️by<span className="text-base font-bold px-2">DEEPAK PATEL</span>   
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
