import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import arrowPrev from "../../../public/images/icons/arrow-prev-dark.svg";
import arrowNext from "../../../public/images/icons/arrow-next-dark.svg";
import Loader from "../Loader/Loader";
import { useAppSelector } from "@/lib/hooks/hooks";
import { formatHistogramData } from "@/lib/utils/utils";
import { selectHistogramInfo } from "@/lib/features/selectors/histogramSelector";

type TSlides = {
  date: string;
  totalDocuments: number;
  riskFactors: number;
};

const GeneralSummary: React.FC = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<TSlides[]>([]);
  const histogramsInfo = useAppSelector(selectHistogramInfo);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (histogramsInfo.data.length > 0) {
      const slides = formatHistogramData(histogramsInfo);
      setSlides(slides);
      setLoading(false);
    }
  }, [histogramsInfo]);

  return (
    <>
      <div className={styles.sliderouter}>
        <div className={styles.sliderouter__header}>
          <span>Период</span>
          <span>Всего</span>
          <span>Риски</span>
        </div>
        <Swiper
          spaceBetween={0}
          slidesPerView={8}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
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
              spaceBetween: 0,
            },
            600: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1081: {
              slidesPerView: 8,
              spaceBetween: 0,
            },
          }}
        >
          {!loading ? (
            slides.map((slide, index) => (
              <SwiperSlide key={index} className={styles.slider__slide}>
                <span>{slide.date}</span>
                <span>{slide.totalDocuments}</span>
                <span>{slide.riskFactors}</span>
              </SwiperSlide>
            ))
          ) : (
            <Loader size="large" text="Загружаем данные" />
          )}
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

export default GeneralSummary;
