/*
  The single glass material used across the page.

  One component so every panel shares the same translucency, blur, border and
  shadow. The environment must stay readable behind it, so tones stop well
  short of opaque; `solid` is reserved for the practical closing section where
  legibility outranks atmosphere.
*/
const TONES = {
  default: "glass",
  strong: "glass glass-strong",
  soft: "glass-soft border border-glass-border",
};

export function GlassCard({
  as: Tag = "div",
  tone = "default",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag className={`rounded-card ${TONES[tone] ?? TONES.default} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
