#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = join(import.meta.dirname, '../src');

/** Tailwind arbitrary class / literal → semantic token (longest match first) */
const REPLACEMENTS = [
  // Hover / active variants (before base)
  ['hover:bg-[#6344DD]', 'hover:bg-brand-deep'],
  ['active:bg-[#6344DD]', 'active:bg-brand-deep'],
  ['hover:bg-[#8B6FFF]', 'hover:bg-brand-hover'],
  ['active:bg-[#8B6FFF]', 'active:bg-brand-hover'],
  ['hover:bg-[#6B42FF]', 'hover:bg-brand-strong'],
  ['hover:bg-[#6B4EFF]/10', 'hover:bg-brand-soft/10'],
  ['hover:bg-[#8257B410]', 'hover:bg-brand-tertiary/10'],
  ['hover:bg-[#6B4EFF]/8', 'hover:bg-brand-soft/8'],
  ['hover:bg-[#6B4EFF]/6', 'hover:bg-brand-soft/6'],
  ['hover:bg-[#FAFAFE]', 'hover:bg-input-highlight'],
  ['hover:bg-[#F5EFFF]', 'hover:bg-accent-soft'],
  ['hover:bg-[#F3F0FF]', 'hover:bg-input-highlight'],
  ['hover:bg-[#D9D2FF]', 'hover:bg-accent-muted'],
  ['hover:bg-[#C4B8FF]', 'hover:bg-accent-muted'],
  ['hover:bg-[#FF4757]', 'hover:bg-reset-hover'],
  ['active:bg-[#FF8787]', 'active:bg-reset-active'],
  ['active:bg-[#C4B8FF]', 'active:bg-accent-muted'],
  ['active:bg-[#F3F0FF]', 'active:bg-input-highlight'],
  ['active:bg-[#7C5CFF]/10', 'active:bg-brand-soft/10'],
  ['hover:text-[#6B4EFF]', 'hover:text-brand'],
  ['hover:text-[#6452CE]', 'hover:text-brand-deep'],
  ['hover:text-[#CDC1FF]', 'hover:text-brand-secondary'],
  ['active:text-[#6B4EFF]', 'active:text-brand'],
  ['hover:border-[#CDC1FF]', 'hover:border-accent-muted'],
  ['hover:border-[#6B42FF]', 'hover:border-brand'],
  ['hover:border-[#6B4EFF]', 'hover:border-brand'],
  ['hover:border-[#A594F9]', 'hover:border-brand-secondary'],
  ['active:border-[#6B42FF]', 'active:border-brand'],
  ['border-l-[#6B4EFF]', 'border-l-brand'],
  ['placeholder:text-[#0a0a0a89]', 'placeholder:text-placeholder'],

  // Gradients
  ['from-[#F5EFFF] via-white to-[#E8F4F8]', 'bg-gradient-page'],
  ['from-white via-[#FDFCFF] to-[#F8F6FF]', 'bg-gradient-panel-br'],
  ['from-white via-[#FDFCFF] to-[#F5F0FF]', 'bg-gradient-panel-br'],
  ['from-white to-[#FAF8FF]', 'bg-gradient-panel-b'],
  ['from-[#FAF8FF] via-[#F2EBFF] to-[#E6DCFF]', 'bg-gradient-card'],
  ['from-[#F8F6FF] via-[#F3EEFF] to-[#EDE8FF]', 'bg-gradient-pill'],
  ['from-[#F5F0FF] via-[#EBE3FF] to-[#DDD0FF]', 'bg-gradient-card-hover'],
  ['from-[#EDE8FF] via-[#E0D4FF] to-[#D4C9FF]', 'bg-gradient-card-active'],
  ['from-[#F0EBFF] via-[#E4DAFF] to-[#D4C9FF]', 'bg-gradient-card-selected'],

  // Backgrounds
  ['bg-[#F5EFFF33]', 'bg-accent-soft/20'],
  ['bg-[#DEF3E195]', 'bg-success-soft'],
  ['bg-[#8257B433]', 'bg-brand-tertiary/10'],
  ['bg-[#8257B410]', 'bg-brand-tertiary/10'],
  ['bg-[#A594F9]/90', 'bg-brand-secondary/80'],
  ['bg-[#A594F9]/80', 'bg-brand-secondary/80'],
  ['bg-[#A594F9]/12', 'bg-brand-secondary/12'],
  ['bg-[#A594F9]/10', 'bg-brand-secondary/10'],
  ['bg-[#6B4EFF]/10', 'bg-brand-soft/10'],
  ['bg-[#6B4EFF]/8', 'bg-brand-soft/8'],
  ['bg-[#6B4EFF]/6', 'bg-brand-soft/6'],
  ['bg-[#6B4EFF]/5', 'bg-brand-soft/5'],
  ['bg-[#00000033]', 'bg-overlay'],
  ['bg-[#F5EFFF]', 'bg-accent-soft'],
  ['bg-[#F8F6FF]', 'bg-accent-soft'],
  ['bg-[#FAF8FF]', 'bg-accent-soft'],
  ['bg-[#FEF8FF]', 'bg-accent-soft'],
  ['bg-[#F5F0FF]', 'bg-accent-soft'],
  ['bg-[#F3F0FF]', 'bg-input-highlight'],
  ['bg-[#F3EEFF]', 'bg-accent-soft'],
  ['bg-[#F2EBFF]', 'bg-accent-soft'],
  ['bg-[#F0EBFF]', 'bg-accent-soft'],
  ['bg-[#EDE8FF]', 'bg-accent-soft'],
  ['bg-[#EBE3FF]', 'bg-accent-soft'],
  ['bg-[#E6DCFF]', 'bg-accent-muted'],
  ['bg-[#E4DAFF]', 'bg-accent-muted'],
  ['bg-[#E0D4FF]', 'bg-accent-muted'],
  ['bg-[#DDD0FF]', 'bg-accent-muted'],
  ['bg-[#D4C9FF]', 'bg-accent-muted'],
  ['bg-[#FAFAFE]', 'bg-input-highlight'],
  ['bg-[#FAFAFA]', 'bg-surface-raised'],
  ['bg-[#F4F4F4]', 'bg-surface-muted'],
  ['bg-[#fff]', 'bg-surface'],
  ['bg-[#FFF]', 'bg-surface'],
  ['bg-[#6B4EFF]', 'bg-brand'],
  ['bg-[#7C5CFF]', 'bg-brand-strong'],
  ['bg-[#A594F9]', 'bg-brand-secondary'],
  ['bg-[#8257B4]', 'bg-brand-tertiary'],
  ['bg-[#6344DD]', 'bg-brand-deep'],
  ['bg-[#9F8CFF]', 'bg-brand-violet'],
  ['bg-[#E8E0FF]', 'bg-accent-muted'],
  ['bg-[#E9D3F8]', 'bg-accent-muted'],
  ['bg-[#CDC1FF]', 'bg-accent-muted'],
  ['bg-[#C4B8FF]', 'bg-accent-muted'],
  ['bg-[#D9D2FF]', 'bg-accent-muted'],
  ['bg-[#D9D9D9]', 'bg-surface-muted'],
  ['bg-[#FFFCEF]', 'bg-warning-soft'],
  ['bg-[#FFEFEF]', 'bg-danger-soft'],
  ['bg-[#FF6B6B]', 'bg-reset'],
  ['bg-[#e4d3ff]', 'bg-analysis-tab'],
  ['bg-[#1a1a1a]', 'bg-placeholder-dark'],

  // Text
  ['text-[#0000004D]', 'text-disabled'],
  ['text-[#0a0a0a89]', 'text-placeholder'],
  ['text-[#0A0A0A]', 'text-primary'],
  ['text-[#232323]', 'text-secondary'],
  ['text-[#2D2640]', 'text-body-deep'],
  ['text-[#555]', 'text-body-gray'],
  ['text-[#717171]', 'text-muted'],
  ['text-[#6D6D6D]', 'text-muted'],
  ['text-[#969696]', 'text-subtle'],
  ['text-[#999]', 'text-subtle'],
  ['text-[#929292]', 'text-body-light'],
  ['text-[#8B8484]', 'text-muted'],
  ['text-[#6B4EFF]', 'text-brand'],
  ['text-[#6452CE]', 'text-brand-deep'],
  ['text-[#634DCB]', 'text-brand-deep'],
  ['text-[#7C5CFF]', 'text-brand-strong'],
  ['text-[#8257B4]', 'text-brand-tertiary'],
  ['text-[#6765FF]', 'text-brand-indigo'],
  ['text-[#9F8CFF]', 'text-brand-violet'],
  ['text-[#3D2E9E]', 'text-brand-text-deep'],
  ['text-[#4F378A]', 'text-brand-text-purple'],
  ['text-[#5A36EA]', 'text-brand-text-alt'],
  ['text-[#5AC467]', 'text-success'],
  ['text-[#FF9D00]', 'text-warning'],
  ['text-[#FF0000]', 'text-danger'],

  // Border
  ['border-[#8257B480]', 'border-brand-soft'],
  ['border-[#8257B433]', 'border-brand-faint'],
  ['border-[#8257B4]/30', 'border-brand-soft'],
  ['border-[#dad9d9]/30', 'border-default'],
  ['border-[#dad9d9]', 'border-default'],
  ['border-[#E6E8E7]', 'border-neutral'],
  ['border-[#8257B4]', 'border-accent'],
  ['border-[#A594F9]', 'border-brand-secondary'],
  ['border-[#CDC1FF]', 'border-accent-muted'],
  ['border-[#E8E0FF]', 'border-accent-muted'],
  ['border-[#E8E2FF]', 'border-accent-muted'],
  ['border-[#E8E2FF]/80', 'border-accent-muted/80'],
  ['border-[#7C5CFF]', 'border-brand-strong'],
  ['border-[#6B4EFF]', 'border-brand'],
  ['border-[#6B42FF]', 'border-brand'],
  ['border-[#e4d3ff]', 'border-analysis-tab'],
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!name.includes('node_modules')) walk(p, files);
    } else if (['.tsx', '.ts'].includes(extname(p)) && !p.includes('constants/colors.ts')) {
      files.push(p);
    }
  }
  return files;
}

let total = 0;
for (const file of walk(ROOT)) {
  let content = readFileSync(file, 'utf8');
  const original = content;
  for (const [from, to] of REPLACEMENTS) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
    }
  }
  if (content !== original) {
    writeFileSync(file, content);
    total++;
    console.log('updated:', file.replace(ROOT + '/', ''));
  }
}
console.log(`\nDone. ${total} files updated.`);
