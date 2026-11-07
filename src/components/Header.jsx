import React from 'react';
import { SITE_INFO } from '../data/siteData';

export default function Header({ onSelectInternalLink, onOpenCallback }) {
  const handleLinkClick = (e, path, label) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onSelectInternalLink({ path, label });
  };

  return (
    <header className="b-header">
      <div className="wr wr_header">
        <div className="header__col-1">
          <a
            href="/"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="b-logo logo_header"
          >
            <span className="logo__figure">
              <img src={SITE_INFO.logoImg} alt={SITE_INFO.name} className="logo__img" />
            </span>
            <span className="b-slogan">
              <span className="slogan__title" />
              <span className="slogan__subtitle" />
            </span>
          </a>
        </div>

        <div className="header__col-2">
          <div className="b-header-extra">
            <a
              href="/contacts/order-tour"
              onClick={(e) => handleLinkClick(e, '/contacts/order-tour', 'Заказ тура')}
              className="btn btn_accent btn_block b-btn-order"
            >
              <span className="middle">Заказ тура</span>
            </a>
            <button
              type="button"
              onClick={onOpenCallback}
              className="btn btn_accent btn_block b-btn-callback js-callback-btn"
            >
              <span className="middle">Обратный звонок</span>
            </button>
          </div>
        </div>

        <div className="header__col-3">
          <div
            className="b-contacts contacts_header"
            itemScope
            itemType="http://schema.org/Organization"
          >
            <meta itemProp="name" content={SITE_INFO.name} />
            <div className="contacts__phone">
              <a itemProp="telephone" href={SITE_INFO.phoneHref}>
                <svg className="icn icn-ui-phone middle" aria-hidden="true">
                  <use xlinkHref="template/svg/icons.svg#icn-ui-phone" />
                </svg>
                <span className="middle">{SITE_INFO.phoneDisplay}</span>
              </a>
            </div>

            <div className="contacts__phone" />

            <div className="contacts__address">
              <a
                itemProp="address"
                href="/contacts/"
                onClick={(e) => handleLinkClick(e, '/contacts/', 'Контакты')}
              >
                {SITE_INFO.city} <br />
                {SITE_INFO.addressLine}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

