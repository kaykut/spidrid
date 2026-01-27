#!/bin/bash
#
# Full Translation Pipeline
#
# Runs all translations for all languages with optimized parallelization.
# Safe to interrupt (Ctrl+C) and resume - status is saved after each translation.
#
# Usage:
#   ./scripts/run-full-pipeline.sh              # Run all languages
#   ./scripts/run-full-pipeline.sh de fr es     # Run specific languages
#   ./scripts/run-full-pipeline.sh --quiz-only  # Only translate quizzes
#
# Run in background:
#   nohup ./scripts/run-full-pipeline.sh > translation.log 2>&1 &
#   tail -f translation.log
#

set -e  # Exit on error

# Configuration
BATCH_SIZE=5         # Parallel API requests per batch
DELAY_MS=500         # Delay between batches in ms

# Check API key
if [ -z "$GEMINI_API_KEY" ]; then
    echo "Error: GEMINI_API_KEY not set"
    echo "Run: export GEMINI_API_KEY=your-key-here"
    exit 1
fi

# Parse arguments
QUIZ_ONLY=false
LANGUAGES=""

for arg in "$@"; do
    if [ "$arg" == "--quiz-only" ]; then
        QUIZ_ONLY=true
    else
        LANGUAGES="$LANGUAGES $arg"
    fi
done

# Default to all languages if none specified
if [ -z "$LANGUAGES" ]; then
    LANGUAGES="cs de nl fr it pl pt ro es sv"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          DEVORO TRANSLATION PIPELINE                         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Languages: $LANGUAGES"
echo "Mode: $([ "$QUIZ_ONLY" == true ] && echo 'Quiz only' || echo 'Content + Quiz')"
echo "Batch Size: $BATCH_SIZE parallel requests"
echo "Delay: ${DELAY_MS}ms between batches"
echo "API Key: ${GEMINI_API_KEY:0:10}..."
echo ""
echo "Starting in 3 seconds... (Ctrl+C to cancel)"
sleep 3

START_TIME=$(date +%s)

for lang in $LANGUAGES; do
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo "  LANGUAGE: $lang ($(date '+%H:%M:%S'))"
    echo "════════════════════════════════════════════════════════════════"

    if [ "$QUIZ_ONLY" != true ]; then
        echo ""
        echo "--- Content Translation ---"
        npm run translate-batch -- --language "$lang" --type content --mode batch \
            --batch-size "$BATCH_SIZE" --delay "$DELAY_MS" || {
            echo "⚠ Content translation for $lang had failures (continuing...)"
        }
    fi

    echo ""
    echo "--- Quiz Translation ---"
    npm run translate-batch -- --language "$lang" --type quiz --mode batch \
        --batch-size "$BATCH_SIZE" --delay "$DELAY_MS" || {
        echo "⚠ Quiz translation for $lang had failures (continuing...)"
    }

    echo ""
    echo "--- Status Refresh ---"
    npm run generate-project-status
done

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
HOURS=$((DURATION / 3600))
MINUTES=$(((DURATION % 3600) / 60))

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    PIPELINE COMPLETE                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Duration: ${HOURS}h ${MINUTES}m"
echo ""
echo "Final status:"
npm run generate-project-status
