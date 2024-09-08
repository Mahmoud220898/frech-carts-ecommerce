import { Link } from "react-router-dom";
import Apple from "../../assets/images/pngwing.com copy 3.png";
import Google from "../../assets/images/pngwing.com copy 2.png";
import Payment from "../../assets/images/pngwing.com copy 4.png";

function Footer() {
  return (
    <>
      <footer className="container dark:bg-slate-900 dark:text-white mx-auto max-lg:px-10 p-10 bg-[#f0f3f2] text-base-content">
        <h3 className="title text-lg mb-1 dark:text-white">
          Get the freshCart app
        </h3>
        <p className="sub-title text-sm mb-2 dark:text-white">
          we will send you a link, click on it to download the app
        </p>
        <div className=" w-full flex items-center justify-center gap-8 ">
          <input
            type="text"
            placeholder="Email..."
            className="input bg-[#fff] input-bordered w-full  dark:bg-slate-600"
          />
          <button className="btn btn-accent ">Share App Link</button>
        </div>
      </footer>
      <footer className="footer dark:bg-slate-900 container mx-auto px-10 max-lg:px-10 max-md:p-5 py-4 bg-[#f0f3f2] text-base-content border-[#e2dfdf] ">
        <aside className="items-center grid-flow-col">
          <p className=" title  dark:text-white">Payment Partners</p>
          <Link>
            <img width={150} src={Payment} alt="payment partners" />
          </Link>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <p className="mt-1 title  dark:text-white">
              Get deliveries with FreshCart
            </p>
            <Link>
              <img width={90} src={Apple} alt="AppleStore" />
            </Link>
            <Link>
              <img width={90} src={Google} alt="GooglePlay" />
            </Link>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
