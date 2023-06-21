import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Main({ articles }) {
  //   console.log(articles);
  return (
    <section className="HomepageTop_root__zMzHh snipcss-dzBkb ">
      <div className="HomepageTop_top__O223p ">
        <Link
          href={`/articles/${articles[0]?.path}`}
          className="HomepageTop_lede__0sEcx hover:cursor-pointer"
        >
          <article className="Lede_root__g7IPQ " data-event-module="lede">
            <figure className="Lede_figure__q_84R" data-event-element="image">
              <div className="relative w-full  aspect-[70/45] ">
                {articles[0]?.img_url ? (
                  <Image
                    src={articles[0].img_url}
                    fill
                    className="object-cover"
                    priority
                    alt="Main content Image"
                    sizes="300px"
                  />
                ) : null}
              </div>
              <div className="Caption_root__KYHTc"></div>
            </figure>
            <h1 className="Lede_title__CBiTZ" data-event-element="title">
              {articles[0]?.title}
            </h1>

            <div className="Lede_byline__XMTjm">{articles[0]?.timestamp}</div>
          </article>
        </Link>
        {/* <gpt-ad
          className="GptAd_root__2eqVh HomepageTop_mobileInjector__4HjyZ HomepageTopInjectorMobile_root__Sk5rN"
          format="injector"
          sizes-at-0="mobile-wide"
          targeting-pos="mobileboxpremium"
          sizes-at-976=""
          id="gpt-unit-2"
        ></gpt-ad> */}
        <div className="HomepageTop_topStack__SqPza">
          <ul className="TopStack_root__Wmbra" data-event-module="top stack">
            <li className="TopStack_li__ktQAe" data-event-position="1">
              <Link href={`/articles/${articles[1]?.path}`} className="cursor-pointer">
                <article className="SmallPromoItem_root__6Qj4m">
                  <div>
                    <h2 className="SmallPromoItem_title__Ev9wU" data-event-element="title">
                      {articles[1]?.title}
                    </h2>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[1]?.timestamp}</div>
                    </div>
                  </div>

                  <div className="relative h-[86px] w-[86px] lg:hidden inline ll:inline">
                    {articles[1]?.img_url ? (
                      <Image
                        src={articles[1].img_url}
                        fill
                        className="object-cover"
                        alt="Main content Image"
                        sizes="86px"
                      />
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
            <li className="TopStack_li__ktQAe" data-event-position="2">
              <Link href={`/articles/${articles[2]?.path}`} className="hover:cursor-pointer">
                <article className="SmallPromoItem_root__6Qj4m">
                  <div>
                    <h2 className="SmallPromoItem_title__Ev9wU" data-event-element="title">
                      {articles[2]?.title}
                    </h2>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[2]?.timestamp}</div>
                    </div>
                  </div>

                  <div className="relative h-[86px] w-[86px] lg:hidden inline ll:inline">
                    {articles[2]?.img_url ? (
                      <Image
                        src={articles[2].img_url}
                        fill
                        className="object-cover"
                        sizes="86px"
                        alt="Main content Image"
                      />
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
            <li className="TopStack_li__ktQAe" data-event-position="3">
              <Link href={`/articles/${articles[3]?.path}`} className="hover:cursor-pointer">
                <article className="SmallPromoItem_root__6Qj4m">
                  <div>
                    <h2 className="SmallPromoItem_title__Ev9wU" data-event-element="title">
                      {articles[3]?.title}
                    </h2>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[3]?.timestamp}</div>
                    </div>
                  </div>
                  <div className="relative h-[86px] w-[86px] lg:hidden inline ll:inline">
                    {articles[3]?.img_url ? (
                      <Image
                        src={articles[3].img_url}
                        fill
                        className="object-cover"
                        alt="Main content Image"
                        sizes="86px"
                      />
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
            <li className="TopStack_li__ktQAe" data-event-position="4">
              <Link href={`/articles/${articles[4]?.path}`} className="hover:cursor-pointer">
                {" "}
                <article className="SmallPromoItem_root__6Qj4m">
                  <div>
                    <h2 className="SmallPromoItem_title__Ev9wU" data-event-element="title">
                      {articles[4]?.title}
                    </h2>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[4]?.timestamp}</div>
                    </div>
                  </div>

                  <div className="relative h-[86px] w-[86px] lg:hidden inline ll:inline">
                    {articles[4]?.img_url ? (
                      <Image
                        src={articles[4].img_url}
                        fill
                        className="object-cover"
                        alt="Main content Image"
                        sizes="86px"
                      />
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
            <li className="TopStack_native__7XJBO">
              <gpt-ad
                className="GptAd_root__2eqVh s-native s-native--standard s-native--small s-native--short-title s-native--disable-border"
                format="native"
                sizes-at-0="native"
                targeting-pos="native-lead-hp"
                targeting-native="standard,gift"
                id="gpt-unit-3"
              ></gpt-ad>
            </li>
          </ul>
        </div>
        <div className="HomepageTop_offlede__uzfl3">
          <ul className="Offlede_list__Qs9Rq" data-event-module="offlede">
            <li className="Offlede_listItem__qmSdm" data-event-position="1">
              <Link href={`articles/${articles[5]?.path}`} className="hover:cursor-pointer">
                <article className="Offlede_article__GaFaN">
                  <figure className="Offlede_figure__SwLji" data-event-element="image">
                    <div className="relative w-full  aspect-[70/45] ">
                      {articles[5]?.img_url ? (
                        <Image
                          src={articles[5].img_url}
                          fill
                          className="object-cover"
                          priority
                          alt="Main content Image"
                          sizes="200px"
                        />
                      ) : null}
                    </div>
                    <div className="Caption_root__KYHTc">
                      {/* <figcaption className="Caption_caption__5ZE7O">Sinna Nasseri</figcaption> */}
                    </div>
                  </figure>
                  <div className="Offlede_info___CqK0">
                    <h1 className="Offlede_title__lyFW2">{articles[5]?.title}</h1>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[5]?.timestamp}</div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
            <li className="Offlede_listItem__qmSdm" data-event-position="2">
              <Link href={`/articles/${articles[6]?.path}`} className="cursor-pointer">
                <article className="Offlede_article__GaFaN">
                  <figure className="Offlede_figure__SwLji" data-event-element="image">
                    <div className="relative w-full  aspect-[70/45] ">
                      {articles[6]?.img_url ? (
                        <Image
                          src={articles[6].img_url}
                          fill
                          className="object-cover"
                          priority
                          alt="Main content Image"
                          sizes="200px"
                        />
                      ) : null}
                    </div>
                    <div className="Caption_root__KYHTc">
                      {/* <figcaption className="Caption_caption__5ZE7O">
                      Al Levine / NBC Universal / Getty
                    </figcaption> */}
                    </div>
                  </figure>
                  <div className="Offlede_info___CqK0">
                    <h1 className="Offlede_title__lyFW2">{articles[6]?.title}</h1>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[6]?.timestamp}</div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="HomepageTop_upperBelt__TH7_o">
        <div data-event-module="upper belt">
          <ul className="UpperBelt_list__X8kO1">
            <li className="UpperBelt_listItem__345jY" data-event-position="1">
              <Link href={`/articles/${articles[7]?.path}`} className="cursor-pointer">
                {" "}
                <article className="UpperBelt_article__8Ry3B">
                  <figure className="UpperBelt_figure__wEpSU" data-event-element="image">
                    <div className="relative w-full  aspect-[70/45] min-w-[86px]">
                      {articles[7]?.img_url ? (
                        <Image
                          src={articles[7].img_url}
                          fill
                          className="object-cover"
                          alt="Main content Image"
                          sizes="100px"
                        />
                      ) : null}
                    </div>
                    <div className="UpperBelt_hideOnMobile__5yyb9">
                      <div className="Caption_root__KYHTc">
                        {/* <figcaption className="Caption_caption__5ZE7O">
                        Illustration by Ben Kothe / The Atlantic. Source: Getty
                      </figcaption> */}
                      </div>
                    </div>
                  </figure>
                  <div className="UpperBelt_info__t1lEW">
                    <h1 className="UpperBelt_title__lanRh" data-event-element="title">
                      {articles[7]?.title}
                    </h1>
                    {/* <p className="UpperBelt_dek__TllR3">
                    On the podcast
                    <i>If Books Could Kill</i>, hosts Michael Hobbes and Peter Shamshiri dive into
                    the murky details of mass-market hits.
                  </p> */}
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[7]?.timestamp}</div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
            <li className="UpperBelt_listItem__345jY" data-event-position="2">
              <Link href={`/articles/${articles[8]?.path}`} className="cursor-pointer">
                <article className="UpperBelt_article__8Ry3B">
                  <figure className="UpperBelt_figure__wEpSU" data-event-element="image">
                    <div className="relative w-full  aspect-[70/45] min-w-[86px]">
                      {articles[8]?.img_url ? (
                        <Image
                          src={articles[8].img_url}
                          fill
                          className="object-cover"
                          alt="Main content Image"
                          sizes="20vw"
                        />
                      ) : null}
                    </div>
                    <div className="UpperBelt_hideOnMobile__5yyb9">
                      <div className="Caption_root__KYHTc">
                        {/* <figcaption className="Caption_caption__5ZE7O">Paul Spella</figcaption> */}
                      </div>
                    </div>
                  </figure>
                  <div className="UpperBelt_info__t1lEW">
                    <h1 className="UpperBelt_title__lanRh" data-event-element="title">
                      {articles[8]?.title}
                    </h1>
                    {/* <p className="UpperBelt_dek__TllR3">
                    For some Americans, history isn’t the story of what actually happened; it’s the
                    story they want to believe.
                    <i>(From 2021)</i>
                  </p> */}
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[8]?.timestamp}</div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
            <li className="UpperBelt_listItem__345jY" data-event-position="3">
              <Link href={`/articles/${articles[9]?.path}`} className="cursor-pointer">
                <article className="UpperBelt_article__8Ry3B">
                  <figure className="UpperBelt_figure__wEpSU" data-event-element="image">
                    <div className="relative w-full  aspect-[70/45] min-w-[86px]">
                      {articles[9]?.img_url ? (
                        <Image
                          src={articles[9].img_url}
                          fill
                          className="object-cover"
                          alt="Main content Image"
                          sizes="20vw"
                        />
                      ) : null}
                    </div>
                    <div className="UpperBelt_hideOnMobile__5yyb9">
                      <div className="Caption_root__KYHTc">
                        {/* <figcaption className="Caption_caption__5ZE7O">AP</figcaption> */}
                      </div>
                    </div>
                  </figure>
                  <div className="UpperBelt_info__t1lEW">
                    <h1 className="UpperBelt_title__lanRh" data-event-element="title">
                      {articles[9]?.title}
                    </h1>
                    {/* <p className="UpperBelt_dek__TllR3">
                    Images from Kherson, Ukraine, and other towns downstream of the destroyed dam
                  </p> */}
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">{articles[9]?.timestamp}</div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
            <li className="UpperBelt_listItem__345jY" data-event-position="4">
              <Link href={`/articles/${articles[10]?.path}`} className="cursor-pointer">
                <article className="UpperBelt_article__8Ry3B">
                  <figure className="UpperBelt_figure__wEpSU" data-event-element="image">
                    <div className="relative w-full  aspect-[70/45] min-w-[86px]">
                      {articles[10]?.img_url ? (
                        <Image
                          src={articles[10].img_url}
                          fill
                          className="object-cover"
                          alt="Main content Image"
                          sizes="20vw"
                        />
                      ) : null}
                    </div>
                    <div className="UpperBelt_hideOnMobile__5yyb9">
                      <div className="Caption_root__KYHTc">
                        {/* <figcaption className="Caption_caption__5ZE7O">ISM Agency / Getty</figcaption> */}
                      </div>
                    </div>
                  </figure>
                  <div className="UpperBelt_info__t1lEW">
                    <h1 className="UpperBelt_title__lanRh" data-event-element="title">
                      {articles[10]?.title}
                    </h1>
                    {/* <p className="UpperBelt_dek__TllR3">
                    His demagogic style revolved around self-interest, but he inspired other
                    right-wing populists to bend the rule of law and divide their democracy.
                  </p> */}
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">
                        {articles[10]?.timestamp}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="HomepageTop_lowerBelt__dUMbY">
        <div className="HomepageTop_doubleWide__pjcw6">
          <Link href={`/articles/${articles[11]?.path}`} className="cursor-pointer">
            <article className="DoubleWide_root__IvKvK" data-event-module="double wide">
              <div>
                {/* <a
                href="https://www.theatlantic.com/podcasts/archive/2023/06/buying-house-with-friends-family/674343/"
                className="DoubleWide_kicker__hIP_i"
                data-action="click link - double wide - kicker"
              >
                How to Talk to People
              </a> */}
                <h2 className="DoubleWide_title__EQ2bJ" data-event-element="title">
                  {articles[11]?.title}
                </h2>
                {/* <p className="DoubleWide_dek__PKhIJ">
                Two married couples who bought a home together have found that expanding their
                household led to a deeper sense of community.
              </p> */}
                <div className="HomepageMetadata_root__C72j7">
                  <div className="HomepageMetadata_byline__fkVeU">{articles[11]?.timestamp}</div>
                </div>
              </div>
              <figure className="DoubleWide_figure__11VkL" data-event-element="image">
                <div className="relative w-full  aspect-[70/45] ">
                  {articles[11]?.img_url ? (
                    <Image
                      src={articles[11].img_url}
                      fill
                      className="object-cover"
                      alt="Main content Image"
                      sizes="20vw"
                    />
                  ) : null}
                </div>

                <div className="Caption_root__KYHTc">
                  {/* <figcaption className="Caption_caption__5ZE7O">
                  Illustration by The Atlantic. Source: Getty.
                </figcaption> */}
                </div>
              </figure>
            </article>
          </Link>
        </div>
        <div className="HomepageTop_storyStrip__SEElD">
          <ul className="StoryStrip_root__FHke1" data-event-module="lower belt">
            <li className="StoryStrip_li__LPy4b" data-event-position="1">
              <Link href={`/articles/${articles[12]?.path}`} className="cursor-pointer">
                <article className="SmallPromoItem_root__6Qj4m">
                  <div>
                    <h2 className="SmallPromoItem_title__Ev9wU" data-event-element="title">
                      {articles[12]?.title}
                    </h2>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">
                        {articles[12]?.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[86px] w-[86px] lg:hidden ll:inline">
                    {articles[12]?.img_url ? (
                      <Image
                        src={articles[12].img_url}
                        fill
                        className="object-cover"
                        alt="Main content Image"
                        sizes="20vw"
                      />
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
            <li className="StoryStrip_li__LPy4b" data-event-position="2">
              <Link href={`/articles/${articles[13]?.path}`} className="cursor-pointer">
                <article className="SmallPromoItem_root__6Qj4m">
                  <div>
                    <h2 className="SmallPromoItem_title__Ev9wU" data-event-element="title">
                      {articles[13]?.title}
                    </h2>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">
                        {articles[13]?.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[86px] w-[86px] lg:hidden ll:inline">
                    {articles[13]?.img_url ? (
                      <Image
                        src={articles[13].img_url}
                        fill
                        className="object-cover"
                        alt="Main content Image"
                        sizes="20vw"
                      />
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
            <li className="StoryStrip_li__LPy4b" data-event-position="3">
              <Link href={`/articles/${articles[14]?.path}`} className="cursor-pointer">
                {" "}
                <article className="SmallPromoItem_root__6Qj4m">
                  <div>
                    <h2 className="SmallPromoItem_title__Ev9wU" data-event-element="title">
                      {articles[14]?.title}
                    </h2>
                    <div className="HomepageMetadata_root__C72j7">
                      <div className="HomepageMetadata_byline__fkVeU">
                        {articles[14]?.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="relative h-[86px] w-[86px] lg:hidden ll:inline">
                    {articles[14]?.img_url ? (
                      <Image
                        src={articles[14].img_url}
                        fill
                        className="object-cover"
                        alt="Main content Image"
                        sizes="20vw"
                      />
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
            <li>
              {/* <gpt-ad
                className="GptAd_root__2eqVh s-native s-native--standard s-native--small s-native--short-title s-native--disable-border"
                format="native"
                sizes-at-0="native"
                targeting-pos="native-belt-hp"
                targeting-native="standard,gift"
                id="gpt-unit-5"
              ></gpt-ad> */}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
