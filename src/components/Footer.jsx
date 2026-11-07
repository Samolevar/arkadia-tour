import React from 'react';
import { SITE_INFO, FOOTER_NAV_LINKS } from '../data/siteData';

export default function Footer({ onSelectInternalLink, onOpenCallback }) {
  const handleInternalClick = (e, path, label) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onSelectInternalLink({ path, label });
  };

  return (
    <footer className="b-footer">
      <div className="container">
        <div className="row footer__row footer__row_1">
          <div className="col-12 col-sm-6 col-md-4 footer__col footer__col_1">
            <div className="b-social">
              <a
                rel="nofollow noopener noreferrer"
                target="_blank"
                href={SITE_INFO.telegramUrl}
                className="social__link"
                aria-label="Telegram Аркадия Тур"
                title="Наш Telegram-канал"
              >
                <svg className="icn" aria-hidden="true">
                  <use xlinkHref="template/svg/icons.svg#icn-soc-telegram" />
                </svg>
              </a>
            </div>

            <div className="b-copy">{SITE_INFO.copyright}</div>

            <div className="b-agreement-link">
              <a
                href="/politika"
                onClick={(e) => handleInternalClick(e, '/politika', 'Политика конфиденциальности')}
                className="madein__link"
                rel="nofollow"
              >
                Политика конфиденциальности
              </a>
            </div>
            <div className="b-agreement-link">
              <a
                href="/soglasie"
                onClick={(e) =>
                  handleInternalClick(
                    e,
                    '/soglasie',
                    'Согласие на обработку персональных данных'
                  )
                }
                className="madein__link"
                rel="nofollow"
              >
                Согласие на обработку персональных данных
              </a>
            </div>
            <div className="b-agreement-link" style={{ marginTop: '8px' }}>
              <a
                href={SITE_INFO.webArchiveSourceUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="madein__link"
              >
                Сохранённая копия сайта (Web-Arhive.ru от {SITE_INFO.snapshotDate})
              </a>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 footer__col footer__col_2">
            <nav className="b-nav-footer">
              <ul>
                {FOOTER_NAV_LINKS.map((item, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === FOOTER_NAV_LINKS.length - 1;
                  const parity = idx % 2 === 0 ? 'odd' : 'even';
                  const cls = [
                    isFirst ? 'first' : '',
                    isLast ? 'last' : '',
                    'level1',
                    parity,
                  ]
                    .filter(Boolean)
                    .join(' ');
                  return (
                    <li key={item.href} className={cls}>
                      <a
                        href={item.href}
                        onClick={(e) => handleInternalClick(e, item.href, item.title)}
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="pay-system" aria-label="Платежные системы">
              <svg className="icn icn-pay" aria-label="МИР">
                <use xlinkHref="template/svg/icons.svg#icn-pay-mir" />
              </svg>
              <svg className="icn icn-pay" aria-label="Visa">
                <use xlinkHref="template/svg/icons.svg#icn-pay-visa" />
              </svg>
              <svg className="icn icn-pay" aria-label="MasterCard">
                <use xlinkHref="template/svg/icons.svg#icn-pay-mastercard" />
              </svg>
              <svg className="icn icn-pay" aria-label="Maestro">
                <use xlinkHref="template/svg/icons.svg#icn-pay-maestro" />
              </svg>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 footer__col footer__col_3">
            <div className="b-contacts contacts_footer">
              <div className="contacts__phone">
                <a href="tel:73433449890">
                  <svg className="icn icn-ui-phone middle" aria-hidden="true">
                    <use xlinkHref="template/svg/icons.svg#icn-ui-phone" />
                  </svg>
                  <span className="middle">{SITE_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div className="contacts__address">
                <a
                  href="/contacts/"
                  onClick={(e) => handleInternalClick(e, '/contacts/', 'Контакты')}
                >
                  {SITE_INFO.city} <br />
                  {SITE_INFO.addressLine}
                </a>
              </div>
            </div>

            <div className="footer__extra" style={{ marginTop: '12px' }}>
              <a
                href="#callback"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenCallback();
                }}
                className="js-callback-btn"
              >
                Заказать обратный звонок
              </a>
              <br />
              <a
                href="/contacts/order-tour"
                onClick={(e) =>
                  handleInternalClick(e, '/contacts/order-tour', 'Заявка на подбор тура')
                }
              >
                Заявка на подбор тура
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

