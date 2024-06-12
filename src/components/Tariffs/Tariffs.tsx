import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import Tariff_begginer from "../../../public/images/tariffs/beginner-icon.svg";
import Tariff_pro from "../../../public/images/tariffs/pro-icon.svg";
import Tariff_business from "../../../public/images/tariffs/business-icon.svg";
import OK_icon from "../../../public/images/icons/ok.svg";
import Button from "../Button/Button";
import { useAppSelector } from "@/pages/lib/hooks/hooks";
import { selectIsAuthenticated } from "@/pages/lib/features/selectors/authSelectors";

const Tariffs = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return (
    <section className={styles.tariffs}>
      <h3 className={styles.tariffs__title}>Наши тарифы</h3>
      {/* Тариф Beginner */}
      <div className={`${styles.tariff} ${styles.tariff_begginer}`}>
        <div className={styles.tariff__header}>
          <span>Beginner</span>
          <p>Для небольшого исследования</p>
          <Image
            src={Tariff_begginer}
            alt={"Тариф Beginner"}
            width={92}
            height={83}
          />
        </div>
        <div className={styles.tariff__content}>
          <div className={styles.tariff__price}>
            <span>799 ₽</span>
            <s>1 200 ₽</s>
            <p>или 150 ₽/мес. при рассрочке на 24 мес.</p>
          </div>
          <div className={styles.tariff__info}>
            <b>В тариф входит:</b>
            <ul>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Безлимитная история запросов
              </li>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Безопасная сделка
              </li>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Поддержка 24/7
              </li>
            </ul>
          </div>
          <Button>Подробнее</Button>
        </div>
      </div>

      {/* Тариф Pro */}
      <div
        className={`${styles.tariff} ${styles.tariff_pro} ${
          isAuthenticated ? styles.active : ""
        }`}
      >
        <div className={styles.tariff__header}>
          <span>Pro</span>
          <p>Для HR и фрилансеров</p>
          <Image src={Tariff_pro} alt={"Тариф PRO"} width={93} height={103} />
        </div>
        <div className={styles.tariff__content}>
          {isAuthenticated && (
            <div className={styles.tariff__current}>Текущий тариф</div>
          )}
          <div className={styles.tariff__price}>
            <span>1 299 ₽</span>
            <s>2 600 ₽</s>
            <p>или 279 ₽/мес. при рассрочке на 24 мес.</p>
          </div>
          <div className={styles.tariff__info}>
            <b>В тариф входит:</b>
            <ul>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Все пункты тарифа Beginner
              </li>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Экспорт истории
              </li>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Рекомендации по приоритетам
              </li>
            </ul>
          </div>
          {isAuthenticated ? (
            <Button className="grey">Перейти в личный кабинет</Button>
          ) : (
            <Button>Подробнее</Button>
          )}
        </div>
      </div>

      {/* Тариф Business */}
      <div className={`${styles.tariff} ${styles.tariff_business}`}>
        <div className={styles.tariff__header}>
          <span>Business</span>
          <p>Для корпоративных клиентов</p>
          <Image
            src={Tariff_business}
            alt={"Тариф business"}
            width={96}
            height={80}
          />
        </div>
        <div className={styles.tariff__content}>
          <div className={styles.tariff__price}>
            <span>2 379 ₽</span>
            <s>3 700 ₽</s>
          </div>
          <div className={styles.tariff__info}>
            <b>В тариф входит:</b>
            <ul>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Все пункты тарифа Pro
              </li>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Безлимитное количество запросов
              </li>
              <li>
                <Image src={OK_icon} alt={"ok_icon"} width={20} height={20} />
                Приоритетная поддержка
              </li>
            </ul>
          </div>
          <Button>Подробнее</Button>
        </div>
      </div>
    </section>
  );
};

export default Tariffs;
