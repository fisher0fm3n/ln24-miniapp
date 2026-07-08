import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — LN24",
  description: "How LN24 handles your data.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold tracking-widest text-foreground/70 mb-3 uppercase">
        {title}
      </h2>
      <div className="space-y-3 text-base leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col flex-1 bg-background min-h-screen">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur px-2 pt-[env(safe-area-inset-top)] h-14 box-content flex items-center border-b border-border">
        <Link
          href="/settings"
          className="h-10 px-2 flex items-center gap-1 rounded-lg"
          aria-label="Back to Settings"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-lg font-extrabold text-foreground">
          Privacy Policy
        </span>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 pb-10">
        <p className="text-sm text-muted mt-6">Last updated: July 8, 2026</p>

        <p className="text-base leading-relaxed text-foreground/90 mt-4">
          LN24 is a news service that lets you read articles, watch videos, and
          stream live news. This policy explains what data is processed when
          you use the LN24 mini-app, and the choices you have. LN24 does not
          require an account, and does not use analytics, advertising, or
          tracking technologies.
        </p>

        <Section title="What we process">
          <p>
            <strong className="text-foreground">Search queries.</strong> When
            you search, your search term is sent to our server and passed to
            the LN24 content service to return matching articles. Search terms
            are used only to answer your search. They are not linked to your
            identity and are not saved as a search history.
          </p>
          <p>
            <strong className="text-foreground">Content requests.</strong>{" "}
            When you open an article or video or watch the live stream, the
            request identifies the content so it can be delivered. We do not
            build or store a per-user history of what you read or watch.
          </p>
          <p>
            <strong className="text-foreground">
              IP address and device information.
            </strong>{" "}
            Like any web service, our servers and the servers that deliver
            images and video streams automatically receive standard request
            data — your IP address and your browser&apos;s user-agent string —
            when your device requests content. This data is used only to
            deliver content, keep the service secure, and prevent abuse. It may
            appear in routine, short-lived technical server logs, which are
            automatically rotated and deleted.
          </p>
          <p>
            <strong className="text-foreground">
              Local preferences and cache.
            </strong>{" "}
            Your appearance setting (light or dark mode), topic interests, and
            cached content are stored only on your device, in your
            browser&apos;s local storage. They are never transmitted to us or
            to anyone else.
          </p>
        </Section>

        <Section title="What we do not collect">
          <p>
            LN24 does <strong className="text-foreground">not</strong> collect:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Any KingsChat account information — no name, phone number, email
              address, user ID, or profile details. LN24 does not connect to
              your KingsChat account.
            </li>
            <li>Analytics identifiers or advertising identifiers.</li>
            <li>Cookies for tracking or profiling.</li>
            <li>Crash reports or performance telemetry from your device.</li>
            <li>Your location.</li>
          </ul>
        </Section>

        <Section title="Sharing with third parties">
          <p>
            We do not sell, rent, or share your data with third parties for
            marketing or advertising. Data is shared only with the service
            providers needed to operate LN24:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The LN24 / LoveWorld News content service, which receives search
              terms and content requests in order to return articles, videos,
              and stream links.
            </li>
            <li>
              Media hosting and content-delivery providers, which receive
              standard web request data (IP address, user agent) from your
              device when it loads images and video streams.
            </li>
            <li>
              Our hosting provider, which processes requests and keeps routine
              technical logs to run the service.
            </li>
          </ul>
        </Section>

        <Section title="Retention">
          <p>
            Data stored on your device (preferences and cache) stays there
            until you remove it. Routine technical server logs are kept only
            for a short period for security and operations, then automatically
            deleted. No other personal data is retained.
          </p>
        </Section>

        <Section title="Your choices, deletion, and consent">
          <p>
            You can remove all locally stored data at any time using{" "}
            <strong className="text-foreground">
              Settings &rarr; Clear cache
            </strong>
            , or by clearing the mini-app&apos;s browsing data in KingsChat or
            your browser. Because LN24 keeps no account or profile about you,
            there is no server-side personal record to delete beyond
            short-lived technical logs.
          </p>
          <p>
            LN24 processes data only to deliver the content you request. If
            you no longer consent to this, you can stop using the service and
            clear your local data as described above, and any transient data
            about your use will expire with the routine log rotation.
          </p>
          <p>
            For privacy questions, deletion requests, or to withdraw consent,
            contact the LN24 team through the official LN24 channel on
            KingsChat.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we change how LN24 handles data, we will update this page and
            revise the &ldquo;Last updated&rdquo; date above.
          </p>
        </Section>
      </div>
    </div>
  );
}
