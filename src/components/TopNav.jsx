import React, { useState } from 'react';
import {
  VISA_LINKS,
  COUNTRY_LINKS,
  SERVICE_LINKS,
  CONTACT_SUBLINKS,
} from '../data/siteData';

export default function TopNav({ onSelectInternalLink }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key, e) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleNavClick = (e, path, label) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onSelectInternalLink({ path, label });
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className={`b-nav-top ${mobileMenuOpen ? 'nav-top_open' : ''}`}>
      <div className="wr wr_nav-top">
        <button
          type="button"
          className="nav-top__mobile-btn"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
        >
          <span className="nav-top__mobile-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Меню сайта</span>
        </button>

        <ul className={mobileMenuOpen ? 'is-mobile-visible' : ''}>
          <li className="first level1 odd">
            <a
              href="/poisk-turov"
              onClick={(e) => handleNavClick(e, '/poisk-turov', 'Поиск туров')}
            >
              Поиск туров
            </a>
          </li>

          <li
            className={`level1 nav-top__parent even ${
              openDropdown === 'vizy' ? 'nav-top__parent_open' : ''
            }`}
          >
            <a href="/vizy/" onClick={(e) => handleNavClick(e, '/vizy/', 'Визы')}>
              Визы
            </a>
            <ul>
              {VISA_LINKS.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === VISA_LINKS.length - 1;
                const parity = idx % 2 === 0 ? 'odd' : 'even';
                const cls = [
                  isFirst ? 'first' : '',
                  isLast ? 'last' : '',
                  'level2',
                  parity,
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <li key={item.href} className={cls}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.title.trim())}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <i
              className="nav-top__icon js-nav-top__toggle-item"
              onClick={(e) => toggleDropdown('vizy', e)}
              role="button"
              tabIndex={0}
              aria-label="Развернуть список виз"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleDropdown('vizy', e);
              }}
            >
              <svg className="icn icn-ui-chevron-down" aria-hidden="true">
                <use xlinkHref="template/svg/icons.svg#icn-ui-chevron-down" />
              </svg>
            </i>
          </li>

          <li className="level1 odd">
            <a href="/avia" onClick={(e) => handleNavClick(e, '/avia', 'Авиабилеты')}>
              Авиабилеты
            </a>
          </li>

          <li
            className={`level1 nav-top__parent even nav-top__col-3 ${
              openDropdown === 'country' ? 'nav-top__parent_open' : ''
            }`}
          >
            <a href="/country/" onClick={(e) => handleNavClick(e, '/country/', 'Страны')}>
              Страны
            </a>
            <div className="nav-top__wr">
              <ul>
                {COUNTRY_LINKS.map((country, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === COUNTRY_LINKS.length - 1;
                  const parity = idx % 2 === 0 ? 'odd' : 'even';
                  const cls = [
                    isFirst ? 'first' : '',
                    isLast ? 'last' : '',
                    'level2',
                    parity,
                    'nav-top__subitem_country',
                  ]
                    .filter(Boolean)
                    .join(' ');
                  return (
                    <li key={country.href} className={cls}>
                      <a
                        href={country.href}
                        onClick={(e) =>
                          handleNavClick(e, country.href, `Страна: ${country.title.trim()}`)
                        }
                      >
                        <span className={`nav__flag ${country.flag}`} />
                        <span>{country.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="nav-top__allcountry">
                <a
                  href="/country/"
                  onClick={(e) => handleNavClick(e, '/country/', 'Все страны')}
                  className="nav-top__link"
                >
                  Все страны
                </a>
              </div>
            </div>
            <i
              className="nav-top__icon js-nav-top__toggle-item"
              onClick={(e) => toggleDropdown('country', e)}
              role="button"
              tabIndex={0}
              aria-label="Развернуть список стран"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleDropdown('country', e);
              }}
            >
              <svg className="icn icn-ui-chevron-down" aria-hidden="true">
                <use xlinkHref="template/svg/icons.svg#icn-ui-chevron-down" />
              </svg>
            </i>
          </li>

          <li
            className={`level1 nav-top__parent odd ${
              openDropdown === 'services' ? 'nav-top__parent_open' : ''
            }`}
          >
            <a
              href="/nashi-uslugi/"
              onClick={(e) => handleNavClick(e, '/nashi-uslugi/', 'Наши услуги')}
            >
              Наши услуги
            </a>
            <ul>
              {SERVICE_LINKS.map((service, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === SERVICE_LINKS.length - 1;
                const parity = idx % 2 === 0 ? 'odd' : 'even';
                const cls = [
                  isFirst ? 'first' : '',
                  isLast ? 'last' : '',
                  'level2',
                  parity,
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <li key={service.href} className={cls}>
                    <a
                      href={service.href}
                      onClick={(e) => handleNavClick(e, service.href, service.title)}
                    >
                      {service.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <i
              className="nav-top__icon js-nav-top__toggle-item"
              onClick={(e) => toggleDropdown('services', e)}
              role="button"
              tabIndex={0}
              aria-label="Развернуть список услуг"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleDropdown('services', e);
              }}
            >
              <svg className="icn icn-ui-chevron-down" aria-hidden="true">
                <use xlinkHref="template/svg/icons.svg#icn-ui-chevron-down" />
              </svg>
            </i>
          </li>

          <li
            className={`last level1 nav-top__parent even ${
              openDropdown === 'contacts' ? 'nav-top__parent_open' : ''
            }`}
          >
            <a
              href="/contacts/"
              onClick={(e) => handleNavClick(e, '/contacts/', 'Контакты')}
            >
              Контакты
            </a>
            <ul>
              {CONTACT_SUBLINKS.map((sub, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === CONTACT_SUBLINKS.length - 1;
                const parity = idx % 2 === 0 ? 'odd' : 'even';
                const cls = [
                  isFirst ? 'first' : '',
                  isLast ? 'last' : '',
                  'level2',
                  parity,
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <li key={sub.href} className={cls}>
                    <a
                      href={sub.href}
                      onClick={(e) => handleNavClick(e, sub.href, sub.title)}
                    >
                      {sub.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <i
              className="nav-top__icon js-nav-top__toggle-item"
              onClick={(e) => toggleDropdown('contacts', e)}
              role="button"
              tabIndex={0}
              aria-label="Развернуть меню контактов"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleDropdown('contacts', e);
              }}
            >
              <svg className="icn icn-ui-chevron-down" aria-hidden="true">
                <use xlinkHref="template/svg/icons.svg#icn-ui-chevron-down" />
              </svg>
            </i>
          </li>
        </ul>
      </div>
    </nav>
  );
}

