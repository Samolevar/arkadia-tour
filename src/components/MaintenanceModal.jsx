import React, { useState } from 'react';
import {
  SITE_INFO,
  TEAM_MEMBERS,
  VISA_LINKS,
  COUNTRY_LINKS,
  SERVICE_LINKS,
  SPECIAL_OFFERS,
} from '../data/siteData';

export function MaintenancePageModal({ selectedLink, onClose, onOpenCallback }) {
  if (!selectedLink) return null;

  const { path, label } = selectedLink;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullOriginalUrl = `https://arkadia-tour.ru${cleanPath}`;
  const waybackUrl = `${SITE_INFO.waybackBaseUrl}${cleanPath}`;
  const webArhiveRuUrl = `https://web-arhive.ru/page?url=${encodeURIComponent(
    fullOriginalUrl
  )}&date=20260509&hidden=0`;

  const isVisa = cleanPath.startsWith('/vizy');
  const isCountry = cleanPath.startsWith('/country');
  const isService = cleanPath.startsWith('/nashi-uslugi');
  const isContacts = cleanPath.startsWith('/contacts');
  const isTeam = cleanPath.includes('/team');
  const isLegal = cleanPath === '/politika' || cleanPath === '/soglasie';

  return (
    <div
      className="maintenance-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-modal-title"
    >
      <div className="maintenance-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="maintenance-modal__close"
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ×
        </button>

        <div className="maintenance-modal__badge">Раздел временно на техническом обслуживании</div>
        <h2 id="maintenance-modal-title" className="maintenance-modal__title">
          {label || cleanPath}
        </h2>
        <div className="maintenance-modal__url">
          Запрошенный адрес: <code>{fullOriginalUrl}</code>
        </div>

        <p className="maintenance-modal__desc">
          На основном сайте <strong>arkadia-tour.ru</strong> сейчас проводятся технические работы.
          Ниже представлена справочная информация по выбранному разделу, контакты наших
          специалистов и прямые ссылки на архивную копию страницы.
        </p>

        {isTeam || isContacts ? (
          <div className="maintenance-modal__section">
            <h3>Контакты и специалисты ООО «Аркадия-Тур»</h3>
            <p>
              <strong>Адрес офиса:</strong> {SITE_INFO.fullAddress}
              <br />
              <strong>Телефон офиса:</strong>{' '}
              <a href={SITE_INFO.phoneHref}>{SITE_INFO.phoneDisplay}</a>
              <br />
              <strong>Мобильный телефон:</strong>{' '}
              <a href={SITE_INFO.mobilePhoneHref}>{SITE_INFO.mobilePhoneDisplay}</a>
              <br />
              <strong>E-mail:</strong>{' '}
              <a href={`mailto:${SITE_INFO.emailMain}`}>{SITE_INFO.emailMain}</a>,{' '}
              <a href={`mailto:${SITE_INFO.emailSecondary}`}>{SITE_INFO.emailSecondary}</a>
            </p>
            <div className="maintenance-modal__team-grid">
              {TEAM_MEMBERS.map((m) => (
                <div key={m.id} className="maintenance-modal__team-card">
                  <img src={m.photo} alt={m.name} className="maintenance-modal__team-img" />
                  <div>
                    <strong>{m.name}</strong>
                    <div>{m.position}</div>
                    <div>{m.specialty}</div>
                    {m.phone && (
                      <div>
                        Тел.: <a href={m.phoneHref}>{m.phone}</a>
                      </div>
                    )}
                    <div>
                      E-mail: <a href={`mailto:${m.email}`}>{m.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {isVisa ? (
          <div className="maintenance-modal__section">
            <h3>Оформление виз из Екатеринбурга ({VISA_LINKS.length} направлений)</h3>
            <p>
              Оформляем визы в страны Шенгена, Азии, Америки, Африки и Ближнего Востока. Для
              уточнения списка документов, сроков и стоимости позвоните нам по телефону{' '}
              <a href={SITE_INFO.phoneHref}>{SITE_INFO.phoneDisplay}</a> или напишите в мессенджер.
            </p>
          </div>
        ) : null}

        {isCountry ? (
          <div className="maintenance-modal__section">
            <h3>Подбор туров по направлению ({COUNTRY_LINKS.length} стран в каталоге)</h3>
            <p>
              Подбираем индивидуальные, пляжные, экскурсионные и образовательные туры с вылетом из
              Екатеринбурга и других городов РФ от проверенных туроператоров (Pegas, Tez Tour,
              Anex Tour, Библио-Глобус, Coral, Русь Тур, Sunmar, Алеан).
            </p>
            {SPECIAL_OFFERS.filter((o) => o.href === cleanPath).map((offer) => (
              <div key={offer.id} className="maintenance-modal__offer-detail">
                <strong>{offer.title}</strong> ({offer.duration}, {offer.price})
                <p>{offer.description}</p>
              </div>
            ))}
          </div>
        ) : null}

        {isService ? (
          <div className="maintenance-modal__section">
            <h3>Наши услуги</h3>
            <ul>
              {SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <strong>{s.title}</strong> — оформление в офисе и дистанционно.
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {isLegal ? (
          <div className="maintenance-modal__section">
            <h3>Обработка персональных данных ({SITE_INFO.legalName})</h3>
            <p>
              Оператор персональных данных: {SITE_INFO.legalName}, адрес: {SITE_INFO.fullAddress},
              телефон: {SITE_INFO.phoneDisplay}, e-mail: {SITE_INFO.emailMain}. Персональные данные
              обрабатываются исключительно в целях консультирования, подбора и бронирования
              туристского продукта в соответствии с ФЗ № 152-ФЗ «О персональных данных».
            </p>
          </div>
        ) : null}

        <div className="maintenance-modal__actions">
          <a href={SITE_INFO.phoneHref} className="btn btn--middle">
            Позвонить {SITE_INFO.phoneDisplay}
          </a>
          <a
            href={SITE_INFO.telegramUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn btn--middle maintenance-modal__btn-tg"
          >
            Написать в Telegram
          </a>
          <a
            href={SITE_INFO.maxChatUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn btn--middle maintenance-modal__btn-max"
          >
            Написать в MAX
          </a>
          <button
            type="button"
            className="btn btn--middle maintenance-modal__btn-order"
            onClick={() => {
              onClose();
              onOpenCallback();
            }}
          >
            Заказать звонок
          </button>
        </div>

        <div className="maintenance-modal__archive-links">
          <span>Архивные копии этой страницы:</span>
          <a href={waybackUrl} target="_blank" rel="noopener noreferrer">
            Открыть в Web Archive ({cleanPath})
          </a>
          <a href={webArhiveRuUrl} target="_blank" rel="noopener noreferrer">
            Открыть на web-arhive.ru
          </a>
        </div>
      </div>
    </div>
  );
}

export function CallbackModal({ isOpen, onClose, onSelectInternalLink }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(true);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !consent) return;
    setSuccess(true);
  };

  return (
    <div
      className="maintenance-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-modal-title"
    >
      <div className="popup__wr popup_callback callback-modal-active" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="maintenance-modal__close"
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ×
        </button>

        <div id="callback-modal-title" className="popup__header">
          Заказ обратного звонка
        </div>

        {success ? (
          <div className="form__success" style={{ display: 'block' }}>
            Ваша заявка успешно отправлена.
            <br />
            Наши менеджеры свяжутся с Вами по номеру <strong>{phone}</strong>.
            <div style={{ marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn--middle"
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        ) : (
          <form method="post" action="/form/" className="callback-form" onSubmit={handleSubmit}>
            <div className="popup__descr">
              Оставьте Ваш телефон и наш специалист свяжется с Вами в ближайшее время
            </div>
            <input name="form" type="hidden" value="callback" />
            <input type="hidden" name="page_id" value="1" />
            <input type="hidden" name="pagetitle" value="Главная" />

            <div className="popup__row clr">
              <label htmlFor="popup-name" className="popop__label">
                Ваше имя
              </label>
              <div className="popup__field">
                <input
                  type="text"
                  name="n"
                  id="popup-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="popup__row clr">
              <label htmlFor="popup-tel" className="popop__label">
                Ваш телефон
              </label>
              <div className="popup__field">
                <input
                  type="tel"
                  name="t"
                  id="popup-tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="phonemask"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div className="popup__row clr">
              <label htmlFor="popup-msg" className="popop__label">
                Примечание
              </label>
              <div className="popup__field">
                <textarea
                  name="m"
                  id="popup-msg"
                  className="popup__textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>

            <div className="popup__row clr">
              <div className="popup__field personal-field">
                <input
                  name="personal"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  id="quick-order__pers-call"
                  required
                />
                <label htmlFor="quick-order__pers-call">
                  Подтверждаю согласие на{' '}
                  <a
                    href="/soglasie"
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      onClose();
                      onSelectInternalLink({
                        path: '/soglasie',
                        label: 'Согласие на обработку персональных данных',
                      });
                    }}
                  >
                    обработку персональных данных
                  </a>
                </label>
              </div>
            </div>

            <div className="popup__row clr">
              <div className="popop__label">&nbsp;</div>
              <div className="popup__field">
                <button type="submit" name="submit" className="btn btn_callback_submit form__submit">
                  <span className="middle">Заказать звонок</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

