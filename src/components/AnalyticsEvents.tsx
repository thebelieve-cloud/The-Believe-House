"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

// นับการกดโทร / กดแอดไลน์ ทุกที่ในเว็บ (รวมลิงก์ในบทความจาก WordPress) ส่งเป็น event ให้ Google Analytics
// ดูใน GA4: รายงาน > การมีส่วนร่วม > เหตุการณ์ (click_call, click_line)
export default function AnalyticsEvents() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement | null)?.closest?.("a");
            if (!a) return;
            const href = a.getAttribute("href") || "";
            const page = window.location.pathname;
            if (href.startsWith("tel:")) {
                sendGAEvent("event", "click_call", { page_path: page, link_text: a.textContent?.trim().slice(0, 50) });
            } else if (/lin\.ee|line\.me/i.test(href)) {
                sendGAEvent("event", "click_line", { page_path: page });
            }
        };
        document.addEventListener("click", onClick, { capture: true });
        return () => document.removeEventListener("click", onClick, { capture: true });
    }, []);

    return null;
}
