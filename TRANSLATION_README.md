# Curriculum Translation Guide

## Current Status

✅ **Infrastructure Complete**
- Language directories created for all 10 target languages
- Translation scripts implemented
- Export/validation tools ready

⚠️ **Ready to Translate**
- Translation script created: `scripts/translate-with-claude.ts`
- Requires Anthropic API key to run

## Quick Start

### 1. Set Your API Key

```bash
export ANTHROPIC_API_KEY=your-api-key-here
```

Get your API key from: https://console.anthropic.com/settings/keys

### 2. Test with One Topic

Translate a single topic to verify everything works:

```bash
cd /Users/kaya/Coding/devoro-ui-localization
npx tsx scripts/translate-with-claude.ts fr science-discovery
```

This will translate 13 articles from the "science-discovery" topic to French.

### 3. Translate a Full Language

```bash
npx tsx scripts/translate-with-claude.ts fr
```

This translates all 195 articles to French (~20-30 minutes).

### 4. Translate All Languages

Run in parallel for speed:

```bash
# In separate terminal windows:
npx tsx scripts/translate-with-claude.ts fr &
npx tsx scripts/translate-with-claude.ts de &
npx tsx scripts/translate-with-claude.ts es &
npx tsx scripts/translate-with-claude.ts it &
npx tsx scripts/translate-with-claude.ts pt &
npx tsx scripts/translate-with-claude.ts cs &
npx tsx scripts/translate-with-claude.ts pl &
npx tsx scripts/translate-with-claude.ts nl &
npx tsx scripts/translate-with-claude.ts ro &
npx tsx scripts/translate-with-claude.ts sv &
```

Or sequentially:

```bash
for lang in fr de es it pt cs pl nl ro sv; do
  npx tsx scripts/translate-with-claude.ts $lang
done
```

## Validation

After translations complete:

```bash
npx tsx scripts/validate-curriculum-translations.ts
```

This checks:
- All 195 articles exist for each language
- Article counts match English baseline
- Quiz structure is preserved
- Word counts are reasonable (within ±30% of English)

## Translation Quality

The script:
- Uses Claude Sonnet 4 for high-quality translations
- Preserves educational tone and clarity
- Maintains technical term accuracy
- Recalculates word counts for each language
- Preserves all structural data (IDs, indices, correct answers)

## Cost Estimate

- **Per language**: ~195 articles × 4 API calls/article = 780 API calls
- **Cost**: ~$0.50-1.00 per language
- **Total (10 languages)**: ~$5-10

## Files Created

After translation, you'll have:

```
src/data/curriculum/
  en/  (195 articles)
  cs/  (195 articles) ← Czech
  de/  (195 articles) ← German
  nl/  (195 articles) ← Dutch
  fr/  (195 articles) ← French
  it/  (195 articles) ← Italian
  pl/  (195 articles) ← Polish
  pt/  (195 articles) ← Portuguese
  ro/  (195 articles) ← Romanian
  es/  (195 articles) ← Spanish
  sv/  (195 articles) ← Swedish
```

## Troubleshooting

**API Rate Limits**:
- The script includes 200ms delays between articles
- If you hit rate limits, translations will resume from where they stopped
- Just re-run the command

**Translation Failures**:
- Check ANTHROPIC_API_KEY is set correctly
- Verify internet connection
- Review error messages in console output

**Empty Files**:
- If translation fails mid-process, re-run for that language
- The script will overwrite incomplete translations

## Next Steps

After translation:
1. Run validation script
2. Test the app with different languages
3. Update curriculum loader to load translated content
4. Deploy!

## Support

If you encounter issues:
1. Check this README
2. Review script output for error messages
3. Verify API key is valid and has credits
4. Check network connectivity
