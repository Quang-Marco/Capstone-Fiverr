import React, { useEffect, useState } from "react";
import "./banner.scss";
import { DownOutlined } from "@ant-design/icons";
import FormSearch from "../FormSearch/FormSearch";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { updateJobs } from "../../redux/congViecSlice";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { Trans, useTranslation } from "react-i18next";
import i18n from "i18next";

const Banner = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listDetailsJobs } = useSelector((state) => state.congViecSlice);
  const listBrands = [
    {
      imgURL:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg",
    },
    {
      imgURL:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg",
    },
    {
      imgURL:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg",
    },
    {
      imgURL:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg",
    },
    {
      imgURL:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg",
    },
    {
      imgURL:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg",
    },
  ];

  const [visibleProducts, setVisibleProducts] = useState(9);
  const handleShowMore = () => setVisibleProducts((prev) => prev + 6);
  const { isMobile, isTablet, isIpadAir5 } = useResponsive();

  useEffect(() => {
    const visibleCount = isIpadAir5 ? 8 : isTablet ? 6 : isMobile ? 3 : 9;
    setVisibleProducts(visibleCount);
  }, [isMobile, isIpadAir5, isTablet]);

  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(updateJobs());
    }
  }, [i18n.isInitialized, dispatch]);

  useEffect(() => {
    const handleLanguageChange = () => {
      dispatch(updateJobs());
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [dispatch]);

  return (
    <section className="banner">
      <div className="container lg:px-2">
        <div className="banner_content md:rounded-2xl md:mt-10 mb-5 h-72 md:h-96 xl:h-[500px] flex flex-col justify-around items-center">
          <h1 className="text-white text-4xl sm:text-5xl xl:text-6xl text-center w-80 sm:w-7/12 xl:w-[800px] pt-5 sm:pt-10 xl:pt-28">
            <Trans
              i18nKey="banner.title"
              components={{
                strong: (
                  <strong className="title_highlight font-medium text-green-600 text-4xl sm:text-5xl lg:text-6xl" />
                ),
              }}
            />
          </h1>
          <FormSearch
            classWrapper=""
            classIcon="p-3 mr-2 rounded-lg bg-green-800"
            placeholder={t("search.banner")}
            classInput="py-2 rounded-xl min-w-[350px] sm:min-w-[500px] lg:min-w-[650px]"
          />
          <div className="banner_social space-x-10 pt-5 hidden lg:flex">
            <span className="font-semibold text-white opacity-50">
              {t("banner.trust")}
            </span>
            {listBrands.map((item, index) => (
              <img
                key={index + 1}
                className="opacity-50"
                src={item.imgURL}
              ></img>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-4">
          {listDetailsJobs.slice(0, visibleProducts).map((product, index) => (
            <Link
              key={index + 1}
              className="border rounded-2xl p-3 lg:p-5 shadow-lg cursor-pointer hover:bg-cyan-100 duration-300"
              to={`${pathDefault.listJob}?maLoaiCongViec=${product.id}`}
            >
              <img src={product.imgURL} />
              <p className="text-sm font-semibold mt-3">{product.name}</p>
            </Link>
          ))}
        </div>
        {visibleProducts < listDetailsJobs.length && (
          <div
            onClick={handleShowMore}
            className="text-center font-semibold py-2 mt-3 rounded-md cursor-pointer hover:bg-gray-100 duration-300"
          >
            View {9 - visibleProducts} more <DownOutlined />
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;
