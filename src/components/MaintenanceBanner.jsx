import React from 'react';
import { SITE_INFO } from '../data/siteData';

export default function MaintenanceBanner({ onOpenCallback, onSelectInternalLink }) {
  const handleInternalClick = (e, path, label) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onSelectInternalLink({ path, label });
  };

  return (
    <div className="maintenance-banner" role="status" aria-live="polite">
      <div className="wr maintenance-banner__inner">
        <div className="maintenance-banner__badge-col">
          <span className="maintenance-banner__pulse" aria-hidden="true" />
          <span className="maintenance-banner__badge">Технические работы</span>
        </div>

        <div className="maintenance-banner__content">
          <strong className="maintenance-banner__title">
            На сайте проводятся плановые технические работы
          </strong>
          <p className="maintenance-banner__text">
            В связи с проведением технических работ временно доступен только ограниченный
            функционал. Турагентство <strong>«Аркадия Тур»</strong> работает в штатном режиме — все
            контакты, направления, визовая поддержка и спецпредложения актуальны!
          </p>
        </div>

        <div className="maintenance-banner__actions">
          <a href={SITE_INFO.phoneHref} className="maintenance-banner__btn maintenance-banner__btn--phone">
            {SITE_INFO.phoneDisplay}
          </a>
          <a
            href={SITE_INFO.telegramUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="maintenance-banner__btn maintenance-banner__btn--tg"
          >
            Telegram
          </a>
          <a
            href={SITE_INFO.maxChatUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="maintenance-banner__btn maintenance-banner__btn--max"
          >
            Написать в MAX
          </a>
          <button
            type="button"
            onClick={onOpenCallback}
            className="maintenance-banner__btn maintenance-banner__btn--callback"
          >
            Оставить заявку
          </button>
          <a
            href="/contacts/"
            onClick={(e) => handleInternalClick(e, '/contacts/', 'Контакты и реквизиты')}
            className="maintenance-banner__link"
          >
            Все контакты
          </a>
        </div>
      </div>
    </div>
  );
}

