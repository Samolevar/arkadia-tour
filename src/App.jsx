import React, { useState, useEffect } from 'react';
import {
  SITE_INFO,
  SPECIAL_OFFERS,
  WHY_US_ITEMS,
  NEWS_ITEMS,
  REVIEWS_ITEMS,
  TEAM_MEMBERS,
  PARTNERS,
} from './data/siteData';
import MaintenanceBanner from './components/MaintenanceBanner';
import Header from './components/Header';
import TopNav from './components/TopNav';
import HeroSlider from './components/HeroSlider';
import TourSearchMaintenance from './components/TourSearchMaintenance';
import Footer from './components/Footer';
import { MaintenancePageModal, CallbackModal } from './components/MaintenanceModal';

export default function App() {
  const [selectedLink, setSelectedLink] = useState(() => {
    const path = window.location.pathname;
    if (path && !['/', '/index.html', '/arkadia-tour', '/arkadia-tour/', '/arkadia-tour/index.html'].includes(path)) {
      return { path, label: `Раздел ${path}` };
    }
    return null;
  });
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelectInternalLink = ({ path, label }) => {
    setSelectedLink({ path, label });
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', path);
    }
  };

  const handleCloseLinkModal = () => {
    setSelectedLink(null);
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
  };

  const handleInternalClick = (e, path, label) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    handleSelectInternalLink({ path, label });
  };

  return (
    <div className="arkadia-app">
      <MaintenanceBanner
        onOpenCallback={() => setCallbackOpen(true)}
        onSelectInternalLink={handleSelectInternalLink}
      />

      <Header
        onSelectInternalLink={handleSelectInternalLink}
        onOpenCallback={() => setCallbackOpen(true)}
      />

      <TopNav onSelectInternalLink={handleSelectInternalLink} />

      <section className="b-main">
        <div className="container">
          {/* slider */}
          <HeroSlider onSelectInternalLink={handleSelectInternalLink} />
          {/* /slider */}

          {/* sletat & hot sletat */}
          <TourSearchMaintenance
            onOpenCallback={() => setCallbackOpen(true)}
            onSelectInternalLink={handleSelectInternalLink}
          />
          {/* /hot */}
        </div>
      </section>

      <section className="b-main">
        <div className="container">
          {/* spec */}
          <section className="b-section">
            <div className="row">
              <div className="col">
                <h2 className="h2 center">Наши спецпредложения</h2>
                <div className="b-excursion">
                  <div className="ex__list row">
                    {SPECIAL_OFFERS.map((offer) => (
                      <div key={offer.id} className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="ex__item">
                          <div className="ex-card__wr">
                            <div className="ex-card__img-wr">
                              <a
                                href={offer.href}
                                onClick={(e) =>
                                  handleInternalClick(e, offer.href, offer.title.trim())
                                }
                                className="ex-card__wr-link"
                              >
                                <img
                                  title={offer.title}
                                  alt={offer.title}
                                  className="ex-card__img"
                                  src={offer.image}
                                />
                              </a>
                            </div>

                            <div className="ex-card__nearest">{offer.duration}</div>

                            <div className="ex-card__info">
                              <h3 className="ex-card__title">
                                <a
                                  href={offer.href}
                                  onClick={(e) =>
                                    handleInternalClick(e, offer.href, offer.title.trim())
                                  }
                                  className="ex-card__link"
                                  title={offer.title}
                                >
                                  {offer.title}
                                </a>
                              </h3>

                              <div className="ex-card__desc">{offer.description}</div>

                              <div className="ex-card__price-wr clr">
                                <div className="ex-card__price">{offer.price}</div>
                                <a
                                  href={offer.href}
                                  onClick={(e) =>
                                    handleInternalClick(e, offer.href, offer.title.trim())
                                  }
                                  className="btn ex-card__btn btn--middle"
                                >
                                  Подробнее
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /spec */}

          {/* why */}
          <section className="b-why">
            <div className="container">
              <h2 className="h2 why__header head-main">Почему мы?</h2>
              <div className="row">
                {WHY_US_ITEMS.map((item) => (
                  <div key={item.id} className="col-12 col-sm-6 col-md-3 why__item">
                    <img className="why__item-img" src={item.image} alt={item.title} />
                    <div className="why__title">{item.title}</div>
                    <div className="why__text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* /why */}
          <br />

          {/* news & reviews */}
          <section className="b-section">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="b-main-news">
                  <h2 className="news__header h2">Новости</h2>
                  <div className="news__list">
                    {NEWS_ITEMS.map((news) => (
                      <div key={news.id} className="news__item clr">
                        <div className="news__date">{news.date}</div>
                        <h3 className="news__title">
                          <a
                            href={news.href}
                            onClick={(e) => handleInternalClick(e, news.href, news.title)}
                          >
                            {news.title}
                          </a>
                        </h3>
                        <div className="news__introtext">{news.introtext}</div>
                      </div>
                    ))}
                  </div>
                  <div className="news__more">
                    <a
                      href="/news/"
                      onClick={(e) => handleInternalClick(e, '/news/', 'Все новости')}
                      className="news-more__link"
                    >
                      Все новости
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 b-main-reviews">
                <h2 className="h2">Отзывы</h2>
                <div className="lastcomments">
                  {REVIEWS_ITEMS.map((rev) => (
                    <div key={rev.id} className="reviewlast__item reviewlast__item_main row">
                      <div className="reviewlast__figure reviewlast__figure_main col-12 col-sm-4">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="reviewlast__img_main"
                        />
                        <div className="reviewlast__name reviewlast__name_main">{rev.name}</div>
                        <div className="reviewlast__date reviewlast__date_main">{rev.date}</div>
                      </div>
                      <div className="reviewlast__info_main col-12 col-sm-8">
                        <div className="reviewlast__title">{rev.title}</div>
                        <div className="reviewlast__text">{rev.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="main-reviews__more">
                  <a
                    href="/contacts/otzyvy"
                    onClick={(e) => handleInternalClick(e, '/contacts/otzyvy', 'Все отзывы')}
                    className="main-reviews__more-link"
                  >
                    Все отзывы
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* team & social */}
          <section className="b-section">
            <div className="row">
              <div className="col-12 col-md-6 b-main-team">
                <h2 className="h2">Наша команда</h2>
                <div className="b-stuff">
                  {TEAM_MEMBERS.map((member) => (
                    <div key={member.id} className="team__item team__item_main row">
                      <div className="team__figure team__figure_main col-12 col-sm-4">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="team__img_main"
                        />
                      </div>
                      <div className="team__info_main col-12 col-sm-8">
                        <div className="team__name team__name_main">{member.name}</div>
                        <div className="team__position team__position_main">
                          {member.position}
                        </div>
                        <div className="team__credo_main">
                          {member.specialty}
                          <br />
                          {member.phone && (
                            <>
                              телефон сотовый{' '}
                              <a href={member.phoneHref}>{member.phone}</a>
                              <br />
                            </>
                          )}
                          E-mail: <a href={`mailto:${member.email}`}>{member.email}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="/contacts/team"
                  onClick={(e) => handleInternalClick(e, '/contacts/team', 'Вся команда')}
                  className="all"
                >
                  Вся команда
                </a>
              </div>

              <div className="col-12 col-md-6">
                <div className="b-main-socwigete">
                  <h2 className="h2">Подписывайтесь на наши соцсети!</h2>
                  {/* VK Widget placeholder during maintenance */}
                  <div id="vk_groups" className="vk-widget-maintenance">
                    <div className="vk-widget-maintenance__title">
                      Сообщество «Аркадия Тур» в соцсетях и мессенджерах
                    </div>
                    <p className="vk-widget-maintenance__text">
                      На время технических работ на сайте следите за горящими турами, новостями и
                      акциями в нашем Telegram-канале и чате MAX:
                    </p>
                    <div className="vk-widget-maintenance__links">
                      <a
                        href={SITE_INFO.telegramUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="btn btn--middle"
                      >
                        Наш канал в Telegram
                      </a>
                      <a
                        href={SITE_INFO.maxChatUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="btn btn--middle vk-widget-maintenance__btn-max"
                      >
                        Присоединиться в MAX
                      </a>
                    </div>
                  </div>

                  <div className="qr-code-wrapper" style={{ marginTop: '20px' }}>
                    <h3 className="h3">Написать в MAX</h3>
                    <a
                      href={SITE_INFO.maxChatUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <img
                        src={SITE_INFO.maxQrImg}
                        alt="Max QR Code"
                        style={{ maxWidth: '200px', height: 'auto', border: 0 }}
                      />
                    </a>
                    <div className="qr-code-caption">
                      <a
                        href={SITE_INFO.maxChatUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        {SITE_INFO.maxChatUrl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* partners */}
          <div className=" partners b-section">
            <div className="partners__header h2 center">
              Работаем с проверенными операторами!
            </div>
            <div className="partners__list">
              {PARTNERS.map((partner) => (
                <div key={partner.id} className="partners__item">
                  <div className="partners__figure">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="partners__img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* /partners */}
        </div>
      </section>

      <Footer
        onSelectInternalLink={handleSelectInternalLink}
        onOpenCallback={() => setCallbackOpen(true)}
      />

      <button
        type="button"
        className="b-back-to-top"
        style={{ display: showBackToTop ? 'block' : 'none' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Наверх
      </button>

      <MaintenancePageModal
        selectedLink={selectedLink}
        onClose={handleCloseLinkModal}
        onOpenCallback={() => setCallbackOpen(true)}
      />

      <CallbackModal
        isOpen={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        onSelectInternalLink={handleSelectInternalLink}
      />
    </div>
  );
}

