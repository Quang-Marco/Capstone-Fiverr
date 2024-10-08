import React, { useEffect, useState } from "react";
import "./header.scss";
import FormSearch from "../FormSearch/FormSearch";
import IconLogoHeader from "../Icon/IconLogoHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { pathDefault } from "../../common/path";
import { Button, Collapse, Drawer, Dropdown, Space } from "antd";
import { DownOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import LanguageSwitcher from "../LanguageSwicher/LanguageSwicher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const [isScroll, setIsScroll] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  const { listDetailsJobs } = useSelector((state) => state.congViecSlice);

  const explore = [
    {
      title: t("header.exploreList.discover.title"),
      content: t("header.exploreList.discover.content"),
    },
    {
      title: t("header.exploreList.community.title"),
      content: t("header.exploreList.community.content"),
    },
    {
      title: t("header.exploreList.guides.title"),
      content: t("header.exploreList.guides.content"),
    },
    {
      title: t("header.exploreList.podcast.title"),
      content: t("header.exploreList.podcast.content"),
    },
    {
      title: t("header.exploreList.learn.title"),
      content: t("header.exploreList.learn.content"),
    },
    {
      title: t("header.exploreList.blog.title"),
      content: t("header.exploreList.blog.content"),
    },
    {
      title: t("header.exploreList.logoMaker.title"),
      content: t("header.exploreList.logoMaker.content"),
    },
  ];
  const currency = [
    {
      name: t("listCurrency.usd.name"),
      symbol: t("listCurrency.usd.symbol"),
    },
    {
      name: t("listCurrency.euro.name"),
      symbol: t("listCurrency.euro.symbol"),
    },
    {
      name: t("listCurrency.pound.name"),
      symbol: t("listCurrency.pound.symbol"),
    },
    {
      name: t("listCurrency.aud.name"),
      symbol: t("listCurrency.aud.symbol"),
    },
    {
      name: t("listCurrency.inr.name"),
      symbol: t("listCurrency.inr.symbol"),
    },
  ];
  const renderItem = (content) => (
    <p className="pl-7 py-2 cursor-pointer text-base text-gray-600 hover:bg-gray-100 duration-300">
      {content}
    </p>
  );
  const itemsFiverrPro = [
    {
      key: "1",
      label: (
        <div className="flex gap-3 border rounded-lg p-5">
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/hire-freelancer.e3fcf5a.svg"
            alt=""
          />
          <div>
            <h5 className="font-semibold text-base text-gray-700">
              {t("header.hire")}
            </h5>
            <p className="font-medium text-gray-500">
              {t("header.hireDetails")}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-3 border rounded-lg p-5">
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/iam-freelancer.6e3c275.svg"
            alt=""
          />
          <div>
            <h5 className="font-semibold text-base text-gray-700">
              {t("header.proServices")}
            </h5>
            <p className="font-medium text-gray-500">
              {t("header.proServicesDetails")}
            </p>
          </div>
        </div>
      ),
    },
  ];
  const itemsLanguage = [
    {
      key: "1",
      label: t("language"),
      children: <LanguageSwitcher trigger={["click"]} />,
    },
    {
      key: "2",
      label: t("currency"),
      children: currency.map((item, index) => (
        <div
          key={index}
          className="cursor-pointer pl-9 py-2 text-gray-600 hover:bg-gray-100 duration-300"
        >
          <p className="text-black text-base font-semibold">{item.name}</p>
          <p className="text-base">{item.symbol}</p>
        </div>
      )),
    },
  ];
  const itemsCollapse = [
    {
      key: "1",
      label: t("categories"),
      children: listDetailsJobs.map((item) => (
        <Link
          to={`${pathDefault.listJob}?maLoaiCongViec=${item.id}`}
          onClick={toggleDrawer}
        >
          {renderItem(item.name)}
        </Link>
      )),
    },
    {
      key: "2",
      label: t("header.explore"),
      children: explore.map((item) => renderItem(item.title)),
    },
    {
      key: "3",
      label: "Fiverr Pro",
      children: (
        <>
          {renderItem(t("header.hire"))}
          {renderItem(t("header.proServices"))}
        </>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="bg-white py-5 font-medium border-b sticky top-0 z-10">
        <div className="container px-2">
          <div className="header_content flex items-center justify-between">
            <Button className="lg:hidden" onClick={toggleDrawer}>
              <MenuUnfoldOutlined />
            </Button>
            <Drawer
              title={
                <Link
                  to={pathDefault.register}
                  className={
                    "px-6 py-3 bg-black text-white rounded-md text-base font-semibold hover:text-white hover:opacity-80 duration-300"
                  }
                >
                  {t("signup")}
                </Link>
              }
              placement="left"
              onClose={toggleDrawer}
              open={open}
            >
              <Link
                to={pathDefault.login}
                className={
                  "block pl-4 py-3 rounded cursor-pointer text-base text-gray-600 hover:text-gray-600 hover:bg-gray-100 duration-300"
                }
              >
                {t("signin")}
              </Link>
              <Collapse
                className="text-base"
                ghost
                expandIconPosition="end"
                items={itemsCollapse}
              />
              <h4 className="mt-10 ml-4 mb-4 text-base font-semibold">
                {t("general")}
              </h4>
              <Link
                to={pathDefault.homePage}
                onClick={toggleDrawer}
                className={
                  "block pl-4 py-3 cursor-pointer text-base text-gray-600 hover:text-gray-600 hover:bg-gray-100 duration-300"
                }
              >
                {t("home")}
              </Link>
              <Collapse
                className="text-base"
                ghost
                expandIconPosition="end"
                items={itemsLanguage}
              />
            </Drawer>

            <div className="header_logo flex space-x-5">
              <Link to={pathDefault.homePage}>
                <IconLogoHeader />
              </Link>
              <FormSearch
                classWrapper={`w-[500px] max-w-[600px] hidden lg:block ${
                  isScroll ? "visible" : "invisible"
                }`}
                classInput="rounded-md min-w-[400px]"
                classIcon="bg-black py-3 px-4"
                placeholder={t("search.header")}
              />
            </div>

            <nav className="header_navigation space-x-4 hidden xl:flex items-center">
              <Dropdown
                menu={{
                  items: itemsFiverrPro,
                }}
                placement="bottom"
                trigger={["click"]}
                className="cursor-pointer font-semibold text-gray-700 py-3 px-4 rounded-md hover:bg-gray-100 duration-300"
              >
                <Space>
                  Fiverr Pro
                  <DownOutlined />
                </Space>
              </Dropdown>
              <Dropdown
                menu={{
                  items: explore.map((item, index) => ({
                    key: index + 1,
                    label: (
                      <div>
                        <h5 className="font-semibold text-base text-gray-700">
                          {item.title}
                        </h5>
                        <p className="font-medium text-gray-500">
                          {item.content}
                        </p>
                      </div>
                    ),
                  })),
                }}
                placement="bottom"
                trigger={["click"]}
                className="cursor-pointer font-semibold text-gray-500 py-3 px-4 rounded-md hover:bg-gray-100 duration-300"
              >
                <Space>
                  {t("header.explore")}
                  <DownOutlined />
                </Space>
              </Dropdown>

              <LanguageSwitcher />

              {/* <Link
                to={pathDefault.homePage}
                className="font-semibold text-gray-500 hover:text-green-500 duration-300"
              >
                {t("header.seller")}
              </Link> */}

              <Link
                to={pathDefault.login}
                className={
                  "font-semibold text-gray-500 hover:text-green-500 duration-300 pl-4"
                }
              >
                {t("signin")}
              </Link>
            </nav>

            <Link
              to={pathDefault.register}
              className={
                "py-2 px-4 font-semibold rounded border border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300"
              }
            >
              {t("signup")}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
