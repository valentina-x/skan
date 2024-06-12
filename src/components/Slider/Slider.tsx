import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import arrowPrev from "../../../public/images/icons/arrow-prev.svg";
import arrowNext from "../../../public/images/icons/arrow-next.svg";
import icon1svg from "../../../public/images/slider/icon1.svg";
import icon2svg from "../../../public/images/slider/icon2.svg";
import icon3svg from "../../../public/images/slider/icon3.svg";

const Slider: React.FC = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={styles.sliderouter}>
        <Swiper
          spaceBetween={45}
          slidesPerView={3}
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{ delay: 4000 }}
          className={styles.slider}
          onInit={(swiper) => {
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 45,
            },
            1081: {
              slidesPerView: 3,
              spaceBetween: 45,
            },
          }}
        >
          <SwiperSlide className={styles.slider__slide}>
            <Image src={icon1svg} alt={"speed icon"} width={64} height={64} />
            <p>
              Высокая и оперативная скорость <br /> обработки заявки
            </p>
          </SwiperSlide>
          <SwiperSlide className={styles.slider__slide}>
            <Image src={icon2svg} alt={"db icon"} width={64} height={64} />
            <p>
              Огромная комплексная база <br />
              данных, обеспечивающая <br />
              объективный ответ на запрос
            </p>
          </SwiperSlide>
          <SwiperSlide className={styles.slider__slide}>
            <Image src={icon3svg} alt={"defence icon"} width={64} height={64} />
            <p>
              Защита конфеденциальных сведений, не подлежащих разглашению по
              федеральному законодательству
            </p>
          </SwiperSlide>
          <SwiperSlide className={styles.slider__slide}>
            <Image src={icon2svg} alt={"db icon"} width={64} height={64} />
            <p>
              Огромная комплексная база <br />
              данных, обеспечивающая <br />
              объективный ответ на запрос
            </p>
          </SwiperSlide>
        </Swiper>
        <div ref={prevRef} className={styles.swiper_custom_button_prev}>
          <Image src={arrowPrev} alt={"arrow icon"} width={23} height={31} />
        </div>
        <div ref={nextRef} className={styles.swiper_custom_button_next}>
          <Image src={arrowNext} alt={"arrow icon"} width={23} height={31} />
        </div>
      </div>
    </>
  );
};

export default Slider;
