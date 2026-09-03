const fs = require('fs');
let code = fs.readFileSync('components/layout/site-footer.tsx', 'utf8');

// Add Link import if not present
if (!code.includes('import Link')) {
  code = code.replace('import * as React from "react";', 'import * as React from "react";\nimport Link from "next/link";');
}

// Replace exact href="#" items with their paths
const replacements = {
  'Latest': '/latest',
  'Topics': '/topics',
  'Videos': '/videos',
  'Guides': '/guides',
  'Apps': '/apps',
  'About': '/about',
  'Contact': '/contact',
  'Newsletter': '/newsletter',
  'Privacy Policy': '/privacy-policy',
  'Terms of Service': '/terms-of-service',
};

// Also replace Social links to external # placeholders just with Link to / for now to make them standard Next.js, or leave as a tag
// Actually, it's easier to regex all `<a href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors">TEXT</a>`
for (const [text, href] of Object.entries(replacements)) {
  const regex = new RegExp(`<a href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors">${text}<\/a>`, 'g');
  code = code.replace(regex, `<Link href="${href}" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors">${text}</Link>`);
}

// For social links, just change to Link href="#"
code = code.replace(/<a href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors">([^<]+)<\/a>/g, '<Link href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors">$1</Link>');

// Fix the Cookie policy
code = code.replace(/<Link href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Cookie Policy<\/Link>/g, '<Link href="/privacy-policy" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Cookie Policy</Link>');

fs.writeFileSync('components/layout/site-footer.tsx', code);
