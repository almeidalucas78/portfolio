import Link from "next/link";
import { NAV_ITEMS } from "@/lib/navigation";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-accent/35 bg-nav shadow-nav backdrop-blur-[14px]">
      <div className="flex h-full items-center justify-between px-5 md:px-14">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Lucas Almeida, página inicial"
        >
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-sm border-[1.5px] border-accent text-[13px] font-bold text-accent shadow-logo"
          >
            LA
          </span>
          <span aria-hidden="true" className="text-sm text-title text-shadow-glow-accent">
            lucas almeida<span className="text-accent-2">_</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] text-body transition-colors hover:text-title hover:text-shadow-glow-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileMenu>
            <nav aria-label="Principal (mobile)">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-3 text-sm text-body transition-colors hover:text-title"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
