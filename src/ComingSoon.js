import React, { useState, useEffect } from "react";
import "./ComingSoon.css";

const ComingSoon = () => {
  // Set your target date here
  const targetDate = new Date("2024-12-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Function to calculate time left until the target date
  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    },1000); 

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [calculateTimeLeft]); // Include calculateTimeLeft in the dependency array

  return (
    <div className="coming-soon-container">
      <h1 className="coming-soon-title">Coming Soon</h1>
      <p className="coming-soon-description">
        We're working hard to bring you something amazing!
      </p>
      <div className="countdown">
        <div className="countdown-item">
          {timeLeft.days || "0"} <span>Days</span>
        </div>
        <div className="countdown-item">
          {timeLeft.hours || "00"} <span>Hours</span>
        </div>
        <div className="countdown-item">
          {timeLeft.minutes || "00"} <span>Minutes</span>
        </div>
        <div className="countdown-item">
          {timeLeft.seconds || "00"} <span>Seconds</span>
        </div>
      </div>
      <div className="loader">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
    </div>
  );
};

export default ComingSoon;
