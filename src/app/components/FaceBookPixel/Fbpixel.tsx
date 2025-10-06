import { ht } from "date-fns/locale";
import Image from "next/image";
import Script from "next/script";
import React from "react";

const Fbpixel = () => {
    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1356509689367634');
fbq('track', 'PageView');`,
                }}
            ></Script>
            <noscript>
                <Image
                    height={1}
                    width={1}
                    alt=""
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FBPIXEL_ID}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    );
};

export default Fbpixel;
