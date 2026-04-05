# Design System Strategy: Editorial Brutalism

## 1. Overview & Creative North Star

### Creative North Star: "The Raw Curator"
This design system rejects the polished, "soft-UI" trends of the modern web in favor of a bold, structural, and unapologetically honest aesthetic. Inspired by the architectural Brutalist movement, it prioritizes functional truth over decorative fluff. We treat the digital canvas not as a fluid screen, but as a rigid, physical construction of industrial materials.

By combining **Space Grotesk**'s geometric precision with a high-impact color palette of acid yellows and deep blacks, we move beyond "standard" portfolios. The experience is defined by **intentional friction**: heavy strokes, sharp 90-degree angles, and massive typography that demands attention. This is not a template; it is a statement of architectural intent.

---

## 2. Colors: Tonal Architecture

Our palette is built on extreme contrast. We utilize `primary` (#5f6300) and its container variants to create a "caution-tape" urgency that feels both industrial and premium.

### The "No-Line" Rule
Standard 1px borders for layout sectioning are strictly prohibited. They are visually "thin" and lack authority. Instead, define boundaries through:
- **Tonal Shifts:** Transitioning from `surface` (#f9f9f9) to `surface-container-low` (#f3f3f4) to create structural zones.
- **Heavy Fills:** Use `primary_container` (#f4fd2f) as a full-width background block to slice through content.

### Surface Hierarchy & Nesting
Treat the UI as stacked slabs of concrete. 
- Use `surface_container_highest` (#e2e2e2) for background-level layout blocks.
- Place `surface_container_lowest` (#ffffff) elements on top to create a "pop" without relying on traditional shadows.

### Signature Textures & Gradients
While Brutalism is often flat, a high-end experience requires depth.
- **The "Power Gradient":** For hero CTAs or focus areas, use a linear gradient from `primary` (#5f6300) to `primary_fixed` (#e3ec15). This creates a "luminescent metal" effect that feels custom-engineered.
- **Glassmorphism for Overlays:** To maintain the "Raw Curator" vibe, use `surface` at 70% opacity with a `20px backdrop-blur` for floating navigation bars. This prevents the UI from feeling static.

---

## 3. Typography: The Geometric Voice

Typography is our primary visual asset. It must feel "oversized" to establish a dominant hierarchy.

*   **Display (Space Grotesk):** Set `display-lg` at 3.5rem with tight letter-spacing (-0.02em). This is for "Hero" statements that should feel like headlines in a high-end architectural magazine.
*   **Headlines (Space Grotesk):** Use `headline-lg` (2rem) for section titles. These should always be in Bold or Semi-bold to maintain the "Heavy" aesthetic.
*   **Body (Inter):** While the headings are loud, the body must be legible. `body-lg` (1rem) provides the necessary utility, acting as the technical "spec sheet" content for the portfolio.
*   **Labels (Space Grotesk):** `label-md` is used for metadata (e.g., project dates, categories). Set these in ALL CAPS to lean into the industrial/functionalist vibe.

---

## 4. Elevation & Depth: Structural Layering

We reject the "floating" shadows of 2010s design. Depth in this system is achieved through **Material Stacking**.

*   **The Layering Principle:** Use the `Roundedness Scale` of **0px** across all tiers. Hard edges are non-negotiable. To elevate a card, place a `surface_container_highest` (#e2e2e2) block behind a `surface` (#f9f9f9) block with a 8px offset. This creates a "Shadow Plate" effect that looks like stacked cardstock.
*   **Ambient Shadows:** If a shadow is required for a floating component (like a modal), use a highly diffused, tinted shadow: `box-shadow: 0 20px 40px rgba(95, 99, 0, 0.08)`. This uses the `primary` hue to create a natural, ambient glow.
*   **The "Ghost Border" Fallback:** For interactive states (hover/focus), avoid high-contrast lines. Use `outline_variant` (#c9c8ac) at 20% opacity. It should feel like a faint architectural guideline, not a container.

---

## 5. Components: Industrial Primitives

### Buttons
- **Primary:** Background: `primary` (#5f6300); Text: `on_primary` (#ffffff); Radius: 0px. On hover, shift background to `primary_fixed`.
- **Secondary:** 2px Solid Border using `on_surface` (#1a1c1c). No background.
- **Tertiary:** Text only, `label-md` styling, ALL CAPS with an underline that sits 4px below the baseline.

### Input Fields
- **Container:** `surface_container_high` (#e8e8e8) background with a 2px bottom-border of `primary`. 
- **States:** On focus, the background shifts to `primary_container` (#f4fd2f). This "high-visibility" shift ensures the user knows exactly where they are.

### Cards & Lists
- **Rule:** No divider lines. Separate list items using 16px of vertical white space from the spacing scale. 
- **The "Bento" Grid:** For portfolios, use a grid where each card has a different `surface_container` color tier. This creates a rhythmic, asymmetric layout that feels curated rather than generated.

---

## 6. Do's and Don'ts

### Do:
- **Do** use massive scale. If a headline feels too big, it’s probably the right size.
- **Do** embrace the grid. Use heavy, visible gutters (24px - 32px) to let the structure breathe.
- **Do** use `primary_container` (#f4fd2f) as a highlight "marker" color behind text for emphasis.

### Don't:
- **Don't** use border-radius. Every corner in this system must be a sharp 90 degrees. No exceptions.
- **Don't** use subtle grays for text. Use `on_surface` (#1a1c1c) for maximum contrast and readability. 
- **Don't** use standard "drop shadows." If an element needs to stand out, use a solid color offset block (The "Shadow Plate") instead of a blur.
- **Don't** use thin icons. Use heavy-stroke (2pt+) geometric icons that match the weight of the typography.