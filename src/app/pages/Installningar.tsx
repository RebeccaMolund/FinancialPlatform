import { useState, useRef } from "react";
import {
  Bell,
  FileDown,
  Shield,
  ChevronRight,
  Moon,
  Sun,
  Upload,
  Check,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import type { AppSettings } from "../App";

function Toggle({
  on,
  onChange,
  ariaLabel,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-label={ariaLabel}
      aria-pressed={on}
      className={[
        "relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9f96]",
        on ? "bg-[#0f9f96]" : "bg-surface-highest",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 left-0.5 size-5 bg-card rounded-full shadow transition-transform duration-200",
          on ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className="size-7 rounded-lg bg-[#0f9f96]/15 flex items-center justify-center"
        aria-hidden="true"
      >
        <Icon className="size-4 text-[#0f9f96]" />
      </div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
    </div>
  );
}

function Row({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0 ml-4">{children}</div>
    </div>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="flex rounded-xl overflow-hidden border border-border"
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={[
            "px-3 py-1.5 text-xs font-medium transition-colors",
            value === o.value
              ? "bg-[#0f9f96] text-white"
              : "text-muted-foreground hover:bg-muted",
          ].join(" ")}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

interface Props {
  settings: AppSettings;
  onSettingsChange: (s: AppSettings) => void;
}

export function Installningar({ settings, onSettingsChange }: Props) {
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isDark = settings.darkMode;

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    onSettingsChange({ ...settings, [key]: value });
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    update("logoSrc", URL.createObjectURL(file));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  const sv_ = settings.language === "sv";
  const t = {
    title: sv_ ? "Kontoinställningar" : "Account Settings",
    profile: sv_ ? "Profil" : "Profile",
    nameLabel: sv_ ? "Namn" : "Name",
    nameDesc: sv_ ? "Visas i rapporter och analyser" : "Shown in reports",
    emailLabel: sv_ ? "E-post" : "Email",
    role: sv_ ? "Roll" : "Role",
    company: sv_ ? "Organisation" : "Organisation",
    uploadBtn: sv_ ? "Välj fil" : "Choose file",
    appearance: sv_ ? "Utseende" : "Appearance",
    darkLabel: sv_ ? "Mörkt läge" : "Dark mode",
    darkDesc: sv_ ? "Byt till mörkt gränssnitt" : "Switch to dark interface",
    langLabel: sv_ ? "Språk" : "Language",
    notif: sv_ ? "Notifikationer" : "Notifications",
    dueInv: sv_ ? "Förfallna fakturor" : "Overdue invoices",
    dueInvDesc: sv_ ? "Varning < 7 dagar kvar" : "Alert when < 7 days remain",
    weekly: sv_ ? "Veckorapport" : "Weekly report",
    weeklyDesc: sv_
      ? "Sammanfattning varje måndag 08:00"
      : "Summary every Monday 08:00",
    newSup: sv_ ? "Ny leverantör" : "New supplier",
    newSupDesc: sv_ ? "Notis vid ny leverantör" : "Notify on new supplier",
    budget: sv_ ? "Budgetvarning" : "Budget alert",
    budgetDesc: sv_ ? "Varning vid > 90 % budget" : "Alert at > 90% budget",
    exportS: sv_ ? "Exportinställningar" : "Export settings",
    defFmt: sv_ ? "Standardformat" : "Default format",
    defFmtDesc: sv_ ? "Används vid export" : "Used when exporting",
    dateFmt: sv_ ? "Datumformat" : "Date format",
    curr: sv_ ? "Visningsvaluta" : "Display currency",
    security: sv_ ? "Säkerhet" : "Security",
    twoFA: sv_ ? "Tvåfaktorautentisering" : "Two-factor authentication",
    twoFADesc: sv_
      ? "Extra skyddslager vid inloggning"
      : "Extra protection at login",
    sessions: sv_ ? "Aktiva sessioner" : "Active sessions",
    sessDesc: sv_ ? "Inloggad på 1 enhet" : "Logged in on 1 device",
    manage: sv_ ? "Hantera" : "Manage",
    save: sv_ ? "Spara ändringar" : "Save changes",
    saved: sv_ ? "Ändringar sparades" : "Changes saved",
  };

  return (
    <main
      className={[
        "flex-1 overflow-auto p-8 pt-6",
        "bg-background text-foreground",
      ].join(" ")}
    >
      <h1 className="text-2xl font-semibold text-foreground mb-6">{t.title}</h1>

      <div className="max-w-xl mx-auto space-y-5">
        {/* Profile */}
        <Card className="rounded-2xl overflow-hidden border-none shadow-none bg-card">
          <CardContent className="px-6 pt-5 pb-3 bg-card">
            <SectionHeader icon={Sun} title={t.profile} />
            <div
              className={
                "flex items-center gap-4 mb-4 pb-4 border-b border-border"
              }
            >
              <button
                type="button"
                className="size-14 rounded-full bg-[#0f9f96] flex items-center justify-center shrink-0 overflow-hidden cursor-pointer ring-2 ring-white hover:ring-[#0f9f96]/40 transition-all"
                onClick={() => fileRef.current?.click()}
                title={t.uploadBtn}
                aria-label={t.uploadBtn}
              >
                {settings.logoSrc ? (
                  <img
                    src={settings.logoSrc}
                    alt="Användarlogo"
                    className="size-full object-cover"
                  />
                ) : (
                  <span
                    className="text-white text-lg font-bold select-none"
                    aria-hidden="true"
                  >
                    RB
                  </span>
                )}
              </button>
              <div>
                <p className={"text-sm font-semibold text-foreground"}>
                  {settings.displayName}
                </p>
                <p className={"text-xs text-muted-foreground mb-1.5"}>
                  Inköpsanalytiker · Sundsvall Fastigheter AB
                </p>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs text-[#0f9f96] hover:underline font-medium"
                  aria-label={t.uploadBtn}
                >
                  <Upload className="size-3" aria-hidden="true" />
                  {t.uploadBtn}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                  aria-label="Ladda upp profilbild"
                />
              </div>
            </div>
            <Row label={t.nameLabel} description={t.nameDesc}>
              <label htmlFor="display-name" className="sr-only">
                {t.nameLabel}
              </label>
              <input
                id="display-name"
                value={settings.displayName}
                onChange={(e) => update("displayName", e.target.value)}
                className={[
                  "w-44 px-3 py-1.5 rounded-lg text-sm border focus:outline-none focus:border-[#0f9f96]",
                  "bg-muted text-foreground border-border",
                ].join(" ")}
              />
            </Row>
            <Row label={t.emailLabel}>
              <label htmlFor="email" className="sr-only">
                {t.emailLabel}
              </label>
              <input
                id="email"
                value={settings.email}
                onChange={(e) => update("email", e.target.value)}
                className={[
                  "w-44 px-3 py-1.5 rounded-lg text-sm border focus:outline-none focus:border-[#0f9f96]",
                  "bg-muted text-foreground border-border",
                ].join(" ")}
              />
            </Row>
            <Row label={t.role}>
              <span className="px-2.5 py-1 bg-[#0f9f96]/15 text-[#0f9f96] text-xs font-medium rounded-full">
                Analytiker
              </span>
            </Row>
            <Row label={t.company}>
              <span className="text-sm text-muted-foreground">
                Sundsvall Fastigheter AB
              </span>
            </Row>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="rounded-2xl overflow-hidden border-none shadow-none bg-card">
          <CardContent className="px-6 pt-5 pb-3 bg-card">
            <SectionHeader
              icon={settings.darkMode ? Moon : Sun}
              title={t.appearance}
            />
            <Row label={t.darkLabel} description={t.darkDesc}>
              <Toggle
                on={settings.darkMode}
                onChange={(v) => update("darkMode", v)}
                ariaLabel={t.darkLabel}
              />
            </Row>
            <Row label={t.langLabel}>
              <SegmentedControl
                ariaLabel={t.langLabel}
                options={[
                  { value: "sv", label: "🇸🇪 Svenska" },
                  { value: "en", label: "🇬🇧 English" },
                ]}
                value={settings.language}
                onChange={(v) => update("language", v)}
              />
            </Row>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-2xl overflow-hidden border-none shadow-none bg-card">
          <CardContent className="px-6 pt-5 pb-3 bg-card">
            <SectionHeader icon={Bell} title={t.notif} />
            <Row label={t.dueInv} description={t.dueInvDesc}>
              <Toggle
                on={settings.notifications.dueInvoices}
                onChange={(v) =>
                  update("notifications", {
                    ...settings.notifications,
                    dueInvoices: v,
                  })
                }
                ariaLabel={t.dueInv}
              />
            </Row>
            <Row label={t.weekly} description={t.weeklyDesc}>
              <Toggle
                on={settings.notifications.weeklyReport}
                onChange={(v) =>
                  update("notifications", {
                    ...settings.notifications,
                    weeklyReport: v,
                  })
                }
                ariaLabel={t.weekly}
              />
            </Row>
            <Row label={t.newSup} description={t.newSupDesc}>
              <Toggle
                on={settings.notifications.newSupplier}
                onChange={(v) =>
                  update("notifications", {
                    ...settings.notifications,
                    newSupplier: v,
                  })
                }
                ariaLabel={t.newSup}
              />
            </Row>
            <Row label={t.budget} description={t.budgetDesc}>
              <Toggle
                on={settings.notifications.budgetAlert}
                onChange={(v) =>
                  update("notifications", {
                    ...settings.notifications,
                    budgetAlert: v,
                  })
                }
                ariaLabel={t.budget}
              />
            </Row>
          </CardContent>
        </Card>

        {/* Export */}
        <Card className="rounded-2xl overflow-hidden border-none shadow-none bg-card">
          <CardContent className="px-6 pt-5 pb-3 bg-card">
            <SectionHeader icon={FileDown} title={t.exportS} />
            <Row label={t.defFmt} description={t.defFmtDesc}>
              <SegmentedControl
                ariaLabel={t.defFmt}
                options={[
                  { value: "csv", label: "CSV" },
                  { value: "pdf", label: "PDF" },
                ]}
                value={settings.defaultFormat}
                onChange={(v) => update("defaultFormat", v)}
              />
            </Row>
            <Row label={t.dateFmt}>
              <SegmentedControl
                ariaLabel={t.dateFmt}
                options={[
                  { value: "dmy", label: "DD/MM/YYYY" },
                  { value: "ymd", label: "YYYY-MM-DD" },
                ]}
                value={settings.dateFormat}
                onChange={(v) => update("dateFormat", v)}
              />
            </Row>
            <Row label={t.curr}>
              <SegmentedControl
                ariaLabel={t.curr}
                options={[
                  { value: "SEK", label: "SEK" },
                  { value: "EUR", label: "EUR" },
                ]}
                value={settings.currency}
                onChange={(v) => update("currency", v)}
              />
            </Row>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="rounded-2xl overflow-hidden border-none shadow-none bg-card">
          <CardContent className="px-6 pt-5 pb-3 bg-card">
            <SectionHeader icon={Shield} title={t.security} />
            <Row label={t.twoFA} description={t.twoFADesc}>
              <Toggle
                on={settings.twoFactor}
                onChange={(v) => update("twoFactor", v)}
                ariaLabel={t.twoFA}
              />
            </Row>
            <Row label={t.sessions} description={t.sessDesc}>
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-medium text-[#0f9f96] hover:underline"
                aria-label={t.manage}
              >
                {t.manage}{" "}
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </button>
            </Row>
          </CardContent>
        </Card>

        {/* Save */}
        <button
          onClick={handleSave}
          className={[
            "w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
            saved
              ? "bg-emerald-500 text-white"
              : "bg-[#0f9f96] hover:bg-[#0f766e] text-white",
          ].join(" ")}
        >
          {saved ? (
            <>
              <Check className="size-4" />
              {t.saved}
            </>
          ) : (
            t.save
          )}
        </button>
        <div className="h-2" />
      </div>
    </main>
  );
}
