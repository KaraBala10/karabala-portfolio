import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, socials } from "../content/profile";
import { sections } from "../content/sections";
import { scrollToSection } from "../lib/scroll";
import { useCopy } from "../lib/useCopy";
import { Icon, type IconName } from "../ui/Icon";
import { Kbd } from "../ui/Kbd";
import styles from "./CommandMenu.module.css";

interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}

interface Command {
  id: string;
  group: "Go to" | "Actions";
  label: string;
  hint?: string;
  icon: IconName;
  run: () => void;
}

/**
 * Command-style navigation (⌘K / Ctrl+K). Hand-rolled: a filtered list with
 * arrow-key navigation, a focus trap, Escape/backdrop close and body scroll
 * lock. ~150 lines instead of a dependency.
 */
export function CommandMenu({ open, onClose, onToggleTheme }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { copied, copy } = useCopy();

  const commands = useMemo<Command[]>(() => {
    const go: Command[] = sections.map((s) => ({
      id: `go-${s.id}`,
      group: "Go to",
      label: s.label,
      hint: s.index,
      icon: "arrow-right",
      run: () => scrollToSection(s.id),
    }));
    const github = socials.find((s) => s.id === "github");
    const linkedin = socials.find((s) => s.id === "linkedin");
    const actions: Command[] = [
      {
        id: "copy-email",
        group: "Actions",
        label: copied ? "Email copied" : "Copy email address",
        hint: profile.email,
        icon: copied ? "check" : "copy",
        run: () => void copy(profile.email),
      },
      {
        id: "cv",
        group: "Actions",
        label: "Download CV",
        hint: "PDF",
        icon: "download",
        run: () => window.open(profile.cvPath, "_blank", "noopener"),
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle theme",
        hint: "Dark / paper",
        icon: "sun",
        run: onToggleTheme,
      },
      ...(github
        ? [
            {
              id: "github",
              group: "Actions" as const,
              label: "Open GitHub",
              hint: github.handle,
              icon: "github" as IconName,
              run: () => window.open(github.href, "_blank", "noopener"),
            },
          ]
        : []),
      ...(linkedin
        ? [
            {
              id: "linkedin",
              group: "Actions" as const,
              label: "Open LinkedIn",
              hint: linkedin.handle,
              icon: "linkedin" as IconName,
              run: () => window.open(linkedin.href, "_blank", "noopener"),
            },
          ]
        : []),
    ];
    return [...go, ...actions];
  }, [copied, copy, onToggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setCursor(0);
  }, [query, open]);

  // open/close side effects: focus, scroll lock, escape
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'input, button, [href], [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  const runCommand = useCallback(
    (cmd: Command) => {
      cmd.run();
      if (cmd.id !== "copy-email") onClose();
    },
    [onClose]
  );

  if (!open) return null;

  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.inputRow}>
          <Icon name="search" size={16} className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={filtered[cursor] ? `cmd-${filtered[cursor].id}` : undefined}
            aria-autocomplete="list"
            placeholder="Jump to a section or run an action…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(filtered.length - 1, c + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              } else if (e.key === "Enter" && filtered[cursor]) {
                e.preventDefault();
                runCommand(filtered[cursor]);
              }
            }}
          />
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
            <Kbd>Esc</Kbd>
          </button>
        </div>

        <div id="cmd-list" role="listbox" className={styles.list}>
          {filtered.length === 0 && <p className={styles.empty}>Nothing matches “{query}”.</p>}
          {groups.map((group) => (
            <div key={group} role="group" aria-label={group}>
              <p className={`mono ${styles.group}`}>{group}</p>
              {filtered
                .filter((c) => c.group === group)
                .map((cmd) => {
                  const index = filtered.indexOf(cmd);
                  return (
                    <button
                      type="button"
                      key={cmd.id}
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={index === cursor}
                      className={styles.item}
                      onMouseEnter={() => setCursor(index)}
                      onClick={() => runCommand(cmd)}
                    >
                      <Icon name={cmd.icon} size={15} />
                      <span className={styles.itemLabel}>{cmd.label}</span>
                      {cmd.hint && <span className={`mono ${styles.hint}`}>{cmd.hint}</span>}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
