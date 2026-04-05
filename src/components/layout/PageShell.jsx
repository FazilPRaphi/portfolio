"use client";

import clsx from "clsx";

/**
 * Shared responsive page wrapper for public pages.
 * Intentionally NOT used by /login and /dashboard to avoid changing their UI.
 *
 * BRUTALIST "RAW CURATOR" design system:
 *   surface: #f9f9f9  |  on-surface: #1a1c1c  |  0px border-radius
 */
export default function PageShell({
  children,
  className,
  contentClassName,
  withFooterGap = true,
}) {
  return (
    <div
      className={clsx("min-h-screen overflow-x-clip", className)}
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <main
        className={clsx(
          "relative mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8",
          "pt-28 sm:pt-32 md:pt-36",
          "pb-10 sm:pb-12 md:pb-16",
          withFooterGap && "pb-16 sm:pb-[4.5rem] md:pb-20",
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
