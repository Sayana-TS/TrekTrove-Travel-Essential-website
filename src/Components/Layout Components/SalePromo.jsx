import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SalePromo = () => {
  // 🎯 Fix: define target date once (sale ends 7 days from now)
  const targetDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 text-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1663088923485-58685ba14d5f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white">Sale 45% OFF</h1>
        <p className="text-white mt-2">Hurry up! Get the best deal at best price</p>

        {/* Countdown */}
        <div className="flex justify-center gap-8 mt-6 text-white text-lg font-semibold">
          <div>
            {timeLeft.days}
            <br />
            <span className="text-sm font-normal">Days</span>
          </div>
          <div>
            {timeLeft.hours}
            <br />
            <span className="text-sm font-normal">Hours</span>
          </div>
          <div>
            {timeLeft.minutes}
            <br />
            <span className="text-sm font-normal">Minutes</span>
          </div>
          <div>
            {timeLeft.seconds}
            <br />
            <span className="text-sm font-normal">Seconds</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition cursor-pointer">
            <Link to='/collections'>Shop sales</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SalePromo;
