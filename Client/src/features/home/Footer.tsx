import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/layoutSlice";
import { AppDispatch } from "../../store";
import { postSubscriber } from "../../../utils/http";

export default function Footer() {
  return (
    <section
      id="footer"
      className="mt-2 py-20 px-8 bg-black text-white text-xs font-bold"
    >
      {/* Mobile */}
      <div className="flex flex-col   lg:hidden  max-w-xl space-y-8  mx-auto ">
        <NewsletterForm />
        <div className="flex flex-row justify-between mx-8 ">
          <Menu />
          <Socials />
        </div>
        <p className="flex lg:hidden text-sm tracking-widest self-center mt-8">
          © 2024 Levante's pizza copyrights
        </p>
      </div>
      {/* Desktop */}
      <div className="hidden lg:flex  lg:flex-row  justify-between max-w-5xl mx-auto space-x-18 ">
        <Menu />
        <NewsletterForm />
        <Schedule />
        <Policy />
        <Socials />
      </div>
    </section>
  );
}

const Menu = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl">Menu</h3>
      <ul className="flex flex-col">
        <li>
          <a href="#hero" className=" text-sm">
            Home
          </a>
        </li>
        <li>
          <a href="/order?menu" className="text-sm">
            Order Online
          </a>
        </li>
        <li>
          <a href="#about-us" className=" text-sm">
            About Us
          </a>
        </li>
      </ul>
    </div>
  );
};
const NewsletterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    try {
      await postSubscriber(email);
      dispatch(showNotification("Thank you for subscribing!"));
    } catch (error) {
      console.error(error);
      dispatch(showNotification("Error subscribing, please try again later"));
    }
  }

  return (
    <div className="flex flex-col ">
      <h3 className="text-xl font-bold self-center mb-8 ">
        Join our <span className="text-brightRed">newsletter!</span>
      </h3>

      <form action="POST" onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          name="email"
          className="w-full text-black text-lg  px-3 py-1  rounded-l focus:outline-none  placeholder:font-bold placeholder:text-slate-300 "
          placeholder="Type your email here"
        />
        <button type="submit" className="bg-brightRed  p-4 rounded-r">
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </form>
      <p className="hidden sm:flex text-sm mt-2">
        © 2024 Levante's pizza copyrights
      </p>
    </div>
  );
};
export const Schedule = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">Working hours</h3>
      <p className="text-brightRed">Sunday - Thursday</p>
      <p>10:30AM - 10PM</p>
      <p className="text-brightRed">Friday - Saturday</p>
      <p>10:30AM - 11PM</p>
    </div>
  );
};
const Policy = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-brightRed">+61 491 652 332 </h3>
      <a href="#">Privacy Policy</a>
      <a href="#">Legal disclaimer</a>
      <a href="#">Terms of use</a>
      <a href="#">Join our team</a>
    </div>
  );
};
const Socials = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Logo */}
      <img src="logo.avif" alt="" className="w-32  h-auto" />
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <img
            className="socialIcon w-8 h-8 cursor-pointer"
            src="twitter.svg"
            alt="twitter"
          />
          <img
            className="socialIcon w-8 h-8 cursor-pointer"
            src="facebook.svg"
            alt="facebook"
          />
          <img
            className="socialIcon w-8 h-8 cursor-pointer"
            src="instagram.svg"
            alt="instagram"
          />
        </div>
        <p>
          Designed by <span className="text-brightRed">hakdnek</span>
        </p>
      </div>
    </div>
  );
};
