export const styles = `/* -----------------------------------
Variables
-------------------------------------- */

:root {
  --color-bg: #242120;
  --color-highlight: #f8f6f5;
  --color-default: #bab6b1;
  --color-dim: #797673;
  --color-vdim: #494745;
  --font-sans: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  --font-serif: BlancoWeb, Times, serif;
  --font-size: 16px;
  --font-s: 14px;
  --font-size-serif: 18px;
  --spacing: 1.5em;
  --spacing-s: calc(0.5 * var(--spacing));
  --spacing-m: var(--spacing);
  --spacing-l: calc(1.5 * var(--spacing));
  --spacing-xl: calc(2.5 * var(--spacing));
  --spacing-xxl: calc(5 * var(--spacing));
  --spacing-col: calc(6 * var(--spacing));
  --spacing-width-max: 38rem;
  --spacing-width-tiny: 15rem;
  --spacing-width-xl: 50rem;
}

html#post {
  --color-bg: #f8f6f5;
  --color-default: #3b3a38;
  --color-highlight: #000;
  --color-dim: #93918f;
  --color-vdim: #c9c5c1;
}

/* -----------------------------------
Fonts
-------------------------------------- */

*/

/* -----------------------------------
Base
-------------------------------------- */

* {
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-feature-settings: 'kern' 1, 'liga' 1;
}

html {
  font-size: var(--font-std);
  font-family: var(--font-sans);
  line-height: 1.5;
  background-color: var(--color-bg);
  color: var(--color-default);
  font-family: var(--font-sans);
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: 'onum' 1, 'liga' 1;
  font-size: var(--font-size);
  line-height: 1.5;
  padding: 1.5rem;
}

body {
  margin: 3vw 0;
}

section {
  margin-bottom: var(--spacing-xl);
}

/* -----------------------------------
Header
-------------------------------------- */

body > header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: var(--spacing-xxl);
  color: var(--color-dim);
}

body > header h1 {
  margin: 0;
}

body > header img {
  display: block;
  border-radius: 100%;
  height: calc(3 * var(--spacing));
  width: auto;
}

body > header a {
  text-decoration: none;
}

/* -----------------------------------
Footer
-------------------------------------- */

body > footer {
  font-size: var(--font-s);
  line-height: var(--spacing-xl);
  justify-content: center;
}

body > footer nav,
body > footer {
  display: flex;
  gap: var(--spacing-m);
}

/* -----------------------------------
Typography
-------------------------------------- */

h1,
h2,
h3 {
  font-weight: 500;
  font-size: 1rem;
  margin: var(--spacing-s) 0;
  color: var(--color-highlight);
}

article h1 {
  margin-bottom: 0;
}

h2 {
  margin: var(--spacing-m) 0;
}

h3 {
  margin: 0;
}

a {
  color: var(--color-default);
  text-decoration-color: var(--color-dim);
  text-decoration-thickness: 0.5px;
  text-underline-offset: 0.05em;
}

a:hover {
  transition: color 0.2s ease-in;
  color: var(--color-highlight);
}

h3 a {
  color: var(--color-highlight);
}

p,
ol,
ul {
  font-family: var(--font-serif);
  font-weight: normal;
  margin: 1em 0;
  font-size: var(--font-size-serif);
  font-feature-settings: 'onum' 1;
}

blockquote {
  font-weight: normal;
}

figcaption {
  text-align: center;
  margin-top: var(--spacing-s);
  font-family: var(--font-sans);
  color: var(--color-dim);
  font-size: 14px;
}

small {
  font-size: var(--font-s);
  color: var(--color-dim);
  line-height: 1.5;
  display: block;
}

.label,
time {
  color: var(--color-dim);
}

time {
  font-feature-settings: 'tnum' 1;
}

/* -----------------------------------
Block Elements
-------------------------------------- */

hr {
  margin: var(--spacing-xl) auto;
  max-width: calc(2 * var(--spacing-xxl));
  border: none;
  border-top: 1px solid var(--color-vdim);
}

figure,
video,
audio {
  display: block;
  width: 100%;
  margin: var(--spacing-xl) 0;
}

figure img {
  width: 100%;
  height: auto;
}

/* -----------------------------------
Home
-------------------------------------- */

.split {
  margin-bottom: var(--spacing-l);
}

@media (min-width: 600px) {
  .split {
    display: grid;
    grid-template-columns: clamp(8em, 20vw, var(--spacing-col)) 1fr;
    align-items: baseline;
    margin-bottom: var(--spacing-s);
  }
  .split time {
    margin: 0;
  }
}

small + p {
  margin-top: var(--spacing-s);
}

.main-form {
  gap: 1rem;
}

p.emailoctopus-success-message {
  text-align: left !important;
  color: #65b176 !important;
  font-family: var(--font-sans);
  font-weight: 500 !important;
  font-size: 1rem !important;
}

[data-form='71e6f86b-0538-11ec-96e5-06b4694bee2a'] .emailoctopus-form input {
  font-family: var(--font-sans) !important;
  font-weight: 500 !important;
}

[data-form='71e6f86b-0538-11ec-96e5-06b4694bee2a']
  .emailoctopus-form
  input:not([type='submit']) {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border-color: var(--color-dim) !important;
  font-weight: 500 !important;
  color: var(--color-highlight) !important;
}

[data-form='71e6f86b-0538-11ec-96e5-06b4694bee2a']
  .emailoctopus-form
  input:not([type='submit'])::placeholder {
  color: var(--color-dim);
}

[data-form='71e6f86b-0538-11ec-96e5-06b4694bee2a']
  .emailoctopus-form
  input:not([type='submit']):focus {
  outline: 1px solid rgba(0, 0, 0, 0);
}

[data-form='71e6f86b-0538-11ec-96e5-06b4694bee2a']
  .emailoctopus-form
  [eo-form-fields-container] {
  gap: 2rem !important;
}

/* -----------------------------------
Post Index & Post
-------------------------------------- */

section.posts ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--font-size);
}

article header {
  margin-bottom: var(--spacing-xl);
}

/* -----------------------------------
Limit widths
-------------------------------------- */

body > header,
article > header,
h1,
h2,
h3,
time,
p,
blockquote,
ol,
ul,
details,
pre.code,
figcaption,
.split,
.posts {
  max-width: var(--spacing-width-max);
  margin-left: auto;
  margin-right: auto;
}

figure,
audio,
video {
  max-width: var(--spacing-width-xl);
  margin-left: auto;
  margin-right: auto;
}

.limit {
  max-width: var(--spacing-width-tiny);
  margin-left: auto;
  margin-right: auto;
}

iframe[src*='youtube'] {
  max-width: var(--spacing-width-xl);
  width: 100%;
  aspect-ratio: 16/9;
}

@media print {
  * {
    color: #000 !important;
  }
  nav {
    display: none;
  }
}
`;
