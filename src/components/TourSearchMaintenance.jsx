import React, { useState } from 'react';
import { SITE_INFO } from '../data/siteData';

export default function TourSearchMaintenance({ onOpenCallback, onSelectInternalLink }) {
  const [destination, setDestination] = useState('ОАЭ, Египет или Турция');
  const [dates, setDates] = useState('Ближайшие даты (7–10 ночей)');
  const [tourists, setTourists] = useState('2 взрослых');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <>
      {/* sletat / tourvisor search module */}
      <div className="row b-section">
        <div className="col-12">
          <div className="search-main">
            <div className="tv-search-form tv-moduleid-125">
              <div className="maintenance-search-card">
                <div className="maintenance-search-card__header">
                  <div className="maintenance-search-card__status">
                    <span className="maintenance-search-card__dot" aria-hidden="true" />
                    <span>Модуль онлайн-поиска туров (Tourvisor #125) временно на техобслуживании</span>
                  </div>
                  <div className="maintenance-search-card__sub">
                    На сайте проводятся технические работы, доступен ограниченный функционал.
                    Оставьте параметры отдыха или свяжитесь с нами — менеджеры «Аркадия Тур»
                    подберут лучшие предложения туроператоров за 10–15 минут!
                  </div>
                </div>

                {submitted ? (
                  <div className="maintenance-search-card__success" role="alert">
                    <div className="maintenance-search-card__success-title">
                      Спасибо! Ваш запрос на подбор тура принят.
                    </div>
                    <p>
                      Параметры: <strong>{destination}</strong>, <strong>{dates}</strong>,{' '}
                      <strong>{tourists}</strong>. Телефон: <strong>{phone}</strong>.
                    </p>
                    <p>
                      Для мгновенной связи вы также можете позвонить нам по номеру{' '}
                      <a href={SITE_INFO.phoneHref}>{SITE_INFO.phoneDisplay}</a> или написать в{' '}
                      <a
                        href={SITE_INFO.telegramUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        Telegram
                      </a>{' '}
                      / <a
                        href={SITE_INFO.maxChatUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        MAX
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      className="btn btn--middle"
                      onClick={() => {
                        setSubmitted(false);
                        setPhone('');
                      }}
                    >
                      Отправить ещё один запрос
                    </button>
                  </div>
                ) : (
                  <form className="maintenance-search-form" onSubmit={handleSubmit}>
                    <div className="maintenance-search-form__grid">
                      <label className="maintenance-search-form__field">
                        <span className="maintenance-search-form__label">Направление / страна</span>
                        <input
                          type="text"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          placeholder="Куда хотите поехать?"
                          required
                        />
                      </label>

                      <label className="maintenance-search-form__field">
                        <span className="maintenance-search-form__label">Даты и длительность</span>
                        <input
                          type="text"
                          value={dates}
                          onChange={(e) => setDates(e.target.value)}
                          placeholder="Когда и на сколько ночей?"
                          required
                        />
                      </label>

                      <label className="maintenance-search-form__field">
                        <span className="maintenance-search-form__label">Туристы и пожелания</span>
                        <input
                          type="text"
                          value={tourists}
                          onChange={(e) => setTourists(e.target.value)}
                          placeholder="2 взрослых, отель 4-5*, все включено"
                          required
                        />
                      </label>

                      <label className="maintenance-search-form__field">
                        <span className="maintenance-search-form__label">Ваш телефон</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                          required
                        />
                      </label>

                      <div className="maintenance-search-form__action">
                        <button type="submit" className="btn maintenance-search-form__submit">
                          Подобрать тур
                        </button>
                      </div>
                    </div>

                    <div className="maintenance-search-form__footer">
                      <span>
                        Нажимая кнопку, вы подтверждаете согласие с{' '}
                        <a
                          href="/politika"
                          onClick={(e) => {
                            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                            e.preventDefault();
                            onSelectInternalLink({
                              path: '/politika',
                              label: 'Политика конфиденциальности',
                            });
                          }}
                        >
                          политикой конфиденциальности
                        </a>{' '}
                        и{' '}
                        <a
                          href="/soglasie"
                          onClick={(e) => {
                            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                            e.preventDefault();
                            onSelectInternalLink({
                              path: '/soglasie',
                              label: 'Согласие на обработку персональных данных',
                            });
                          }}
                        >
                          обработкой персональных данных
                        </a>
                        .
                      </span>
                      <button
                        type="button"
                        className="maintenance-search-form__link-btn"
                        onClick={onOpenCallback}
                      >
                        Заказать обратный звонок
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /sletat */}

      {/* hot sletat */}
      <div className="row b-section">
        <div className="col-12">
          <div className="search-main">
            <div className="tv-hot-tours tv-moduleid-943010">
              <div className="maintenance-hot-bar">
                <div className="maintenance-hot-bar__info">
                  <strong>Горящие туры из Екатеринбурга (модуль #943010):</strong> витрина горящих
                  туров обновляется в рамках техработ. Актуальные горящие предложения публикуются в
                  нашем Telegram-канале и мессенджере MAX.
                </div>
                <div className="maintenance-hot-bar__links">
                  <a
                    href={SITE_INFO.telegramUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="btn btn--middle maintenance-hot-bar__btn"
                  >
                    Горящие туры в Telegram
                  </a>
                  <a
                    href={SITE_INFO.maxChatUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="btn btn--middle maintenance-hot-bar__btn maintenance-hot-bar__btn--max"
                  >
                    Написать в MAX
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /hot */}
    </>
  );
}

