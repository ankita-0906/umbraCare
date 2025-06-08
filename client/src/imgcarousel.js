import { useState, useEffect } from "react"

const slidesData = [
  {
    id: 1,
    title: "Follicular Phase Tips",
    image: "/images/follicular-phase.png",
    tips: [
      "Try light cardio or yoga",
      "Focus on protein-rich foods",
      "Practice mindfulness to boost mood",
      "Plan social or creative activities",
      "Increase intake of leafy greens",
      "Stay consistent with water intake",
      "Track energy and mood spikes",
    ],
  },
  {
    id: 2,
    title: "Ovulation Phase Tips",
    image: "/images/ovulation-phase.png",
    tips: [
      "Stay active and energetic",
      "Boost hydration with fruits",
      "Consider using ovulation test kits",
      "Practice safe sex or plan for conception",
      "Eat anti-inflammatory foods",
      "Keep a journal of changes",
      "Be mindful of heightened emotions",
    ],
  },
  {
    id: 3,
    title: "Luteal Phase Care",
    image: "/images/luteal-phase.png",
    tips: [
      "Avoid salty or sugary foods",
      "Get enough sleep to reduce irritability",
      "Do light stretches or walks",
      "Include magnesium-rich foods like bananas",
      "Take breaks if you feel fatigued",
      "Manage PMS with calming routines",
      "Reduce screen time before bed",
    ],
  },
  {
    id: 4,
    title: "Menstrual Phase Care",
    image: "/images/menstrual-phase.png",
    tips: [
      "Use a heating pad to ease cramps",
      "Stay hydrated to reduce bloating",
      "Choose iron-rich foods like lentils",
      "Rest and get enough sleep",
      "Wear comfy clothing",
      "Avoid caffeine if feeling anxious",
      "Track your flow and symptoms",
    ],
  },
]

export default function MenstrualCycleCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredTip, setHoveredTip] = useState(null)
  const [imageScale, setImageScale] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length)
  }

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const currentSlideData = slidesData[currentSlide]

  return (
    <>
    <div
      className="carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* LEFT SECTION (35% width): Heading + Image */}
      <div className="left-section">
        
        <div
          className="image-wrapper"
          onMouseEnter={() => setImageScale(1.05)}
          onMouseLeave={() => setImageScale(1)}
        >
          <img
            src={currentSlideData.image || "/placeholder.svg"}
            alt={currentSlideData.title}
            className="carousel-image"
            style={{
              transform: `scale(${imageScale})`,
              transition: "transform 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* RIGHT SECTION (65% width): Title, Tips, Nav Buttons */}
      <div className="right-section">
        <h4 className="slide-title" style={{color:"rgb(255, 140, 0)"}}>{currentSlideData.title}</h4>
        <ul className="tips-list">
          {currentSlideData.tips.map((tip, index) => (
            <li
              key={`${tip}-${index}`}
              className="tip-item"
              style={{
                transform:
                  hoveredTip === index ? "translateX(5px)" : "translateX(0px)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={() => setHoveredTip(index)}
              onMouseLeave={() => setHoveredTip(null)}
            >
              {tip}
            </li>
          ))}
        </ul>

        <div className="navigation-buttons">
          <button className="nav-button" onClick={prevSlide}>
            ←
          </button>
          <button className="nav-button" onClick={nextSlide}>
            →
          </button>
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          width: full;         /* Adjust total width as needed */
          height: 420px;        /* Fixed height */
          display: flex;
          flex-direction: row;
          border-radius: 12px;
          background: rgb(255, 251, 248);
          box-shadow: rgba(255, 140, 0, 0.1) 0px 4px 12px;
          border: 1px solid #eee;
          overflow: hidden;
        }

        /* LEFT SIDE (35%) */
        .left-section {
          width: 35%;
           background: rgb(255, 251, 248);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 10px;
          box-sizing: border-box;
        }

        .left-heading {
          color:rgb(255, 140, 0);       /* Orange heading */
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          text-align: center;
        }

        .image-wrapper {
          width: 100%;
          flex: 1;  /* Let image-wrapper fill remaining vertical space */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .carousel-image {
          max-width: 100%;
          max-height: 100%;
          border-radius: 8px;
          object-fit: cover;
        }

        /* RIGHT SIDE (65%) */
        .right-section {
          width: 65%;
          padding: 20px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .slide-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;               /* Fill available vertical space with the tip list */
          overflow-y: auto;      /* Scroll if tips overflow */
        }

        .tip-item {
          margin-bottom: 8px;
          cursor: pointer;
          font-size: 14px;
          line-height: 1.4;
        }

        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
        }

        .nav-button {
          padding: 8px 16px;
          font-size: 16px;
          border: none;
           background: rgb(255, 251, 248);
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .nav-button:hover {
          background: #ddd;
        }
      `}</style>
    </div>
    </>
  )
}