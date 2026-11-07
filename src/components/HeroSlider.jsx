import React, { useState, useEffect, useCallback } from 'react';
import { HERO_SLIDES } from '../data/siteData';

export default function HeroSlider({ onSelectInternalLink }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="b-main-slider slick-initialized slick-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="slick-prev slick-arrow"
            aria-label="Предыдущий слайд"
            onClick={prevSlide}
          >
            Previous
          </button>

          <ul className="main-slider__list">
            <li>
              <div className="main-slider__item">
                <img
                  className="main-slider__img"
                  src={currentSlide.image}
                  data-lazy={currentSlide.image.replace(/^\//, '')}
                  alt={currentSlide.title}
                />
                <div className="main-slider__caption">
                  <div className="main-slider__title">
                    <a
                      href={currentSlide.href}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                        e.preventDefault();
                        onSelectInternalLink({
                          path: currentSlide.href,
                          label: currentSlide.title,
                        });
                      }}
                      className="main-slider__title-link"
                    >
                      {currentSlide.title}
                    </a>
                  </div>

                  <div className="main-slider__desc">
                    {currentSlide.description.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <button
            type="button"
            className="slick-next slick-arrow"
            aria-label="Следующий слайд"
            onClick={nextSlide}
          >
            Next
          </button>

          <ul className="slick-dots" role="tablist">
            {HERO_SLIDES.map((slide, index) => (
              <li
                key={slide.id}
                className={index === activeIndex ? 'slick-active' : ''}
                role="presentation"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Слайд ${index + 1}: ${slide.title}`}
                  onClick={() => setActiveIndex(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

